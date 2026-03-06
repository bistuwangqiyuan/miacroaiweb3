'use client';

import { useState, useEffect, useCallback } from 'react';

type FeedbackItem = { id: string; content: string; created_at: string };

function getUserId(): string {
  if (typeof window === 'undefined') return 'guest';
  let id = localStorage.getItem('weisuan_uid');
  if (!id) {
    id = 'u_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('weisuan_uid', id);
  }
  return id;
}

export function FeedbackSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [list, setList] = useState<FeedbackItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  const fetchList = useCallback(async (p: number) => {
    const uid = getUserId();
    try {
      const res = await fetch(`/api/feedback?page=${p}&pageSize=${pageSize}`, {
        headers: { 'x-user-id': uid },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.items)) {
        setList(data.items);
        setTotal(data.total ?? data.items.length);
      }
    } catch {
      setList([]);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setStatus('sending');
    const uid = getUserId();
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': uid },
        body: JSON.stringify({ content: content.trim(), locale }),
      });
      if (res.ok) {
        setContent('');
        setStatus('done');
        setPage(1);
        fetchList(1);
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    fetchList(page);
  }, [page, fetchList]);

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div>
          <label className="text-sm font-medium text-weisuan-black">
            {isZh ? '反馈内容' : 'Your feedback'}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="mt-1.5 block w-full rounded-xl border border-black-10 bg-white px-4 py-3 text-sm transition-colors"
            placeholder={isZh ? '请描述您的反馈或建议…' : 'Describe your feedback or suggestions...'}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-weisuan-black px-8 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === 'sending' ? (isZh ? '提交中…' : 'Sending…') : (isZh ? '提交反馈' : 'Submit Feedback')}
          </button>
          {status === 'done' && (
            <span className="text-sm text-green-600 animate-fade-in">
              {isZh ? '✓ 提交成功' : '✓ Submitted'}
            </span>
          )}
          {status === 'error' && (
            <span className="text-sm text-red-600 animate-fade-in">
              {isZh ? '提交失败，请重试' : 'Failed. Please retry.'}
            </span>
          )}
        </div>
      </form>

      {list.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-weisuan-black">{isZh ? '我的反馈记录' : 'My Feedback'}</h2>
          <div className="mt-6 space-y-4">
            {list.map((item) => (
              <div key={item.id} className="rounded-xl border border-black-10 p-4">
                <p className="text-sm text-weisuan-black leading-relaxed">{item.content}</p>
                <p className="mt-2 text-xs text-weisuan-gray">{new Date(item.created_at).toLocaleString(locale)}</p>
              </div>
            ))}
          </div>
          {total > pageSize && (
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-black-10 px-4 py-2 text-sm disabled:opacity-50 hover:bg-black-5 transition-colors"
              >
                {isZh ? '上一页' : 'Previous'}
              </button>
              <span className="text-sm text-weisuan-gray">
                {page} / {Math.ceil(total / pageSize)}
              </span>
              <button
                type="button"
                disabled={page >= Math.ceil(total / pageSize)}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-black-10 px-4 py-2 text-sm disabled:opacity-50 hover:bg-black-5 transition-colors"
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
