'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const navKeys = ['product', 'technology', 'cases', 'businessModel', 'partners', 'about', 'contact'] as const;
const pathMap: Record<string, string> = {
  product: '/product',
  technology: '/technology',
  cases: '/cases',
  businessModel: '/business-model',
  partners: '/partners',
  about: '/about',
  contact: '/contact',
};

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <header className="sticky top-0 z-50 border-b border-black-10 bg-white-80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-weisuan-black">
          微算
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={(pathMap[key] || '/') as Parameters<typeof Link>[0]['href']}
              className={`text-sm ${pathname === pathMap[key] ? 'font-medium text-weisuan-black' : 'text-weisuan-gray hover:text-weisuan-black'}`}
            >
              {t(key)}
            </Link>
          ))}
          <Link href="/feedback" className="text-sm text-weisuan-gray hover:text-weisuan-black">
            {t('feedback')}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href={pathname || '/'} locale={locale === 'zh' ? 'en' : 'zh'} className="text-sm text-weisuan-gray hover:text-weisuan-black">
            {locale === 'zh' ? 'EN' : '中文'}
          </Link>
          <Link href="/login" className="text-sm text-weisuan-gray hover:text-weisuan-black">
            {t('login')}
          </Link>
          <Link href="/signup" className="text-sm font-medium text-weisuan-accent">
            {t('signup')}
          </Link>
        </div>
      </div>
    </header>
  );
}
