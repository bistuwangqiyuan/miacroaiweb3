import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/certifications', {
    title: '资质认证',
    description: '微算获得华为昇腾+鲲鹏双认证、多项国家专利和行业认证，经过验证的技术实力与产品品质。',
    keywords: '华为昇腾认证,鲲鹏认证,国家专利,行业认证,算力认证',
  }, {
    title: 'Certifications',
    description: 'Weisuàn certified by Huawei Ascend+Kunpeng, with multiple national patents and industry certifications. Proven technology and product quality.',
    keywords: 'Huawei Ascend,Kunpeng certification,patents,industry certification',
  });
}

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '验证与资质' : 'Certifications'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '经过验证的实力' : 'Proven Performance'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white-60 leading-relaxed">
            {isZh
              ? '通过严格的对标测试与行业认证，微算的性能优势得到充分验证。已获华为昇腾+鲲鹏双认证，完成国内90%以上GPU适配。'
              : 'Rigorously benchmarked and certified. Huawei Ascend + Kunpeng dual-certified, with 90%+ domestic GPU compatibility.'}
          </p>
        </div>
      </section>

      {/* Benchmark Results */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">
            {isZh ? '华为对标测试（120万元同成本）' : 'Huawei Benchmark (Same ¥1.2M Cost)'}
          </h2>
          <p className="mt-4 text-weisuan-gray">
            {isZh ? '在相同成本条件下，微算架构与传统方案的全面对比：' : 'Comprehensive comparison between Weisuàn and traditional architecture at equivalent cost:'}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '-72%', labelZh: '数据加载时间', labelEn: 'Data load time' },
              { value: '+64%', labelZh: '吞吐量提升', labelEn: 'Throughput gain' },
              { value: '-64%', labelZh: '内存占用降低', labelEn: 'Memory usage' },
              { value: '30%+', labelZh: '三年TCO节省', labelEn: '3-year TCO savings' },
              { value: '-31%', labelZh: 'I/O负载优化', labelEn: 'I/O load optimization' },
              { value: '-16%', labelZh: '单次迭代训练', labelEn: 'Training iteration' },
              { value: '+20%', labelZh: 'SSD寿命延长', labelEn: 'SSD lifespan' },
            ].map((item, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white p-6 text-center">
                <p className="text-3xl font-bold text-weisuan-accent tracking-tight">{item.value}</p>
                <p className="mt-2 text-sm text-weisuan-gray">{isZh ? item.labelZh : item.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '落地案例' : 'Case Studies'}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { client: '北京信息科技大学', deploy: '72h', outcomeZh: '百人并发深度学习训练、85%利用率、学生竞赛获奖率提升30%', outcomeEn: '100+ concurrent deep learning, 85% utilization, student awards +30%' },
              { client: '华为算力中心', deploy: '48h', outcomeZh: '数据互通提升30%、模型加载缩短72%', outcomeEn: 'Data interop +30%, model loading -72%' },
              { client: '中国移动', deploy: '—', outcomeZh: '已签订100万元以上微算设备合同', outcomeEn: '¥1M+ contract signed' },
              { client: '亚信科技', deploy: '—', outcomeZh: '定制多套微算设备，用于行业解决方案', outcomeEn: 'Multiple custom industry solutions deployed' },
            ].map((c, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white p-6">
                <h3 className="text-lg font-semibold text-weisuan-black">{c.client}</h3>
                {c.deploy !== '—' && <p className="mt-1 text-xs font-medium text-weisuan-accent">{c.deploy} deployment</p>}
                <p className="mt-3 text-sm text-weisuan-gray leading-relaxed">{isZh ? c.outcomeZh : c.outcomeEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Application Results */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? 'AI应用效果' : 'AI Application Results'}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { titleZh: '医疗影像检测', titleEn: 'Medical Imaging', descZh: '落地周期从30天缩短至约25天', descEn: 'Deployment from 30 days to ~25 days' },
              { titleZh: '工业缺陷识别', titleEn: 'Industrial Defect Detection', descZh: '次品率减少3%', descEn: 'Defect rate reduced by 3%' },
              { titleZh: '生成式AI模型', titleEn: 'Generative AI', descZh: '每周可完成版本更新迭代', descEn: 'Weekly version iterations' },
              { titleZh: 'ViT图像模型', titleEn: 'ViT Image Model', descZh: '10万张高分辨率图像预训练仅需3.2小时', descEn: '100K hi-res image pre-training in 3.2 hours' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-black-10 p-6">
                <h3 className="font-semibold text-weisuan-black">{isZh ? item.titleZh : item.titleEn}</h3>
                <p className="mt-2 text-sm text-weisuan-gray">{isZh ? item.descZh : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications with Logos */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '资质认证' : 'Certifications'}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-black-10 p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/image/华为logo.png" alt="华为" width={80} height={32} className="object-contain h-8" />
              </div>
              <h3 className="font-semibold text-weisuan-black">{isZh ? '华为昇腾AI处理器' : 'Huawei Ascend AI'}</h3>
              <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '昇腾910B芯片完整兼容性验证通过' : 'Ascend 910B full compatibility certified'}</p>
            </div>
            <div className="rounded-2xl border border-black-10 p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/image/华为鲲鹏logo.png" alt="鲲鹏" width={80} height={32} className="object-contain h-8" />
              </div>
              <h3 className="font-semibold text-weisuan-black">{isZh ? '华为鲲鹏通用计算平台' : 'Huawei Kunpeng'}</h3>
              <p className="mt-2 text-sm text-weisuan-gray">{isZh ? 'Kunpeng 920处理器软硬件集成验证通过' : 'Kunpeng 920 integration certified'}</p>
            </div>
            <div className="rounded-2xl border border-black-10 p-6 bg-white">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-weisuan-light text-lg mb-4">✓</div>
              <h3 className="font-semibold text-weisuan-black">{isZh ? 'GPU广泛适配' : 'Broad GPU Support'}</h3>
              <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '完成寒武纪MLU370、英伟达A100等国内90%以上GPU适配' : 'Cambricon MLU370, NVIDIA A100, 90%+ domestic GPUs'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Award Images */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '荣誉与认可' : 'Awards & Recognition'}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/获奖174838213.jpg" alt="获奖" width={400} height={250} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/华为开发者大会讲座19.jpg" alt="华为开发者大会" width={400} height={250} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/中央电视台报道.png" alt="央视报道" width={400} height={250} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center">
            {isZh ? '降本对比' : 'Cost Comparison'}
          </h2>
          <p className="mt-4 text-center text-white-60 max-w-2xl mx-auto">
            {isZh ? '以1E算力为例，微算方案三年TCO约1.4-1.85亿元，传统方案约3.55-3.8亿元。' : 'For 1E compute, Weisuàn 3-year TCO is ~¥140-185M vs ~¥355-380M for traditional solutions.'}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="stat-card text-center">
              <p className="text-xs uppercase tracking-wider text-white-60">{isZh ? '传统方案' : 'Traditional'}</p>
              <p className="mt-4 text-3xl font-bold">3.55-3.8{isZh ? '亿元' : '00M'}</p>
              <p className="mt-2 text-sm text-white-60">{isZh ? '三年TCO' : '3-Year TCO'}</p>
            </div>
            <div className="stat-card text-center border-2 border-weisuan-accent">
              <p className="text-xs uppercase tracking-wider text-weisuan-accent">{isZh ? '微算方案' : 'Weisuàn'}</p>
              <p className="mt-4 text-3xl font-bold">1.4-1.85{isZh ? '亿元' : '00M'}</p>
              <p className="mt-2 text-sm text-white-60">{isZh ? '三年TCO · 节省58-62%' : '3-Year TCO · Save 58-62%'}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/cases/cost-comparison" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-weisuan-black transition-opacity hover:opacity-90">
              {isZh ? '查看完整降本案例' : 'View Full Cost Case'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
