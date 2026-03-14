import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import type { Metadata } from 'next';
import { SITE_URL, buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

type BlogPost = {
  id: number;
  title: string;
  content: string;
  slug: string;
  summary: string;
  keywords: string;
  created_at: string;
};

export const dynamic = 'force-dynamic';

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog?slug=${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as BlogPost;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isZh = locale === 'zh';
  const post = await getBlogPost(slug);
  if (!post) {
    return { title: isZh ? '文章未找到' : 'Post Not Found' };
  }
  const url = `${SITE_URL}${isZh ? '' : '/en'}/blog/${slug}`;
  return {
    title: post.title,
    description: post.summary || post.title,
    keywords: post.keywords,
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `${SITE_URL}/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary || post.title,
      url,
      type: 'article',
      publishedTime: post.created_at,
      siteName: '微算 Weisuàn',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || post.title,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const articleUrl = `${SITE_URL}${isZh ? '' : '/en'}/blog/${slug}`;
  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.summary || post.title,
    url: articleUrl,
    datePublished: post.created_at,
    keywords: post.keywords,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: isZh ? '首页' : 'Home', url: SITE_URL },
    { name: isZh ? '博客' : 'Blog', url: `${SITE_URL}${isZh ? '' : '/en'}/blog` },
    { name: post.title, url: articleUrl },
  ]);

  return (
    <div>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <section className="bg-weisuan-black text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/blog`} className="text-sm text-white-60 hover:text-white transition-colors">
            ← {isZh ? '返回博客' : 'Back to Blog'}
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tighter sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-white-60">
            {new Date(post.created_at).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>
      </section>

      <article className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-lg prose-neutral">
          <Markdown>{post.content}</Markdown>
        </div>
      </article>

      <section className="bg-weisuan-light py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-semibold text-weisuan-black">
            {isZh ? '想了解微算如何帮助您的企业？' : 'Want to learn how Weisuàn can help your business?'}
          </h3>
          <p className="mt-2 text-sm text-weisuan-gray">
            {isZh ? '融资租赁仅需2,000元/月，48-72小时部署到位。' : 'Leasing starts at ¥2,000/month. Deploy in 48-72 hours.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-block rounded-full bg-weisuan-black px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            {isZh ? '立即咨询' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </div>
  );
}
