import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';

const enterpriseComparison = [
  {
    metricZh: '初始建设',
    metricEn: 'Initial build',
    traditional: '约 2.8-2.9 亿元',
    weisuan: '约 1.15-1.5 亿元',
    deltaZh: '节省约 55%-60%',
    deltaEn: 'Save about 55%-60%',
  },
  {
    metricZh: '三年 TCO',
    metricEn: '3-year TCO',
    traditional: '约 3.55-3.8 亿元',
    weisuan: '约 1.4-1.85 亿元',
    deltaZh: '节省约 58%-62%',
    deltaEn: 'Save about 58%-62%',
  },
  {
    metricZh: '部署周期',
    metricEn: 'Deployment time',
    traditional: '6-18 个月',
    weisuan: '2-4 周',
    deltaZh: '缩短 90%+',
    deltaEn: '90%+ faster',
  },
  {
    metricZh: '资源利用率',
    metricEn: 'Resource utilization',
    traditional: '约 40%',
    weisuan: '约 80%',
    deltaZh: '提升约 1 倍',
    deltaEn: 'Roughly 2x higher',
  },
  {
    metricZh: '扩容方式',
    metricEn: 'Scale-out',
    traditional: '停机调试、周期长',
    weisuan: '热插拔，4 小时内完成',
    deltaZh: '不中断业务',
    deltaEn: 'No service interruption',
  },
];

const lightComparison = [
  {
    metricZh: '初始投入',
    metricEn: 'Upfront cost',
    selfBuilt: '80-120 万元',
    cloud: '0',
    purchase: '5 万元',
    leasing: '0（月付 2,000 元）',
  },
  {
    metricZh: '三年 TCO',
    metricEn: '3-year TCO',
    selfBuilt: '96-144 万元',
    cloud: '约 105 万元',
    purchase: '约 7.5 万元',
    leasing: '约 7.2 万元',
  },
  {
    metricZh: '部署/上线',
    metricEn: 'Go-live time',
    selfBuilt: '2-4 周',
    cloud: '即时',
    purchase: '48-72 小时',
    leasing: '48-72 小时',
  },
  {
    metricZh: '数据与合规',
    metricEn: 'Data and compliance',
    selfBuilt: '本地可控',
    cloud: '数据在云端',
    purchase: '数据不出域',
    leasing: '数据不出域',
  },
];

