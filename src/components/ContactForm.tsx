'use client';

import { useState } from 'react';

export function ContactForm({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = (form.get('name') as string)?.trim();
    const email = (form.get('email') as string)?.trim();
    const message = (form.get('message') as string)?.trim();
    if (!name || name.length < 2) errs.name = isZh ? '请输入至少2个字符的姓名' : 'Name must be at least 2 characters';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = isZh ? '请输入有效邮箱' : 'Please enter a valid email';
    if (!message || message.length < 10) errs.message = isZh ? '留言至少10个字符' : 'Message must be at least 10 characters';
    return errs;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');
    try {
      const payload = {
        name: data.get('name'),
        email: data.get('email'),
        company: data.get('company') || '',
        industry: data.get('industry') || '',
        size: data.get('size') || '',
        need_type: data.get('need_type') || '',
        message: data.get('message'),
        source: 'website',
      };
      const [contactRes, leadsRes] = await Promise.all([
        fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify({ name: payload.name, email: payload.email, message: payload.message }),
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch('/api/leads', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' },
        }),
      ]);
      if (contactRes.ok || leadsRes.ok) {
        setStatus('done');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center py-12 text-center animate-fade-in">
        <div className="success-check">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10l4 4 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-weisuan-black">
          {isZh ? '提交成功' : 'Message Sent'}
        </h3>
        <p className="mt-2 text-sm text-weisuan-gray">
          {isZh ? '感谢您的留言，我们会尽快回复。' : 'Thank you for reaching out. We\'ll get back to you soon.'}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-weisuan-accent hover:underline"
        >
          {isZh ? '发送新消息' : 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-weisuan-black">
            {isZh ? '姓名' : 'Name'} *
          </label>
          <input
            name="name"
            required
            className={`mt-1.5 block w-full rounded-xl border ${errors.name ? 'border-red-600' : 'border-black-10'} bg-white px-4 py-3 text-sm transition-colors focus\:outline-none focus\:ring-2`}
            placeholder={isZh ? '请输入姓名' : 'Your name'}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-weisuan-black">
            {isZh ? '邮箱' : 'Email'} *
          </label>
          <input
            name="email"
            type="email"
            required
            className={`mt-1.5 block w-full rounded-xl border ${errors.email ? 'border-red-600' : 'border-black-10'} bg-white px-4 py-3 text-sm transition-colors focus\:outline-none focus\:ring-2`}
            placeholder={isZh ? '请输入邮箱' : 'your@email.com'}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-weisuan-black">
          {isZh ? '公司名称' : 'Company'}
        </label>
        <input
          name="company"
          className="mt-1.5 block w-full rounded-xl border border-black-10 bg-white px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          placeholder={isZh ? '请输入公司名称' : 'Your company name'}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-weisuan-black">
            {isZh ? '行业' : 'Industry'}
          </label>
          <select
            name="industry"
            className="mt-1.5 block w-full rounded-xl border border-black-10 bg-white px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          >
            <option value="">{isZh ? '请选择' : 'Select'}</option>
            <option value="manufacturing">{isZh ? '制造业' : 'Manufacturing'}</option>
            <option value="education">{isZh ? '教育/高校' : 'Education'}</option>
            <option value="healthcare">{isZh ? '医疗健康' : 'Healthcare'}</option>
            <option value="finance">{isZh ? '金融' : 'Finance'}</option>
            <option value="automotive">{isZh ? '汽车' : 'Automotive'}</option>
            <option value="it">{isZh ? 'IT/系统集成' : 'IT/Integration'}</option>
            <option value="government">{isZh ? '政府/公共' : 'Government'}</option>
            <option value="other">{isZh ? '其他' : 'Other'}</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-weisuan-black">
            {isZh ? '企业规模' : 'Company Size'}
          </label>
          <select
            name="size"
            className="mt-1.5 block w-full rounded-xl border border-black-10 bg-white px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          >
            <option value="">{isZh ? '请选择' : 'Select'}</option>
            <option value="1-50">{isZh ? '1-50人' : '1-50'}</option>
            <option value="50-200">{isZh ? '50-200人' : '50-200'}</option>
            <option value="200-1000">{isZh ? '200-1000人' : '200-1000'}</option>
            <option value="1000+">{isZh ? '1000人以上' : '1000+'}</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-weisuan-black">
            {isZh ? '需求类型' : 'Inquiry Type'}
          </label>
          <select
            name="need_type"
            className="mt-1.5 block w-full rounded-xl border border-black-10 bg-white px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          >
            <option value="">{isZh ? '请选择' : 'Select'}</option>
            <option value="product">{isZh ? '产品咨询' : 'Product Inquiry'}</option>
            <option value="trial">{isZh ? '试用申请' : 'Trial Request'}</option>
            <option value="partner">{isZh ? '合伙人加盟' : 'Partnership'}</option>
            <option value="tech">{isZh ? '技术合作' : 'Technical Cooperation'}</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-weisuan-black">
          {isZh ? '留言' : 'Message'} *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className={`mt-1.5 block w-full rounded-xl border ${errors.message ? 'border-red-600' : 'border-black-10'} bg-white px-4 py-3 text-sm transition-colors focus\:outline-none focus\:ring-2`}
          placeholder={isZh ? '请输入留言内容（至少10个字符）' : 'Your message (at least 10 characters)'}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-weisuan-black px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-fit"
      >
        {status === 'sending' ? (isZh ? '提交中…' : 'Sending…') : (isZh ? '提交' : 'Submit')}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600 animate-fade-in">
          {isZh ? '提交失败，请稍后重试。' : 'Failed to send. Please try again later.'}
        </p>
      )}
    </form>
  );
}
