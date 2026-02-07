import './Projects.css';
import { IconButton } from '@mui/material';
import { useRevealOnIntersect } from '@/helpers';
import { projects } from '@/data/projects';

export function Projects() {
  const revealRef = useRevealOnIntersect();

  return (
    <div id='projects-page'>
      <div className='projects-container'>
        <ul className='projects-list'>
          {projects.map((project) => (
            <div
              key={project.name}
              id={`${project.name.toLowerCase()}-card`}
              className="card project-cards reveal-item"
              ref={revealRef}
            >
              <img src={project.img} className="card-img" width="100%" alt={project.name} />
              <div className="card-body">
                <h3 className="card-title project-title">{project.name}</h3>
                <ul className="card-text project-desc">
                  {project.descriptions.map((desc) => (
                    <li key={desc}>
                      {desc}
                      <br />
                    </li>
                  ))}
                </ul>
                {project.links && (
                  <div className="card-btns">
                    {project.links.map((link) => (
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
