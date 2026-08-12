import type { Metadata } from 'next';

import { siteMetadata } from '@/data/site';

/** Absolute URL for a site-relative path. Canonical and OG tags must be absolute. */
export const absoluteUrl = (path: string) =>
  `${siteMetadata.url}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

type PageMetadataInput = {
  description: string;
  /** Site-relative, no trailing slash (except the home page). */
  path: string;
  title: string;
};

/**
 * Per-page metadata. `metadataBase` on the root layout resolves the relative
 * canonical, and the title template appends the site name.
 *
 * Replaces the imperative `document.title` / `setAttribute` writes that the old
 * RouteEffects component performed after hydration — which crawlers never saw.
 */
export function buildMetadata({ description, path, title }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    alternates: { canonical: url },
    description,
    openGraph: {
      description,
      locale: siteMetadata.locale,
      siteName: siteMetadata.siteName,
      title,
      type: 'website',
      url,
    },
    title,
    twitter: {
      // `card` has to be repeated here: Next replaces the parent `twitter`
      // object wholesale rather than merging field by field, so omitting it
      // silently downgrades album pages from the root's summary_large_image.
      card: 'summary_large_image',
      description,
      title,
    },
  };
}
