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
  image?: string;
  imageSmall?: string;
  links: ProjectLink[];
  name: string;
  outcomes: string[];
  poster?: string;
  slug: string;
  status: string;
  technologies: string[];
  video?: string;
};

export type Experience = {
  company: string;
  endDate: string;
  highlights: string[];
  logo: string;
  role: string;
  startDate: string;
  technologies: string[];
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type GalleryAlbum = {
  cover: string;
  coverSmall: string;
  id: string;
  photographs: Photograph[];
  title: string;
  year?: string;
};

export type GalleryCategory = {
  albums: GalleryAlbum[];
  cardCover: string;
  cardCoverHeight: number;
  cardCoverSmall: string;
  cardCoverSmallHeight: number;
  coverHeight: number;
  coverWidth: number;
  description: string;
  directAlbum?: string;
  id: string;
  cover: string;
  title: string;
};
