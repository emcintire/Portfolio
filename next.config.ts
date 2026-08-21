import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: '*.backblazeb2.com', protocol: 'https' },
    ],
  },
  async redirects() {
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
