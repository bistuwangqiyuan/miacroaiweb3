import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/product': '/product',
    '/product/weisuàn-b': '/product/weisuàn-b',
    '/product/weisuàn-p': '/product/weisuàn-p',
    '/product/weisuàn-e': '/product/weisuàn-e',
    '/technology': '/technology',
    '/certifications': '/certifications',
    '/cases': '/cases',
    '/data': '/data',
    '/business-model': '/business-model',
    '/partners': '/partners',
    '/about': '/about',
    '/contact': '/contact',
    '/feedback': '/feedback',
    '/login': '/login',
    '/signup': '/signup',
    '/privacy': '/privacy',
    '/terms': '/terms',
  },
});
