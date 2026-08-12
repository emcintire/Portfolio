'use client';

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { THEME_STORAGE_KEY, themeColorFor } from '@/lib/themeScript';

import { type Theme, ThemeContext, type ThemeContextValue } from './theme';

/**
 * The inline script in the root layout has already resolved and applied the
 * theme before hydration, so on the client the DOM is the source of truth.
 * On the server there is no DOM; nothing that renders differently per theme is
 * emitted before mount (see ThemeToggle), so this fallback is never visible.
 */
const readAppliedTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
};

const setThemeColorMeta = (theme: Theme) => {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColorFor(theme));
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readAppliedTheme);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      // The inline script already applied this exact theme. Re-applying it here
      // would overwrite it — and write to localStorage — before the user has
      // touched anything, which is how a stored 'dark' turns into 'light'.
      // Only the browser-chrome color still needs catching up.
      setThemeColorMeta(theme);
      return;
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    setThemeColorMeta(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
