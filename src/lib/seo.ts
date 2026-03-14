import type { Metadata } from 'next';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://miacroaiweb3.netlify.app';

export const SITE_NAME_ZH = '微算 Weisuàn';
export const SITE_NAME_EN = 'Weisuàn - Micro Computing Center';

export const ORG_NAME = '微算';

export function buildUrl(locale: string, path: string = ''): string {
  return `${SITE_URL}${locale === 'zh' ? '' : '/en'}${path}`;
}

export function buildPageMetadata(
  locale: string,
  path: string,
  zh: { title: string; description: string; keywords?: string },
  en: { title: string; description: string; keywords?: string },
): Metadata {
  const isZh = locale === 'zh';
  const { title, description, keywords } = isZh ? zh : en;
  const url = buildUrl(locale, path);

  return {
    title,
    description,
    keywords: keywords ?? (isZh
      ? '微算,算力中心,数据不出域,边缘计算,AI推理,存算分离,EBOF全闪存储,微型算力'
      : 'Weisuàn,micro computing center,data sovereignty,edge AI,compute-storage disaggregation,EBOF'),
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `${SITE_URL}${path}`,
        en: `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME_ZH,
      locale: isZh ? 'zh_CN' : 'en_US',
      alternateLocale: isZh ? 'en_US' : 'zh_CN',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/image/算力中心图4.png`,
          width: 1200,
          height: 630,
          alt: isZh ? '微算算力中心' : 'Weisuàn Computing Center',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/image/算力中心图4.png`],
    },
  };
}

export function buildOrganizationJsonLd(locale: string) {
  const isZh = locale === 'zh';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isZh ? '微算' : 'Weisuàn',
    alternateName: ['Weisuàn', '微算', 'Micro AI Computing', 'MiacroAI'],
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: isZh
      ? '微算提供数据不出域的可扩展微型算力中心，采用存算分离架构和EBOF全闪存储技术。'
      : 'Weisuàn provides data-sovereign, scalable micro computing centers with compute-storage disaggregation and EBOF all-flash storage.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: isZh ? '客户服务' : 'Customer Service',
      availableLanguage: ['Chinese', 'English'],
    },
    areaServed: {
      '@type': 'Country',
      name: isZh ? '中国' : 'China',
    },
  };
}

export function buildWebSiteJsonLd(locale: string) {
  const isZh = locale === 'zh';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isZh ? '微算 Weisuàn' : 'Weisuàn',
    url: SITE_URL,
    description: isZh
      ? '微算 — 数据不出域的可扩展微型算力中心'
      : 'Weisuàn — Data-sovereign scalable micro computing centers',
    inLanguage: isZh ? 'zh-CN' : 'en',
    publisher: {
      '@type': 'Organization',
      name: isZh ? '微算' : 'Weisuàn',
      url: SITE_URL,
    },
  };
}

export function buildProductJsonLd(
  locale: string,
  product: {
    name: string;
    description: string;
    image: string;
    sku: string;
    specs: string;
    priceCurrency?: string;
    price?: string;
  },
) {
  const isZh = locale === 'zh';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: isZh ? '微算' : 'Weisuàn',
    },
    manufacturer: {
      '@type': 'Organization',
      name: isZh ? '微算' : 'Weisuàn',
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: isZh ? '算力输出' : 'Computing Output',
      value: product.specs,
    },
    ...(product.price && product.priceCurrency
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: product.priceCurrency,
            price: product.price,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };
}

export function buildFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    keywords: article.keywords,
    author: {
      '@type': 'Organization',
      name: '微算 Weisuàn',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: '微算 Weisuàn',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
  };
}
