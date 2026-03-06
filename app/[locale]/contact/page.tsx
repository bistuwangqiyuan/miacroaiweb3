import { setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '联系我们' : 'Contact'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {isZh ? '如有合作或咨询需求，请填写下方表单。' : 'For partnership or inquiries, please use the form below.'}
      </p>
      <div className="mt-10 max-w-xl">
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
