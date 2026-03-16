import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(
    locale,
    '/partners',
    { title: '合作伙伴', description: '微算与华为、北京大学、中国移动、寒武纪、NVIDIA、亚信科技等行业领导者建立深度合作。', keywords: '微算合作伙伴,华为合作,北京大学,中国移动,NVIDIA,寒武纪' },
    { title: 'Partners', description: 'Weisuàn partners with Huawei, Peking University, China Mobile, Cambricon, NVIDIA, AsiaInfo and other industry leaders.', keywords: 'partners,Huawei,Peking University,China Mobile,NVIDIA,Cambricon' },
  );
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '事业合伙人' : 'Partners'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {isZh ? '零加盟费获得100套微算设备，快速进入AI产业。' : 'Zero franchise fee, 100 Weisuàn units, fast entry into AI.'}
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '合伙人筛选标准' : 'Criteria'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '企业资质' : 'Company'}</td><td className="py-3">{isZh ? '注册资本不低于50万元，成立1年以上' : 'Registered capital ≥500k, 1+ year'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '本地资源' : 'Local reach'}</td><td className="py-3">{isZh ? '具备与当地主要企业对接能力' : 'Ability to engage local enterprises'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '运营能力' : 'Operations'}</td><td className="py-3">{isZh ? '不少于3人运营团队' : '3+ person team'}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-weisuan-black">{isZh ? '技术合作伙伴' : 'Tech Partners'}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black-10">
                <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '合作方' : 'Partner'}</th>
                <th className="py-3 font-medium text-weisuan-black">{isZh ? '合作内容' : 'Cooperation'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '华为' : 'Huawei'}</td><td className="py-3">{isZh ? '昇腾+鲲鹏双认证' : 'Ascend + Kunpeng Dual Certification'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '寒武纪' : 'Cambricon'}</td><td className="py-3">{isZh ? 'MLU370适配' : 'MLU370 Adaptation'}</td></tr>
              <tr className="border-b border-black-10"><td className="py-3 pr-4">{isZh ? '英伟达' : 'NVIDIA'}</td><td className="py-3">{isZh ? 'A100平台优化' : 'A100 Platform Optimization'}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
