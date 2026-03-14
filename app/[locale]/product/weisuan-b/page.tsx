import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export { default } from '../weisuàn-b/page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/product/weisuan-b',
    { title: '微算-B 基础版', description: '微算-B基础版：小型AI推理、数据分析、教学实训的理想选择。1 PFLOPS算力，4TB NVMe存储，48-72小时部署。试点期免费赠送，融资租赁2,000元/月。', keywords: '微算-B,基础版,AI推理,教学实训,PFLOPS,免费试用,融资租赁' },
    { title: 'Weisuàn-B Basic', description: 'Weisuàn-B Basic: ideal for small-scale AI inference, data analysis, and training. 1 PFLOPS, 4TB NVMe, 48-72h deployment. Free during pilot, leasing ¥2,000/month.', keywords: 'Weisuàn-B,basic,AI inference,training,PFLOPS,free trial,leasing' },
  );
}
