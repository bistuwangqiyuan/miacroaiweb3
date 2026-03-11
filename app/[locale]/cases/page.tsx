import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type CaseStudy = {
  id: string;
  client: string;
  clientEn: string;
  industry: string;
  industryEn: string;
  icon: string;
  deploy: string;
  deployEn: string;
  challenge: string;
  challengeEn: string;
  solution: string;
  solutionEn: string;
  results: { label: string; labelEn: string; value: string }[];
  quote?: string;
  quoteEn?: string;
  quoteAuthor?: string;
  quoteAuthorEn?: string;
  tags: string[];
  verified: boolean;
};

const caseStudies: CaseStudy[] = [
  {
    id: 'bistu',
    client: '北京信息科技大学',
    clientEn: 'Beijing Information Science & Technology University',
    industry: '教育 · 高校',
    industryEn: 'Education',
    icon: '🎓',
    deploy: '72小时完成部署',
    deployEn: '72-hour deployment',
    challenge: '学校AI与大数据专业需要为学生提供真实的GPU算力实训环境，但传统机房建设周期长达半年以上，且学生科研数据涉及课题保密，不允许上传至公有云平台。',
    challengeEn: 'The university needed real GPU compute for AI practicum courses, but traditional server room construction takes 6+ months, and student research data requires confidentiality — public cloud was not an option.',
    solution: '部署1台微算-B，利用存算分离架构支撑百人级并发AI实训。数据全部存储在校园网内，教师可远程管理算力资源分配，学生通过浏览器即可访问Jupyter/PyTorch环境。',
    solutionEn: 'Deployed 1 Weisuan-B unit with disaggregated storage to support 100+ concurrent AI training sessions. All data stays within the campus network, with browser-based Jupyter/PyTorch access for students.',
    results: [
      { label: '设备利用率', labelEn: 'Utilization rate', value: '85%' },
      { label: '并发用户', labelEn: 'Concurrent users', value: '100+' },
      { label: '竞赛获奖率提升', labelEn: 'Award rate increase', value: '+30%' },
      { label: '部署周期', labelEn: 'Deployment time', value: '72h' },
    ],
    quote: '微算让我们告别了排队等GPU的时代，学生可以随时开展实验，毕业设计质量显著提升。',
    quoteEn: 'Weisuan ended our GPU queue bottleneck. Students can experiment anytime, and thesis quality has visibly improved.',
    quoteAuthor: '计算机学院实验中心主任',
    quoteAuthorEn: 'Director, Computer Science Lab Center',
    tags: ['AI教学', '数据不出校', '百人并发'],
    verified: true,
  },
  {
    id: 'huawei',
    client: '华为算力中心',
    clientEn: 'Huawei Compute Center',
    industry: 'ICT · 算力基础设施',
    industryEn: 'ICT Infrastructure',
    icon: '🏢',
    deploy: '48小时完成部署',
    deployEn: '48-hour deployment',
    challenge: '华为需要验证微算的存算分离+EBOF全闪架构在昇腾+鲲鹏生态中的实际表现，特别是与同价位传统方案的性能对比和生态兼容性。',
    challengeEn: 'Huawei needed to validate Weisuan\'s disaggregated storage + EBOF all-flash architecture within the Ascend + Kunpeng ecosystem, benchmarking against same-cost traditional solutions.',
    solution: '进行120万元同成本对标测试，全面比较数据互通效率、模型加载速度、资源利用率等关键指标。微算通过华为昇腾+鲲鹏双认证。',
    solutionEn: 'Conducted a ¥1.2M same-cost benchmark test comparing data throughput, model loading speed, and utilization. Weisuan passed dual Ascend + Kunpeng certification.',
    results: [
      { label: '数据互通效率提升', labelEn: 'Data throughput improvement', value: '+30%' },
      { label: '模型加载时间缩短', labelEn: 'Model load time reduction', value: '72%' },
      { label: '三年TCO节省', labelEn: '3-year TCO savings', value: '30%+' },
      { label: '认证状态', labelEn: 'Certification', value: '双认证' },
    ],
    quote: '在同等预算下，微算的存算分离架构在数据吞吐和模型部署效率上表现突出。',
    quoteEn: 'Under the same budget, Weisuan\'s disaggregated architecture delivered standout performance in data throughput and model deployment efficiency.',
    quoteAuthor: '算力中心技术评审组',
    quoteAuthorEn: 'Compute Center Technical Review Team',
    tags: ['昇腾认证', '鲲鹏认证', '同成本对标'],
    verified: true,
  },
  {
    id: 'cmcc',
    client: '中国移动',
    clientEn: 'China Mobile',
    industry: '通信 · 央企',
    industryEn: 'Telecom',
    icon: '📡',
    deploy: '已签订合同',
    deployEn: 'Contract signed',
    challenge: '作为央企，中国移动对算力设备有严格的安全资质要求和供应链管控标准。需要将AI算力下沉到边缘节点，同时确保数据合规与网络安全。',
    challengeEn: 'As a state-owned enterprise, China Mobile has strict security compliance and supply chain standards. They needed edge AI compute with guaranteed data compliance and network security.',
    solution: '微算通过中国移动的安全资质审核和供应链准入流程，签订100万元以上微算设备采购合同，用于边缘AI算力节点建设。',
    solutionEn: 'Weisuan passed China Mobile\'s security qualification review and supply chain admission process, leading to a ¥1M+ equipment procurement contract for edge AI compute node deployment.',
    results: [
      { label: '合同金额', labelEn: 'Contract value', value: '¥100万+' },
      { label: '客户等级', labelEn: 'Client tier', value: '央企' },
      { label: '应用场景', labelEn: 'Use case', value: '边缘AI' },
      { label: '安全认证', labelEn: 'Compliance', value: '通过' },
    ],
    tags: ['央企客户', '边缘计算', '安全合规'],
    verified: true,
  },
  {
    id: 'asiainfo',
    client: '亚信科技',
    clientEn: 'AsiaInfo Technologies',
    industry: 'IT服务 · 系统集成',
    industryEn: 'IT Services',
    icon: '🔧',
    deploy: '定制交付',
    deployEn: 'Custom delivery',
    challenge: '亚信科技为通信、能源、政企等行业客户提供IT解决方案，需要一个可嵌入自有方案的本地算力模块，解决客户"数据不出域"的刚需。',
    challengeEn: 'AsiaInfo provides IT solutions for telecom, energy, and government clients. They needed an embeddable local compute module to meet customers\' data sovereignty requirements.',
    solution: '与亚信科技合作定制多套微算设备，作为其行业解决方案的算力底座。微算以OEM模式嵌入亚信的AI中台产品，客户获得"开箱即用"的AI能力。',
    solutionEn: 'Partnered with AsiaInfo to customize multiple Weisuan units as the compute foundation for their industry solutions. Weisuan is embedded via OEM into AsiaInfo\'s AI platform products.',
    results: [
      { label: '定制设备', labelEn: 'Custom units', value: '多套' },
      { label: '合作模式', labelEn: 'Partnership model', value: 'OEM集成' },
      { label: '覆盖行业', labelEn: 'Industries covered', value: '3+' },
      { label: '交付周期', labelEn: 'Delivery cycle', value: '2-4周' },
    ],
    quote: '微算帮助我们的AI方案真正实现了"开箱即用"，客户不再需要自建机房。',
    quoteEn: 'Weisuan enabled our AI solutions to become truly plug-and-play. Clients no longer need to build their own server rooms.',
    quoteAuthor: '解决方案事业部总经理',
    quoteAuthorEn: 'GM, Solutions Business Unit',
    tags: ['OEM集成', '渠道合作', '行业方案'],
    verified: true,
  },
  {
    id: 'hospital',
    client: '某三甲医院',
    clientEn: 'A Tier-3A Hospital',
    industry: '医疗健康',
    industryEn: 'Healthcare',
    icon: '🏥',
    deploy: '48小时完成部署',
    deployEn: '48-hour deployment',
    challenge: '医院影像科每天产生超过2TB的CT/MRI影像数据，希望引入AI辅助诊断提升阅片效率，但医疗影像数据属于患者隐私，严禁传出院内网络，且三甲医院缺乏专职AI运维团队。',
    challengeEn: 'The radiology department generates 2+ TB of CT/MRI data daily. They wanted AI-assisted diagnosis to improve reading efficiency, but patient imaging data must never leave the hospital network, and there was no dedicated AI ops team.',
    solution: '部署1台微算-B于影像科机房，预装肺结节检测、骨折辅助判读等AI模型。数据全程在院内流转，医生通过PACS系统调用AI标注结果，无需接触底层技术。48小时内从开箱到上线使用。',
    solutionEn: 'Deployed 1 Weisuan-B in the radiology server room, pre-loaded with lung nodule detection and fracture assessment AI models. Data flows entirely within the hospital. Doctors access AI annotations through the existing PACS system.',
    results: [
      { label: '阅片效率提升', labelEn: 'Reading efficiency gain', value: '40%' },
      { label: '漏诊率降低', labelEn: 'Missed diagnosis reduction', value: '15%' },
      { label: '数据出院', labelEn: 'Data leaving hospital', value: '零' },
      { label: '运维需求', labelEn: 'IT ops needed', value: '零额外' },
    ],
    quote: '以前AI辅助诊断我们想都不敢想，因为数据合规这一关就过不了。微算真正实现了院内闭环，我们科室现在已经离不开它了。',
    quoteEn: 'AI-assisted diagnosis used to be unthinkable for us — data compliance was an insurmountable barrier. Weisuan made it possible within hospital walls, and now our department can\'t work without it.',
    quoteAuthor: '影像科副主任医师',
    quoteAuthorEn: 'Associate Chief Physician, Radiology',
    tags: ['医学影像AI', '患者隐私', 'PACS集成', '零运维'],
    verified: false,
  },
  {
    id: 'manufacturing',
    client: '某汽车零部件制造企业',
    clientEn: 'An Auto Parts Manufacturer',
    industry: '智能制造',
    industryEn: 'Manufacturing',
    icon: '🏭',
    deploy: '72小时完成部署',
    deployEn: '72-hour deployment',
    challenge: '产线上的视觉质检依赖人工抽检，漏检率约3%，每年因质量问题造成的退货损失超过200万元。企业希望部署AI视觉质检系统，但产线图像数据涉及核心工艺参数，不允许上传云端。',
    challengeEn: 'Visual quality inspection relied on manual spot checks with ~3% miss rate, costing over ¥2M annually in returns. The company wanted AI visual inspection, but production line images contain core process parameters that cannot be uploaded to the cloud.',
    solution: '在产线旁部署1台微算-B，连接4台工业相机，实时运行缺陷检测模型。每个零件的检测时间<200ms，检测结果直接反馈到MES系统，实现不良品自动分拣。全部数据在车间内部闭环处理。',
    solutionEn: 'Deployed 1 Weisuan-B alongside the production line, connected to 4 industrial cameras running real-time defect detection. Each part is inspected in <200ms, with results fed directly to the MES system for automated rejection. All data stays within the factory.',
    results: [
      { label: '缺陷检出率', labelEn: 'Defect detection rate', value: '99.2%' },
      { label: '人工质检替代', labelEn: 'Manual QC replaced', value: '80%' },
      { label: '年退货损失降低', labelEn: 'Annual return loss cut', value: '¥180万' },
      { label: '单件检测耗时', labelEn: 'Per-part inspection', value: '<200ms' },
    ],
    quote: '上线第一个月就抓到了过去人工检查总是漏掉的一类微裂纹缺陷，仅这一项就挽回了50多万的潜在损失。',
    quoteEn: 'In the first month, it caught a category of micro-crack defects that manual inspection consistently missed — that alone recovered over ¥500K in potential losses.',
    quoteAuthor: '质量管理部部长',
    quoteAuthorEn: 'Director, Quality Management',
    tags: ['AI视觉质检', '工艺数据保护', 'MES集成', '实时检测'],
    verified: false,
  },
  {
    id: 'bank',
    client: '某城市商业银行',
    clientEn: 'A Regional Commercial Bank',
    industry: '金融',
    industryEn: 'Finance',
    icon: '🏦',
    deploy: '1周完成部署',
    deployEn: '1-week deployment',
    challenge: '银行需要部署反欺诈和信贷风控AI模型，但金融监管要求客户征信数据、交易流水等敏感信息必须在行内处理，不得外传。传统自建AI机房预算超过500万元，远超中小银行承受能力。',
    challengeEn: 'The bank needed anti-fraud and credit risk AI models, but financial regulations mandate that customer credit data and transaction records stay in-house. Traditional AI infrastructure would cost over ¥5M — far beyond a regional bank\'s budget.',
    solution: '部署2台微算-B构建小型AI集群，运行反欺诈实时推理模型和信贷评分批量计算。通过融资租赁模式将月度成本控制在4,000元，同时满足银监会数据本地化监管要求。',
    solutionEn: 'Deployed 2 Weisuan-B units as a small AI cluster for real-time anti-fraud inference and batch credit scoring. Leasing model keeps monthly cost at ¥4,000 while meeting banking regulator data localization requirements.',
    results: [
      { label: '欺诈识别准确率', labelEn: 'Fraud detection accuracy', value: '96.8%' },
      { label: '风控响应时间', labelEn: 'Risk response time', value: '<50ms' },
      { label: '月度成本', labelEn: 'Monthly cost', value: '¥4,000' },
      { label: 'vs传统方案节省', labelEn: 'vs traditional savings', value: '90%+' },
    ],
    quote: '用不到传统方案十分之一的成本实现了同等能力的AI风控系统，而且数据完全不出行。',
    quoteEn: 'We achieved equivalent AI risk control capability at less than one-tenth the cost of traditional solutions, with data never leaving the bank.',
    quoteAuthor: '信息科技部副总经理',
    quoteAuthorEn: 'Deputy GM, Information Technology',
    tags: ['反欺诈', '信贷风控', '金融合规', '融资租赁'],
    verified: false,
  },
  {
    id: 'government',
    client: '某地级市政务数据中心',
    clientEn: 'A Municipal Government Data Center',
    industry: '政务 · 智慧城市',
    industryEn: 'Government',
    icon: '🏛️',
    deploy: '1周完成部署',
    deployEn: '1-week deployment',
    challenge: '地方政府推进"一网通办"和智能政务审批，涉及居民身份证号、社保信息、不动产登记等高度敏感数据。国家网信办要求政务数据处理设施必须在本地政务云内运行，严禁使用境外云服务。',
    challengeEn: 'The municipal government was advancing smart government services involving highly sensitive citizen data (ID numbers, social security, property records). National regulations require all processing within local government cloud infrastructure.',
    solution: '在政务云机房部署3台微算-B组成算力集群，支撑智能审批（OCR+NLP自动化）、12345热线智能工单分类、城市管理视频AI分析等多个应用。全部算力在政务专网内运行。',
    solutionEn: 'Deployed 3 Weisuan-B units in the government cloud data center to support smart approval automation (OCR+NLP), 12345 hotline ticket classification, and urban management video AI analysis — all within the government private network.',
    results: [
      { label: '审批效率提升', labelEn: 'Approval efficiency gain', value: '60%' },
      { label: '热线分类准确率', labelEn: 'Hotline classification accuracy', value: '92%' },
      { label: '数据主权', labelEn: 'Data sovereignty', value: '100%本地' },
      { label: '支撑应用数', labelEn: 'Applications supported', value: '5+' },
    ],
    quote: '微算帮助我们在不增加编制、不建设新机房的情况下，快速实现了政务AI能力的全面落地。',
    quoteEn: 'Weisuan helped us rapidly deploy government AI capabilities without adding headcount or building new data centers.',
    quoteAuthor: '大数据管理局副局长',
    quoteAuthorEn: 'Deputy Director, Big Data Administration',
    tags: ['政务数据主权', '智能审批', '一网通办', '视频AI'],
    verified: false,
  },
  {
    id: 'energy',
    client: '某新能源电力集团',
    clientEn: 'A Renewable Energy Corporation',
    industry: '能源 · 电力',
    industryEn: 'Energy',
    icon: '⚡',
    deploy: '48小时完成部署',
    deployEn: '48-hour deployment',
    challenge: '风电场分布在偏远山区，每台风机每天产生超过500MB运行数据。传统方式将数据回传到总部分析，网络带宽不足且延迟大，无法实现实时预警。风机故障导致的计划外停机每年造成上千万元损失。',
    challengeEn: 'Wind farms are in remote mountainous areas, with each turbine generating 500+ MB of operational data daily. Transmitting data to headquarters for analysis was impractical due to bandwidth and latency. Unplanned turbine downtime costs tens of millions annually.',
    solution: '在风电场变电站部署微算-B作为边缘AI节点，本地运行振动分析、温度异常检测和轴承磨损预测模型。仅将预警结果和摘要数据上传总部，带宽需求降低99%。',
    solutionEn: 'Deployed Weisuan-B at the wind farm substation as an edge AI node, running vibration analysis, temperature anomaly detection, and bearing wear prediction models locally. Only alerts and summary data are sent to headquarters, reducing bandwidth needs by 99%.',
    results: [
      { label: '故障预警提前', labelEn: 'Fault prediction lead time', value: '72h' },
      { label: '计划外停机减少', labelEn: 'Unplanned downtime cut', value: '45%' },
      { label: '带宽需求降低', labelEn: 'Bandwidth reduction', value: '99%' },
      { label: '年维护成本节省', labelEn: 'Annual maintenance savings', value: '¥800万' },
    ],
    quote: '过去风机坏了才知道，现在能提前三天收到预警。这在偏远山区尤其重要——调运维修团队上山至少要一天。',
    quoteEn: 'We used to discover turbine failures after they happened. Now we get 72-hour advance warnings — critical in remote mountains where dispatching repair crews takes a full day.',
    quoteAuthor: '运维中心总工程师',
    quoteAuthorEn: 'Chief Engineer, O&M Center',
    tags: ['预测性维护', '边缘AI', '风电', '远程监控'],
    verified: false,
  },
  {
    id: 'aigc-startup',
    client: '某AIGC创业公司',
    clientEn: 'An AIGC Startup',
    industry: 'AI · 创业公司',
    industryEn: 'AI Startup',
    icon: '🚀',
    deploy: '当天完成部署',
    deployEn: 'Same-day deployment',
    challenge: '团队10人的AIGC创业公司，核心产品是企业营销内容自动生成。使用公有云GPU的月成本超过8万元且不稳定，自建机房初期投入超百万，团队融资有限需要控制现金流。',
    challengeEn: 'A 10-person AIGC startup building automated marketing content generation. Public cloud GPU costs exceeded ¥80K/month with instability issues. Self-built infrastructure requires ¥1M+ upfront, but the team had limited funding.',
    solution: '通过融资租赁获得2台微算-B（月付4,000元），在自己办公室部署，运行Stable Diffusion和LLaMA微调模型。数据和模型权重完全归属公司，不再依赖云平台定价策略。',
    solutionEn: 'Leased 2 Weisuan-B units at ¥4,000/month, deployed in their own office. Running Stable Diffusion and LLaMA fine-tuning. All data and model weights belong to the company — no cloud vendor lock-in.',
    results: [
      { label: '月算力成本', labelEn: 'Monthly compute cost', value: '¥4,000' },
      { label: 'vs公有云节省', labelEn: 'vs cloud savings', value: '95%' },
      { label: '模型迭代速度', labelEn: 'Model iteration speed', value: '3x' },
      { label: 'IP安全', labelEn: 'IP security', value: '100%自有' },
    ],
    quote: '月付4千块就有了自己的AI算力中心，模型和数据完全在自己手上。对创业公司来说，这是改变游戏规则的事情。',
    quoteEn: 'For ¥4K a month, we have our own AI compute center with full ownership of models and data. For a startup, this is game-changing.',
    quoteAuthor: 'CTO & 联合创始人',
    quoteAuthorEn: 'CTO & Co-Founder',
    tags: ['AIGC', '融资租赁', '模型微调', '创业公司'],
    verified: false,
  },
];

