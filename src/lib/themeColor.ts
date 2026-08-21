import { siteMetadata } from '@/data/site';

/** Browser-chrome tint for a resolved theme, used for <meta name="theme-color">. */
export const themeColorFor = (theme: 'dark' | 'light') =>
  theme === 'light' ? siteMetadata.themeColorLight : siteMetadata.themeColorDark;
