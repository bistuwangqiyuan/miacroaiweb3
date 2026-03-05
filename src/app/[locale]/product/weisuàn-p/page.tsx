import { setRequestLocale } from 'next-intl/server';

export default async function ProductPPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const rows = isZh
    ? [
        ['计算能力', '多CPU+多GPU节点集群'],
        ['存储容量', '16×3.84TB NVMe SSD，EBOF全闪存储'],
        ['网络', '100G RDMA智能网卡，RoCEv2互联'],
        ['算力输出', '可达12 PFLOPS'],
        ['适用场景', '中型AI训练与推理、工业边缘计算'],
        ['参考价格', '200-500万元'],
      ]
    : [
        ['Compute', 'Multi-CPU + multi-GPU cluster'],
        ['Storage', '16×3.84TB NVMe SSD, EBOF all-flash'],
        ['Network', '100G RDMA, RoCEv2'],
        ['Throughput', 'Up to 12 PFLOPS'],
        ['Use cases', 'Mid-scale AI training & inference, industrial edge'],
        ['Price', '¥2-5M'],
      ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '微算-P 专业版' : 'Weisuàn-P Professional'}
      </h1>
      <p className="mt-2 text-weisuan-gray">
        {isZh ? '中型AI训练与推理、工业边缘计算' : 'Mid-scale AI training & inference, industrial edge'}
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
