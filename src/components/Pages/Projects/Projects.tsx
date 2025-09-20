import { Image } from 'react-bootstrap';
import './Projects.css';
import github from '../../../assets/github.svg';
import eye from '../../../assets/eye.svg';
import flappy_frank from '../../../assets/flappy_frank.png';
import tatertap from '../../../assets/tatertap.gif';
import unCaged from '../../../assets/unCaged.png';

const projects = [
  {
    descriptions: [
      `- A fast-paced mobile tapping game where players catch falling potatoes and compete on global leaderboards.`,
      `- Built using Unity with integrated in-app purchases, advertisements, an in-game economy, and player account management.`,
      `- Managed end-to-end development, from gameplay design and asset creation to backend integration with Unity Services and platform deployment on iOS and Android.`,
    ],
    img: tatertap,
    name: 'Tater Tap',
    viewLink: 'https://apps.apple.com/us/app/tater-tap/id6742767053',
  },
  {
    descriptions: [
      `- An app for discovering, bookmarking, and rating the entirety of Nicolas Cage’s vast and illustrious filmography.`,
      `- Built the frontend with React Native, the backend with Node.js, and managed data storage with MongoDB.`,
    ],
    githubLink: 'https://github.com/emcintire/unCaged',
    img: unCaged,
    name: 'unCaged',
    viewLink: 'https://apps.apple.com/us/app/uncaged/id1593978532',
  },
  {
    descriptions: [
      `- A simple Flappy Bird clone built with Pygame for the mechanics and Illustrator for all of the graphics.`,
      `- Features include scoring, obstacles, and a responsive design.`,
    ],
    githubLink: 'https://github.com/emcintire/FlappyFrank',
    img: flappy_frank,
    name: 'Flappy Frank',
    viewLink: 'https://youtu.be/8NHuylK6O78',
  },
];

export function Projects() {
  return (
    <>
      <div id='projects-page'>
        <div id='projects-container'>
          <h1 className='header' id='projects-header'>
            Projects
          </h1>
          <ul id='projects-list'>
            {projects.map((project, index) => (
              <div key={index} id={`${project.name.toLowerCase()}-card`} className='card project-cards'>
                <Image src={project.img} className='card-img-top' />
                <div className='card-body'>
                  <h3 className='card-title project-title'>{project.name}</h3>
                  <p className='card-text project-desc'>
                    {project.descriptions.map((desc) => (
                      <span key={desc}>
                        {desc}
                        <br />
                      </span>
                    ))}
                  </p>
                  <div id='card-btns'>
                    {project.githubLink && (
                      <a href={project.githubLink} target='_blank' rel='noreferrer'>
                        <Image src={github} alt='github logo' title='Source code' className='logos' />
                      </a>
                    )}
                    {project.viewLink && (
                      <a href={project.viewLink} target='_blank' rel='noreferrer'>
                        <Image src={eye} alt='eye icon' title='Demo' className='logos' id='eye-btn' />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ul>
          {/* <ParticlesBg
                        type="cobweb"
                        bg={false}
                        color="#ffffff"
                        id="particles"
                    /> */}
        </div>
      </div>
    </>
  );
}
