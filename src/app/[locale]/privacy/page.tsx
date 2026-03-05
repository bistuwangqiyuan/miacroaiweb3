import { setRequestLocale } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '隐私政策' : 'Privacy Policy'}
      </h1>
      <div className="mt-8 space-y-4 text-sm text-weisuan-gray">
        <p>{isZh ? '本网站由 Netlify 托管，用户账号由 Netlify Identity 管理，数据存储于 Neon 数据库。我们不会向第三方出售您的个人信息。' : 'This site is hosted on Netlify. Accounts are managed by Netlify Identity; data is stored in Neon. We do not sell your personal information.'}</p>
        <p>{isZh ? '反馈与联系表单内容仅用于回复与改进服务。' : 'Feedback and contact form data are used only to respond and improve our services.'}</p>
      </div>
    </div>
  );
}
