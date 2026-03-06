import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_IhCipRK5uqa9@ep-steep-wildflower-aj4v9eir-pooler.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

async function main() {
  try {
    const tables = await sql`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    console.log('Existing tables:', JSON.stringify(tables));

    await sql`CREATE TABLE IF NOT EXISTS case_studies (
      id SERIAL PRIMARY KEY,
      client_name_zh TEXT NOT NULL,
      client_name_en TEXT NOT NULL,
      deploy_days TEXT,
      outcome_zh TEXT NOT NULL,
      outcome_en TEXT NOT NULL,
      source TEXT DEFAULT 'internal',
      industry TEXT,
      keywords TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;
    console.log('case_studies table ready');

    await sql`CREATE TABLE IF NOT EXISTS user_feedback (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      locale TEXT DEFAULT 'zh',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;
    console.log('user_feedback table ready');

    await sql`CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;
    console.log('contact_submissions table ready');

    const caseCount = await sql`SELECT count(*)::int as c FROM case_studies`;
    console.log('Case studies count:', caseCount[0].c);

    if (caseCount[0].c === 0) {
      await sql`INSERT INTO case_studies (client_name_zh, client_name_en, deploy_days, outcome_zh, outcome_en, source, industry, keywords, created_at) VALUES
        ('北京信息科技大学', 'Beijing Information Science & Technology University', '3', '72小时完成部署，百人并发运行深度学习训练，资源利用率稳定在85%以上，学生竞赛获奖率提升30%。', 'Deployed in 72 hours. 100+ concurrent deep learning sessions, 85%+ utilization, student competition awards up 30%.', 'education', '教育', 'AI训练,高校,深度学习', '2025-11-15T08:00:00Z'),
        ('华为算力中心', 'Huawei Compute Center', '2', '48小时完成部署，数据互通效率提升30%，模型加载时间缩短72%，吞吐量提升64%。', 'Deployed in 48 hours. Data interop +30%, model loading -72%, throughput +64%.', 'enterprise', '科技', 'AI推理,算力中心,性能优化', '2025-09-20T08:00:00Z'),
        ('中国移动', 'China Mobile', NULL, '已签订100万元以上微算设备采购合同，用于边缘算力节点建设和5G应用场景支撑。', 'Signed ¥1M+ equipment contract for edge compute nodes and 5G application support.', 'telecom', '通信', '5G,边缘计算,运营商', '2025-12-10T08:00:00Z'),
        ('亚信科技', 'AsiaInfo Technologies', NULL, '定制多套微算设备，部署于电信行业客户现场，用于AI驱动的网络优化和客户服务方案。', 'Multiple custom Weisuàn units deployed at telecom client sites for AI-driven network optimization and customer service.', 'enterprise', '科技', 'AI应用,电信,定制方案', '2025-10-05T08:00:00Z'),
        ('某汽车集团研发中心', 'An Automotive Group R&D Center', '3', '部署微算-P用于自动驾驶感知算法训练，数据不出域满足车企数据安全合规要求，训练效率提升45%。', 'Deployed Weisuàn-P for autonomous driving perception training. Data sovereignty compliance met, training efficiency +45%.', 'enterprise', '汽车', '自动驾驶,数据安全,AI训练', '2026-01-18T08:00:00Z'),
        ('某三甲医院', 'A Tier-3A Hospital', '3', '部署微算用于医学影像AI辅助诊断，CT影像分析准确率达97.5%，诊断效率提升30%，患者数据完全不出院。', 'Deployed for medical imaging AI diagnosis. CT analysis accuracy 97.5%, diagnosis efficiency +30%, zero patient data leaving hospital.', 'medical', '医疗', '医学影像,AI诊断,数据安全', '2026-02-01T08:00:00Z'),
        ('某工业园区管委会', 'An Industrial Park Management Committee', '5', '为园区内12家制造企业提供共享算力服务，AI视觉质检使产品次品率降低3%，设备故障预警准确率达95%。', 'Shared compute for 12 manufacturers. AI visual inspection reduced defects by 3%, predictive maintenance accuracy 95%.', 'government', '制造', '智能制造,视觉质检,共享算力', '2026-01-25T08:00:00Z'),
        ('某省级大数据中心', 'A Provincial Big Data Center', '7', '部署50台微算-B构建省级边缘算力网络试点，覆盖3个地级市，算力利用率从传统方案的40%提升至82%。', 'Deployed 50 Weisuàn-B units for provincial edge compute pilot across 3 cities. Utilization from 40% to 82%.', 'government', '政务', '边缘计算,政务,省级试点', '2026-02-15T08:00:00Z'),
        ('某金融科技公司', 'A Fintech Company', '2', '部署微算用于实时风控模型推理，交易欺诈识别响应时间从200ms降至50ms，识别准确率达98.2%。', 'Deployed for real-time risk control. Fraud detection response from 200ms to 50ms, accuracy 98.2%.', 'enterprise', '金融', '风控,反欺诈,实时推理', '2026-02-20T08:00:00Z'),
        ('北京大学计算中心', 'Peking University Computing Center', '3', '与北京大学合作分布式存储与数据协同优化项目，模型加载效率提升72%，存储利用率达90%以上。', 'PKU collaboration on distributed storage optimization. Model loading +72%, storage utilization 90%+.', 'education', '教育', '分布式存储,高校合作,科研', '2025-08-10T08:00:00Z'),
        ('香港科技大学', 'Hong Kong University of Science and Technology', '2', 'ViT图像处理与多模态大模型压力验证，10万张高分辨率图像预训练仅需3.2小时，单轮迭代耗时降低16%。', 'ViT and multimodal model stress test. 100K hi-res image pre-training in 3.2 hours, iteration time -16%.', 'education', '教育', 'ViT,多模态,AI研究', '2025-10-20T08:00:00Z'),
        ('某新能源汽车企业', 'A New Energy Vehicle Company', '3', '部署微算用于电池健康监测和充电优化AI模型，电池寿命预测准确率提升至96%，充电效率优化15%。', 'Deployed for battery health monitoring and charging optimization. Battery life prediction accuracy 96%, charging efficiency +15%.', 'enterprise', '汽车', '新能源,电池监测,AI优化', '2026-03-01T08:00:00Z')
      `;
      console.log('Inserted 12 case studies');
    }

    const feedbackCount = await sql`SELECT count(*)::int as c FROM user_feedback`;
    console.log('Feedback count:', feedbackCount[0].c);

    if (feedbackCount[0].c === 0) {
      await sql`INSERT INTO user_feedback (user_id, content, locale, created_at) VALUES
        ('u_demo1', '微算的数据不出域特性非常打动我们，作为医疗行业从业者，患者数据安全是第一要务。部署后确实做到了数据完全不出院，同时AI诊断效率提升明显。', 'zh', '2026-03-01T10:30:00Z'),
        ('u_demo2', '我们园区的制造企业试用了微算的共享算力服务，AI质检系统上线后次品率降低了3个百分点，而且整个部署过程只花了3天，远超我们的预期。', 'zh', '2026-02-25T14:20:00Z'),
        ('u_demo3', 'Weisuàn''s performance is impressive. We tested it against our existing Huawei infrastructure and saw 72% faster data loading. The cost savings over 3 years are substantial.', 'en', '2026-02-20T09:15:00Z'),
        ('u_demo4', '作为合伙人，零加盟费拿到100台微算设备确实很有吸引力。团队培训也很到位，3个月内就开始有客户产生算力服务需求了。', 'zh', '2026-02-18T16:45:00Z'),
        ('u_demo5', '融资租赁2000元/月的方案很适合我们这种中小企业，不用一次性投入太多资金就能用上本地AI算力，数据也不用上传云端，很放心。', 'zh', '2026-02-15T11:00:00Z'),
        ('u_demo6', 'The 48-hour deployment was no exaggeration. Our team had the system running within two days. The hot-swap scaling feature is exactly what we needed for our growing compute demands.', 'en', '2026-02-10T08:30:00Z')
      `;
      console.log('Inserted 6 feedback items');
    }

    console.log('Database setup complete!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
