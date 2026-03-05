import { setRequestLocale } from 'next-intl/server';

export default async function ProductBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const rows = isZh
    ? [
        ['计算能力', '2×通用CPU + 可选GPU加速卡'],
        ['存储容量', '4×3.84TB NVMe SSD'],
        ['网络', '25G/100G以太网接口'],
        ['算力输出', '可达8 PFLOPS（配置GPU加速卡时）'],
        ['适用场景', '小型AI推理、数据分析、教学实训'],
        ['参考价格', '约100万元（试点期免费赠送）'],
      ]
    : [
        ['Compute', '2× general CPU + optional GPU'],
        ['Storage', '4×3.84TB NVMe SSD'],
        ['Network', '25G/100G Ethernet'],
        ['Throughput', 'Up to 8 PFLOPS (with GPU)'],
        ['Use cases', 'Small AI inference, data analysis, training'],
        ['Price', '~¥1M (free during pilot)'],
      ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '微算-B 基础版' : 'Weisuàn-B Basic'}
      </h1>
      <p className="mt-2 text-weisuan-gray">
        {isZh ? '小型AI推理、数据分析、教学实训' : 'Small-scale AI inference, data analysis, training'}
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
