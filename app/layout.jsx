import '../styles/globals.css';
import './globals.css';

export const metadata = {
    title: {
        template: '%s | 微算 Weisuàn',
        default: '微算 Weisuàn — 数据不出域的微型算力中心'
    },
    description: '微算 — 数据不出域的可扩展微型算力中心。存算分离架构，EBOF全闪存储，完全自主知识产权。',
};

export default function RootLayout({ children }) {
    return (
        <html lang="zh" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
