import type { MetadataRoute } from 'next';

const base =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://microaiweb3.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/login',
          '/signup',
          '/en/login',
          '/en/signup',
          '/blobs',
          '/classics',
          '/edge',
          '/image-cdn',
          '/middleware',
          '/revalidation',
          '/routing',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/login', '/signup'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
