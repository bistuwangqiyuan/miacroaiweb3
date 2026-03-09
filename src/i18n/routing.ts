import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/product': '/product',
    '/product/weisuan-b': '/product/weisuan-b',
    '/product/weisuan-p': '/product/weisuan-p',
    '/product/weisuan-e': '/product/weisuan-e',
    '/technology': '/technology',
    '/certifications': '/certifications',
    '/cases': '/cases',
    '/cases/cost-comparison': '/cases/cost-comparison',
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
    '/blog': '/blog',
  },
});
