import tatertap from '@/assets/images/tatertap.gif';
import uncaged1 from '@/assets/images/uncaged-1.png';
import uncaged2 from '@/assets/images/uncaged-2.png';
import uncaged3 from '@/assets/images/uncaged-3.png';
import uncaged4 from '@/assets/images/uncaged-4.png';
import construction from '@/assets/images/underConstruction.png';
import appStoreBadge from '@/assets/images/app-store-badge.svg';
import googlePlayBadge from '@/assets/images/google-play-badge.svg';
import githubBadge from '@/assets/images/github-badge.svg';
// import flappy_frank from '@/assets/images/flappy_frank.gif';

export const projects = [
  {
    descriptions: [
      'My most ambitious side project to date, a 3D mall cop simulator made in Unity. Patrol the chaos. Keep the peace.',
      'Coming to Steam in 2026 — follow for updates!',
    ],
    img: construction,
    name: 'Serve & Protect',
  },
  {
    descriptions: [
      'A mobile app for discovering, bookmarking, and rating the entirety of Nicolas Cage\'s prolific filmography.',
      'Engineered a type-safe React Native frontend using TypeScript, implementing reusable component patterns, clean forms with Formik and Zod validation, and TanStack Query based client caching for performant data retrieval',
      'Built a scalable backend API with Node.js, Express, and MongoDB, including schema design, structured routing, optimized queries, and robust validation layers while being hosted on Heroku',
      'Reduced bundle size by 600kb and improved API response times by 20% through query optimization and refactoring.',
      'Implemented 100+ automated Jest tests, resulting in 99% API coverage and a more reliable, maintainable codebase.',
      'Deployed the application via Expo, ensuring stable, cross-platform delivery across iOS and Android.',
    ],
    images: [uncaged1, uncaged2, uncaged3, uncaged4],
    name: 'unCaged',
    links: [{
      badge: appStoreBadge,
      name: 'App Store',
      url: 'https://apps.apple.com/us/app/uncaged/id1593978532',
    }, {
      badge: googlePlayBadge,
      name: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=uncaged.app&pcampaignid=web_share',
    }, {
      badge: githubBadge,
      name: 'GitHub',
      url: 'https://github.com/emcintire/unCaged',
    }],
  }, {
    descriptions: [
      'A fast-paced mobile tapping game where players catch falling potatoes and compete on global leaderboards.',
      'Developed core gameplay systems with Unity and C#, integrating Unity Services for in-app purchases, advertisements, analytics, cloud save, and third party authentication (Google, Apple, Meta).',
      'Reduced average load times by 25% and improved FPS performance by 40% through rendering and asset optimization.',
      'Created game assets and UI elements in Adobe Illustrator, ensuring a cohesive and consistent user experience.',
      'Owned the full delivery pipeline, including App Store publishing, platform compliance, and release management.',
    ],
    img: tatertap,
    name: 'Tater Tap',
    links: [{
      badge: appStoreBadge,
      name: 'App Store',
      url: 'https://apps.apple.com/us/app/tater-tap/id6742767053',
    }, {
      badge: googlePlayBadge,
      name: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.greasyfingers.tatertap&pcampaignid=web_share',
    },],
  },
  // {
  //   descriptions: [
  //     'An "It\'s Always Sunny in Philadelphia" Flappy Bird clone built with Python and Pygame.',
  //     'Created every graphic in Adobe Illustrator and Photoshop.',
  //     'Features include scoring, obstacles, and a responsive design.',
  //   ],
  //   img: flappy_frank,
  //   name: 'Flappy Frank',
  //   links: [{
  //     icon: YouTube,
  //     name: 'YouTube',
  //     url: 'https://youtu.be/8NHuylK6O78',
  //   }, {
  //     icon: GitHub,
  //     name: 'GitHub',
  //     url: 'https://github.com/emcintire/FlappyFrank',
  //   }],
  // },
];
