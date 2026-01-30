import './Projects.css';
import { Image } from 'react-bootstrap';
import { map, toLower } from 'lodash';
import { Android, Apple, GitHub, YouTube } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import flappy_frank from '@/assets/images/flappy_frank.gif';
import tatertap from '@/assets/images/tatertap.gif';
import unCaged from '@/assets/images/unCaged.png';
import construction from '@/assets/images/underConstruction.png';

const projects = [
  {
    descriptions: [
      '- My most ambitious side project to date, a 3D mall cop simulator made in Unity. Patrol the chaos. Keep the peace.',
      '- Coming to Steam in 2026 — follow for updates!',
    ],
    img: construction,
    name: 'Serve & Protect',
  }, {
    descriptions: [
      '- A fast-paced mobile tapping game where players catch falling potatoes and compete on global leaderboards.',
      '- Built the game with Unity/C#, with integrated systems for in-app purchases, in-game economy, third party authentication (Google, Meta, Apple), and advertisements.',
      '- Optimized gameplay performance, implemented polished UX, created assets in Adobe Illustrator, and ensured a stable experience across iOS and Android environments.',
      '- Managed all publishing workflows, including app store deployment, compliance, and release management. ',
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
      '- An app for discovering, bookmarking, and rating the entirety of Nicolas Cage’s vast and illustrious filmography.',
      '- Built with the MERN stack (MongoDB, Express, React Native, Node.js) and hosted on Heroku.',
      '- Defined a REST API client with end-to-end typesafety using Zodios and Zod.',
      '- Handled server-side data and state management/caching with Tanstack Query (React Query).',
      '- Utilized Formik and Yup for robust form handling and validation.',
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
      '- An "It’s Always Sunny in Philadelphia" Flappy Bird clone built with Python and Pygame.',
      '- Created every graphic in Adobe Illustrator and Photoshop.',
      '- Features include scoring, obstacles, and a responsive design.',
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
  return (
    <div id='projects-page'>
      <div className='projects-container'>
        <ul className='projects-list'>
          {map(projects, (project, index) => (
            <div key={index} id={`${toLower(project.name)}-card`} className='card project-cards'>
              <Image src={project.img} className='card-img' width="100%" />
              <div className='card-body'>
                <h3 className='card-title project-title'>{project.name}</h3>
                <p className='card-text project-desc'>
                  {map(project.descriptions, (desc) => (
                    <span key={desc}>
                      {desc}
                      <br />
                    </span>
                  ))}
                </p>
                {project.links && (
                  <div className='card-btns'>
                    {map(project.links, (link) => (
                      <a href={link.url} target='_blank' rel='noreferrer'>
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
