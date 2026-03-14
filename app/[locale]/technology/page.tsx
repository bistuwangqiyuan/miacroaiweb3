import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/technology', {
    title: '核心技术',
    description: '微算两大核心技术：存算分离架构和EBOF全闪存储。IOPS≥1,000,000、带宽≥56GB/s、延迟≤100μs、可靠性99.9999%。完全自主知识产权。',
    keywords: '存算分离,EBOF全闪存储,NVMe,RDMA,高性能存储,自主知识产权',
  }, {
    title: 'Core Technology',
    description: 'Two core technologies: compute-storage disaggregation and EBOF all-flash storage. IOPS≥1M, bandwidth≥56GB/s, latency≤100μs, 99.9999% reliability. Fully proprietary IP.',
    keywords: 'compute-storage disaggregation,EBOF,NVMe,RDMA,high-performance storage,proprietary IP',
  });
}

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {isZh ? '技术架构' : 'Technology'}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
                {isZh ? '两大核心技术' : 'Two Core Technologies'}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white-60 leading-relaxed">
                {isZh
                  ? '存算分离架构与EBOF全闪存储，完全自主知识产权。国内唯一通过硬件加速全闪存储实现算力加速的团队。'
                  : 'Compute-storage disaggregation and EBOF all-flash — fully proprietary. The only team in China achieving compute acceleration via hardware-accelerated all-flash.'}
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image src="/image/微算技术架构图5.png" alt="技术架构" width={450} height={350} className="rounded-2xl opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Compute-Storage Disaggregation */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">
                {isZh ? '存算分离架构' : 'Compute-Storage Disaggregation'}
              </h2>
              <p className="mt-4 text-weisuan-gray leading-relaxed">
                {isZh
                  ? '构建"底层解耦协议—高速互联网络—节点地址管控—弹性资源调度"四层技术体系。基于IPv6的原生模块化架构是微算区别于所有竞品的核心技术创新。'
                  : 'A four-layer architecture: protocol decoupling, high-speed interconnect, node addressing, and elastic scheduling. IPv6-native modular design is our unique innovation.'}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { labelZh: 'NVMe-oF协议', labelEn: 'NVMe-oF Protocol', descZh: '计算与存储资源物理彻底解耦', descEn: 'Complete physical decoupling of compute & storage' },
                  { labelZh: 'RoCEv2高速互联', labelEn: 'RoCEv2 Interconnect', descZh: '消除TCP/IP拥塞瓶颈', descEn: 'Eliminates TCP/IP congestion bottlenecks' },
                  { labelZh: 'IPv6动态地址编码', labelEn: 'IPv6 Dynamic Addressing', descZh: '节点身份与地址一体化绑定', descEn: 'Node identity-address unified binding' },
                  { labelZh: 'SDN智能调度', labelEn: 'SDN Smart Scheduling', descZh: '全集群资源弹性调度', descEn: 'Cluster-wide elastic resource scheduling' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-weisuan-light">
                    <p className="text-sm font-semibold text-weisuan-black">{isZh ? item.labelZh : item.labelEn}</p>
                    <p className="mt-1 text-xs text-weisuan-gray">{isZh ? item.descZh : item.descEn}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-0">
                {[
                  { labelZh: '交互延迟', labelEn: 'Latency', value: '≤ 100μs' },
                  { labelZh: '集群带宽', labelEn: 'Bandwidth', value: '≥ 100 Gbps' },
                  { labelZh: '扩容周期', labelEn: 'Scaling', value: isZh ? '≤ 4h，不中断业务' : '≤ 4h, zero downtime' },
                  { labelZh: '地址解析延迟', labelEn: 'Address Resolution', value: '≤ 5μs' },
                  { labelZh: '资源利用率提升', labelEn: 'Utilization Gain', value: '≥ 50%' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-black-10 py-4">
                    <span className="text-sm text-weisuan-gray">{isZh ? row.labelZh : row.labelEn}</span>
                    <span className="text-sm font-semibold text-weisuan-black">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">
                EBOF {isZh ? '全闪存储' : 'All-Flash Storage'}
              </h2>
              <p className="mt-4 text-weisuan-gray leading-relaxed">
                {isZh
                  ? 'Ethernet Bunch of Flash，PCIe Gen5交换机直连NVMe SSD，无网关分布式存储池，从底层消除性能瓶颈。8+2 EC纠删码仅需20%冗余实现六个9数据防护。'
                  : 'PCIe Gen5 switch-direct NVMe SSD, gateway-free distributed pool, eliminating bottlenecks from the ground up. 8+2 EC erasure coding achieves six-9s protection with only 20% overhead.'}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { labelZh: 'PCIe Gen5直连', labelEn: 'PCIe Gen5 Direct', descZh: '无网关分布式存储池', descEn: 'Gateway-free distributed storage pool' },
                  { labelZh: '8+2 EC纠删码', labelEn: '8+2 EC Erasure Code', descZh: '20%冗余实现99.9999%可靠性', descEn: '20% overhead for 99.9999% reliability' },
                  { labelZh: '智能数据迁移', labelEn: 'Smart Data Migration', descZh: '颗粒磨损均衡，延长SSD寿命≥20%', descEn: 'Wear leveling extends SSD life by 20%+' },
                  { labelZh: '二级缓存体系', labelEn: 'Two-tier Cache', descZh: '本地NVMe+全局RDMA共享缓存', descEn: 'Local NVMe + global RDMA shared cache' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-weisuan-light">
                    <p className="text-sm font-semibold text-weisuan-black">{isZh ? item.labelZh : item.labelEn}</p>
                    <p className="mt-1 text-xs text-weisuan-gray">{isZh ? item.descZh : item.descEn}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-0">
                {[
                  { label: 'IOPS', value: '≥ 1,000,000' },
                  { labelZh: '聚合带宽', labelEn: 'Bandwidth', value: '≥ 56 GB/s' },
                  { labelZh: '端到端延迟', labelEn: 'End-to-End Latency', value: '≤ 500μs' },
                  { labelZh: '热点数据延迟', labelEn: 'Hot Data Latency', value: '≤ 200μs' },
                  { labelZh: '可靠性', labelEn: 'Reliability', value: '99.9999%' },
                  { labelZh: '存储成本降低', labelEn: 'Cost Reduction', value: '≥ 40%' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-black-10 py-4">
                    <span className="text-sm text-weisuan-gray">{'label' in row ? row.label : (isZh ? row.labelZh : row.labelEn)}</span>
                    <span className="text-sm font-semibold text-weisuan-black">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagrams */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '架构图集' : 'Architecture Gallery'}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: '/image/微算技术架构图6.png', alt: '技术架构' },
              { src: '/image/微算技术架构图12.png', alt: '存算分离' },
              { src: '/image/微算技术架构图13.png', alt: '系统架构' },
              { src: '/image/微算技术架构图14.png', alt: '模块架构' },
              { src: '/image/微算技术架构图15.png', alt: '网络架构' },
              { src: '/image/胃酸架构图9.png', alt: '微算架构' },
            ].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white p-4">
                <Image src={img.src} alt={img.alt} width={400} height={300} className="w-full h-auto rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal PCB */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">
                {isZh ? '硬件设计' : 'Hardware Design'}
              </h2>
              <p className="mt-4 text-weisuan-gray leading-relaxed">
                {isZh
                  ? '完全自主设计的PCB硬件底板，支持PCIe Gen5交换机与NVMe SSD直连，实现真正的无网关分布式存储池。模块化热插拔设计，单类资源扩容不中断业务。'
                  : 'Fully self-designed PCB backplane supporting PCIe Gen5 switch and NVMe SSD direct connection. Modular hot-swap design enables scaling without downtime.'}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-weisuan-light p-4">
              <Image src="/image/内部pcb图.jpg" alt="PCB设计" width={500} height={350} className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Combined Benefits */}
      <section className="bg-weisuan-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black text-center">
            {isZh ? '融合效益' : 'Combined Benefits'}
          </h2>
          <p className="mt-4 text-center text-weisuan-gray max-w-2xl mx-auto">
            {isZh
              ? '两大核心技术原生深度融合，并非简单功能叠加，实现"算力弹性供给+存储高性能支撑+数据本地化安全防护"一体化技术底座。'
              : 'Native deep integration of two core technologies — not just functional stacking — delivering unified elastic compute + high-performance storage + local data security.'}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '60%+', labelZh: '系统响应效率提升', labelEn: 'Response efficiency gain' },
              { value: '40%+', labelZh: '综合TCO降低', labelEn: 'Total cost reduction' },
              { value: '90%', labelZh: '扩容周期缩短', labelEn: 'Scaling cycle reduction' },
              { value: '0', labelZh: '数据泄露风险', labelEn: 'Data leak risk' },
            ].map((item, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white p-8 text-center">
                <p className="text-4xl font-bold text-weisuan-accent tracking-tight">{item.value}</p>
                <p className="mt-3 text-sm text-weisuan-gray">{isZh ? item.labelZh : item.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Architecture Images */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '更多技术细节' : 'More Technical Details'}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { src: '/image/微算技术架构图8.jpg', alt: '技术架构细节' },
              { src: '/image/微算技术架构图9.jpg', alt: '系统架构细节' },
              { src: '/image/微算技术架构图11.jpg', alt: '模块设计' },
              { src: '/image/图片1.png', alt: '技术展示' },
            ].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-weisuan-light p-4">
                <Image src={img.src} alt={img.alt} width={600} height={400} className="w-full h-auto rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">
            {isZh ? '了解我们的产品' : 'Explore Our Products'}
          </h2>
          <p className="mt-4 text-white-60">
            {isZh ? '基于核心技术打造的三款产品，覆盖从小型到大规模算力需求。' : 'Three products built on our core technology, covering small to large-scale compute needs.'}
          </p>
          <div className="mt-8">
            <Link href="/product" className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-weisuan-black hover:bg-white-90 transition-all">
              {isZh ? '查看产品' : 'View Products'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
