import { Link } from '@/i18n/navigation';
import { setRequestLocale } from 'next-intl/server';

export default async function ProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isZh = locale === 'zh';
  const products = [
    {
      id: 'weisuàn-b',
      nameZh: '微算-B 基础版',
      nameEn: 'Weisuàn-B Basic',
      descZh: '小型AI推理、数据分析、教学实训。约100万元（试点期免费赠送）',
      descEn: 'Small-scale AI inference, data analysis, training. ~¥1M (free during pilot)',
    },
    {
      id: 'weisuàn-p',
      nameZh: '微算-P 专业版',
      nameEn: 'Weisuàn-P Professional',
      descZh: '中型AI训练与推理、工业边缘计算。200-500万元',
      descEn: 'Mid-scale AI training & inference, industrial edge. ¥2-5M',
    },
    {
      id: 'weisuàn-e',
      nameZh: '微算-E 企业版',
      nameEn: 'Weisuàn-E Enterprise',
      descZh: '大规模模型训练、高性能计算。500万元以上（定制方案）',
      descEn: 'Large-scale model training, HPC. ¥5M+ (custom)',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '产品概览' : 'Products'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {isZh ? '开箱即用、一机运行、一键启动。从单台微算到万台规模，线性扩展。' : 'Turnkey, one-box operation, one-click start. Scale linearly from one unit to ten thousand.'}
      </p>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-black-10">
              <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '型号' : 'Model'}</th>
              <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '计算能力' : 'Compute'}</th>
              <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '存储' : 'Storage'}</th>
              <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '算力输出' : 'Throughput'}</th>
              <th className="py-3 pr-4 font-medium text-weisuan-black">{isZh ? '参考价格' : 'Price'}</th>
              <th className="py-3 font-medium text-weisuan-black"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black-10">
              <td className="py-4 pr-4">微算-B</td>
              <td className="py-4 pr-4">2×CPU + 可选GPU</td>
              <td className="py-4 pr-4">4×3.84TB NVMe SSD</td>
              <td className="py-4 pr-4">可达8 PFLOPS</td>
              <td className="py-4 pr-4">约100万元（试点期免费赠送）</td>
              <td className="py-4"><Link href="/product/weisuàn-b" className="text-weisuan-accent font-medium">{isZh ? '详情' : 'Details'}</Link></td>
            </tr>
            <tr className="border-b border-black-10">
              <td className="py-4 pr-4">微算-P</td>
              <td className="py-4 pr-4">多CPU+多GPU节点集群</td>
              <td className="py-4 pr-4">16×3.84TB NVMe SSD，EBOF全闪</td>
              <td className="py-4 pr-4">可达12 PFLOPS</td>
              <td className="py-4 pr-4">200-500万元</td>
              <td className="py-4"><Link href="/product/weisuàn-p" className="text-weisuan-accent font-medium">{isZh ? '详情' : 'Details'}</Link></td>
            </tr>
            <tr className="border-b border-black-10">
              <td className="py-4 pr-4">微算-E</td>
              <td className="py-4 pr-4">多节点异构集群，千卡规模</td>
              <td className="py-4 pr-4">PB级分布式存储池</td>
              <td className="py-4 pr-4">可达50+ PFLOPS</td>
              <td className="py-4 pr-4">500万元以上</td>
              <td className="py-4"><Link href="/product/weisuàn-e" className="text-weisuan-accent font-medium">{isZh ? '详情' : 'Details'}</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3 md:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.id}
            href={('/product/' + p.id) as '/'}
            className="rounded-xl border border-black-10 p-6 hover:border-weisuan-accent-30"
          >
            <h2 className="font-medium text-weisuan-black">{isZh ? p.nameZh : p.nameEn}</h2>
            <p className="mt-2 text-sm text-weisuan-gray">{isZh ? p.descZh : p.descEn}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