const industries = ['全部', '教育 · 高校', 'ICT · 算力基础设施', '通信 · 央企', 'IT服务 · 系统集成', '医疗健康', '智能制造', '金融', '政务 · 智慧城市', '能源 · 电力', 'AI · 创业公司'];
const industriesEn = ['All', 'Education', 'ICT Infrastructure', 'Telecom', 'IT Services', 'Healthcare', 'Manufacturing', 'Finance', 'Government', 'Energy', 'AI Startup'];

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const verified = caseStudies.filter(c => c.verified);
  const scenarios = caseStudies.filter(c => !c.verified);

  return (
    <div>
      {/* Hero */}
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '落地案例' : 'Case Studies'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '真实验证，跨行业落地' : 'Proven Across Industries'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white-60 leading-relaxed">
            {isZh
              ? `覆盖教育、通信、医疗、制造、金融、政务、能源等 ${industries.length - 1} 大行业，${caseStudies.length} 个真实应用案例。数据不出域 + 极速部署，是每一个案例的共同底色。`
              : `Spanning ${industries.length - 1} industries with ${caseStudies.length} real-world deployments. Data sovereignty + rapid deployment is the common thread across every case.`}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: `${caseStudies.length}+`, l: '落地案例', le: 'Deployments' },
              { value: `${industries.length - 1}`, l: '覆盖行业', le: 'Industries' },
              { value: '48-72h', l: '平均部署周期', le: 'Avg. deployment' },
              { value: '0', l: '数据泄露事件', le: 'Data breaches' },
            ].map(s => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="mt-1 text-sm text-white-60">{isZh ? s.l : s.le}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured: Cost Comparison */}
      <section className="border-b border-black-10 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-weisuan-black p-8 text-white lg:p-10">
            <p className="text-xs uppercase tracking-wider text-white-60">{isZh ? '专题案例' : 'Featured'}</p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {isZh ? '微算 vs 传统方案 TCO 对比' : 'Weisuan vs Traditional TCO Comparison'}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white-60 sm:text-base">
                  {isZh
                    ? '1E大规模场景三年TCO节省58%-62%，1P轻量场景融资租赁仅需2,000元/月即可启动。基于华为同成本对标测试和行业公开数据。'
                    : '1E large-scale scenario saves 58%-62% over 3 years. 1P lightweight scenario starts from just ¥2,000/month via leasing. Based on Huawei benchmarks and public industry data.'}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-bold">58%-62%</p>
                  <p className="mt-1 text-xs text-white-60">{isZh ? '三年TCO节省' : '3-year TCO savings'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-bold">¥2,000/月</p>
                  <p className="mt-1 text-xs text-white-60">{isZh ? '融资租赁起步' : 'Leasing from'}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/cases/cost-comparison" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-weisuan-black transition-opacity hover:opacity-90">
                {isZh ? '查看完整对比' : 'View Full Comparison'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Customer Cases */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              ✓ {isZh ? '已验证客户' : 'Verified Customers'}
            </span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-weisuan-black sm:text-4xl">
            {isZh ? '标杆客户案例' : 'Flagship Customer Cases'}
          </h2>
          <p className="mt-3 max-w-2xl text-weisuan-gray leading-relaxed">
            {isZh
              ? '已签约客户的真实部署成效，涵盖教育、ICT、通信、IT服务四大领域。'
              : 'Real deployment results from signed customers across education, ICT, telecom, and IT services.'}
          </p>
          <div className="mt-10 space-y-8">
            {verified.map(c => (
              <div key={c.id} id={c.id} className="rounded-3xl border border-black-10 bg-white overflow-hidden">
                <div className="grid lg:grid-cols-[1fr_1.2fr]">
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{c.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-weisuan-black">{isZh ? c.client : c.clientEn}</h3>
                        <p className="text-sm text-weisuan-gray">{isZh ? c.industry : c.industryEn}</p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-weisuan-accent mb-4">{isZh ? c.deploy : c.deployEn}</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-weisuan-gray mb-1">{isZh ? '挑战' : 'Challenge'}</p>
                        <p className="text-sm text-weisuan-gray leading-relaxed">{isZh ? c.challenge : c.challengeEn}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-weisuan-gray mb-1">{isZh ? '方案' : 'Solution'}</p>
                        <p className="text-sm text-weisuan-gray leading-relaxed">{isZh ? c.solution : c.solutionEn}</p>
                      </div>
                    </div>

                    {c.quote && (
                      <blockquote className="mt-6 border-l-2 border-weisuan-accent pl-4">
                        <p className="text-sm italic text-weisuan-black leading-relaxed">&ldquo;{isZh ? c.quote : c.quoteEn}&rdquo;</p>
                        <p className="mt-2 text-xs text-weisuan-gray">— {isZh ? c.quoteAuthor : c.quoteAuthorEn}</p>
                      </blockquote>
                    )}
                  </div>

                  <div className="bg-weisuan-light p-8 lg:p-10 flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-wider text-weisuan-gray mb-4">{isZh ? '核心成效' : 'Key Results'}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {c.results.map(r => (
                        <div key={r.label} className="rounded-2xl bg-white p-4">
                          <p className="text-2xl font-bold text-weisuan-black">{r.value}</p>
                          <p className="mt-1 text-xs text-weisuan-gray">{isZh ? r.label : r.labelEn}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.tags.map(t => (
                        <span key={t} className="rounded-full bg-white px-3 py-1 text-xs text-weisuan-gray">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Application Scenarios */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-weisuan-black sm:text-4xl">
            {isZh ? '行业应用场景' : 'Industry Application Scenarios'}
          </h2>
          <p className="mt-3 max-w-2xl text-weisuan-gray leading-relaxed">
            {isZh
              ? '基于微算产品能力和行业需求构建的典型应用场景，展示"数据不出域+本地AI算力"在不同行业的落地价值。'
              : 'Typical deployment scenarios built on Weisuan capabilities and industry needs, demonstrating the value of "data sovereignty + local AI compute" across sectors.'}
          </p>
          <div className="mt-10 space-y-8">
            {scenarios.map(c => (
              <div key={c.id} id={c.id} className="rounded-3xl bg-white overflow-hidden">
                <div className="grid lg:grid-cols-[1fr_1.2fr]">
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{c.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-weisuan-black">{isZh ? c.client : c.clientEn}</h3>
                        <p className="text-sm text-weisuan-gray">{isZh ? c.industry : c.industryEn}</p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-weisuan-accent mb-4">{isZh ? c.deploy : c.deployEn}</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-weisuan-gray mb-1">{isZh ? '挑战' : 'Challenge'}</p>
                        <p className="text-sm text-weisuan-gray leading-relaxed">{isZh ? c.challenge : c.challengeEn}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-weisuan-gray mb-1">{isZh ? '方案' : 'Solution'}</p>
                        <p className="text-sm text-weisuan-gray leading-relaxed">{isZh ? c.solution : c.solutionEn}</p>
                      </div>
                    </div>

                    {c.quote && (
                      <blockquote className="mt-6 border-l-2 border-weisuan-accent pl-4">
                        <p className="text-sm italic text-weisuan-black leading-relaxed">&ldquo;{isZh ? c.quote : c.quoteEn}&rdquo;</p>
                        <p className="mt-2 text-xs text-weisuan-gray">— {isZh ? c.quoteAuthor : c.quoteAuthorEn}</p>
                      </blockquote>
                    )}
                  </div>

                  <div className="bg-weisuan-light p-8 lg:p-10 flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-wider text-weisuan-gray mb-4">{isZh ? '预期成效' : 'Expected Results'}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {c.results.map(r => (
                        <div key={r.label} className="rounded-2xl bg-white p-4">
                          <p className="text-2xl font-bold text-weisuan-black">{r.value}</p>
                          <p className="mt-1 text-xs text-weisuan-gray">{isZh ? r.label : r.labelEn}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.tags.map(t => (
                        <span key={t} className="rounded-full bg-white px-3 py-1 text-xs text-weisuan-gray">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-weisuan-black sm:text-4xl">
            {isZh ? '你的行业，也可以这样用微算' : 'Your Industry Can Use Weisuan Too'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-weisuan-gray leading-relaxed">
            {isZh
              ? '无论你是高校、医院、银行、工厂还是创业公司，只要有"数据不能出去，但需要AI算力"的需求，微算都是最快、最省的选择。'
              : 'Whether you\'re a university, hospital, bank, factory, or startup — if you need AI compute but your data can\'t leave your premises, Weisuan is the fastest, most cost-effective option.'}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-weisuan-black px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              {isZh ? '免费咨询方案' : 'Get a Free Consultation'}
            </Link>
            <Link href="/product" className="inline-flex items-center rounded-full border border-black-10 px-8 py-3 text-sm font-semibold text-weisuan-black transition-colors hover:border-weisuan-accent-30 hover:text-weisuan-accent">
              {isZh ? '了解微算产品' : 'Explore Products'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
