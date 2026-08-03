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
  location: 'Vermont, United States',
  name: 'Everett McIntire',
  role: 'Full Stack Software Engineer',
  url: 'https://everettmcintire.com',
} as const;

export const impactStats = [
  { label: 'people using shipped product features', value: '10k+' },
  { label: 'faster high-traffic API response', value: '40×' },
  { label: 'independently shipped mobile apps', value: '2' },
] as const;
