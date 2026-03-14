import { setRequestLocale } from 'next-intl/server';
import { FeedbackSection } from '@/components/FeedbackSection';
import { queryLatestFeedback } from '@/lib/db';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

type FeedbackItem = { id: number; content: string; locale: string; created_at: string };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/feedback', {
    title: '反馈建议',
    description: '向微算提交您的反馈、建议或问题，帮助我们不断改进产品和服务。',
    keywords: '微算反馈,建议,用户反馈',
  }, {
    title: 'Feedback',
    description: 'Submit your feedback, suggestions or questions to Weisuàn. Help us continuously improve our products and services.',
    keywords: 'feedback,suggestions,user feedback',
  });
}

export default async function FeedbackPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const latestFeedback = (await queryLatestFeedback(3)) as FeedbackItem[];

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '用户反馈' : 'Feedback'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '您的声音很重要' : 'Your Voice Matters'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white-60 leading-relaxed">
            {isZh
              ? '我们重视每一位用户的反馈，您的建议将帮助我们不断改进产品和服务。'
              : 'We value every user\'s feedback. Your suggestions help us continuously improve our products and services.'}
          </p>
        </div>
      </section>

      {latestFeedback.length > 0 && (
        <section className="py-16 bg-weisuan-light">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '最新反馈' : 'Latest Feedback'}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {latestFeedback.map((item) => (
                <div key={item.id} className="card-hover rounded-2xl bg-white p-6">
                  <p className="text-sm text-weisuan-black leading-relaxed">{item.content}</p>
                  <p className="mt-4 text-xs text-weisuan-gray">
                    {new Date(item.created_at).toLocaleDateString(item.locale === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '提交反馈' : 'Submit Feedback'}</h2>
            <p className="mt-2 text-sm text-weisuan-gray">
              {isZh ? '请分享您的使用体验、建议或问题。' : 'Share your experience, suggestions, or issues.'}
            </p>
            <div className="mt-8">
              <FeedbackSection locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
