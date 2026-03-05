'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';

type Message = { role: 'user' | 'assistant'; text: string; path?: string };

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const locale = typeof window !== 'undefined' ? (document.documentElement.lang === 'en' ? 'en' : 'zh') : 'zh';
  const isZh = locale === 'zh';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, locale }),
      });
      const data = await res.json();
      const reply = data.reply || (isZh ? '暂无回复。' : 'No reply.');
      const path = data.path || undefined;
      setMessages((m) => [...m, { role: 'assistant', text: reply, path }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: isZh ? '请求失败，请重试。' : 'Request failed. Please retry.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-weisuan-black text-white shadow-lg hover:opacity-90"
        aria-label={isZh ? 'AI 客服' : 'AI assistant'}
      >
        {open ? '×' : '◆'}
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[400px] w-[360px] flex-col rounded-xl border border-black-10 bg-white shadow-xl">
          <div className="border-b border-black-10 px-4 py-3 font-medium text-weisuan-black">
            {isZh ? 'AI 客服' : 'AI Assistant'}
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="text-sm text-weisuan-gray">
                {isZh ? '您好，可咨询产品、技术或让助手帮您跳转到指定页面。' : 'Ask about products, tech, or ask to navigate to a page.'}
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user' ? 'bg-weisuan-black text-white' : 'bg-weisuan-light text-weisuan-black'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'assistant' && msg.path && (
                  <button
                    type="button"
                    onClick={() => {
                      router.push(msg.path as '/');
                      setOpen(false);
                    }}
                    className="mt-1 block text-left text-sm text-weisuan-accent hover:underline"
                  >
                    → {isZh ? '前往该页' : 'Go to page'}
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <p className="text-sm text-weisuan-gray">{isZh ? '正在回复…' : 'Replying…'}</p>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex gap-2 border-t border-black-10 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={isZh ? '输入问题…' : 'Type a question…'}
              className="flex-1 rounded border border-black-10 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              className="rounded bg-weisuan-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {isZh ? '发送' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
