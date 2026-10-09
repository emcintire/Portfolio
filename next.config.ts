import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ hostname: '*.backblazeb2.com', protocol: 'https' }],
  },
  async redirects() {
    return [
      {
        destination: '/photography/animals',
        source: '/photography/animals/animals',
        statusCode: 301,
      },
      {
        destination: '/photography/favorites',
        source: '/photography/favorites/favorites',
        statusCode: 301,
      },
      // Miscellaneous was retired. :path* also matches the bare category URL,
      // so old links and share images land on the photography index.
      {
        destination: '/photography',
        source: '/photography/misc/:path*',
        statusCode: 301,
      },
      // Landscape was renamed Travel. :path* also matches the bare category
      // URL, so this one rule covers the category, its albums and share images.
      {
        destination: '/photography/travel/:path*',
        source: '/photography/landscape/:path*',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
