import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/about', {
    title: '关于我们',
    description: '微算团队由来自华为、百度等顶尖企业的技术专家组成，拥有完全自主知识产权的存算分离架构和EBOF全闪存储技术。',
    keywords: '微算团队,关于微算,技术团队,自主知识产权',
  }, {
    title: 'About Us',
    description: 'Weisuàn team comprises experts from Huawei, Baidu and other leading companies. Fully proprietary compute-storage disaggregation and EBOF technology.',
    keywords: 'about Weisuàn,team,proprietary technology',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const teamMembers = [
    { name: '孟坤', role: isZh ? '创始人/项目负责人' : 'Founder / Project Lead', desc: isZh ? '北京信息科技大学副教授，网络智能与物联网方向' : 'Associate Professor, BISTU' },
    { name: '杜思彬', role: isZh ? '首席算力架构官' : 'Chief Compute Architect', desc: isZh ? '算力架构设计与系统集成' : 'Compute Architecture & Integration' },
    { name: '韩济海', role: isZh ? '首席技术官' : 'CTO', desc: isZh ? '技术路线与资源调度' : 'Tech Strategy & Resource Scheduling' },
    { name: '杜睿钊', role: isZh ? '首席研发官' : 'Chief R&D Officer', desc: isZh ? '核心技术研发' : 'Core Technology R&D' },
    { name: '刘丛恺', role: isZh ? '首席研发工程师' : 'Lead R&D Engineer', desc: isZh ? '软件开发与系统优化' : 'Software Dev & Optimization' },
    { name: '王子昱', role: isZh ? '首席计算专家' : 'Chief Compute Expert', desc: isZh ? '硬件架构与算力配置' : 'Hardware Architecture' },
    { name: '李昊霖', role: isZh ? '首席运维官' : 'Chief Ops Officer', desc: isZh ? '平台运维与技术支持' : 'Platform Ops & Support' },
    { name: '孙琦', role: isZh ? '首席电力专家' : 'Chief Power Expert', desc: isZh ? '电力供应与能源管理' : 'Power & Energy Management' },
    { name: '钱孝东', role: isZh ? '首席商务官' : 'Chief Business Officer', desc: isZh ? '企业客户对接' : 'Enterprise Client Relations' },
    { name: '郝奕奇', role: isZh ? '首席市场官' : 'Chief Marketing Officer', desc: isZh ? '品牌建设与市场推广' : 'Brand & Marketing' },
    { name: '汪绍博', role: isZh ? '首席财务官' : 'CFO', desc: isZh ? '财务战略与资金管理' : 'Financial Strategy' },
  ];

  const advisors = [
    { name: isZh ? '何宝宏 研究员' : 'He Baohong', org: isZh ? '中国信通院' : 'CAICT', field: isZh ? '云计算与大数据' : 'Cloud Computing & Big Data' },
    { name: isZh ? '王启源 副教授' : 'Assoc. Prof. Wang Qiyuan', org: isZh ? '北京信息科技大学' : 'BISTU', field: isZh ? '人工智能与信息安全' : 'AI & Information Security' },
    { name: isZh ? '焦健 副教授' : 'Assoc. Prof. Jiao Jian', org: isZh ? '北京信息科技大学' : 'BISTU', field: isZh ? '网络空间安全' : 'Cyberspace Security' },
  ];

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '关于我们' : 'About Us'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '微算团队' : 'The Weisuàn Team'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white-60 leading-relaxed">
            {isZh
              ? '国内目前已知的唯一一家通过硬件加速全闪存储实现算力加速的团队。以北京信息科技大学技术研究力量为核心，致力于让每个企业拥有安全、高效、自主可控的算力中心。'
              : 'The only known team in China achieving compute acceleration via hardware-accelerated all-flash storage. Backed by BISTU research, we empower every enterprise with secure, self-controlled compute.'}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '使命' : 'Mission'}</h2>
              <p className="mt-4 text-weisuan-gray leading-relaxed">
                {isZh
                  ? '让数据不出域成为现实。通过"微算技术做支撑、亿元算力免费送"的核心理念，以共享经济模式将算力从重资产购买转变为轻量化共享，赋能企业、赋能个体，推动算力普惠化。'
                  : 'Making data sovereignty a reality. Through our "shared computing" model, we transform compute from heavy asset purchase to lightweight sharing, empowering enterprises and individuals.'}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '愿景' : 'Vision'}</h2>
              <p className="mt-4 text-weisuan-gray leading-relaxed">
                {isZh
                  ? '成为全国领先的共享算力基础设施运营商。让算力像水电一样成为每个企业和个人可及的基础服务，推动数据本地化、数据自有化与数据资产化。'
                  : 'To become China\'s leading shared compute infrastructure operator. Making AI compute as accessible as utilities, driving data localization and data asset-ification.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Photo & Awards */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black text-center">{isZh ? '团队风采' : 'Team Highlights'}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/团队照片.jpg" alt="团队照片" width={400} height={250} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/华为开发者大会作报告.png" alt="华为开发者大会" width={400} height={250} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/中央电视台报道.png" alt="央视报道" width={400} height={250} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/获奖图片19.png" alt="获奖" width={400} height={250} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/图获奖图1.png" alt="获奖" width={400} height={250} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <Image src="/image/孟坤讲座.jpg" alt="孟坤讲座" width={400} height={250} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Dynamics */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '团队动态' : 'Team Activities'}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: '/image/团队动态1.png', alt: '团队动态' },
              { src: '/image/团队动态2.png', alt: '团队动态' },
              { src: '/image/团队动态3.jpeg', alt: '团队动态' },
              { src: '/image/团队动态4.jpg', alt: '团队动态' },
            ].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-square">
                <Image src={img.src} alt={img.alt} width={300} height={300} className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '核心优势' : 'Core Strengths'}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { titleZh: '全自主知识产权', titleEn: 'Proprietary IP', descZh: '核心技术完全自主研发，存算分离+EBOF全闪存储两大技术原生融合', descEn: 'Fully self-developed. Native integration of compute-storage disaggregation and EBOF all-flash.' },
              { titleZh: '产学研深度融合', titleEn: 'Industry-Academia', descZh: '与北京大学、香港科技大学、华为、中国移动等深度合作', descEn: 'Deep partnerships with PKU, HKUST, Huawei, China Mobile.' },
              { titleZh: '48-72小时交付', titleEn: 'Rapid Deploy', descZh: '交钥匙交付，开箱即用，一键启动，不中断现有业务', descEn: 'Turnkey delivery, plug-and-play, one-click start, zero downtime.' },
              { titleZh: '数据不出域', titleEn: 'Data Sovereignty', descZh: '数据全部存放在您自己的设备中，无需上传云端，信息始终掌握在您手里', descEn: 'Your data stays in your devices. No cloud upload needed.' },
            ].map((item, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white p-8">
                <h3 className="text-lg font-semibold text-weisuan-black">{isZh ? item.titleZh : item.titleEn}</h3>
                <p className="mt-3 text-sm text-weisuan-gray leading-relaxed">{isZh ? item.descZh : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '核心团队' : 'Core Team'}</h2>
          <p className="mt-4 text-weisuan-gray">{isZh ? '由11位专业人才组成，覆盖技术研发、基础设施、市场商务三大方向。' : 'An 11-member team spanning R&D, infrastructure, and business development.'}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m, i) => (
              <div key={i} className="rounded-2xl border border-black-10 p-6 hover:border-weisuan-accent-30 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-weisuan-light text-lg font-bold text-weisuan-black mb-4">
                  {m.name[0]}
                </div>
                <h3 className="font-semibold text-weisuan-black">{m.name}</h3>
                <p className="text-sm font-medium text-weisuan-accent">{m.role}</p>
                <p className="mt-2 text-sm text-weisuan-gray">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Advisors */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '专家顾问' : 'Expert Advisors'}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {advisors.map((a, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white p-8">
                <h3 className="text-lg font-semibold text-weisuan-black">{a.name}</h3>
                <p className="text-sm font-medium text-weisuan-accent">{a.org}</p>
                <p className="mt-3 text-sm text-weisuan-gray">{a.field}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic & Industry Partners */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '合作伙伴' : 'Partners'}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-weisuan-black mb-4">{isZh ? '技术合作' : 'Technology Partners'}</h3>
              <div className="space-y-3">
                {[
                  { partner: isZh ? '华为' : 'Huawei', content: isZh ? '昇腾生态联合创新实验室，双认证' : 'Ascend Eco Lab, Dual Certification' },
                  { partner: isZh ? '寒武纪' : 'Cambricon', content: isZh ? 'MLU370全栈性能调优' : 'MLU370 Full-stack Optimization' },
                  { partner: 'NVIDIA', content: isZh ? 'A100平台RDMA传输优化' : 'A100 RDMA Optimization' },
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-weisuan-light">
                    <span className="text-sm font-semibold text-weisuan-black shrink-0 w-20">{p.partner}</span>
                    <span className="text-sm text-weisuan-gray">{p.content}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-weisuan-black mb-4">{isZh ? '学术合作' : 'Academic Partners'}</h3>
              <div className="space-y-3">
                {[
                  { partner: isZh ? '北京大学' : 'Peking University', content: isZh ? '分布式存储与数据协同优化' : 'Distributed Storage Optimization' },
                  { partner: isZh ? '香港科技大学' : 'HKUST', content: isZh ? 'ViT图像处理与多模态验证' : 'ViT Image & Multimodal Validation' },
                  { partner: isZh ? '北京信息科技大学' : 'BISTU', content: isZh ? '新一代AI算力实训平台共建' : 'Next-gen AI Training Platform' },
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-weisuan-light">
                    <span className="text-sm font-semibold text-weisuan-black shrink-0 w-28">{p.partner}</span>
                    <span className="text-sm text-weisuan-gray">{p.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '项目信息' : 'Project Info'}</h2>
          <div className="mt-8 max-w-xl">
            {[
              { labelZh: '项目名称', labelEn: 'Project', value: isZh ? '微算——数据不出域的可扩展微型算力中心' : 'Weisuàn — Scalable Edge Micro Compute Center' },
              { labelZh: '编制单位', labelEn: 'Team', value: isZh ? '微算团队' : 'Weisuàn Team' },
              { labelZh: '编制日期', labelEn: 'Date', value: isZh ? '2026年3月' : 'March 2026' },
              { labelZh: '版本', labelEn: 'Version', value: 'V2.0' },
              { labelZh: '项目口号', labelEn: 'Slogan', value: isZh ? '微算技术做支撑、亿元算力免费送，数据不出域更安全、算力就在您身边' : 'Weisuàn tech support, billion-yuan compute for free, data stays local for safety' },
            ].map((row, i) => (
              <div key={i} className="flex items-start border-b border-black-10 py-4">
                <span className="w-32 shrink-0 text-sm font-medium text-weisuan-gray">{isZh ? row.labelZh : row.labelEn}</span>
                <span className="text-sm text-weisuan-black">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
