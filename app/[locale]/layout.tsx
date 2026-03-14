import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot';
import { LangSetter } from '@/components/LangSetter';
import { JsonLd } from '@/components/JsonLd';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/seo';

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'zh' | 'en')) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const orgJsonLd = buildOrganizationJsonLd(locale);
  const siteJsonLd = buildWebSiteJsonLd(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <LangSetter locale={locale} />
      <JsonLd data={orgJsonLd} />
      <JsonLd data={siteJsonLd} />
      <div className="min-h-screen flex flex-col bg-white text-weisuan-black">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </div>
    </NextIntlClientProvider>
  );
}
