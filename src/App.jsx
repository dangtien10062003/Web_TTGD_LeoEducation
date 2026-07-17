import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { ScrollToTop } from './components/ScrollToTop';
import { RouteSEO } from './components/RouteSEO';
import { RouteAnalytics } from './components/RouteAnalytics';
import { MainLayout } from './layouts/MainLayout';
import './i18n/index.js';

const HomePage = lazy(() => import('./features/Home/pages/HomePage').then((module) => ({ default: module.HomePage })));
const CoursesPage = lazy(() => import('./features/Home/pages/CoursesPage').then((module) => ({ default: module.CoursesPage })));
const InstructorsPage = lazy(() => import('./features/Home/pages/InstructorsPage').then((module) => ({ default: module.InstructorsPage })));
const PricingPage = lazy(() => import('./features/Home/pages/PricingPage').then((module) => ({ default: module.PricingPage })));
const BlogPage = lazy(() => import('./features/Home/pages/BlogPage').then((module) => ({ default: module.BlogPage })));
const AboutPage = lazy(() => import('./features/Home/pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./features/Home/pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const CourseDetail = lazy(() => import('./features/Home/pages/CourseDetail').then((module) => ({ default: module.CourseDetail })));
const PrivacyPage = lazy(() => import('./features/Home/pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./features/Home/pages/TermsPage').then((module) => ({ default: module.TermsPage })));

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] text-navy-800">
    <span className="text-sm font-semibold">Đang tải...</span>
  </div>
);

function App() {
  // On GitHub Pages the path is /Web_TTGD_LEO Education/
  // In dev (localhost) there is no basename
  const isGithubPages = window.location.hostname.includes('github.io');
  const basename = isGithubPages ? '/Web_TTGD_LEO Education' : undefined;

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <RouteSEO />
        <RouteAnalytics />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {basename && <Route path={basename} element={<Navigate to="/" replace />} />}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="teachers" element={<InstructorsPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="courses/:id" element={<CourseDetail />} />
            </Route>
          </Routes>
        </Suspense>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
