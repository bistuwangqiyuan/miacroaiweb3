import { setRequestLocale } from 'next-intl/server';
import { queryCaseStudies } from '@/lib/db';
import { Link } from '@/i18n/navigation';

type CaseItem = {
  id: number;
  client_name_zh: string;
  client_name_en: string;
  deploy_days: string | null;
  outcome_zh: string;
  outcome_en: string;
  source: string;
  industry: string;
  keywords: string;
  created_at: string;
};

export const dynamic = 'force-dynamic';

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const { items, total } = await queryCaseStudies({
    page: 1,
    pageSize: 50,
    sort: 'created_at',
    order: 'desc',
  });
  const cases = items as CaseItem[];

  const industries = [...new Set(cases.map(c => c.industry).filter(Boolean))];

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '落地案例' : 'Case Studies'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '真实验证的算力方案' : 'Proven Compute Solutions'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white-60 leading-relaxed">
            {isZh
              ? `已在教育、通信、医疗、制造、金融等多个行业成功部署，共 ${total} 个落地案例。`
              : `Successfully deployed across education, telecom, healthcare, manufacturing, and finance — ${total} cases total.`}
          </p>
        </div>
      </section>

      <section className="border-b border-black-10 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-weisuan-black p-8 text-white lg:p-10">
            <p className="text-xs uppercase tracking-wider text-white-60">{isZh ? '推荐案例' : 'Featured Case'}</p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {isZh ? '微算降本对比案例' : 'Weisuan Cost Comparison Case'}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white-60 sm:text-base">
                  {isZh
                    ? '基于商业计划书附录 H，对 1E 大规模算力建设与 1P 轻量化 AI 启动场景进行 TCO 对比。1E 场景三年 TCO 可节省 58%-62%，1P 场景融资租赁仅需 2,000 元/月即可启动。'
                    : 'Based on Appendix H of the business plan, this case compares TCO for both 1E large-scale infrastructure and 1P lightweight AI adoption. The 1E scenario saves 58%-62% over three years, while the 1P scenario starts from just ¥2,000 per month.'}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-bold">58%-62%</p>
                  <p className="mt-1 text-xs text-white-60">{isZh ? '1E 场景三年 TCO 节省' : '1E 3-year TCO savings'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-bold">¥2,000/月</p>
                  <p className="mt-1 text-xs text-white-60">{isZh ? '1P 融资租赁启动费用' : '1P leasing start fee'}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/cases/cost-comparison" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-weisuan-black transition-opacity hover:opacity-90">
                {isZh ? '查看完整案例' : 'View Full Case'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {industries.length > 0 && (
        <section className="py-6 border-b border-black-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-weisuan-gray mr-2">{isZh ? '行业：' : 'Industry:'}</span>
              {industries.map((ind) => (
                <span key={ind} className="rounded-full bg-weisuan-light px-3 py-1 text-xs text-weisuan-gray">{ind}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {cases.length === 0 ? (
            <p className="text-center text-weisuan-gray">{isZh ? '暂无案例数据' : 'No case studies available'}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <div key={c.id} className="card-hover rounded-2xl bg-white p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-weisuan-black">
                      {isZh ? c.client_name_zh : c.client_name_en}
                    </h3>
                    {c.industry && (
                      <span className="rounded-full bg-weisuan-light px-2 py-0.5 text-xs text-weisuan-gray">{c.industry}</span>
                    )}
                  </div>
                  {c.deploy_days && (
                    <p className="text-xs font-medium text-weisuan-accent mb-2">
                      {c.deploy_days} {isZh ? '天部署' : 'day deployment'}
                    </p>
                  )}
                  <p className="text-sm text-weisuan-gray leading-relaxed flex-1">
                    {isZh ? c.outcome_zh : c.outcome_en}
                  </p>
                  {c.keywords && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {c.keywords.split(',').map((kw, i) => (
                        <span key={i} className="rounded-full bg-black-5 px-2 py-0.5 text-xs text-weisuan-gray">{kw.trim()}</span>
                      ))}
                    </div>
                  )}
                  <p className="mt-3 text-xs text-weisuan-gray">
                    {new Date(c.created_at).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
