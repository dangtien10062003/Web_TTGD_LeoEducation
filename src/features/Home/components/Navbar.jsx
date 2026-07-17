import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import logoImage from '../../../assets/Gemini_Generated_Image_yykl3wyykl3wyykl-removebg-preview.png';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import GooeyNav from '../../../components/GooeyNav';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.courses'), path: '/courses' },
    { label: t('nav.teachers'), path: '/teachers' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];
  const desktopNavItems = navItems.map((item) => ({ label: item.label, href: item.path }));
  const activeNavIndex = Math.max(
    0,
    navItems.findIndex((item) => (
      item.path === '/'
        ? location.pathname === '/'
        : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
    )),
  );

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <nav className={`border-b border-gold-100/80 bg-[#fffdf6]/95 backdrop-blur-md transition-all duration-300 dark:border-gold-800 dark:bg-navy-950/95 ${scrolled ? 'shadow-lg shadow-navy-900/10' : ''}`}>
        <div className="container mx-auto flex h-[74px] items-center justify-between px-4">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-gold-200 bg-white shadow-sm">
              <img src={logoImage} alt="LEO Education Logo" className="h-full w-full object-contain" />
            </span>
            <span className="block min-w-0 leading-tight">
              <span className="block text-base font-black uppercase tracking-wide text-navy-900 dark:text-gold-50 sm:text-xl">
                LEO Education
              </span>
              <span className="mt-1 inline-flex max-w-[190px] rounded-full bg-gold-200 px-2 py-0.5 text-[9px] font-bold leading-snug text-navy-950 shadow-sm shadow-gold-500/10 dark:bg-gold-300 dark:text-navy-950 sm:max-w-none sm:px-2.5 sm:text-[11px]">
                {t('hero.tagline')}
              </span>
            </span>
          </Link>

          <div className="hidden items-center lg:flex">
            <GooeyNav
              items={desktopNavItems}
              particleCount={12}
              particleDistances={[58, 8]}
              particleR={80}
              initialActiveIndex={activeNavIndex}
              animationTime={520}
              timeVariance={220}
              colors={[1, 2, 1, 3, 2, 1, 4]}
            />
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex h-11 items-center justify-center gap-1 rounded-full border border-gold-200 bg-white px-3 text-xs font-black text-navy-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-50 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
              title="Doi ngon ngu"
            >
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-200 bg-white text-navy-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-50 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
              title={isDarkMode ? 'Chuyen sang giao dien sang' : 'Chuyen sang giao dien toi'}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/contact"
              className="rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold uppercase text-navy-950 transition hover:-translate-y-0.5 hover:bg-gold-600"
            >
              {t('hero.joinTrial')}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex h-10 items-center justify-center gap-1 rounded-full border border-gold-200 bg-white px-2.5 text-[11px] font-black text-navy-900 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
              aria-label="Doi ngon ngu"
            >
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full border border-gold-200 bg-white p-2.5 text-navy-900 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
              aria-label="Mo menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-gold-100 bg-[#fffdf6] dark:border-gold-800 dark:bg-navy-950 lg:hidden"
            >
              <div className="container mx-auto space-y-2 px-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm font-black ${
                      location.pathname === item.path ? 'bg-gold-200 text-navy-950' : 'text-navy-800 dark:text-gold-100/80'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center justify-between border-t border-gold-100 pt-4 dark:border-gold-900">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-200 bg-white text-navy-900 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
                  >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-gold-500 px-5 py-2.5 text-xs font-semibold uppercase text-navy-950"
                  >
                    {t('hero.joinTrial')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
