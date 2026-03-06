import { setRequestLocale } from 'next-intl/server';

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '技术架构' : 'Technology'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {isZh ? '存算分离架构与EBOF全闪存储两大核心技术，完全自主知识产权。' : 'Dual pillars: compute-storage disaggregation and EBOF all-flash storage. Fully proprietary IP.'}
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '存算分离架构' : 'Compute-Storage Disaggregation'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black-10">
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '性能维度' : 'Metric'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '指标' : 'Target'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '交互延迟' : 'Latency'}</td><td className="py-3">≤100μs</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '集群带宽' : 'Bandwidth'}</td><td className="py-3">≥100Gbps</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '扩容周期' : 'Expand cycle'}</td><td className="py-3">≤4h，不中断业务</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium text-weisuan-black">EBOF {isZh ? '全闪存储' : 'All-Flash Storage'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black-10">
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '性能维度' : 'Metric'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '指标' : 'Target'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">IOPS</td><td className="py-3">≥100万</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '带宽' : 'Bandwidth'}</td><td className="py-3">≥56GB/s</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '可靠性' : 'Reliability'}</td><td className="py-3">99.9999%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '融合效益' : 'Combined Benefits'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '系统响应效率提升' : 'Response efficiency'}</td><td className="py-3">≥60%</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '综合TCO降低' : 'TCO reduction'}</td><td className="py-3">≥40%</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '扩容周期缩短' : 'Expand cycle'}</td><td className="py-3">90%</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
