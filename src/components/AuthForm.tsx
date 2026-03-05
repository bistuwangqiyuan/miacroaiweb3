'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';

export function AuthForm({ mode, locale }: { mode: 'login' | 'signup'; locale: string }) {
  const isZh = locale === 'zh';
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>('idle');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMsg('');
    try {
      const base = typeof window !== 'undefined' ? window.location.origin : '';
      if (mode === 'signup') {
        const res = await fetch(`${base}/.netlify/identity/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.access_token || data.id)) {
          setStatus('done');
          router.push('/');
          return;
        }
        setMsg(data.msg || data.error_description || (isZh ? '注册失败' : 'Signup failed'));
      } else {
        const res = await fetch(`${base}/.netlify/identity/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ grant_type: 'password', username: email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.access_token || data.token)) {
          setStatus('done');
          router.push('/');
          return;
        }
        setMsg(data.msg || data.error_description || (isZh ? '登录失败' : 'Login failed'));
      }
      setStatus('error');
    } catch {
      setStatus('error');
      setMsg(isZh ? '网络错误，或请于 Netlify 部署后使用登录功能。' : 'Network error, or use login after deploying to Netlify.');
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
      <label className="text-sm font-medium text-weisuan-black">
        {isZh ? '邮箱' : 'Email'}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded border border-black-10 px-3 py-2 text-sm"
        />
      </label>
      <label className="text-sm font-medium text-weisuan-black">
        {isZh ? '密码' : 'Password'}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="mt-1 block w-full rounded border border-black-10 px-3 py-2 text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-full bg-weisuan-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {status === 'loading' ? (isZh ? '处理中…' : 'Processing…') : mode === 'login' ? (isZh ? '登录' : 'Log in') : (isZh ? '注册' : 'Sign up')}
      </button>
      {msg && <p className="text-sm text-red-600">{msg}</p>}
    </form>
  );
}
