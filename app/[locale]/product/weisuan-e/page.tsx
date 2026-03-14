import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export { default } from '../weisuàn-e/page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/product/weisuan-e',
    { title: '微算-E 企业版', description: '微算-E企业版：大规模模型训练、高性能计算。50+ PFLOPS算力，千卡级异构集群，PB级分布式存储。定制方案。', keywords: '微算-E,企业版,大规模训练,HPC,千卡集群,PB级存储,定制方案' },
    { title: 'Weisuàn-E Enterprise', description: 'Weisuàn-E Enterprise: large-scale model training, HPC. 50+ PFLOPS, 1000+ card heterogeneous cluster, PB-scale distributed storage. Custom solutions.', keywords: 'Weisuàn-E,enterprise,large-scale training,HPC,1000 card cluster,PB storage' },
  );
}
