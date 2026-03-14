import type { MetadataRoute } from 'next';

const base =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://miacroaiweb3.netlify.app';

interface PageEntry {
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

const pages: PageEntry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/product', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/product/weisuan-b', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/product/weisuan-p', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/product/weisuan-e', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/technology', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/certifications', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/cases', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/cases/cost-comparison', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/data', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/business-model', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/feedback', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/privacy', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'monthly', priority: 0.3 },
];

const locales = ['zh', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const url = locale === 'zh' ? `${base}${page.path}` : `${base}/en${page.path}`;

      const alternates: Record<string, string> = {};
      for (const alt of locales) {
        const key = alt === 'zh' ? 'zh-CN' : 'en';
        alternates[key] = alt === 'zh' ? `${base}${page.path}` : `${base}/en${page.path}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
