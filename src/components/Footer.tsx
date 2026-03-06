'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <footer className="border-t border-black-10 bg-weisuan-light">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:grid-cols-2" style={{ gridColumn: 'span 2' }}>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-weisuan-black text-white text-sm font-bold">W</span>
              <span className="text-lg font-bold text-weisuan-black">微算</span>
            </div>
            <p className="mt-4 text-sm text-weisuan-gray leading-relaxed max-w-xs">{t('desc')}</p>
            <p className="mt-4 text-xs text-weisuan-gray">{t('address')}</p>
            <p className="text-xs text-weisuan-gray">{t('email')}</p>
            <div className="mt-4">
              <p className="text-xs font-medium text-weisuan-black mb-2">{isZh ? '微信联系' : 'WeChat'}</p>
              <Image
                src="/image/微信联系二维码.png"
                alt={isZh ? '微信联系二维码' : 'WeChat QR Code'}
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-weisuan-black">{t('products')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/product" className="text-sm text-weisuan-gray hover:text-weisuan-black">{tNav('product')}</Link></li>
              <li><Link href="/product/weisuan-b" className="text-sm text-weisuan-gray hover:text-weisuan-black">微算-B Basic</Link></li>
              <li><Link href="/product/weisuan-p" className="text-sm text-weisuan-gray hover:text-weisuan-black">微算-P Pro</Link></li>
              <li><Link href="/product/weisuan-e" className="text-sm text-weisuan-gray hover:text-weisuan-black">微算-E Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-weisuan-black">{t('resources')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/technology" className="text-sm text-weisuan-gray hover:text-weisuan-black">{tNav('technology')}</Link></li>
              <li><Link href="/certifications" className="text-sm text-weisuan-gray hover:text-weisuan-black">{tNav('certifications')}</Link></li>
              <li><Link href="/about" className="text-sm text-weisuan-gray hover:text-weisuan-black">{tNav('about')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-weisuan-black">{isZh ? '联系' : 'Contact'}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/contact" className="text-sm text-weisuan-gray hover:text-weisuan-black">{tNav('contact')}</Link></li>
              <li><Link href="/feedback" className="text-sm text-weisuan-gray hover:text-weisuan-black">{t('feedback')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-weisuan-gray">
            © {new Date().getFullYear()} {t('companyName')}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
