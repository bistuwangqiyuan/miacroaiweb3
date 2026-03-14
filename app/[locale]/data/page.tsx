import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { DataTable } from '@/components/DataTable';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(
    locale,
    '/data',
    { title: '市场与数据', description: '中国AI算力市场数据与趋势分析。算力需求年增长40%以上，边缘AI市场规模预计达千亿级别。', keywords: 'AI算力市场,市场数据,算力需求,边缘AI市场,行业趋势' },
    { title: 'Market & Data', description: 'China AI computing market data and trend analysis. Computing demand growing 40%+ annually, edge AI market projected at hundreds of billions.', keywords: 'AI computing market,market data,computing demand,edge AI market,industry trends' },
  );
}

export default async function DataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {locale === 'zh' ? '市场与数据' : 'Market & Data'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {locale === 'zh' ? '按来源、时间、关键词筛选；支持排序与分页。' : 'Filter by source, date, keyword; sort and paginate.'}
      </p>
      <div className="mt-10">
        <DataTable locale={locale} />
      </div>
    </div>
  );
}
