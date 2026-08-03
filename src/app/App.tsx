import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouteEffects } from '@/components/RouteEffects';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import HomePage from '@/pages/HomePage';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const PhotographyAlbumPage = lazy(() => import('@/pages/PhotographyAlbumPage'));
const PhotographyCategoryPage = lazy(() => import('@/pages/PhotographyCategoryPage'));
const PhotographyIndexPage = lazy(() => import('@/pages/PhotographyIndexPage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));

function PageFallback() {
  return (
    <div aria-live="polite" className="page-loading" role="status">
      <span className="page-loading__mark" aria-hidden="true">
        EM
      </span>
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <RouteEffects />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutPage />} path="/about" />
            <Route element={<ProjectsPage />} path="/projects" />
            <Route element={<PhotographyIndexPage />} path="/photography" />
            <Route element={<PhotographyCategoryPage />} path="/photography/:categoryId" />
            <Route element={<PhotographyAlbumPage />} path="/photography/:categoryId/:albumId" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
