import { NextRequest, NextResponse } from 'next/server';

const SITE_CONTEXT = `
You are the customer service assistant for 微算 (Weisuàn), a "data stays local" edge micro compute center product.
Site structure (use these exact paths for navigation suggestions):
- / : Home
- /product : Products overview
- /product/weisuan-b : Product Basic
- /product/weisuan-p : Product Professional
- /product/weisuan-e : Product Enterprise
- /technology : Technology (compute-storage disaggregation, EBOF)
- /certifications : Certifications and case studies
- /cases : Case studies (filterable table)
- /cases/cost-comparison : Cost comparison case study
- /data : Market data (filterable table)
- /business-model : Business model
- /partners : Partners
- /about : About
- /contact : Contact
- /feedback : User feedback
When the user wants to see a specific page or topic, reply with a short answer and include a JSON line: {"navigate":"/path"} with the path above.
`;

const NAVIGATE_PATTERN = /\{\s*"navigate"\s*:\s*"([^"]+)"\s*\}/;

type ProviderResult = { text: string; path?: string };
type Provider = (msg: string, locale: string) => Promise<ProviderResult | null>;

function getEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return null;
}

function parseReply(text: string): ProviderResult | null {
  const cleaned = text.trim();
  if (!cleaned) return null;
  const pathMatch = cleaned.match(NAVIGATE_PATTERN);
  return {
    text: cleaned.replace(/\{\s*"navigate"[^}]+\}/g, '').trim(),
    path: pathMatch?.[1],
  };
}

async function readErrorBody(res: Response) {
  try {
    return (await res.text()).slice(0, 500);
  } catch {
    return '';
  }
}

async function tryOpenAICompatible(
  url: string,
  key: string,
  keyHeader: string,
  msg: string,
  model: string
): Promise<{ text: string; path?: string } | null> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [keyHeader]: key.startsWith('Bearer') ? key : `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SITE_CONTEXT },
          { role: 'user', content: msg },
        ],
        max_tokens: 500,
      }),
    });
  } catch (error) {
    console.error(`AI provider ${model} request failed:`, error);
    return null;
  }
  if (!res.ok) {
    console.error(`AI provider ${model} failed with ${res.status}: ${await readErrorBody(res)}`);
    return null;
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? '';
  return parseReply(text);
}

const providers: Provider[] = [
  async (msg, _locale) => {
    const key = getEnv('ANTHROPIC_API_KEY', 'anthropic_api_key');
    if (!key) return null;
    let res: Response;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 500,
          system: SITE_CONTEXT,
          messages: [{ role: 'user', content: msg }],
        }),
      });
    } catch (error) {
      console.error('AI provider anthropic request failed:', error);
      return null;
    }
    if (!res.ok) {
      console.error(`AI provider anthropic failed with ${res.status}: ${await readErrorBody(res)}`);
      return null;
    }
    const data = await res.json();
    const text = data.content?.[0]?.text ?? '';
    return parseReply(text);
  },
  async (msg, _locale) => {
    const key = getEnv('MOONSHOT_API_KEY', 'moonshot_api_key');
    if (!key) return null;
    return tryOpenAICompatible('https://api.moonshot.cn/v1/chat/completions', key, 'Authorization', msg, 'moonshot-v1-8k');
  },
  async (msg, _locale) => {
    const key = getEnv('GLM_API_KEY', 'glm_api_key');
    if (!key) return null;
    return tryOpenAICompatible('https://open.bigmodel.cn/api/paas/v4/chat/completions', key, 'Authorization', msg, 'glm-4-flash');
  },
  async (msg, _locale) => {
    const key = getEnv('DEEPSEEK_API_KEY', 'deepseek_API_KEY', 'deepseek_api_key');
    if (!key) return null;
    return tryOpenAICompatible('https://api.deepseek.com/v1/chat/completions', key, 'Authorization', msg, 'deepseek-chat');
  },
  async (msg, _locale) => {
    const key = getEnv('GEMINI_API_KEY', 'gemini_api_key');
    if (!key) return null;
    let res: Response;
    try {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SITE_CONTEXT }] },
          contents: [{ role: 'user', parts: [{ text: msg }] }],
          generationConfig: { maxOutputTokens: 500 },
        }),
      });
    } catch (error) {
      console.error('AI provider gemini request failed:', error);
      return null;
    }
    if (!res.ok) {
      console.error(`AI provider gemini failed with ${res.status}: ${await readErrorBody(res)}`);
      return null;
    }
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return parseReply(text);
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale } = body || {};
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }
    for (const provider of providers) {
      try {
        const result = await Promise.race([
          provider(message, locale || 'zh'),
          new Promise<null>((_, rej) => setTimeout(() => rej(new Error('timeout')), 15000)),
        ]);
        if (result?.text) {
          return NextResponse.json({ reply: result.text, path: result.path });
        }
      } catch {
        continue;
      }
    }
    return NextResponse.json({ reply: 'Sorry, the assistant is temporarily unavailable. Please try again or browse the site directly.', path: null });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
