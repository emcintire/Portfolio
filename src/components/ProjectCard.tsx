import Image from 'next/image';

import type { Project } from '@/types';

import { Icon } from './Icon';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" id={project.slug}>
      <div className="project-card__media">
        {project.video ? (
          <video
            aria-label={`${project.name} gameplay preview`}
            controls
            playsInline
            poster={project.poster?.src}
            preload="metadata"
          >
            <source src={project.video} type="video/mp4" />
            <track default kind="captions" label="No dialogue" srcLang="en" />
            Your browser does not support embedded video.
          </video>
        ) : (
          project.image && (
            <Image
              alt={`${project.name} project preview`}
              sizes="(max-width: 1024px) 100vw, 45vw"
              src={project.image}
            />
          )
        )}
      </div>

      <div className="project-card__content">
        <div className="project-card__heading">
          <div>
            <p className="eyebrow">{project.status}</p>
            <h2>{project.name}</h2>
          </div>
          <span className="project-card__index" aria-hidden="true">
            {project.featured ? 'Featured' : 'Lab'}
          </span>
        </div>

        <p className="project-card__summary">{project.description}</p>

        <ul className="outcome-list">
          {project.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>

        <ul aria-label={`${project.name} technologies`} className="tag-list">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        {project.links.length > 0 && (
          <div className="project-card__links">
            {project.links.map((link) => (
              <a
                className="text-link"
                href={link.href}
                key={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
                <Icon name="external" size={16} />
                <span className="sr-only"> opens in a new tab</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
