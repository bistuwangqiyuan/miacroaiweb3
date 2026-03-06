import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div>
      <section className="relative overflow-hidden bg-weisuan-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">微算</h1>
          <p className="mt-4 text-xl text-white-90 sm:text-2xl">{t('slogan')}</p>
          <p className="mt-6 max-w-2xl mx-auto text-base text-white-80">{t('tagline')}</p>
          <div className="mt-10">
            <Link
              href="/product"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-weisuan-black hover:bg-white-90"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-weisuan-black">{t('productEntry')}</h2>
        <p className="mt-2 text-weisuan-gray">
          开箱即用、一机运行、一键启动。从单台微算到万台规模，线性扩展。
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Link href="/product/weisuàn-b" className="rounded-xl border border-black-10 p-6 hover:border-weisuan-accent-30">
            <h3 className="font-medium text-weisuan-black">微算-B 基础版</h3>
            <p className="mt-2 text-sm text-weisuan-gray">小型AI推理、教学实训，约100万元（试点期免费赠送）</p>
          </Link>
          <Link href="/product/weisuàn-p" className="rounded-xl border border-black-10 p-6 hover:border-weisuan-accent-30">
            <h3 className="font-medium text-weisuan-black">微算-P 专业版</h3>
            <p className="mt-2 text-sm text-weisuan-gray">中型AI训练与推理、工业边缘计算，200-500万元</p>
          </Link>
          <Link href="/product/weisuàn-e" className="rounded-xl border border-black-10 p-6 hover:border-weisuan-accent-30">
            <h3 className="font-medium text-weisuan-black">微算-E 企业版</h3>
            <p className="mt-2 text-sm text-weisuan-gray">大规模模型训练、高性能计算，500万元以上</p>
          </Link>
        </div>
      </section>

      <section className="bg-weisuan-light py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-weisuan-black">{t('caseSummary')}</h2>
          <p className="mt-2 text-weisuan-gray">北京信息科技大学、华为算力中心、中国移动、亚信科技等</p>
          <div className="mt-6">
            <Link href="/cases" className="text-weisuan-accent font-medium hover:underline">
              查看全部案例 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
