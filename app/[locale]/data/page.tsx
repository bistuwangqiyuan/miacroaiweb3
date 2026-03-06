import { setRequestLocale } from 'next-intl/server';
import { DataTable } from '@/components/DataTable';

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
