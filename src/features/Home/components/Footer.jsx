import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe2, ArrowUpRight, PhoneCall, MessageCircle, ArrowUp } from 'lucide-react';
import logoImage from '../../../assets/Gemini_Generated_Image_yykl3wyykl3wyykl-removebg-preview.png';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 240);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quickLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.courses'), path: '/courses' },
    { label: t('nav.teachers'), path: '/teachers' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  const courseLinks = [
    { label: t('footer.course1') || 'Gia sư Toán', path: '/courses' },
    { label: t('footer.course2') || 'Gia sư Tiếng Anh', path: '/courses' },
    { label: t('footer.course3') || 'Gia sư Vật Lý', path: '/courses' },
    { label: t('footer.course4') || 'Gia sư Hóa Học', path: '/courses' },
    { label: t('footer.course5') || 'Ôn thi vào lớp 10', path: '/courses' }
  ];

  return (
    <footer className="bg-white dark:bg-navy-950 text-navy-900 dark:text-gold-50 relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 dark:bg-gold-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo + description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img src={logoImage} alt="LeoEducation Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-navy-700 dark:text-gold-50">LeoEducation</span>
            </div>
            <p className="text-navy-600 dark:text-gold-100/75 mb-2 font-medium">
              {t('footer.tagline') || 'Nấc thang tri thức - Vững bước tương lai!'}
            </p>
            <p className="text-navy-500 dark:text-gold-100/60 mb-6 max-w-sm leading-relaxed">
              {t('footer.description') || 'Trung tâm gia sư online 1-1 hàng đầu Việt Nam. Phương pháp Scaffolded Learning với lộ trình học cá nhân hóa.'}
            </p>
            <div className="flex gap-3">
              {[
                { name: 'facebook', url: 'https://www.facebook.com/leoeducation.vn?locale=vi_VN' },
                { name: 'youtube', url: 'https://youtube.com' },
                { name: 'zalo', url: 'https://zalo.me/0866123170' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-navy-800 hover:bg-gold-600 dark:hover:bg-gold-700 text-navy-700 dark:text-gold-50 hover:text-white flex items-center justify-center transition-all duration-300 border border-gold-100 dark:border-gold-800/60 hover:border-gold-500"
                >
                  <span className="capitalize text-xs font-medium">{social.name[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-gold-700 dark:text-gold-300">
              {t('footer.quickLinks') || 'Liên kết nhanh'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-navy-500 dark:text-gold-100/60 hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-sm flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-gold-700 dark:text-gold-300">
              {t('footer.coursesTitle') || 'Khóa học'}
            </h4>
            <ul className="space-y-3">
              {courseLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-navy-500 dark:text-gold-100/60 hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-sm flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-gold-700 dark:text-gold-300">
              {t('footer.contact') || 'Liên hệ'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-500 dark:text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-navy-500 dark:text-gold-100/60 text-sm">leoeducation.vn@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-500 dark:text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-navy-500 dark:text-gold-100/60 text-sm">0866.123.170</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-gold-500 dark:text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-navy-500 dark:text-gold-100/60 text-sm">Tư vấn online toàn quốc</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gold-100 dark:border-gold-800/60 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-navy-900 dark:text-gold-50 mb-1">{t('footer.newsletter') || 'Đăng ký nhận tin'}</h4>
              <p className="text-sm text-navy-500 dark:text-gold-100/60">{t('footer.newsletterDesc') || 'Nhận thông tin về khóa học và ưu đãi mới nhất'}</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder') || 'Nhập email của bạn'}
                className="px-4 py-3 rounded-xl bg-white dark:bg-navy-900 border border-gold-100 dark:border-gold-800/60 text-navy-900 dark:text-gold-50 placeholder:text-navy-300 dark:placeholder:text-gold-100/40 focus:outline-none focus:border-gold-500 transition-colors flex-1 md:w-64"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold hover:shadow-lg hover:shadow-gold-500/20 transition-all whitespace-nowrap">
                {t('footer.subscribe') || 'Đăng ký'}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gold-100 dark:border-gold-800/60 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 dark:text-gold-100/50 text-sm">
            {t('footer.copyright') || '© 2026 LeoEducation. All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm text-navy-500 dark:text-gold-100/50">
            <Link to="/privacy" className="hover:text-gold-700 dark:hover:text-gold-300 transition-colors">{t('footer.privacy') || 'Chính sách bảo mật'}</Link>
            <Link to="/terms" className="hover:text-gold-700 dark:hover:text-gold-300 transition-colors">{t('footer.terms') || 'Điều khoản'}</Link>
          </div>
        </div>
      </div>

      {/* Fixed floating buttons */}
      <div className="fixed right-4 bottom-5 z-50 flex flex-col gap-3">
        <a
          href="tel:0866123170"
          className="w-11 h-11 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-lg shadow-gold-500/30 ring-4 ring-gold-300/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 animate-pulse dark:ring-gold-300/20"
          aria-label="Gọi điện" title="Gọi điện"
        >
          <PhoneCall className="w-5 h-5" />
        </a>
        <a
          href="https://zalo.me/0866123170"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-lg shadow-gold-500/30 ring-4 ring-gold-300/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 animate-pulse dark:ring-gold-300/20"
          aria-label="Liên hệ Zalo" title="Liên hệ Zalo"
        >
          <span className="text-xs font-bold">ZL</span>
        </a>
        <a
          href="https://www.facebook.com/leoeducation.vn?locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-lg shadow-gold-500/30 ring-4 ring-gold-300/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 animate-pulse dark:ring-gold-300/20"
          aria-label="Liên hệ Messenger" title="Liên hệ Messenger"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white text-gold-700 shadow-lg shadow-gold-900/10 ring-1 ring-gold-200 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-50 dark:bg-gold-500 dark:text-navy-950 dark:ring-gold-300/30 dark:hover:bg-gold-400"
            aria-label="Lên đầu trang" title="Lên đầu trang"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </footer>
  );
};
