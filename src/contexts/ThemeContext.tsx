'use client';

import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { type ReactNode, useEffect } from 'react';

import { themeColorFor } from '@/lib/themeColor';

/**
 * Keeps <meta name="theme-color"> in step with the resolved theme, which tints
 * browser chrome on mobile. next-themes owns `data-theme` and `color-scheme`
 * but not this tag, and Next renders it from the `viewport` export, so it has
 * to be updated client-side.
 */
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
      // Follow the OS until the visitor chooses otherwise — and let them choose
      // it again, which the previous hand-rolled version could not express.
      defaultTheme="system"
      enableSystem
      storageKey="portfolio-theme"
    >
      <ThemeColorSync />
      {children}
    </NextThemeProvider>
  );
}
