import Script from 'next/script';
import '../styles/globals.css';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://microaiweb3.netlify.app';

export const metadata = {
    title: {
        template: '%s | 微算 Weisuàn',
        default: '微算 Weisuàn — 数据不出域的微型算力中心',
    },
    description:
        '微算提供数据不出域的可扩展微型算力中心，采用存算分离架构和EBOF全闪存储技术，支持AI推理训练。融资租赁仅需2,000元/月，48-72小时快速部署。',
    keywords: [
        '微算', 'Weisuàn', '算力中心', '微型算力', '数据不出域',
        '边缘计算', 'AI推理', 'AI训练', '存算分离', 'EBOF全闪存储',
        '企业AI', '本地化算力', '数据安全', '融资租赁',
        'edge AI', 'micro computing center', 'data sovereignty',
    ],
    metadataBase: new URL(siteUrl),
    openGraph: {
        type: 'website',
        siteName: '微算 Weisuàn',
        locale: 'zh_CN',
        alternateLocale: 'en_US',
        images: [
            {
                url: '/image/算力中心图4.png',
                width: 1200,
                height: 630,
                alt: '微算算力中心 Weisuàn Computing Center',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/image/算力中心图4.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.svg',
        apple: '/favicon.svg',
    },
    category: 'technology',
    other: {
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#0a0a0a',
};

const baiduId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }) {
    return (
        <html lang="zh" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                <link rel="dns-prefetch" href="https://hm.baidu.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            </head>
            <body className="antialiased">
                {children}
                {baiduId && (
                    <Script
                        id="baidu-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                var _hmt = _hmt || [];
                                (function() {
                                    var hm = document.createElement("script");
                                    hm.src = "https://hm.baidu.com/hm.js?${baiduId}";
                                    var s = document.getElementsByTagName("script")[0];
                                    s.parentNode.insertBefore(hm, s);
                                })();
                            `,
                        }}
                    />
                )}
                {gaId && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                            strategy="afterInteractive"
                        />
                        <Script
                            id="ga4"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${gaId}');
                                `,
                            }}
                        />
                    </>
                )}
            </body>
        </html>
    );
}
