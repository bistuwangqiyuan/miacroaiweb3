import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';
import { buildPageMetadata, buildProductJsonLd, buildBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/product', {
    title: '产品矩阵',
    description: '微算产品矩阵：微算-B基础版(1 PFLOPS)、微算-P专业版(12 PFLOPS)、微算-E企业版(50+ PFLOPS)。开箱即用，线性扩展，数据不出域。',
    keywords: '微算产品,微算-B,微算-P,微算-E,算力设备,AI服务器,微型算力中心',
  }, {
    title: 'Product Lineup',
    description: 'Weisuàn product lineup: Basic (1 PFLOPS), Professional (12 PFLOPS), Enterprise (50+ PFLOPS). Turnkey deployment, linear scaling, data stays local.',
    keywords: 'Weisuàn products,computing hardware,AI server,micro computing,PFLOPS',
  });
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const products = [
    {
      name: '微算-B',
      href: '/product/weisuan-b',
      sub: isZh ? '基础版' : 'Basic',
      descZh: '小型AI推理、数据分析、教学实训。开箱即用，48-72小时快速部署。试点期免费赠送。',
      descEn: 'Small-scale AI inference, data analysis, training. Turnkey, 48-72h deployment. Free during pilot.',
      specs: [
        { labelZh: '计算', labelEn: 'Compute', value: isZh ? '1×通用CPU + 可选GPU' : '1×CPU + Optional GPU' },
        { labelZh: '存储', labelEn: 'Storage', value: '4TB NVMe SSD' },
        { labelZh: '网络', labelEn: 'Network', value: '25G/100G' },
        { labelZh: '算力', labelEn: 'Output', value: isZh ? '可达1 PFLOPS' : 'Up to 1 PFLOPS' },
      ],
      priceZh: '约9.8万元（试点期免费赠送）',
      priceEn: '~¥98K (free during pilot)',
      leaseZh: '融资租赁：2,000元/月',
      leaseEn: 'Leasing: ¥2,000/mo',
      badge: isZh ? '推荐试点' : 'Pilot',
      img: '/image/微算产品图1.jpg',
    },
    {
      name: '微算-P',
      href: '/product/weisuan-p',
      sub: isZh ? '专业版' : 'Professional',
      descZh: '中型AI训练与推理、工业边缘计算。多节点集群，EBOF全闪存储，按需扩展。',
      descEn: 'Mid-scale AI training & inference, industrial edge. Multi-node cluster with EBOF all-flash, on-demand scaling.',
      specs: [
        { labelZh: '计算', labelEn: 'Compute', value: isZh ? '多CPU+多GPU集群' : 'Multi CPU+GPU' },
        { labelZh: '存储', labelEn: 'Storage', value: '16×3.84TB NVMe SSD' },
        { labelZh: '网络', labelEn: 'Network', value: '100G RDMA RoCEv2' },
        { labelZh: '算力', labelEn: 'Output', value: isZh ? '可达12 PFLOPS' : 'Up to 12 PFLOPS' },
      ],
      priceZh: '200-500万元',
      priceEn: '¥2-5M',
      leaseZh: '',
      leaseEn: '',
      badge: null,
      img: '/image/微算产品图2.jpg',
    },
    {
      name: '微算-E',
      href: '/product/weisuan-e',
      sub: isZh ? '企业版' : 'Enterprise',
      descZh: '大规模模型训练、高性能计算。千卡级异构集群，PB级分布式存储。定制方案。',
      descEn: 'Large-scale model training, HPC. Thousand-card heterogeneous cluster, PB-scale storage. Custom solutions.',
      specs: [
        { labelZh: '计算', labelEn: 'Compute', value: isZh ? '多节点异构集群，千卡规模' : '1000+ card cluster' },
        { labelZh: '存储', labelEn: 'Storage', value: isZh ? 'PB级分布式存储池' : 'PB-scale distributed' },
        { labelZh: '网络', labelEn: 'Network', value: '200G/400G' },
        { labelZh: '算力', labelEn: 'Output', value: isZh ? '可达50+ PFLOPS' : '50+ PFLOPS' },
      ],
      priceZh: '500万元以上（定制方案）',
      priceEn: '¥5M+ (custom)',
      leaseZh: '',
      leaseEn: '',
      badge: null,
      img: '/image/微算产品图3.png',
    },
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: isZh ? '首页' : 'Home', url: SITE_URL },
    { name: isZh ? '产品' : 'Products', url: `${SITE_URL}${isZh ? '' : '/en'}/product` },
  ]);
  const productsJsonLd = products.map((p) =>
    buildProductJsonLd(locale, {
      name: `${p.name} ${p.sub}`,
      description: isZh ? p.descZh : p.descEn,
      image: p.img,
      sku: p.name.replace('微算-', 'WEISUAN-'),
      specs: p.specs[3]?.value ?? '',
      ...(p.priceZh.includes('9.8') ? { priceCurrency: 'CNY', price: '98000' } : {}),
    }),
  );

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd} />
      {productsJsonLd.map((p, i) => (
        <JsonLd key={i} data={p} />
      ))}
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {isZh ? '产品' : 'Products'}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
                {isZh ? '产品矩阵' : 'Product Lineup'}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white-60 leading-relaxed">
                {isZh
                  ? '开箱即用、一机运行、一键启动。从单台微算到万台规模，线性扩展。数据不出域，安全有保障。'
                  : 'Turnkey, one-box operation, one-click start. Scale linearly from one unit to ten thousand. Your data stays local.'}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image src="/image/微算产品图10.png" alt="微算产品" width={400} height={300} className="rounded-2xl opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className="card-hover rounded-2xl bg-white p-8 flex flex-col relative">
                {p.badge && (
                  <span className="absolute top-6 right-6 rounded-full bg-weisuan-accent px-3 py-1 text-xs font-medium text-white">
                    {p.badge}
                  </span>
                )}
                <div className="flex items-center justify-center w-full h-40 rounded-xl bg-weisuan-light mb-6 overflow-hidden">
                  <Image src={p.img} alt={p.name} width={300} height={160} className="object-cover w-full h-full" />
                </div>
                <h2 className="text-xl font-semibold text-weisuan-black">{p.name} {p.sub}</h2>
                <p className="mt-2 text-sm text-weisuan-gray leading-relaxed flex-1">
                  {isZh ? p.descZh : p.descEn}
                </p>
                <div className="mt-6 space-y-0">
                  {p.specs.map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-black-10">
                      <span className="text-xs text-weisuan-gray">{isZh ? s.labelZh : s.labelEn}</span>
                      <span className="text-xs font-semibold text-weisuan-black">{s.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-weisuan-accent">{isZh ? p.priceZh : p.priceEn}</p>
                {(isZh ? p.leaseZh : p.leaseEn) && (
                  <p className="mt-1 text-xs text-weisuan-gray">{isZh ? p.leaseZh : p.leaseEn}</p>
                )}
                <Link href={p.href as Parameters<typeof Link>[0]['href']} className="mt-4 inline-flex items-center rounded-full bg-weisuan-black px-6 py-2.5 text-xs font-semibold text-white hover:opacity-90 transition-all">
                  {isZh ? '查看详情' : 'View Details'} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Architecture */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '产品架构' : 'Product Architecture'}</h2>
          <p className="mt-4 text-weisuan-gray">
            {isZh ? '微算产品集计算、存储、管控功能于一体，以存算分离架构和EBOF全闪存储为技术底座。' : 'Weisuàn integrates compute, storage, and management, built on compute-storage disaggregation and EBOF.'}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl overflow-hidden bg-white p-4">
              <Image src="/image/微算产品架构图40829.png" alt="产品架构" width={600} height={400} className="w-full h-auto rounded-xl" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white p-4">
              <Image src="/image/微算产品图18.png" alt="产品实物" width={600} height={400} className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Scalability */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '可扩展路径' : 'Scaling Path'}</h2>
          <p className="mt-4 text-weisuan-gray max-w-2xl">
            {isZh ? '从单台微算到万台集群，线性扩展。如同一块砖扩展建造长城、10节车厢连接成高铁。' : 'Scale from one unit to ten thousand. Like building a wall brick by brick, or coupling train cars.'}
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black-10">
                  <th className="py-4 pr-4 font-semibold text-weisuan-black">{isZh ? '阶段' : 'Stage'}</th>
                  <th className="py-4 pr-4 font-semibold text-weisuan-black">{isZh ? '规模' : 'Scale'}</th>
                  <th className="py-4 pr-4 font-semibold text-weisuan-black">{isZh ? '算力' : 'Compute'}</th>
                  <th className="py-4 font-semibold text-weisuan-black">{isZh ? '投入' : 'Investment'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stage: isZh ? '单台微算' : 'Single Unit', scale: '1', compute: '1 PFLOPS', cost: isZh ? '9.8万元（免费赠送）' : '¥98K (free)' },
                  { stage: isZh ? '小型集群' : 'Small Cluster', scale: '5-10', compute: '40-80 PFLOPS', cost: '¥4-8M' },
                  { stage: isZh ? '中型集群' : 'Medium Cluster', scale: '50-100', compute: '400-800 PFLOPS', cost: '¥40-80M' },
                  { stage: isZh ? '大型集群' : 'Large Cluster', scale: '500-1000', compute: '4-8 EFLOPS', cost: '¥4-8亿' },
                  { stage: isZh ? '超大规模' : 'Mega Scale', scale: '5000-10000', compute: '40-80 EFLOPS', cost: '¥40-80亿' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black-10">
                    <td className="py-4 pr-4 font-medium">{row.stage}</td>
                    <td className="py-4 pr-4 text-weisuan-gray">{row.scale} {isZh ? '台' : 'units'}</td>
                    <td className="py-4 pr-4 text-weisuan-gray">{row.compute}</td>
                    <td className="py-4 text-weisuan-accent font-medium">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {isZh ? '融资租赁，月付2,000元起' : 'Leasing from ¥2,000/month'}
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-white-60 leading-relaxed">
            {isZh
              ? '无需一次性大额投入，即可享受本地化AI算力服务。数据不出域，48-72小时部署上线。三年TCO远低于传统自建与公有云方案。'
              : 'No upfront investment needed for local AI compute. Data stays local, deploy in 48-72 hours. 3-year TCO significantly lower than traditional or cloud solutions.'}
          </p>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-weisuan-black hover:bg-white-90 transition-all shadow-lg">
              {isZh ? '立即咨询' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
