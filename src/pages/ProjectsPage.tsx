import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { siteMetadata } from '@/data/site';

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-container page-hero__grid">
          <div>
            <p className="eyebrow">Selected work</p>
            <h1>From first schema to final store submission.</h1>
          </div>
          <div className="page-hero__copy">
            <p>
              These projects show the way I work: understand the whole system, make tradeoffs
              visible, measure the result, and own the details required to ship.
            </p>
            <a className="text-link text-link--large" href={`mailto:${siteMetadata.email}`}>
              Discuss a project <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="page-section projects-page">
        <div className="page-container project-stack">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
