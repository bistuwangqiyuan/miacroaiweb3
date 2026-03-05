import { NextRequest, NextResponse } from 'next/server';

const SITE_CONTEXT = `
You are the customer service assistant for 微算 (Weisuàn), a "data stays local" edge micro compute center product.
Site structure (use these exact paths for navigation suggestions):
- / : Home
- /product : Products overview
- /product/weisuàn-b : Product Basic
- /product/weisuàn-p : Product Professional
- /product/weisuàn-e : Product Enterprise
- /technology : Technology (compute-storage disaggregation, EBOF)
- /certifications : Certifications and case studies
- /cases : Case studies (filterable table)
- /data : Market data (filterable table)
- /business-model : Business model
- /partners : Partners
- /about : About
- /contact : Contact
- /feedback : User feedback
When the user wants to see a specific page or topic, reply with a short answer and include a JSON line: {"navigate":"/path"} with the path above.
`;

type Provider = (msg: string, locale: string) => Promise<{ text: string; path?: string } | null>;

async function tryOpenAICompatible(
  url: string,
  key: string,
  keyHeader: string,
  msg: string,
  model: string
): Promise<{ text: string; path?: string } | null> {
  const res = await fetch(url, {
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
  if (!res.ok) return null;
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? '';
  const pathMatch = text.match(/\{\s*"navigate"\s*:\s*"([^"]+)"\s*\}/);
  return { text: text.replace(/\{\s*"navigate"[^}]+\}/g, '').trim(), path: pathMatch?.[1] };
}

const providers: Provider[] = [
  async (msg, _locale) => {
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) return null;
    return tryOpenAICompatible('https://api.deepseek.com/v1/chat/completions', key, 'Authorization', msg, 'deepseek-chat');
  },
  async (msg, _locale) => {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return null;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
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
    if (!res.ok) return null;
    const data = await res.json();
    const text = data.content?.[0]?.text ?? '';
    const pathMatch = text.match(/\{\s*"navigate"\s*:\s*"([^"]+)"\s*\}/);
    return { text: text.replace(/\{\s*"navigate"[^}]+\}/g, '').trim(), path: pathMatch?.[1] };
  },
  async (msg, _locale) => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return null;
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: SITE_CONTEXT + '\n\nUser: ' + msg }] }],
        generationConfig: { maxOutputTokens: 500 },
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const pathMatch = text.match(/\{\s*"navigate"\s*:\s*"([^"]+)"\s*\}/);
    return { text: text.replace(/\{\s*"navigate"[^}]+\}/g, '').trim(), path: pathMatch?.[1] };
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
