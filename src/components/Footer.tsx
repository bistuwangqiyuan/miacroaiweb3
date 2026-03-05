'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="border-t border-black-10 bg-weisuan-light">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-weisuan-black">微算</p>
            <p className="mt-2 text-sm text-weisuan-gray">数据不出域的微型算力中心</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-weisuan-black">{t('about')}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-weisuan-gray hover:text-weisuan-black">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-weisuan-gray hover:text-weisuan-black">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-weisuan-black">{t('privacy')}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-weisuan-gray hover:text-weisuan-black">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-weisuan-gray hover:text-weisuan-black">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/feedback" className="text-sm text-weisuan-gray hover:text-weisuan-black">
              {t('feedback')}
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-weisuan-gray">© {new Date().getFullYear()} 微算团队</p>
      </div>
    </footer>
  );
}
