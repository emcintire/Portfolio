import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getGalleryAlbum, getGalleryCategory } from '@/data/galleries';
import { siteMetadata } from '@/data/site';

const getPageMetadata = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);

  if (pathname === '/') {
    return {
      description: siteMetadata.description,
      title: `${siteMetadata.name} — ${siteMetadata.role}`,
    };
  }

  if (segments[0] === 'photography') {
    const category = getGalleryCategory(segments[1]);
    const album = getGalleryAlbum(segments[1], segments[2] ?? category?.directAlbum);
    const label = album?.title ?? category?.title ?? 'Photography';
    return {
      description: category?.description ?? `Photography by ${siteMetadata.name}.`,
      title: `${label} — ${siteMetadata.name}`,
    };
  }

  const labels: Record<string, string> = {
    about: 'About',
    projects: 'Selected Work',
  };
  const label = labels[segments[0] ?? ''] ?? 'Page not found';

  return {
    description: siteMetadata.description,
    title: `${label} — ${siteMetadata.name}`,
  };
};

export function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(pathname);
    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', metadata.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `${siteMetadata.url}${pathname === '/' ? '/' : pathname}`);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', metadata.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', `${siteMetadata.url}${pathname === '/' ? '/' : pathname}`);
    window.scrollTo({ left: 0, top: 0 });

    const frame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
