import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/terms', {
    title: '使用条款',
    description: '微算网站和服务使用条款。',
    keywords: '使用条款,服务条款',
  }, {
    title: 'Terms of Use',
    description: 'Weisuàn website and service terms of use.',
    keywords: 'terms of use,service terms',
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '使用条款' : 'Terms of Use'}
      </h1>
      <div className="mt-8 space-y-4 text-sm text-weisuan-gray">
        <p>{isZh ? '使用本网站即表示您同意遵守相关法律法规。网站内容仅供参考，具体合作以书面协议为准。' : 'By using this site you agree to comply with applicable laws. Content is for reference; formal cooperation is subject to written agreements.'}</p>
      </div>
    </div>
  );
}
