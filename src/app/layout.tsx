import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { RouteFocus } from '@/components/RouteFocus';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { siteMetadata } from '@/data/site';
import { absoluteUrl } from '@/lib/seo';
import { themeScript } from '@/lib/themeScript';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
  authors: [{ name: siteMetadata.name, url: siteMetadata.url }],
  creator: siteMetadata.name,
  description: siteMetadata.description,
  icons: { icon: siteMetadata.ogImage },
  metadataBase: new URL(siteMetadata.url),
  openGraph: {
    description: siteMetadata.description,
    images: [
      {
        height: siteMetadata.ogImageHeight,
        url: siteMetadata.ogImage,
        width: siteMetadata.ogImageWidth,
      },
    ],
    locale: siteMetadata.locale,
    siteName: siteMetadata.siteName,
    title: `${siteMetadata.name} — ${siteMetadata.role}`,
    type: 'website',
    url: siteMetadata.url,
  },
  robots: {
    follow: true,
    googleBot: { follow: true, index: true },
    index: true,
  },
  title: {
    default: `${siteMetadata.name} — ${siteMetadata.role}`,
    template: `%s — ${siteMetadata.name}`,
  },
  twitter: {
    card: 'summary_large_image',
    description: siteMetadata.description,
    title: `${siteMetadata.name} — ${siteMetadata.role}`,
  },
};

// theme-color and color-scheme must come from `viewport`, not `metadata`;
// Next drops them from `metadata` with a build-time warning.
export const viewport: Viewport = {
  colorScheme: 'light dark',
  initialScale: 1,
  themeColor: siteMetadata.themeColorLight,
  width: 'device-width',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The theme script below mutates documentElement before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link crossOrigin="anonymous" href="https://i.imgur.com" rel="preconnect" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <ThemeProvider>
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <RouteFocus />
        </ThemeProvider>
      </body>
    </html>
  );
}
