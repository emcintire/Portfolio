import { siteMetadata } from '@/data/site';

export const THEME_STORAGE_KEY = 'portfolio-theme';

/**
 * Runs blocking in <head>, before first paint, so the stored theme is applied
 * without a flash. Deliberately not a React effect and not `next/script`
 * `beforeInteractive` — both run too late to prevent the flash.
 *
 * ThemeProvider reads the result back off the DOM, which makes this the single
 * source of truth for the initial theme on the client.
 */
export const themeScript = `(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme =
      stored === 'dark' || stored === 'light'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  }
})();`;

export const themeColorFor = (theme: 'dark' | 'light') =>
  theme === 'light' ? siteMetadata.themeColorLight : siteMetadata.themeColorDark;
