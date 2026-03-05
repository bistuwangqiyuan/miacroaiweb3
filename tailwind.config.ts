import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-geist-sans)', 'sans-serif'],
      },
      colors: {
        weisuan: {
          black: '#0a0a0a',
          gray: '#86868b',
          light: '#f5f5f7',
          accent: '#0071e3',
        },
      },
    },
  },
  plugins: [],
};
export default config;
