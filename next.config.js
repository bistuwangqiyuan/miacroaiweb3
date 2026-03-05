import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
  
  rewrites() {
    return [
      {
        source: '/api/health',
        destination: '/quotes/random',
      },
      {
        source: '/blog',
        destination: '/classics',
      },
    ];
  },
};

export default nextConfig;
