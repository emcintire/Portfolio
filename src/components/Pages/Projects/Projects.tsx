import './Projects.css';
import { map, toLower } from 'lodash';
import { IconButton } from '@mui/material';
import { useRevealOnIntersect } from '../../../helpers';
import { projects } from '../../../data/projects';

export function Projects() {
  const revealRef = useRevealOnIntersect();

  return (
    <div id='projects-page'>
      <div className='projects-container'>
        <ul className='projects-list'>
          {map(projects, (project) => (
            <div
              key={project.name}
              id={`${toLower(project.name)}-card`}
              className="card project-cards reveal-item"
              ref={revealRef}
            >
              <img src={project.img} className="card-img" width="100%" alt={project.name} />
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
