import { setRequestLocale } from 'next-intl/server';
import { CasesTable } from '@/components/CasesTable';

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {locale === 'zh' ? '落地案例' : 'Case Studies'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {locale === 'zh' ? '按来源、时间、行业或关键词筛选；支持排序与分页。' : 'Filter by source, date, industry or keyword; sort and paginate.'}
      </p>
      <div className="mt-10">
        <CasesTable locale={locale} />
      </div>
    </div>
  );
}
