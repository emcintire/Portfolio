import taterTapPoster from '@/assets/optimized/tatertap-poster.webp';
import uncaged1 from '@/assets/optimized/uncaged-1.webp';
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    description:
      'A cross-platform guide to Nicolas Cage’s complete filmography, designed, engineered, and shipped independently for iOS and Android.',
    featured: true,
    image: uncaged1,
    links: [
      {
        href: 'https://apps.apple.com/us/app/uncaged/id1593978532',
        label: 'App Store',
        type: 'app-store',
      },
      {
        href: 'https://play.google.com/store/apps/details?id=uncaged.app&pcampaignid=web_share',
        label: 'Google Play',
        type: 'google-play',
      },
      {
        href: 'https://github.com/emcintire/unCaged',
        label: 'Source code',
        type: 'github',
      },
    ],
    name: 'unCaged',
    outcomes: [
      'Built the React Native and TypeScript client plus a Node.js, Express, and MongoDB API in an Nx monorepo.',
      'Generated typed clients, schemas, and TanStack Query hooks from OpenAPI definitions using Orval and Zodios.',
      'Reduced the JavaScript bundle by 600 KB, improved API response times by 20%, and added complete API test coverage.',
    ],
    slug: 'uncaged',
    status: 'Shipped on iOS and Android',
    technologies: [
      'React Native',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'OpenAPI',
      'Orval',
      'TanStack Query',
      'Formik',
      'Zod',
    ],
  },
  {
    description:
      'A fast mobile arcade game where players catch falling potatoes, chase high scores, and compete on global leaderboards.',
    featured: true,
    links: [
      {
        href: 'https://apps.apple.com/us/app/tater-tap/id6742767053',
        label: 'App Store',
        type: 'app-store',
      },
      {
        href: 'https://play.google.com/store/apps/details?id=com.greasyfingers.tatertap&pcampaignid=web_share',
        label: 'Google Play',
        type: 'google-play',
      },
    ],
    name: 'Tater Tap',
    outcomes: [
      'Developed gameplay in Unity and C#, including purchases, advertising, analytics, cloud saves, and third-party authentication.',
      'Reduced average load times by 25% and improved frame-rate performance by 40% through rendering and asset optimization.',
      'Created the visual system and owned store publishing, platform compliance, and release management.',
    ],
    poster: taterTapPoster,
    slug: 'tater-tap',
    status: 'Shipped on iOS and Android',
    technologies: ['Unity', 'C#', 'Unity Services', 'Adobe Illustrator'],
    video: '/tatertap.mp4',
  },
  // {
  //   description:
  //     'An original 3D mall-cop simulation exploring systemic gameplay, environmental storytelling, and deliberately offbeat humor.',
  //   featured: false,
  //   image: construction,
  //   links: [],
  //   name: 'Serve & Protect',
  //   outcomes: [
  //     'Designing and building the project independently in Unity.',
  //     'Developing patrol, interaction, and simulation systems for an emergent single-player experience.',
  //     'Creating a cohesive visual identity and production pipeline for a planned Steam release.',
  //   ],
  //   slug: 'serve-and-protect',
  //   status: 'In development',
  //   technologies: ['Unity', 'C#', '3D game development'],
  // },
];
