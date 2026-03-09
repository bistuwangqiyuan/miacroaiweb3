import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  turbopack: {
    root: join(__dirname),
  },
  redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://docs.netlify.com/frameworks/next-js/overview/',
        permanent: false,
      },
      {
        source: '/old-blog/:slug',
        destination: '/classics',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/netlify-templates/next-platform-starter',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product/weisuàn-b',
        destination: '/product/weisuan-b',
        permanent: true,
      },
      {
        source: '/product/weisuàn-p',
        destination: '/product/weisuan-p',
        permanent: true,
      },
      {
        source: '/product/weisuàn-e',
        destination: '/product/weisuan-e',
        permanent: true,
      },
      {
        source: '/en/product/weisuàn-b',
        destination: '/en/product/weisuan-b',
        permanent: true,
      },
      {
        source: '/en/product/weisuàn-p',
        destination: '/en/product/weisuan-p',
        permanent: true,
      },
      {
        source: '/en/product/weisuàn-e',
        destination: '/en/product/weisuan-e',
        permanent: true,
      },
    ];
  },

  rewrites() {
    return [
      {
        source: '/api/health',
        destination: '/quotes/random',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
