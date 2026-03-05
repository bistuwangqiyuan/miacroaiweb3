'use client';

import { useState, useEffect } from 'react';

type DataRow = {
  id: string;
  title_zh: string;
  title_en: string;
  source: string | null;
  published_at: string | null;
  summary_zh: string | null;
  summary_en: string | null;
  keywords: string[] | null;
};

export function DataTable({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [items, setItems] = useState<DataRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sort: 'published_at',
      order,
    });
    if (source) params.set('source', source);
    if (keyword) params.set('keyword', keyword);
    fetch(`/api/data?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data.items) ? data.items : []);
        setTotal(data.total ?? 0);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [page, order, source, keyword]);

  const title = (r: DataRow) => (isZh ? r.title_zh : r.title_en) || r.title_zh || r.title_en;
  const summary = (r: DataRow) => (isZh ? r.summary_zh : r.summary_en) || r.summary_zh || r.summary_en;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder={isZh ? '来源' : 'Source'}
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-40 rounded border border-black-10 px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder={isZh ? '关键词' : 'Keyword'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-40 rounded border border-black-10 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => setOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
          className="rounded border border-black-10 px-3 py-2 text-sm"
        >
          {isZh ? '时间' : 'Date'} {order === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      {loading ? (
        <p className="text-weisuan-gray">{isZh ? '加载中…' : 'Loading…'}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black-10">
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '标题' : 'Title'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '来源' : 'Source'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '摘要' : 'Summary'}</th>
                <th className="py-3 font-medium text-weisuan-black">{isZh ? '时间' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-b border-black-10">
                  <td className="py-3 pr-4">{title(r)}</td>
                  <td className="py-3 pr-4">{r.source ?? '—'}</td>
                  <td className="py-3 pr-4 max-w-xs truncate">{summary(r) ?? '—'}</td>
                  <td className="py-3 text-weisuan-gray">
                    {r.published_at ? new Date(r.published_at).toLocaleDateString(locale) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {total > pageSize && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border border-black-10 px-3 py-1 text-sm disabled:opacity-50"
          >
            {isZh ? '上一页' : 'Previous'}
          </button>
          <span className="text-sm text-weisuan-gray">
            {page} / {Math.ceil(total / pageSize) || 1}
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
  );
}
