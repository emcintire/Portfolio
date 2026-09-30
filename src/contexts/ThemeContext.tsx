'use client';

import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { type ReactNode, useEffect } from 'react';

import { themeColorFor } from '@/lib/themeColor';

function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== 'dark' && resolvedTheme !== 'light') return;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', themeColorFor(resolvedTheme));
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      // The stylesheet keys off [data-theme='dark'], not a class.
      attribute="data-theme"
      defaultTheme="light"
      enableSystem
      storageKey="portfolio-theme"
    >
      <ThemeColorSync />
      {children}
    </NextThemeProvider>
  );
}
