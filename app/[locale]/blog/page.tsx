import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  keywords: string;
  created_at: string;
};

export const dynamic = 'force-dynamic';

async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog?locale=${locale}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []) as BlogPost[];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/blog', {
    title: '博客',
    description: '微算行业洞察与技术分享：数据不出域、边缘AI、微型算力中心的最新趋势、技术解析和落地案例。',
    keywords: '微算博客,技术分享,行业洞察,AI趋势,边缘计算',
  }, {
    title: 'Blog',
    description: 'Weisuàn insights and technical sharing: latest trends in edge AI, data sovereignty, and micro computing.',
    keywords: 'blog,technical insights,AI trends,edge computing',
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  const posts = await getBlogPosts(locale);

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '博客' : 'Blog'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '行业洞察与技术分享' : 'Insights & Technical Sharing'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white-60 leading-relaxed">
            {isZh
              ? '了解数据不出域、边缘AI、微型算力中心的最新趋势、技术解析和落地案例。'
              : 'Explore the latest trends, technical analysis, and real-world cases in edge AI and data-sovereign computing.'}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-weisuan-gray text-lg">
                {isZh ? '文章即将上线，敬请期待。' : 'Articles coming soon. Stay tuned.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block rounded-2xl border border-black-10 p-6 transition-all hover:shadow-lg hover:border-weisuan-black/20"
                >
                  <h2 className="text-xl font-semibold text-weisuan-black group-hover:text-weisuan-accent transition-colors">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-3 text-sm text-weisuan-gray leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-weisuan-gray">
                      {new Date(post.created_at).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </span>
                    <span className="text-sm font-medium text-weisuan-accent">
                      {isZh ? '阅读全文 →' : 'Read more →'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
