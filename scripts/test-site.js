/**
 * Test deployed site: GET key URLs and expect 200.
 * Usage: node scripts/test-site.js [baseUrl]
 * Example: node scripts/test-site.js https://your-site.netlify.app
 */
const base = process.argv[2] || process.env.SITE_URL || 'http://localhost:3000';

const paths = [
  '/',
  '/en',
  '/product',
  '/technology',
  '/certifications',
  '/cases',
  '/data',
  '/business-model',
  '/partners',
  '/about',
  '/contact',
  '/feedback',
  '/login',
  '/signup',
  '/privacy',
  '/terms',
  '/product/weisuan-b',
  '/product/weisuan-p',
  '/product/weisuan-e',
  '/cases/cost-comparison',
  '/zh/about',
  '/en/about',
];

const assistantFallback = 'Sorry, the assistant is temporarily unavailable. Please try again or browse the site directly.';

async function test() {
  let failed = 0;
  for (const path of paths) {
    const url = base.replace(/\/$/, '') + path;
    try {
      const res = await fetch(url, { redirect: 'follow' });
      const ok = res.ok || res.status === 308 || res.status === 307 || res.status === 302;
      if (!ok) failed++;
      console.log(ok ? 'OK' : 'FAIL', res.status, url);
    } catch (e) {
      failed++;
      console.log('FAIL', url, e.message);
    }
  }

  const chatUrl = base.replace(/\/$/, '') + '/api/chat';
  try {
    const res = await fetch(chatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: '请用一句话介绍微算-B，并告诉我应该看哪个页面。',
        locale: 'zh',
      }),
    });
    const data = await res.json();
    const reply = typeof data.reply === 'string' ? data.reply.trim() : '';
    const ok = res.ok && reply && reply !== assistantFallback;
    if (!ok) failed++;
    console.log(ok ? 'OK' : 'FAIL', 'CHAT', res.status, chatUrl, reply || '(empty)');
  } catch (e) {
    failed++;
    console.log('FAIL', 'CHAT', chatUrl, e.message);
  }

  console.log('');
  if (failed === 0) {
    console.log('All tests passed.');
  } else {
    console.log(failed + ' test(s) failed.');
    if (failed === paths.length && base.includes('netlify.app')) {
      console.log('');
      console.log('Tip: CLI deploy often causes 404 for all pages. Link this site to your Git repo in Netlify');
      console.log('(Site configuration → Build & deploy → Link repository), then Trigger deploy. Run this script again.');
    }
  }
  process.exit(failed > 0 ? 1 : 0);
}

test();
