'use client';

import { useState, useEffect } from 'react';

type FeedbackItem = { id: string; content: string; created_at: string };

export function FeedbackSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [list, setList] = useState<FeedbackItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, locale }),
      });
      if (res.ok) {
        setContent('');
        setStatus('done');
        setPage(1);
        fetchList(1);
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  async function fetchList(p: number) {
    try {
      const res = await fetch(`/api/feedback?page=${p}&pageSize=${pageSize}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data.items)) {
        setList(data.items);
        setTotal(data.total ?? data.items.length);
      }
    } catch {
      setList([]);
    }
  }

  useEffect(() => {
    fetchList(page);
  }, [page]);

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="text-sm font-medium text-weisuan-black">
          {isZh ? '反馈内容' : 'Your feedback'}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full rounded border border-black-10 px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-fit rounded-full bg-weisuan-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {status === 'sending' ? (isZh ? '提交中…' : 'Sending…') : isZh ? '提交' : 'Submit'}
        </button>
        {status === 'error' && <p className="text-sm text-red-600">{isZh ? '提交失败' : 'Failed'}</p>}
      </form>
      {list.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-weisuan-black">{isZh ? '我的反馈记录' : 'My feedback'}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black-10">
                  <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '内容' : 'Content'}</th>
                  <th className="py-3 font-medium text-weisuan-black">{isZh ? '时间' : 'Time'}</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="border-b border-black-10">
                    <td className="py-3 pr-4">{item.content}</td>
                    <td className="py-3 text-weisuan-gray">{new Date(item.created_at).toLocaleString(locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {total > pageSize && (
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded border border-black-10 px-3 py-1 text-sm disabled:opacity-50"
              >
                {isZh ? '上一页' : 'Previous'}
              </button>
              <span className="py-1 text-sm text-weisuan-gray">
                {page} / {Math.ceil(total / pageSize)}
              </span>
              <button
                type="button"
                disabled={page >= Math.ceil(total / pageSize)}
                onClick={() => setPage((p) => p + 1)}
                className="rounded border border-black-10 px-3 py-1 text-sm disabled:opacity-50"
              >
                {isZh ? '下一页' : 'Next'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