export default async function CostComparisonCasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div>
      <section className="bg-weisuan-black py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/cases" className="inline-flex text-sm text-white-60 transition-colors hover:text-white">
            ← {isZh ? '返回案例列表' : 'Back to Cases'}
          </Link>
          <p className="section-label mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '专题案例' : 'Featured Case'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '微算降本对比案例' : 'Weisuan Cost Comparison Case'}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white-60">
            {isZh
              ? '基于《共享微算商业计划书》附录 H、华为同成本对标结果和行业公开数据，对传统算力方案与微算方案进行全维度 TCO 对比。结果显示，在大规模算力建设与轻量化 AI 启动两个场景中，微算均可显著降低投入门槛并缩短上线周期。'
              : 'Based on Appendix H of the business plan, Huawei benchmark data, and public industry sources, this case compares total cost of ownership across traditional and Weisuan deployments. In both large-scale infrastructure and lightweight AI adoption, Weisuan lowers the cost barrier and accelerates time to value.'}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: '58%-62%',
                labelZh: '1E 场景三年 TCO 节省',
                labelEn: '1E scenario 3-year TCO savings',
              },
              {
                value: '2-4 周',
                labelZh: '1E 场景部署周期',
                labelEn: '1E scenario deployment time',
              },
              {
                value: '¥2,000/月',
                labelZh: '1P 融资租赁启动费用',
                labelEn: '1P leasing starting fee',
              },
              {
                value: '1P',
                labelZh: '月付即可启用的本地算力',
                labelEn: 'Local compute enabled from month one',
              },
            ].map((item) => (
              <div key={item.value + item.labelZh} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-3xl font-bold tracking-tight">{item.value}</p>
                <p className="mt-2 text-sm text-white-60">{isZh ? item.labelZh : item.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-label">{isZh ? '案例一' : 'Case One'}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">
              {isZh ? '1E 算力建设成本对比' : '1E Compute Infrastructure Comparison'}
            </h2>
            <p className="mt-4 text-weisuan-gray leading-relaxed">
              {isZh
                ? '适用于省级或区域级智算中心、大规模 AI 训练与推理场景。相比传统重资产建设模式，微算依托模块化架构、存算分离和 EBOF 全闪存储，将建设成本、扩容复杂度与三年 TCO 同时压低。'
                : 'Designed for regional intelligent compute centers and large-scale AI training or inference. With modular architecture, compute-storage disaggregation, and EBOF all-flash storage, Weisuan lowers build cost, scale-out complexity, and 3-year TCO simultaneously.'}
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-black-10 bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-weisuan-light">
                <tr>
                  <th className="px-6 py-4 font-semibold text-weisuan-black">{isZh ? '对比项' : 'Metric'}</th>
                  <th className="px-6 py-4 font-semibold text-weisuan-black">{isZh ? '传统方案' : 'Traditional'}</th>
                  <th className="px-6 py-4 font-semibold text-weisuan-black">{isZh ? '微算方案' : 'Weisuan'}</th>
                  <th className="px-6 py-4 font-semibold text-weisuan-black">{isZh ? '差异' : 'Delta'}</th>
                </tr>
              </thead>
              <tbody>
                {enterpriseComparison.map((row) => (
                  <tr key={row.metricZh} className="border-t border-black-10">
                    <td className="px-6 py-4 font-medium text-weisuan-black">{isZh ? row.metricZh : row.metricEn}</td>
                    <td className="px-6 py-4 text-weisuan-gray">{row.traditional}</td>
                    <td className="px-6 py-4 text-weisuan-black">{row.weisuan}</td>
                    <td className="px-6 py-4 font-medium text-weisuan-accent">{isZh ? row.deltaZh : row.deltaEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-3xl bg-weisuan-light p-8">
            <p className="text-sm font-semibold text-weisuan-black">{isZh ? '依据与说明' : 'Basis and Notes'}</p>
            <p className="mt-3 text-sm leading-relaxed text-weisuan-gray">
              {isZh
                ? '测算依据包括华为 120 万元同成本对标测试、存算分离与 EBOF 架构带来的存储成本下降、EC 冗余效率提升，以及行业公开的 NVMe-oF 规模化实践。综合测算显示，微算在 1E 场景下可实现 58%-62% 的三年 TCO 优势。'
                : 'The estimate combines Huawei’s same-cost benchmark, storage savings from compute-storage disaggregation and EBOF, improved redundancy efficiency from erasure coding, and public NVMe-oF scale-out references. Combined, these point to a 58%-62% 3-year TCO advantage for the 1E scenario.'}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-label">{isZh ? '案例二' : 'Case Two'}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">
              {isZh ? '1P 算力轻量化启动对比' : '1P Lightweight AI Startup Comparison'}
            </h2>
            <p className="mt-4 text-weisuan-gray leading-relaxed">
              {isZh
                ? '适用于短视频生成、广告物料生产、营销内容生成等轻量推理与小模型微调场景。微算-B 支持企业以本地部署方式快速获得 1P 级算力，而融资租赁模式进一步把启动成本压缩到月付 2,000 元。'
                : 'Built for video generation, ad material creation, marketing content workflows, and other lightweight inference or small-model tuning scenarios. Weisuan-B enables 1P local compute quickly, while the leasing model reduces startup cost to only ¥2,000 per month.'}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-1">
              <p className="text-xs uppercase tracking-wider text-weisuan-accent">{isZh ? '融资租赁亮点' : 'Leasing Highlight'}</p>
              <p className="mt-4 text-3xl font-bold text-weisuan-black">¥2,000<span className="text-lg font-normal text-weisuan-gray">/{isZh ? '月' : 'mo'}</span></p>
              <p className="mt-4 text-sm leading-relaxed text-weisuan-gray">
                {isZh
                  ? '启动费用仅 2,000 元/月，即可享 1P 算力，相当于拥有约 4 万元的 ChatGPT Token 使用额度，特别适合希望低门槛启动本地 AI 能力的企业与机构。'
                  : 'From just ¥2,000 per month, organizations can enable 1P of local compute. That is roughly comparable to about ¥40,000 worth of ChatGPT token usage, making it ideal for teams that want a low-friction way to start building on-prem AI capability.'}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-black-10">
                      <th className="py-4 pr-4 font-semibold text-weisuan-black">{isZh ? '对比项' : 'Metric'}</th>
                      <th className="py-4 pr-4 font-semibold text-weisuan-black">{isZh ? '传统自建' : 'Self-built'}</th>
                      <th className="py-4 pr-4 font-semibold text-weisuan-black">{isZh ? '传统公有云' : 'Public cloud'}</th>
                      <th className="py-4 pr-4 font-semibold text-weisuan-black">{isZh ? '微算购置' : 'Weisuan purchase'}</th>
                      <th className="py-4 font-semibold text-weisuan-black">{isZh ? '微算融资租赁' : 'Weisuan leasing'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lightComparison.map((row) => (
                      <tr key={row.metricZh} className="border-b border-black-10">
                        <td className="py-4 pr-4 font-medium text-weisuan-black">{isZh ? row.metricZh : row.metricEn}</td>
                        <td className="py-4 pr-4 text-weisuan-gray">{row.selfBuilt}</td>
                        <td className="py-4 pr-4 text-weisuan-gray">{row.cloud}</td>
                        <td className="py-4 pr-4 text-weisuan-gray">{row.purchase}</td>
                        <td className="py-4 font-medium text-weisuan-accent">{row.leasing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-weisuan-accent-30 bg-white p-8">
            <p className="text-lg font-semibold text-weisuan-black">
              {isZh ? '结论：以 1P 场景为例，三年 TCO 可压缩至约 7.2 万元。' : 'Conclusion: in the 1P scenario, 3-year TCO can drop to about ¥72,000.'}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-weisuan-gray">
              {isZh
                ? '相比传统自建的 96-144 万元和公有云的约 105 万元，微算融资租赁更适合预算有限但又希望实现数据不出域、快速上线与可持续扩展的企业。'
                : 'Compared with ¥960,000-1,440,000 for self-built infrastructure and roughly ¥1,050,000 for public cloud, Weisuan leasing better fits organizations that need local data control, fast deployment, and sustainable scaling on a constrained budget.'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">
            {isZh ? '希望按你的业务场景测算 TCO？' : 'Need a TCO estimate for your own scenario?'}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-weisuan-gray">
            {isZh
              ? '我们可以根据你的算力规模、数据合规要求与上线节奏，给出对应的微算购置或融资租赁方案。'
              : 'We can estimate the right Weisuan purchase or leasing plan based on your compute scale, compliance requirements, and deployment timeline.'}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-weisuan-black px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              {isZh ? '联系顾问' : 'Talk to Us'}
            </Link>
            <Link href="/product/weisuan-b" className="inline-flex items-center rounded-full border border-black-10 px-8 py-3 text-sm font-semibold text-weisuan-black transition-colors hover:border-weisuan-accent-30 hover:text-weisuan-accent">
              {isZh ? '查看微算-B' : 'View Weisuan-B'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
