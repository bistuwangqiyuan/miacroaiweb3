'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const navKeys = ['product', 'technology', 'cases', 'certifications', 'businessModel', 'partners', 'blog', 'about', 'contact'] as const;
const pathMap: Record<string, string> = {
  product: '/product',
  technology: '/technology',
  cases: '/cases',
  certifications: '/certifications',
  businessModel: '/business-model',
  partners: '/partners',
  blog: '/blog',
  about: '/about',
  contact: '/contact',
};

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white-80 backdrop-blur-xl shadow-sm border-b border-black-10' : 'bg-white-80 backdrop-blur-md'}`}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-weisuan-black">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-weisuan-black text-white text-sm font-bold">W</span>
            微算
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={(pathMap[key] || '/') as Parameters<typeof Link>[0]['href']}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === pathMap[key]
                    ? 'font-medium text-weisuan-accent bg-black-5'
                    : 'text-weisuan-gray hover:text-weisuan-black hover:bg-black-5'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={pathname || '/'}
              locale={locale === 'zh' ? 'en' : 'zh'}
              className="rounded-full border border-black-10 px-3 py-1 text-xs font-medium text-weisuan-gray hover:text-weisuan-black hover:border-weisuan-accent-30 transition-colors"
            >
              {locale === 'zh' ? 'EN' : '中文'}
            </Link>
            <Link href="/login" className="hidden text-sm text-weisuan-gray hover:text-weisuan-black md:block transition-colors">
              {t('login')}
            </Link>
            <Link
              href="/signup"
              className="hidden rounded-full bg-weisuan-black px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 md:block transition-all"
            >
              {t('signup')}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg md:hidden hover:bg-black-5 transition-colors"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-nav-panel">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black-10">
              <span className="text-lg font-bold text-weisuan-black">微算</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black-5"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={(pathMap[key] || '/') as Parameters<typeof Link>[0]['href']}
                  className={`block rounded-xl px-4 py-3 text-base transition-colors ${
                    pathname === pathMap[key]
                      ? 'font-medium text-weisuan-accent bg-black-5'
                      : 'text-weisuan-black hover:bg-black-5'
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
              <Link href="/feedback" className="block rounded-xl px-4 py-3 text-base text-weisuan-black hover:bg-black-5">
                {t('feedback')}
              </Link>
            </nav>
            <div className="p-4 space-y-3 border-t border-black-10">
              <Link href="/login" className="block text-center rounded-xl border border-black-10 px-4 py-3 text-sm font-medium text-weisuan-black hover:bg-black-5">
                {t('login')}
              </Link>
              <Link href="/signup" className="block text-center rounded-xl bg-weisuan-black px-4 py-3 text-sm font-medium text-white">
                {t('signup')}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
