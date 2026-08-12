import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteMetadata.url,
    rules: { allow: '/', userAgent: '*' },
    sitemap: `${siteMetadata.url}/sitemap.xml`,
  };
}
