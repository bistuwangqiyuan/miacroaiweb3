'use client';

import { useEffect } from 'react';

export function LangSetter({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
    }
  }, [locale]);
  return null;
}
