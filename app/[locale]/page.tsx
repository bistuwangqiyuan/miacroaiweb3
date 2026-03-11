import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="hero-gradient-orb" style={{ width: '600px', height: '600px', top: '-200px', right: '-100px', background: '#0071e3' }} />
        <div className="hero-gradient-orb" style={{ width: '400px', height: '400px', bottom: '-100px', left: '-50px', background: '#5e5ce6', animationDelay: '3s' }} />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-40 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="animate-fade-in">
              <p className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ background: 'rgba(255,255,255,0.4)' }} />
                Weisuàn / 微算
              </p>
              <h1 className="mt-6 text-4xl font-bold tracking-tighter leading-tight sm:text-5xl md:text-7xl animate-fade-in-up">
                {t('slogan')}
              </h1>
              <p className="mt-6 max-w-xl text-base text-white-60 leading-relaxed animate-fade-in-up delay-200">
                {t('tagline')}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in-up delay-300">
                <Link
                  href="/product"
                  className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-weisuan-black hover:bg-white-90 transition-all shadow-lg"
                >
                  {t('cta')}
                  <svg className="ml-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link
                  href="/technology"
                  className="inline-flex items-center rounded-full border border-white-20 px-8 py-3.5 text-sm font-medium text-white hover:bg-white-10 transition-all"
                >
                  {t('ctaSecondary')}
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image
                src="/image/算力中心图4.png"
                alt="微算算力中心"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-weisuan-black py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { value: '50+', unit: t('stat1'), label: t('stat1Label') },
              { value: '60', unit: t('stat2'), label: t('stat2Label') },
              { value: '40', unit: t('stat3'), label: t('stat3Label') },
              { value: '4', unit: t('stat4'), label: t('stat4Label') },
            ].map((stat, i) => (
              <div key={i} className="stat-card animate-fade-in-up">
                <p className="text-4xl font-bold text-white tracking-tight">
                  {stat.value}<span className="text-lg font-normal text-white-60 ml-1">{stat.unit}</span>
                </p>
                <p className="mt-2 text-sm text-white-60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Value: Data Sovereignty */}
      <section className="py-20 bg-gradient-to-b from-white to-weisuan-light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="section-label">{t('whyTitle')}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">{t('whyTitle')}</h2>
              <p className="mt-6 text-weisuan-gray leading-relaxed">
                {t.raw('why1Desc')}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: '🔒', title: t('why1Title'), desc: t('why1Desc') },
                  { icon: '⚡', title: t('why2Title'), desc: t('why2Desc') },
                  { icon: '📐', title: t('why3Title'), desc: t('why3Desc') },
                  { icon: '🛡️', title: t('why4Title'), desc: t('why4Desc') },
                ].map((item, i) => (
                  <div key={i} className="card-hover rounded-2xl p-6 bg-white">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-weisuan-light text-xl mb-4">{item.icon}</div>
                    <h3 className="text-base font-semibold text-weisuan-black">{item.title}</h3>
                    <p className="mt-2 text-sm text-weisuan-gray leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/image/微算技术架构图7.png"
                alt="微算技术架构"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label">{t('productEntry')}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">{t('productEntry')}</h2>
          <p className="mt-4 max-w-2xl text-weisuan-gray leading-relaxed">{t('productDesc')}</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { href: '/product', name: '微算-B', sub: 'Basic', spec: '1 PFLOPS', price: '~¥9.8万', img: '/image/微算产品图1.jpg' },
              { href: '/product', name: '微算-P', sub: 'Professional', spec: '12 PFLOPS', price: '¥200-500万', img: '/image/微算产品图2.jpg' },
              { href: '/product', name: '微算-E', sub: 'Enterprise', spec: '50+ PFLOPS', price: '¥500万+', img: '/image/微算产品图3.png' },
            ].map((p) => (
              <Link
                key={p.name}
                href={p.href as '/'}
                className="group card-hover rounded-2xl bg-white p-8 flex flex-col"
              >
                <div className="flex items-center justify-center w-full h-40 rounded-xl bg-weisuan-light mb-6 overflow-hidden">
                  <Image src={p.img} alt={p.name} width={280} height={160} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-weisuan-black">{p.name}</h3>
                <p className="text-sm text-weisuan-gray">{p.sub}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-weisuan-accent">{p.spec}</span>
                  <span className="text-sm text-weisuan-gray">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="section-label">{t('techTitle')}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">{t('techTitle')}</h2>
              <p className="mt-6 text-weisuan-gray leading-relaxed">{t('techDesc')}</p>
              <div className="mt-8 space-y-4">
                {[
                  { label: 'IOPS', value: '≥ 1,000,000' },
                  { label: 'Bandwidth', value: '≥ 56 GB/s' },
                  { label: 'Latency', value: '≤ 100μs' },
                  { label: 'Reliability', value: '99.9999%' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-black-10 py-3">
                    <span className="text-sm text-weisuan-gray">{item.label}</span>
                    <span className="text-sm font-semibold text-weisuan-black">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/technology"
                  className="inline-flex items-center text-sm font-medium text-weisuan-accent hover:underline"
                >
                  {t('learnTech')}
                  <svg className="ml-1" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/image/微算技术架构图1.png"
                alt="存算分离架构"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Business Model Highlight */}
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)', justifyContent: 'center' }}>
              {t.raw('businessModelTitle') || '共享微算'}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              {t.raw('businessModelHeadline') || '微算技术做支撑、亿元算力免费送'}
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-white-60 leading-relaxed">
              {t.raw('businessModelDesc') || '数据不出域更安全、算力就在您身边。零加盟费成为事业合伙人，免费获得100套微算设备。'}
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '0', unit: '元', label: '加盟费', labelEn: 'Franchise Fee' },
              { value: '100', unit: '套', label: '免费微算设备', labelEn: 'Free Units' },
              { value: '500', unit: '万', label: '设备价值', labelEn: 'Equipment Value' },
              { value: '2000', unit: '元/月', label: '融资租赁起步', labelEn: 'Leasing from' },
            ].map((item, i) => (
              <div key={i} className="stat-card text-center">
                <p className="text-3xl font-bold text-white tracking-tight">
                  {item.value}<span className="text-sm font-normal text-white-60 ml-1">{item.unit}</span>
                </p>
                <p className="mt-2 text-sm text-white-60">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-weisuan-black hover:bg-white-90 transition-all shadow-lg">
              {t.raw('becomePartner') || '成为合伙人'}
              <svg className="ml-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Data Center Gallery */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label" style={{ justifyContent: 'center' }}>
              {t.raw('galleryLabel') || '算力中心'}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">
              {t.raw('galleryTitle') || '从单台微算到万台规模'}
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: '/image/算力中心图2.png', alt: '算力中心' },
              { src: '/image/算力中心图42.png', alt: '算力中心设备' },
              { src: '/image/算力中心图43.png', alt: '算力中心机房' },
              { src: '/image/算力中心图44.png', alt: '微算集群' },
              { src: '/image/算力中心照片3.jpg', alt: '算力中心实景' },
              { src: '/image/算力中心图17.png', alt: '算力中心架构' },
            ].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-weisuan-light aspect-video">
                <Image src={img.src} alt={img.alt} width={400} height={250} className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label">{t('caseSummary')}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">{t('caseSummary')}</h2>
          <p className="mt-4 max-w-2xl text-weisuan-gray leading-relaxed">{t('caseDesc')}</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🎓', client: '北京信息科技大学', deploy: '72h', outcome: '百人并发AI实训，设备利用率85%，竞赛获奖率+30%' },
              { icon: '🏢', client: '华为算力中心', deploy: '48h', outcome: '数据互通+30%，模型加载缩短72%，昇腾+鲲鹏双认证' },
              { icon: '📡', client: '中国移动', deploy: '—', outcome: '央企客户标杆，已签订100万+微算设备合同' },
              { icon: '🔧', client: '亚信科技', deploy: '—', outcome: 'OEM集成合作，定制多套微算行业解决方案' },
              { icon: '🏥', client: '某三甲医院', deploy: '48h', outcome: '医学影像AI辅助诊断，阅片效率+40%，数据零出院' },
              { icon: '🏭', client: '某汽车零部件企业', deploy: '72h', outcome: 'AI视觉质检，缺陷检出率99.2%，年省180万退货损失' },
              { icon: '🏦', client: '某城市商业银行', deploy: '1周', outcome: 'AI反欺诈+风控，月成本仅4千元，满足金融合规要求' },
              { icon: '⚡', client: '某新能源电力集团', deploy: '48h', outcome: '风电预测性维护，故障提前72h预警，停机减少45%' },
            ].map((c, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white p-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.icon}</span>
                  <p className="text-lg font-semibold text-weisuan-black">{c.client}</p>
                </div>
                {c.deploy !== '—' && (
                  <p className="mt-2 text-xs font-medium text-weisuan-accent">{c.deploy} deployment</p>
                )}
                <p className="mt-3 text-sm text-weisuan-gray leading-relaxed">{c.outcome}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/cases" className="inline-flex items-center rounded-full border border-black-10 px-6 py-3 text-sm font-semibold text-weisuan-black transition-colors hover:border-weisuan-accent-30 hover:text-weisuan-accent">
              {t('viewAllCases')} →
            </a>
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label" style={{ justifyContent: 'center' }}>
              {t.raw('industryLabel') || '行业应用'}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">
              {t.raw('industryTitle') || '覆盖多个行业的算力赋能'}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🏭', title: '智能制造', titleEn: 'Smart Manufacturing', desc: 'AI视觉质检、预测性维护、数字孪生' },
              { icon: '🏥', title: '医疗健康', titleEn: 'Healthcare', desc: '影像AI诊断、药物研发、基因组分析' },
              { icon: '🚗', title: '汽车产业', titleEn: 'Automotive', desc: '智能网联、自动驾驶、电池监测' },
              { icon: '🏦', title: '金融行业', titleEn: 'Finance', desc: '智能风控、反欺诈检测、合规审计' },
            ].map((item, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white p-8">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-weisuan-black">{item.title}</h3>
                <p className="mt-3 text-sm text-weisuan-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="section-label" style={{ justifyContent: 'center' }}>{t('partnerTitle')}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">{t('partnerTitle')}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-weisuan-gray leading-relaxed">{t('partnerDesc')}</p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
            <div className="flex items-center justify-center rounded-2xl border border-black-10 px-6 py-4 bg-white hover:border-weisuan-accent-30 transition-colors">
              <Image src="/image/华为logo.png" alt="华为 Huawei" width={100} height={40} className="object-contain h-10" />
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-black-10 px-6 py-4 bg-white hover:border-weisuan-accent-30 transition-colors">
              <Image src="/image/华为鲲鹏logo.png" alt="华为鲲鹏" width={100} height={40} className="object-contain h-10" />
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-black-10 px-6 py-4 bg-white hover:border-weisuan-accent-30 transition-colors">
              <Image src="/image/北京大学logo.jpg" alt="北京大学" width={100} height={40} className="object-contain h-10" />
            </div>
            {['寒武纪 Cambricon', 'NVIDIA', '中国移动', '亚信科技'].map((name, i) => (
              <div key={i} className="flex items-center justify-center rounded-2xl border border-black-10 px-6 py-4 text-sm font-medium text-weisuan-gray hover:border-weisuan-accent-30 transition-colors bg-white">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-weisuan-black sm:text-5xl">
            {t.raw('ctaFinalTitle') || '开启您的AI算力之旅'}
          </h2>
          <p className="mt-6 text-weisuan-gray leading-relaxed max-w-2xl mx-auto">
            {t.raw('ctaFinalDesc') || '融资租赁仅需2,000元/月，48-72小时快速部署，数据不出域。联系我们了解更多。'}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-weisuan-black px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-all">
              {t.raw('contactUs') || '联系我们'}
            </Link>
            <Link href="/product" className="inline-flex items-center rounded-full border border-black-10 px-8 py-3.5 text-sm font-medium text-weisuan-black hover:bg-black-5 transition-all">
              {t.raw('viewProducts') || '查看产品'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
