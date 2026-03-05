'use client';

import { useState } from 'react';

export function ContactForm({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) setStatus('done');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="text-sm font-medium text-weisuan-black">
        {isZh ? '姓名' : 'Name'}
        <input name="name" required className="mt-1 block w-full rounded border border-black-10 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-weisuan-black">
        {isZh ? '邮箱' : 'Email'}
        <input name="email" type="email" required className="mt-1 block w-full rounded border border-black-10 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-weisuan-black">
        {isZh ? '留言' : 'Message'}
        <textarea name="message" required rows={4} className="mt-1 block w-full rounded border border-black-10 px-3 py-2 text-sm" />
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-weisuan-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {status === 'sending' ? (isZh ? '提交中…' : 'Sending…') : status === 'done' ? (isZh ? '已提交' : 'Sent') : isZh ? '提交' : 'Submit'}
      </button>
      {status === 'error' && <p className="text-sm text-red-600">{isZh ? '提交失败，请重试。' : 'Failed. Please try again.'}</p>}
    </form>
  );
}
