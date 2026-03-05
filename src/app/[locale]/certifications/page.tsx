import { setRequestLocale } from 'next-intl/server';

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '验证与资质' : 'Certifications & Validation'}
      </h1>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '华为对标测试（120万元同成本）' : 'Huawei benchmark (same cost)'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black-10">
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '测试指标' : 'Metric'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '微算提升' : 'Weisuàn gain'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '数据加载时间' : 'Data load time'}</td><td className="py-3">{isZh ? '降低72%' : '-72%'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '吞吐量' : 'Throughput'}</td><td className="py-3">{isZh ? '提升64%' : '+64%'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '三年总成本' : '3Y TCO'}</td><td className="py-3">{isZh ? '节省30%以上' : 'Save 30%+'}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '落地案例' : 'Case Studies'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black-10">
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '客户' : 'Client'}</th>
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '部署周期' : 'Deploy'}</th>
                <th className="py-3 font-medium text-weisuan-black">{isZh ? '核心成效' : 'Outcome'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">北京信息科技大学</td><td className="py-3 pr-4">72h</td><td className="py-3">{isZh ? '百人并发、85%利用率、获奖率+30%' : '100+ concurrent, 85% utilization'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">华为算力中心</td><td className="py-3 pr-4">48h</td><td className="py-3">{isZh ? '数据互通+30%、模型加载缩短72%' : 'Data互通+30%, load -72%'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">中国移动</td><td className="py-3 pr-4">—</td><td className="py-3">{isZh ? '已签订100万+微算合同' : '100万+ contract'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">亚信科技</td><td className="py-3 pr-4">—</td><td className="py-3">{isZh ? '定制多套微算，行业方案' : 'Custom solutions'}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '资质认证' : 'Certifications'}</h2>
        <ul className="mt-4 space-y-2 text-sm text-weisuan-gray">
          <li>华为昇腾AI处理器兼容认证</li>
          <li>华为鲲鹏通用计算平台兼容认证</li>
          <li>国内90%以上GPU适配（寒武纪/英伟达等）</li>
        </ul>
      </section>
    </div>
  );
}
