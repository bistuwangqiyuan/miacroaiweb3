import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function WeisuanPPage({ params }: { params: Promise<{ locale: string }> }) {
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
              <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>{isZh ? '专业版' : 'Professional'}</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">微算-P</h1>
              <p className="mt-6 max-w-xl text-lg text-white-60 leading-relaxed">
                {isZh
                  ? '面向中型AI训练与推理、工业边缘计算的专业级算力中心。多节点集群，EBOF全闪存储，可达12 PFLOPS。'
                  : 'Professional-grade compute center for mid-scale AI training & inference, industrial edge computing. Multi-node cluster with EBOF, up to 12 PFLOPS.'}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image src="/image/微算产品图2.jpg" alt="微算-P" width={400} height={300} className="rounded-2xl opacity-90" />
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
                  { label: isZh ? '计算能力' : 'Compute', value: isZh ? '多CPU+多GPU节点集群' : 'Multi CPU+GPU Cluster' },
                  { label: isZh ? '存储容量' : 'Storage', value: '16×3.84TB NVMe SSD, EBOF' },
                  { label: isZh ? '网络接口' : 'Network', value: '100G RDMA, RoCEv2' },
                  { label: isZh ? '算力输出' : 'Output', value: isZh ? '可达12 PFLOPS' : 'Up to 12 PFLOPS' },
                  { label: isZh ? '部署周期' : 'Deployment', value: '48-72h' },
                  { label: isZh ? '扩展方式' : 'Scaling', value: isZh ? '热插拔，不中断业务' : 'Hot-swap, zero downtime' },
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
                  { titleZh: '中型AI训练', titleEn: 'Mid-scale AI Training', descZh: '企业级大模型微调与训练，支持多卡并行', descEn: 'Enterprise model fine-tuning, multi-GPU parallel' },
                  { titleZh: '工业边缘计算', titleEn: 'Industrial Edge', descZh: 'AI视觉质检、预测性维护、数字孪生', descEn: 'AI visual inspection, predictive maintenance, digital twin' },
                  { titleZh: '自动驾驶训练', titleEn: 'Autonomous Driving', descZh: '感知算法训练与推理，数据不出域', descEn: 'Perception algorithm training, data stays local' },
                  { titleZh: '医疗影像分析', titleEn: 'Medical Imaging', descZh: 'CT/MRI影像AI诊断，患者数据完全不出院', descEn: 'CT/MRI AI diagnosis, zero patient data leaving hospital' },
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
            <p className="text-3xl font-bold text-weisuan-black">¥200-500<span className="text-lg font-normal text-weisuan-gray">{isZh ? '万元' : '万'}</span></p>
            <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '根据配置定制，含部署与培训' : 'Customized by configuration, includes deployment & training'}</p>
          </div>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-weisuan-black px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-all">
              {isZh ? '获取报价' : 'Get a Quote'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
