import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function WeisuanEPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <Link href="/product" className="text-sm text-white-60 hover:text-white mb-4 inline-block">← {isZh ? '返回产品' : 'Back to Products'}</Link>
              <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>{isZh ? '企业版' : 'Enterprise'}</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">微算-E</h1>
              <p className="mt-6 max-w-xl text-lg text-white-60 leading-relaxed">
                {isZh
                  ? '面向大规模模型训练、高性能计算的企业级算力中心。千卡级异构集群，PB级存储，可达50+ PFLOPS。定制方案。'
                  : 'Enterprise-grade compute center for large-scale model training and HPC. Thousand-card cluster, PB storage, 50+ PFLOPS. Custom solutions.'}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image src="/image/微算产品图3.png" alt="微算-E" width={400} height={300} className="rounded-2xl opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '硬件规格' : 'Specifications'}</h2>
              <div className="mt-8 space-y-0">
                {[
                  { label: isZh ? '计算能力' : 'Compute', value: isZh ? '多节点异构集群，千卡规模' : '1000+ Card Heterogeneous Cluster' },
                  { label: isZh ? '存储容量' : 'Storage', value: isZh ? 'PB级分布式存储池' : 'PB-scale Distributed Pool' },
                  { label: isZh ? '网络接口' : 'Network', value: '200G/400G High-speed' },
                  { label: isZh ? '算力输出' : 'Output', value: isZh ? '可达50 PFLOPS及以上' : '50+ PFLOPS' },
                  { label: isZh ? '部署周期' : 'Deployment', value: isZh ? '定制方案' : 'Custom' },
                  { label: isZh ? '扩展方式' : 'Scaling', value: isZh ? '线性扩展至万台' : 'Linear scaling to 10,000+' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-black-10 py-4">
                    <span className="text-sm text-weisuan-gray">{row.label}</span>
                    <span className="text-sm font-semibold text-weisuan-black">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '适用场景' : 'Use Cases'}</h2>
              <div className="mt-8 space-y-4">
                {[
                  { titleZh: '大规模模型训练', titleEn: 'Large-scale Model Training', descZh: '千亿参数大模型预训练与微调', descEn: 'Billion-parameter model pre-training and fine-tuning' },
                  { titleZh: '高性能计算', titleEn: 'HPC', descZh: '科学计算、仿真模拟、基因组分析', descEn: 'Scientific computing, simulation, genomics' },
                  { titleZh: '区域算力中心', titleEn: 'Regional Compute Center', descZh: '城市级/省级算力基础设施', descEn: 'City/provincial compute infrastructure' },
                  { titleZh: '多智能体协同', titleEn: 'Multi-agent Collaboration', descZh: '支持OpenClaw等智能体框架的本地化部署', descEn: 'Local deployment for agent frameworks like OpenClaw' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-weisuan-light">
                    <p className="text-sm font-semibold text-weisuan-black">{isZh ? item.titleZh : item.titleEn}</p>
                    <p className="mt-1 text-xs text-weisuan-gray">{isZh ? item.descZh : item.descEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '价格' : 'Pricing'}</h2>
          <div className="mt-8 card-hover rounded-2xl bg-white p-8 max-w-md">
            <p className="text-3xl font-bold text-weisuan-black">¥500<span className="text-lg font-normal text-weisuan-gray">{isZh ? '万元以上' : '万+'}</span></p>
            <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '定制方案，根据需求灵活配置' : 'Custom solution, flexibly configured to needs'}</p>
          </div>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-weisuan-black px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-all">
              {isZh ? '联系定制' : 'Contact for Custom Quote'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
