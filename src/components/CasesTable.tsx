'use client';

import { useState, useEffect } from 'react';

type CaseRow = {
  id: string;
  client_name_zh: string;
  client_name_en: string;
  deploy_days: string | null;
  outcome_zh: string;
  outcome_en: string;
  source: string | null;
  industry: string | null;
  created_at: string;
  keywords: string[] | null;
};

export function CasesTable({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [items, setItems] = useState<CaseRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sort,
      order,
    });
    if (source) params.set('source', source);
    if (keyword) params.set('keyword', keyword);
    fetch(`/api/cases?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data.items) ? data.items : []);
        setTotal(data.total ?? 0);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [page, sort, order, source, keyword]);

  const clientName = (r: CaseRow) => (isZh ? r.client_name_zh : r.client_name_en) || r.client_name_zh || r.client_name_en;
  const outcome = (r: CaseRow) => (isZh ? r.outcome_zh : r.outcome_en) || r.outcome_zh || r.outcome_en;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder={isZh ? '来源' : 'Source'}
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded border border-black-10 px-3 py-2 text-sm w-40"
        />
        <input
          type="text"
          placeholder={isZh ? '关键词' : 'Keyword'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="rounded border border-black-10 px-3 py-2 text-sm w-40"
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
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '客户' : 'Client'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '部署周期' : 'Deploy'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '核心成效' : 'Outcome'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '来源' : 'Source'}</th>
                <th className="py-3 font-medium text-weisuan-black">{isZh ? '时间' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-b border-black-10">
                  <td className="py-3 pr-4">{clientName(r)}</td>
                  <td className="py-3 pr-4">{r.deploy_days ?? '—'}</td>
                  <td className="py-3 pr-4">{outcome(r)}</td>
                  <td className="py-3 pr-4">{r.source ?? '—'}</td>
                  <td className="py-3 text-weisuan-gray">{new Date(r.created_at).toLocaleDateString(locale)}</td>
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
