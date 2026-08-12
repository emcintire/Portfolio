import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';
import { siteMetadata } from '@/data/site';
import { socialLinks } from '@/data/socialLinks';
import type { GalleryAlbum, GalleryCategory } from '@/types';

import { absoluteUrl } from './seo';

const PERSON_ID = `${siteMetadata.url}/#person`;

/**
 * schema.org builders. Everything is derived from src/data so the structured
 * data cannot drift from the rendered page — the previous Person block was
 * hand-maintained in index.html with a duplicate copy of the social links.
 */

export const personSchema = {
  '@context': 'https://schema.org',
  '@id': PERSON_ID,
  '@type': 'Person',
  address: { '@type': 'PostalAddress', addressCountry: 'US', addressRegion: 'Vermont' },
  description: siteMetadata.description,
  email: `mailto:${siteMetadata.email}`,
  image: absoluteUrl(siteMetadata.ogImage),
  jobTitle: siteMetadata.role,
  knowsAbout: ['React', 'TypeScript', 'ASP.NET', 'Node.js', 'React Native', 'Unity', 'Photography'],
  name: siteMetadata.name,
  sameAs: socialLinks.map((link) => link.url),
  url: siteMetadata.url,
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  author: { '@id': PERSON_ID },
  inLanguage: 'en-US',
  name: siteMetadata.siteName,
  url: siteMetadata.url,
};

export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@id': PERSON_ID,
    '@type': 'Person',
    hasOccupation: experiences.map((experience) => ({
      '@type': 'OrganizationRole',
      roleName: experience.role,
      startDate: experience.startDate,
      ...(experience.endDate === 'Present' ? {} : { endDate: experience.endDate }),
    })),
    name: siteMetadata.name,
    worksFor: experiences.map((experience) => ({
      '@type': 'Organization',
      name: experience.company,
    })),
  },
  url: absoluteUrl('/about'),
};

const APP_STORE_TYPES = new Set(['app-store', 'google-play']);

export const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    item: {
      '@type': 'SoftwareApplication',
      applicationCategory: 'MobileApplication',
      author: { '@id': PERSON_ID },
      description: project.description,
      name: project.name,
      operatingSystem: 'iOS, Android',
      url: project.links.find((link) => APP_STORE_TYPES.has(link.type))?.href,
    },
    position: index + 1,
  })),
  name: 'Selected work',
  url: absoluteUrl('/projects'),
};

type Crumb = { name: string; path: string };

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    item: absoluteUrl(crumb.path),
    name: crumb.name,
    position: index + 1,
  })),
});

export const collectionPageSchema = (category: GalleryCategory) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  author: { '@id': PERSON_ID },
  description: category.description,
  hasPart: category.albums.map((album) => ({
    '@type': 'ImageGallery',
    name: album.title,
    url: absoluteUrl(`/photography/${category.id}/${album.id}`),
  })),
  name: `${category.title} photography`,
  url: absoluteUrl(`/photography/${category.id}`),
});

export const imageGallerySchema = (
  album: GalleryAlbum,
  category: GalleryCategory,
  path: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  author: { '@id': PERSON_ID },
  ...(album.description ? { description: album.description } : {}),
  ...(album.location ? { contentLocation: { '@type': 'Place', name: album.location } } : {}),
  ...(album.year ? { datePublished: album.year } : {}),
  associatedMedia: album.photographs.map((photograph) => ({
    '@type': 'ImageObject',
    contentUrl: photograph.src,
    name: photograph.alt,
  })),
  genre: category.title,
  name: album.title,
  numberOfItems: album.photographs.length,
  url: absoluteUrl(path),
});
