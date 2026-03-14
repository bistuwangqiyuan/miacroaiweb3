import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export { default } from '../weisuàn-p/page';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/product/weisuan-p',
    { title: '微算-P 专业版', description: '微算-P专业版：中型AI训练与推理、工业边缘计算。12 PFLOPS算力，16×3.84TB NVMe集群，100G RDMA RoCEv2网络。按需扩展。', keywords: '微算-P,专业版,AI训练,工业边缘计算,PFLOPS,RDMA,NVMe集群' },
    { title: 'Weisuàn-P Professional', description: 'Weisuàn-P Professional: mid-scale AI training & inference, industrial edge computing. 12 PFLOPS, 16×3.84TB NVMe cluster, 100G RDMA RoCEv2.', keywords: 'Weisuàn-P,professional,AI training,industrial edge,PFLOPS,RDMA,NVMe cluster' },
  );
}
