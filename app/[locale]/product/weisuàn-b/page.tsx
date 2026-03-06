import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function WeisuanBPage({ params }: { params: Promise<{ locale: string }> }) {
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
              <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {isZh ? '基础版' : 'Basic'}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">微算-B</h1>
              <p className="mt-6 max-w-xl text-lg text-white-60 leading-relaxed">
                {isZh
                  ? '小型AI推理、数据分析、教学实训的理想选择。开箱即用，48-72小时快速部署。试点期免费赠送，融资租赁仅需2,000元/月。'
                  : 'Ideal for small-scale AI inference, data analysis, and training. Turnkey, 48-72h deployment. Free during pilot, leasing from ¥2,000/month.'}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image src="/image/微算产品图1.jpg" alt="微算-B" width={400} height={300} className="rounded-2xl opacity-90" />
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
                  { label: isZh ? '计算能力' : 'Compute', value: isZh ? '1×通用CPU + 可选GPU加速卡' : '1×CPU + Optional GPU Accelerator' },
                  { label: isZh ? '存储容量' : 'Storage', value: '4TB NVMe SSD' },
                  { label: isZh ? '网络接口' : 'Network', value: '25G/100G Ethernet' },
                  { label: isZh ? '算力输出' : 'Output', value: isZh ? '可达1 PFLOPS（配置GPU时）' : 'Up to 1 PFLOPS (with GPU)' },
                  { label: isZh ? '部署周期' : 'Deployment', value: '48-72h' },
                  { label: isZh ? '操作方式' : 'Operation', value: isZh ? '开箱即用，一键启动' : 'Plug-and-play, one-click start' },
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
                  { titleZh: '小型AI推理', titleEn: 'Small-scale AI Inference', descZh: '部署DeepSeek等开源大模型进行本地推理，数据不出域', descEn: 'Deploy open-source models like DeepSeek for local inference' },
                  { titleZh: '数据分析', titleEn: 'Data Analysis', descZh: '企业数据本地化分析处理，保障数据安全', descEn: 'Local enterprise data analysis with full data security' },
                  { titleZh: '教学实训', titleEn: 'Educational Training', descZh: 'AI课程实训平台，支持百人并发', descEn: 'AI course training platform, 100+ concurrent users' },
                  { titleZh: 'AI应用试点', titleEn: 'AI Pilot', descZh: '企业AI转型零成本试点验证', descEn: 'Zero-cost enterprise AI transformation pilot' },
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
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '价格方案' : 'Pricing'}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="card-hover rounded-2xl bg-white p-8">
              <p className="text-xs uppercase tracking-wider text-weisuan-accent font-medium">{isZh ? '试点期' : 'Pilot'}</p>
              <p className="mt-4 text-3xl font-bold text-weisuan-black">{isZh ? '免费赠送' : 'Free'}</p>
              <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '合伙人免费获得100套，企业零成本试点' : '100 free units for partners, zero-cost enterprise pilot'}</p>
            </div>
            <div className="card-hover rounded-2xl bg-white p-8">
              <p className="text-xs uppercase tracking-wider text-weisuan-accent font-medium">{isZh ? '融资租赁' : 'Leasing'}</p>
              <p className="mt-4 text-3xl font-bold text-weisuan-black">¥2,000<span className="text-lg font-normal text-weisuan-gray">/{isZh ? '月' : 'mo'}</span></p>
              <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '含算力服务、运维支持和技术升级' : 'Includes compute service, support, and tech upgrades'}</p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-weisuan-black px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-all">
              {isZh ? '立即咨询' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
