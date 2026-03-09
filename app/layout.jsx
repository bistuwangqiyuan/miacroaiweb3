import Script from 'next/script';
import '../styles/globals.css';
import './globals.css';

export const metadata = {
    title: {
        template: '%s | 微算 Weisuàn',
        default: '微算 Weisuàn — 数据不出域的微型算力中心'
    },
    description: '微算 — 数据不出域的可扩展微型算力中心。存算分离架构，EBOF全闪存储，完全自主知识产权。',
};

const baiduId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }) {
    return (
        <html lang="zh" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
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
