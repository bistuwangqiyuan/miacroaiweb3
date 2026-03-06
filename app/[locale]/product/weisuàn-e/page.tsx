import { setRequestLocale } from 'next-intl/server';

export default async function ProductEPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const rows = isZh
    ? [
        ['计算能力', '多节点异构集群，支持千卡规模'],
        ['存储容量', 'PB级分布式存储池'],
        ['网络', '200G/400G高速互联'],
        ['算力输出', '可达50 PFLOPS及以上'],
        ['适用场景', '大规模模型训练、高性能计算'],
        ['参考价格', '500万元以上（定制方案）'],
      ]
    : [
        ['Compute', 'Multi-node heterogeneous cluster, kilo-card scale'],
        ['Storage', 'PB-scale distributed storage'],
        ['Network', '200G/400G interconnect'],
        ['Throughput', '50+ PFLOPS'],
        ['Use cases', 'Large-scale model training, HPC'],
        ['Price', '¥5M+ (custom)'],
      ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '微算-E 企业版' : 'Weisuàn-E Enterprise'}
      </h1>
      <p className="mt-2 text-weisuan-gray">
        {isZh ? '大规模模型训练、高性能计算' : 'Large-scale model training, HPC'}
      </p>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full max-w-2xl border-collapse text-left text-sm">
          <tbody>
            {rows.map(([label, value], i) => (
              <tr key={i} className="border-b border-black-10">
                <td className="py-3 pr-8 font-medium text-weisuan-gray">{label}</td>
                <td className="py-3 text-weisuan-black">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
