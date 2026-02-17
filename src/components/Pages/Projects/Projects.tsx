import './Projects.css';
import { useRevealOnIntersect } from '@/helpers';
import { projects } from '@/data/projects';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';

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
              {'images' in project ? (
                <ImageCarousel images={project.images!} alt={project.name} />
              ) : (
                <img src={project.img} className="card-img" width="100%" alt={project.name} />
              )}
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
                  <div className="card-btns" role="group" aria-label={`${project.name} links`}>
                    {project.links.map((link) => (
                      <a href={link.url} target="_blank" rel="noreferrer" key={link.url} aria-label={`${project.name} on ${link.name}`}>
                        <img src={link.badge} alt={link.name} className="store-badge" />
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
