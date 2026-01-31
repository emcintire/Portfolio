import './Projects.css';
import { Image } from 'react-bootstrap';
import { map, toLower } from 'lodash';
import { Android, Apple, GitHub, YouTube } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import flappy_frank from '@/assets/images/flappy_frank.gif';
import tatertap from '@/assets/images/tatertap.gif';
import unCaged from '@/assets/images/unCaged.png';
import construction from '@/assets/images/underConstruction.png';
import { useRevealOnIntersect } from '../../../helpers';

const projects = [
  {
    descriptions: [
      'My most ambitious side project to date, a 3D mall cop simulator made in Unity. Patrol the chaos. Keep the peace.',
      'Coming to Steam in 2026 — follow for updates!',
    ],
    img: construction,
    name: 'Serve & Protect',
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
      icon: Apple,
      url: 'https://apps.apple.com/us/app/tater-tap/id6742767053',
    }, {
      icon: Android,
      url: 'https://play.google.com/store/apps/details?id=com.greasyfingers.tatertap&pcampaignid=web_share',
    }, {
      icon: GitHub,
      url: 'https://github.com/emcintire/TaterTap',
    }],
  }, {
    descriptions: [
      'A mobile app for discovering, bookmarking, and rating the entirety of Nicolas Cage’s prolific filmography.',
      'Engineered a type-safe React Native frontend using TypeScript, implementing reusable component patterns, clean forms with Formik, robust validation with Yup, and TanStack Query based client caching for performant data retrieval',
      'Built a scalable backend API with Node.js, Express, and MongoDB, including schema design, structured routing, optimized queries, and robust validation layers while being hosted on Heroku',
      'Reduced bundle size by 600kb and improved API response times by 20% through query optimization and refactoring.',
      'Implemented 100+ automated Jest tests, resulting in 99% API coverage and a more reliable, maintainable codebase.',
      'Deployed the application via Expo, ensuring stable, cross-platform delivery across iOS and Android.',
    ],
    img: unCaged,
    name: 'unCaged',
    links: [{
      icon: Apple,
      url: 'https://apps.apple.com/us/app/uncaged/id1593978532',
    }, {
      icon: Android,
      url: 'https://play.google.com/store/apps/details?id=uncaged.app&pcampaignid=web_share',
    }, {
      icon: GitHub,
      url: 'https://github.com/emcintire/unCaged-server',
    }],
  }, {
    descriptions: [
      'An "It’s Always Sunny in Philadelphia" Flappy Bird clone built with Python and Pygame.',
      'Created every graphic in Adobe Illustrator and Photoshop.',
      'Features include scoring, obstacles, and a responsive design.',
    ],
    img: flappy_frank,
    name: 'Flappy Frank',
    links: [{
      icon: YouTube,
      url: 'https://youtu.be/8NHuylK6O78',
    }, {
      icon: GitHub,
      url: 'https://github.com/emcintire/FlappyFrank',
    }],
  },
];

export function Projects() {
  const getRevealRef = useRevealOnIntersect({ threshold: 0.2 });

  return (
    <div id='projects-page'>
      <div className='projects-container'>
        <ul className='projects-list'>
          {map(projects, (project, index) => (
            <div
              key={project.name}
              id={`${toLower(project.name)}-card`}
              className="card project-cards reveal-item"
              ref={getRevealRef(index)}
            >
              <Image src={project.img} className="card-img" width="100%" />
              <div className="card-body">
                <h3 className="card-title project-title">{project.name}</h3>
                <ul className="card-text project-desc">
                  {map(project.descriptions, (desc) => (
                    <li key={desc}>
                      {desc}
                      <br />
                    </li>
                  ))}
                </ul>
                {project.links && (
                  <div className="card-btns">
                    {map(project.links, (link) => (
                      <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                        <IconButton>
                          <link.icon className="logos" />
                        </IconButton>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
