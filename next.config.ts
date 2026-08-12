import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // `npm run check` (and CI) runs `eslint .` against the flat config, which
    // includes @next/eslint-plugin-next. Letting `next build` run its own pass
    // as well just lints everything twice.
    ignoreDuringBuilds: true,
  },
  images: {
    // Gallery photographs are hotlinked from Imgur. Thumbnails stay plain <img>
    // (Imgur already serves a sized variant), but the lightbox can opt in.
    remotePatterns: [{ hostname: 'i.imgur.com', protocol: 'https' }],
  },
  async redirects() {
    // The animals and misc categories render their gallery at the category URL,
    // so the nested album URL is duplicate content. 301 rather than `permanent`,
    // which emits a 308.
    return [
      {
        destination: '/photography/animals',
        source: '/photography/animals/animals',
        statusCode: 301,
      },
      {
        destination: '/photography/misc',
        source: '/photography/misc/misc',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
