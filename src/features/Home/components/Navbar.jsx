import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.courses'), path: '/courses' },
    { label: t('nav.teachers'), path: '/teachers' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/20 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-navy-600 flex items-center justify-center shadow-lg group-hover:shadow-teal-500/30 transition-shadow">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-gradient">LeoEducation</span>
                <span className="hidden md:block text-[11px] text-slate-500 dark:text-gray-400">
                  {t('hero.tagline')}
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-slate-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white/5'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-teal-500/10 dark:bg-teal-500/15 rounded-xl -z-10 border border-teal-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              title={isDarkMode ? 'Chuyển sang Light' : 'Chuyển sang Dark'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language.toUpperCase()}</span>
            </motion.button>
            <Link to="/contact">
              <motion.button whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-shadow"
              >
                {t('hero.cta')}
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-white/10 transition-colors border border-white/10"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800 dark:border-gray-700 shadow-xl p-2">
                {navItems.map((item, i) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'bg-teal-500/10 text-teal-400'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-3">
                    <button onClick={toggleTheme} className="flex items-center gap-2 text-sm text-gray-400">
                      {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{i18n.language.toUpperCase()}</span>
                    </button>
                  </div>
                  <Link to="/contact" onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold"
                  >
                    {t('hero.cta')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
