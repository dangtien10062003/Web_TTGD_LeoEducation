import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, GraduationCap, ArrowUpRight, PhoneCall, MessageCircle, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 240);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    quickLinks: [
      { label: t('nav.home'), path: '/' },
      { label: t('nav.courses'), path: '/courses' },
      { label: t('nav.about'), path: '/about' },
      { label: t('nav.contact'), path: '/contact' }
    ],
    courses: [
      { label: 'Lập trình Web', path: '/courses' },
      { label: 'Digital Marketing', path: '/courses' },
      { label: 'UI/UX Design', path: '/courses' },
      { label: 'Data Science', path: '/courses' }
    ]
  };

  return (
<footer id="contact" className="bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-white relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-navy-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
<span className="text-xl font-bold">LeoEducation</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-2 max-w-sm leading-relaxed font-medium">
              Nấc thang tri thức - Vững bước tương lai!
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm leading-relaxed">
              Nền tảng giáo dục trực tuyến hàng đầu Việt Nam, cam kết mang đến những khóa học chất lượng cao.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 hover:bg-teal-600 dark:hover:bg-teal-700 text-slate-700 dark:text-white flex items-center justify-center transition-all duration-300 border border-slate-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-600"
                >
                  <span className="capitalize text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300 dark:text-gray-400">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-300 transition-colors text-sm flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300 dark:text-gray-400">Khóa học</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-slate-400 dark:text-gray-500 hover:text-teal-400 dark:hover:text-teal-300 transition-colors text-sm flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300 dark:text-gray-400">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-500 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 dark:text-gray-500 text-sm">contact@leoeducation.vn</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-500 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 dark:text-gray-500 text-sm">1900 xxxx</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-500 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 dark:text-gray-500 text-sm">123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold mb-1">Đăng ký nhận tin</h4>
              <p className="text-sm text-slate-400 dark:text-gray-500">Nhận thông tin về khóa học và ưu đãi mới nhất</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="px-4 py-3 rounded-xl bg-slate-800 dark:bg-gray-900 border border-slate-700 dark:border-gray-700 text-white placeholder:text-slate-500 dark:placeholder:text-gray-600 focus:outline-none focus:border-teal-500 transition-colors flex-1 md:w-64"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/20 transition-all whitespace-nowrap">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-gray-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-gray-600 text-sm">{t('footer.copyright')}</p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-gray-600">
            <a href="#" className="hover:text-slate-300 dark:hover:text-gray-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-slate-300 dark:hover:text-gray-400 transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-slate-300 dark:hover:text-gray-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
      <div className="fixed right-4 bottom-5 z-50 flex flex-col gap-3">
        <a
          href="tel:19001234"
          className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Gọi điện"
          title="Gọi điện"
        >
          <PhoneCall className="w-5 h-5" />
        </a>

        <a
          href="https://zalo.me/19001234"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Liên hệ Zalo"
          title="Liên hệ Zalo"
        >
          <span className="text-xs font-bold">ZL</span>
        </a>

        <a
          href="https://m.me/leoeducation.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Liên hệ Messenger"
          title="Liên hệ Messenger"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-slate-800 dark:bg-gray-800 hover:bg-slate-700 dark:hover:bg-gray-700 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 border border-slate-700 dark:border-gray-700"
            aria-label="Lên đầu trang"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </footer>
  );
};
