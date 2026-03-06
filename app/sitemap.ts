import { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://weisuan.example.com';

const paths = [
  '',
  '/product',
  '/product/weisuan-b',
  '/product/weisuan-p',
  '/product/weisuan-e',
  '/technology',
  '/certifications',
  '/cases',
  '/cases/cost-comparison',
  '/data',
  '/business-model',
  '/partners',
  '/about',
  '/contact',
  '/feedback',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['zh', 'en'];
  const entries: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    for (const locale of locales) {
      const segment = path || '';
      const url = locale === 'zh' ? `${base}${segment}` : `${base}/en${segment}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : ('monthly' as const),
        priority: path === '' ? 1 : 0.8,
      });
    }
  }
  return entries;
}
