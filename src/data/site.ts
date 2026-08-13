import type { NavigationItem } from '@/types';

export const navigation: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/photography', label: 'Photography' },
];

export const siteMetadata = {
  description:
    'Full-stack software engineer building reliable web, mobile, and game experiences with React, TypeScript, .NET, Node.js, and Unity.',
  email: 'everettgmcintire@gmail.com',
  locale: 'en_US',
  location: 'Vermont, United States',
  name: 'Everett McIntire',
  ogImage: '/linkImage.png',
  ogImageHeight: 1274,
  ogImageWidth: 1274,
  role: 'Full Stack Software Engineer',
  siteName: 'Everett McIntire',
  themeColorDark: '#101713',
  themeColorLight: '#f7f2e8',
  url: 'https://everettgsm.com',
} as const;

export const impactStats = [
  { label: 'people using shipped product features', value: '10k+' },
  { label: 'faster high-traffic API response', value: '40×' },
  { label: 'independently shipped mobile apps', value: '2' },
] as const;
