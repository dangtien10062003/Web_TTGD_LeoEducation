import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Mail, Menu, Moon, Phone, Search, Sun, X } from 'lucide-react';
import logoImage from '../../../assets/Gemini_Generated_Image_yykl3wyykl3wyykl-removebg-preview.png';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

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

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="bg-[#171717] text-white">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs font-bold">
          <button type="button" className="inline-flex items-center gap-2 text-white/80 transition hover:text-white">
            <Menu className="h-4 w-4" />
            Menu
          </button>
          <div className="hidden items-center gap-6 md:flex">
            <span className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold-300" /> leoeducation.vn@gmail.com</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold-300" /> 0866.123.170</span>
          </div>
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-white/80" />
            <button
              type="button"
              onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
              className="inline-flex items-center gap-1 text-white/80 transition hover:text-white"
            >
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      <nav className={`border-b border-gold-100/80 bg-[#fffdf6]/95 backdrop-blur-md transition-all duration-300 dark:border-gold-800 dark:bg-navy-950/95 ${scrolled ? 'shadow-lg shadow-navy-900/10' : ''}`}>
        <div className="container mx-auto flex h-[74px] items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-gold-200 bg-white shadow-sm">
              <img src={logoImage} alt="LeoEducation Logo" className="h-full w-full object-contain" />
            </span>
            <span className="hidden text-xl font-black uppercase tracking-wide text-navy-900 dark:text-gold-50 sm:block">
              LeoEducation
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative rounded-full px-4 py-2 text-sm font-black transition ${
                    active
                      ? 'bg-gold-200 text-navy-950'
                      : 'text-navy-800 hover:bg-gold-100 hover:text-navy-950 dark:text-gold-100/80 dark:hover:bg-navy-900'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gold-200"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
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

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full border border-gold-200 bg-white p-2.5 text-navy-900 lg:hidden dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
            aria-label="Mo menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
