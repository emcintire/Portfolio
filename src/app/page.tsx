import Image from 'next/image';
import Link from 'next/link';

import portrait from '@/assets/optimized/pp.webp';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionIntro } from '@/components/SectionIntro';
import { galleryCategories } from '@/data/galleries';
import { projects } from '@/data/projects';
import { impactStats, siteMetadata } from '@/data/site';

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <section className="hero">
        <div className="page-container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Full-stack engineer · Vermont</p>
            <h1>I build products that stay useful after the demo.</h1>
            <p className="hero__lede">
              I turn complex product requirements into reliable web, mobile, and game
              experiences—working across React, Node.js, Django, .NET, and Unity.
            </p>
            <div className="button-row">
              <Link className="button button--primary" href="/projects">
                View selected work
              </Link>
              <a className="button button--secondary" href={`mailto:${siteMetadata.email}`}>
                Start a conversation
              </a>
            </div>
          </div>

          <div className="hero-portrait">
            <div className="topographic-rings" aria-hidden="true">
              {Array.from({ length: 7 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
            <Image
              alt="Everett McIntire outdoors in a mountain landscape"
              priority
              sizes="(max-width: 768px) 82vw, 35vw"
              src={portrait}
            />
            <p className="hero-portrait__caption">
              <span>Engineer</span>
              <span>Photographer</span>
              <span>Explorer</span>
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Selected impact" className="impact-strip">
        <div className="page-container impact-strip__grid">
          {impactStats.map((stat) => (
            <div className="impact-stat" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <SectionIntro
            eyebrow="Selected work"
            heading="Products shipped, measured, and improved."
            text={
              <p>
                Independent products built through the whole lifecycle—from schema and API design to
                performance work, release management, and real-user feedback.
              </p>
            }
          />
          <div className="project-stack">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="section-action">
            <Link className="text-link text-link--large" href="/projects">
              See every project <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section page-section--tinted">
        <div className="page-container">
          <SectionIntro
            eyebrow="Beyond the screen"
            heading="Photography keeps me attentive."
            text={
              <p>
                Landscapes and portraits sharpen the same instincts I use in product work:
                composition, patience, observation, and knowing what to leave out.
              </p>
            }
          />
          <ul className="gallery-card-grid">
            {galleryCategories.slice(0, 3).map((category) => (
              <li key={category.id}>
                <Link className="gallery-card" href={`/photography/${category.id}`}>
                  <Image
                    alt=""
                    sizes="(max-width: 576px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={category.cardCover}
                  />
                  <span className="gallery-card__overlay">
                    <strong>{category.title}</strong>
                    <span>
                      {category.albums.length}{' '}
                      {category.albums.length === 1 ? 'collection' : 'albums'}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-banner">
        <div className="page-container contact-banner__inner">
          <div>
            <p className="eyebrow">Let’s build something durable</p>
            <h2>Have a product problem worth owning?</h2>
          </div>
          <a className="button button--light" href={`mailto:${siteMetadata.email}`}>
            {siteMetadata.email}
          </a>
        </div>
      </section>
    </>
  );
}
