import { setRequestLocale } from 'next-intl/server';
import { AuthForm } from '@/components/AuthForm';

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold text-weisuan-black">
        {locale === 'zh' ? '注册' : 'Sign up'}
      </h1>
      <AuthForm mode="signup" locale={locale} />
    </div>
  );
}
