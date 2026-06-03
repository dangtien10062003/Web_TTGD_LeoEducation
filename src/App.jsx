import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ScrollToTop } from './components/ScrollToTop';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './features/Home/pages/HomePage';
import { CoursesPage } from './features/Home/pages/CoursesPage';
import { InstructorsPage } from './features/Home/pages/InstructorsPage';
import { PricingPage } from './features/Home/pages/PricingPage';
import { BlogPage } from './features/Home/pages/BlogPage';
import { AboutPage } from './features/Home/pages/AboutPage';
import { ContactPage } from './features/Home/pages/ContactPage';
import './i18n/index.js';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="instructors" element={<InstructorsPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
