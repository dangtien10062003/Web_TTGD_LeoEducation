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
    const handleScroll = () => setScrolled(window.scrollY > 24);
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="bg-gold-400 text-navy-900">
        <div className="container mx-auto flex h-7 items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-wide">
          <div className="hidden items-center gap-4 sm:flex">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> leoeducation.vn@gmail.com</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> 0866.123.170</span>
          </div>
          <span className="sm:hidden">LeoEducation</span>
          <Search className="hidden h-3.5 w-3.5 sm:block" />
        </div>
      </div>

      <nav className={`border-b border-gold-100 bg-white/96 backdrop-blur transition-all duration-300 dark:border-gold-800 dark:bg-navy-950/95 ${scrolled ? 'shadow-lg shadow-navy-900/10' : ''}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-white">
              <img src={logoImage} alt="LeoEducation Logo" className="h-full w-full object-contain" />
            </span>
            <span className="hidden text-lg font-extrabold uppercase tracking-wide text-navy-800 dark:text-gold-100 sm:block">
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
                  className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                    active ? 'text-gold-600' : 'text-navy-700 hover:text-gold-600 dark:text-gold-100/75 dark:hover:text-gold-300'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-4 -bottom-[21px] h-1 rounded-t bg-gold-400"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-200 bg-white text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
              title={isDarkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-gold-200 bg-white px-4 text-sm font-bold text-navy-800 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
            >
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </button>
            <Link
              to="/contact"
              className="rounded-full bg-gradient-to-r from-gold-200 to-gold-400 px-5 py-2.5 text-sm font-bold uppercase text-navy-900 shadow-lg shadow-gold-500/20 ring-1 ring-gold-300 transition hover:-translate-y-0.5 hover:from-gold-300 hover:to-gold-500 hover:shadow-xl"
            >
              {t('hero.joinTrial')}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md border border-gold-200 p-2 text-navy-800 lg:hidden dark:border-gold-800 dark:text-gold-100"
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
              className="overflow-hidden border-t border-gold-100 bg-white dark:border-gold-800 dark:bg-navy-950 lg:hidden"
            >
              <div className="container mx-auto space-y-1 px-4 py-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-md px-3 py-3 text-sm font-bold uppercase ${
                      location.pathname === item.path ? 'bg-gold-100 text-gold-700' : 'text-navy-700 dark:text-gold-100/75'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-gold-100 pt-3 dark:border-gold-900">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-200 bg-gold-50 text-navy-800 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
                    >
                      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 text-sm font-bold text-navy-800 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-100"
                    >
                      <Globe className="h-4 w-4" />
                      {i18n.language.toUpperCase()}
                    </button>
                  </div>
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-gradient-to-r from-gold-200 to-gold-400 px-4 py-2 text-xs font-black uppercase text-navy-900 shadow"
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
