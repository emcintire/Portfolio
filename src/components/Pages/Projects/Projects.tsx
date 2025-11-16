import './Projects.css';
import { Image } from 'react-bootstrap';
import { map, toLower } from 'lodash';
import { GitHub, VisibilityRounded } from '@mui/icons-material';
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
  },
  {
    descriptions: [
      '- A fast-paced mobile tapping game where players catch falling potatoes and compete on global leaderboards.',
      '- Built using Unity and C# with integrated in-app purchases, advertisements, an in-game economy, and player account management.',
      '- Managed end-to-end development, from gameplay design and asset creation to backend integration with Unity Services and platform deployment on iOS and Android.',
    ],
    img: tatertap,
    name: 'Tater Tap',
    viewLink: 'https://apps.apple.com/us/app/tater-tap/id6742767053',
  },
  {
    descriptions: [
      '- An app for discovering, bookmarking, and rating the entirety of Nicolas Cage’s vast and illustrious filmography.',
      '- Built the frontend with React Native and Typescript.',
      '- Created a REST API client with end-to-end typesafety using Zodios and Zod.',
      '- Handled server-side data and state management with Tanstack Query (React Query).',
      '- Utilized Formik and Yup for robust form handling and validation.',
    ],
    img: unCaged,
    name: 'unCaged',
    viewLink: 'https://apps.apple.com/us/app/uncaged/id1593978532',
  },
  {
    descriptions: [
      '- An "It’s Always Sunny in Philadelphia" Flappy Bird clone built with Python and Pygame.',
      '- Created every graphic in Adobe Illustrator and Photoshop.',
      '- Features include scoring, obstacles, and a responsive design.',
    ],
    githubLink: 'https://github.com/emcintire/FlappyFrank',
    img: flappy_frank,
    name: 'Flappy Frank',
    viewLink: 'https://youtu.be/8NHuylK6O78',
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
                <div className='card-btns'>
                  {project.githubLink && (
                    <a href={project.githubLink} target='_blank' rel='noreferrer'>
                      <IconButton>
                        <GitHub className="logos" />
                      </IconButton>
                    </a>
                  )}
                  {project.viewLink && (
                    <a href={project.viewLink} target='_blank' rel='noreferrer'>
                      <IconButton>
                        <VisibilityRounded className="logos" />
                      </IconButton>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
