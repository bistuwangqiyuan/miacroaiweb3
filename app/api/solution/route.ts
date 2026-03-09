import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, industry, size, needs, budget } = body || {};

    if (!company || !industry) {
      return NextResponse.json(
        { error: 'company and industry are required' },
        { status: 400 },
      );
    }

    const industryConfigs: Record<string, { scenarios: string[]; painPoints: string[] }> = {
      manufacturing: {
        scenarios: ['AI视觉质检', '预测性维护', '数字孪生', '工艺优化'],
        painPoints: ['产线数据含核心工艺参数，不宜上传云端', '传统质检依赖人工，效率低成本高', '设备故障导致非计划停机损失巨大'],
      },
      education: {
        scenarios: ['AI教学实训', '科研计算', '大模型本地部署', '竞赛训练平台'],
        painPoints: ['学生AI实训缺少算力支持', '科研数据需本地化处理', '云端算力费用高且不可控'],
      },
      healthcare: {
        scenarios: ['医学影像AI诊断', '电子病历智能化', '药物研发加速', '基因组分析'],
        painPoints: ['患者数据严禁出院', '影像数据量大，云端传输延迟高', '数据合规要求极严'],
      },
      finance: {
        scenarios: ['智能风控', '反欺诈检测', '智能投顾', '合规审计'],
        painPoints: ['交易数据受严格监管', '实时推理延迟要求高', '数据跨境流动受限'],
      },
      automotive: {
        scenarios: ['自动驾驶感知算法', '车联网数据处理', '电池健康监测', '智能制造质检'],
        painPoints: ['自动驾驶训练数据高度敏感', '车辆运行数据量庞大', '产线数据不宜上云'],
      },
      it: {
        scenarios: ['AI解决方案底座', '私有化大模型部署', '算力服务转售', '客户POC环境'],
        painPoints: ['客户要求数据不出域', '需要灵活可扩展的算力平台', '公有云利润空间有限'],
      },
      government: {
        scenarios: ['智慧城市', '政务AI', '数据安全计算', '科技项目示范'],
        painPoints: ['政务数据必须本地化', '信创要求自主可控', '建设周期要求短'],
      },
    };

    const config = industryConfigs[industry] || industryConfigs['manufacturing'];

    const sizeConfig =
      size === '1000+' ? { model: '微算-P 或 微算-E', qty: '2-10台', monthly: '按需定制' }
        : size === '200-1000' ? { model: '微算-P', qty: '1-3台', monthly: '按需定制' }
          : size === '50-200' ? { model: '微算-B 或 微算-P', qty: '1-2台', monthly: '2,000元/月起' }
            : { model: '微算-B', qty: '1台', monthly: '2,000元/月' };

    const solution = {
      company,
      industry,
      recommended_model: sizeConfig.model,
      recommended_qty: sizeConfig.qty,
      monthly_cost: sizeConfig.monthly,
      applicable_scenarios: config.scenarios,
      addressed_pain_points: config.painPoints,
      key_benefits: [
        '数据不出域 — 所有数据和AI模型在客户本地设备运行，满足合规要求',
        '48-72小时部署 — 交钥匙方案，开箱即用',
        'TCO降低58-62% — 比传统方案节省一半以上成本',
        '弹性扩展 — 从1台到万台线性扩展，不中断业务',
        '华为昇腾+鲲鹏双认证 — 自主可控，国产化适配',
      ],
      reference_cases: [
        { name: '北京信息科技大学', result: '72小时部署，百人并发，学生获奖率提升30%' },
        { name: '华为算力中心', result: '数据互通提升30%，模型加载缩短72%' },
        { name: '中国移动', result: '已签订100万元以上微算设备合同' },
      ],
      next_steps: [
        '安排15-20分钟线上交流，了解具体需求',
        '提供免费算力需求评估',
        '安排试用/POC部署',
      ],
      generated_at: new Date().toISOString(),
    };

    return NextResponse.json(solution);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
