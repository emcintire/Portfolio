import Image from 'next/image';
import Link from 'next/link';

import portrait from '@/assets/optimized/pp.webp';
import { CategoryCard } from '@/components/CategoryCard';
import { CountUp } from '@/components/CountUp';
import { Marquee } from '@/components/Marquee';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionIntro } from '@/components/SectionIntro';
import { SplitWords } from '@/components/SplitWords';
import { galleryCategories } from '@/data/galleries';
import { projects } from '@/data/projects';
import { impactStats, marqueeWords, siteMetadata } from '@/data/site';
import { JsonLd } from '@/lib/JsonLd';
import { personSchema, webSiteSchema } from '@/lib/schema';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={webSiteSchema} />
      <section className="hero">
        <div className="page-container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Full-stack engineer · Vermont</p>
            <h1 className="hero__title">
              <SplitWords text="Come with me if you want to" />{' '}
              <span className="hero__highlight">
                <SplitWords from={7} text="ship." />
                <svg
                  aria-hidden="true"
                  className="hero__squiggle"
                  preserveAspectRatio="none"
                  viewBox="0 0 200 24"
                >
                  <path d="M4 16C30 6 52 21 82 12s50-8 78 1 30 4 36-4" pathLength="1" />
                </svg>
              </span>
            </h1>
            <p className="hero__lede">
              I turn complex product requirements into reliable web and mobile experiences—working
              across React, Node.js, Django, .NET, and Unity.
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

          <div className="hero-portrait pointer-field">
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

      <Marquee items={marqueeWords} />

      <section aria-label="Selected impact" className="impact-strip">
        <div className="page-container impact-strip__grid">
          {impactStats.map((stat) => (
            <div className="impact-stat" data-reveal="" key={stat.value}>
              <strong>
                <CountUp value={stat.value} />
              </strong>
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
              <li data-reveal="" key={category.id}>
                <CategoryCard
                  category={category}
                  sizes="(max-width: 576px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-banner">
        <div className="page-container contact-banner__inner" data-reveal="">
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
