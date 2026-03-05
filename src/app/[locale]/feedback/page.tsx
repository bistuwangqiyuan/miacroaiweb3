import { setRequestLocale } from 'next-intl/server';
import { FeedbackSection } from '@/components/FeedbackSection';

export default async function FeedbackPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '用户反馈' : 'Feedback'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {isZh ? '提交您的意见或建议（不支持文件上传）。登录后可查看自己的反馈记录。' : 'Submit your feedback (no file upload). Log in to see your history.'}
      </p>
      <div className="mt-10">
        <FeedbackSection locale={locale} />
      </div>
    </div>
  );
}
