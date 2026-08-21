import Image from 'next/image';

import portrait from '@/assets/optimized/pp.webp';
import { CopyEmailButton } from '@/components/CopyEmailButton';
import { Icon } from '@/components/Icon';
import { SectionIntro } from '@/components/SectionIntro';
import { experiences } from '@/data/experience';
import { siteMetadata } from '@/data/site';
import { skillGroups } from '@/data/skills';
import { JsonLd } from '@/lib/JsonLd';
import { profilePageSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  description: `${siteMetadata.role} in ${siteMetadata.location}. Experience across React, TypeScript, ASP.NET, Django, Node.js, and Unity — plus the working habits behind it.`,
  path: '/about',
  title: 'About',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageSchema} />
      <section className="page-hero">
        <div className="page-container page-hero__grid">
          <div>
            <p className="eyebrow">About</p>
            <h1>Software engineer, photographer, and firm believer in second breakfast.</h1>
          </div>
          <div className="page-hero__copy">
            <p>
              I’m a full-stack software engineer who enjoys taking ambiguous product ideas from
              first conversation to dependable production software.
            </p>
            <p>
              My work spans React and React Native interfaces, typed Node.js and .NET APIs, data
              modeling, performance, CI/CD, release management, and the feedback loops that keep a
              product improving.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section about-profile">
        <div className="page-container about-profile__grid">
          <Image
            alt="Everett McIntire standing in a mountain landscape"
            sizes="(max-width: 768px) 100vw, 40vw"
            src={portrait}
          />
          <div>
            <p className="eyebrow">A little more context</p>
            <h2>I like working close to the problem.</h2>
            <p>
              The projects I enjoy most require both technical depth and product judgment:
              understanding the real constraint, choosing an appropriately simple design, measuring
              the result, and staying involved after launch.
            </p>
            <p>
              Away from a keyboard, I watch films, listen to music, take photographs, snowboard
              through winter, hike through summer, and keep a few overly ambitious side projects
              moving.
            </p>
            <div className="button-row">
              <a
                className="button button--primary"
                download="Everett-McIntire-Resume.pdf"
                href="/resume.pdf"
              >
                Download résumé <Icon name="download" size={18} />
              </a>
              <CopyEmailButton />
            </div>
            <p className="contact-note">
              Or write directly to <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="page-section page-section--tinted">
        <div className="page-container">
          <SectionIntro
            eyebrow="Experience"
            heading="Building and improving production software."
          />
          <ol className="experience-list">
            {experiences.map((experience) => (
              <li className="experience-item" key={`${experience.company}-${experience.role}`}>
                <div className="experience-item__marker">
                  <Image alt="" height={48} src={experience.logo} width={48} />
                </div>
                <div className="experience-item__meta">
                  <p>
                    {experience.startDate} — {experience.endDate}
                  </p>
                  <p>{experience.company}</p>
                </div>
                <article className="experience-card">
                  <h3>{experience.role}</h3>
                  <ul className="outcome-list">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <ul aria-label={`${experience.company} technologies`} className="tag-list">
                    {experience.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <SectionIntro
            eyebrow="Capabilities"
            heading="A broad toolkit, organized around shipping."
            text={
              <p>Tools change. The useful part is knowing how the layers affect one another.</p>
            }
          />
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <section className="skill-group" key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="page-container">
          <figure className="testimonial">
            <blockquote>
              &ldquo;Everett is an excellent developer and a consummate professional. I have seen
              him rescue foundering projects quickly, structure over a year’s worth of work with
              ease, and build useful and elegant tools that his coworkers readily adopted.&rdquo;
            </blockquote>
            <figcaption>
              <strong>Aaron McDavid</strong>
              <span>Former manager, Center for Applied Management Practices</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
