/**
 * Seed case_studies and market_data from business plan content.
 * Run with: DATABASE_URL=postgresql://... npx tsx scripts/seed.ts
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('Set DATABASE_URL');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const caseStudies = [
  {
    client_name_zh: '北京信息科技大学',
    client_name_en: 'Beijing Information Science & Technology University',
    deploy_days: '72小时',
    outcome_zh: '百人并发、85%利用率、学生获奖率提升30%',
    outcome_en: '100+ concurrent, 85% utilization, student award rate +30%',
    source: '项目团队',
    industry: '教育',
  },
  {
    client_name_zh: '华为算力中心',
    client_name_en: 'Huawei Compute Center',
    deploy_days: '48小时',
    outcome_zh: '数据互通提升30%、模型加载缩短72%',
    outcome_en: 'Data互通+30%, model load -72%',
    source: '华为对标测试',
    industry: '科技',
  },
  {
    client_name_zh: '中国移动',
    client_name_en: 'China Mobile',
    deploy_days: null,
    outcome_zh: '已签订100万元以上微算设备合同',
    outcome_en: '100万+ Weisuàn contract signed',
    source: '商业合同',
    industry: '通信',
  },
  {
    client_name_zh: '亚信科技',
    client_name_en: 'AsiaInfo',
    deploy_days: null,
    outcome_zh: '定制多套微算设备，用于行业解决方案',
    outcome_en: 'Custom Weisuàn units for industry solutions',
    source: '商业合同',
    industry: '科技',
  },
];

const marketData = [
  {
    title_zh: '中国算力市场规模（2025）',
    title_en: 'China compute market size (2025)',
    source: '中国信通院',
    summary_zh: '算力市场整体规模8,351亿元，同比增超30%',
    summary_en: 'Market size 835.1B CNY, +30% YoY',
    published_at: new Date('2025-01-01'),
  },
  {
    title_zh: '边缘算力占比与增速',
    title_en: 'Edge compute share and growth',
    source: 'IDC',
    summary_zh: '2026年边缘算力占比将达30%，同比增速超150%',
    summary_en: 'Edge share 30% by 2026, +150% YoY',
    published_at: new Date('2025-01-01'),
  },
];

async function main() {
  for (const row of caseStudies) {
    await sql`
      INSERT INTO case_studies (client_name_zh, client_name_en, deploy_days, outcome_zh, outcome_en, source, industry)
      VALUES (${row.client_name_zh}, ${row.client_name_en}, ${row.deploy_days}, ${row.outcome_zh}, ${row.outcome_en}, ${row.source}, ${row.industry})
    `;
  }
  console.log('case_studies seeded:', caseStudies.length);

  for (const row of marketData) {
    await sql`
      INSERT INTO market_data (title_zh, title_en, source, summary_zh, summary_en, published_at)
      VALUES (${row.title_zh}, ${row.title_en}, ${row.source}, ${row.summary_zh}, ${row.summary_en}, ${row.published_at})
    `;
  }
  console.log('market_data seeded:', marketData.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
