import type { StaticImageData } from 'next/image';

import type { Photograph } from './photograph';

export type { Photograph } from './photograph';

export type NavigationItem = {
  href: string;
  label: string;
};

export type SocialIcon = 'github' | 'instagram' | 'linkedin';

export type SocialLink = {
  icon: SocialIcon;
  name: string;
  url: string;
};

export type ProjectLink = {
  href: string;
  label: string;
  type: 'app-store' | 'github' | 'google-play';
};

export type Project = {
  description: string;
  featured: boolean;
  image?: StaticImageData;
  links: ProjectLink[];
  name: string;
  outcomes: string[];
  poster?: StaticImageData;
  slug: string;
  status: string;
  technologies: string[];
  /** Path under public/ — Next does not resolve video imports as modules. */
  video?: string;
};

export type Experience = {
  company: string;
  endDate: string;
  highlights: string[];
  logo: StaticImageData;
  role: string;
  startDate: string;
  technologies: string[];
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type GalleryAlbum = {
  cover: StaticImageData;
  /** Unique per-album copy. Feeds the album page's meta description and JSON-LD. */
  description?: string;
  id: string;
  /** Human-readable place, when the album has an unambiguous one. */
  location?: string;
  photographs: Photograph[];
  title: string;
  year?: string;
};

export type GalleryCategory = {
  albums: GalleryAlbum[];
  /** Landscape crop used on the home and photography index cards. */
  cardCover: StaticImageData;
  /** Full-bleed hero on the category page. */
  cover: StaticImageData;
  description: string;
  directAlbum?: string;
  id: string;
  title: string;
};
