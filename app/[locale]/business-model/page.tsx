import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(
    locale,
    '/business-model',
    { title: '商业模式', description: '微算共享算力商业模式：零加盟费成为事业合伙人，免费获得100套微算设备，价值500万元。融资租赁2,000元/月起。', keywords: '微算商业模式,事业合伙人,加盟,免费设备,融资租赁,共享算力' },
    { title: 'Business Model', description: 'Weisuàn shared computing model: zero franchise fee, 100 free units (worth ¥5M). Become a partner. Leasing from ¥2,000/month.', keywords: 'business model,partner program,franchise,free equipment,computing leasing' },
  );
}

export default async function BusinessModelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '商业模式' : 'Business Model'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {isZh ? '共享经济范式迁移：从「买算力」到「共享算力」，零成本试点、亿元算力免费送。' : 'Shared-economy shift: from buying to sharing compute. Zero-cost pilot, 100M+ compute free.'}
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '合伙人权益' : 'Partner Benefits'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black-10">
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '权益' : 'Benefit'}</th>
                <th className="py-3 font-medium text-weisuan-black">{isZh ? '内容' : 'Detail'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '免费设备' : 'Free equipment'}</td><td className="py-3">{isZh ? '100套微算（价值约1亿元），零加盟费' : '100 Weisuàn units (worth ~¥100M), zero franchise fee'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '股权/期权' : 'Equity'}</td><td className="py-3">{isZh ? '拟上市公司股份，共享上市收益' : 'Share in future listing'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '收益分成' : 'Revenue share'}</td><td className="py-3">30-50%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '收入来源' : 'Revenue'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '算力服务' : 'Compute service'}</td><td className="py-3">{isZh ? '按PFLOPS小时计费' : 'Per PFLOPS-hour'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '扩展硬件销售' : 'Hardware expansion'}</td><td className="py-3">{isZh ? '试点成功后扩展采购' : 'Post-pilot expansion'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '技术授权与运维' : 'Licensing & Ops'}</td><td className="py-3">{isZh ? '技术方案、7×24运维' : 'Tech license, 7×24 ops'}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
