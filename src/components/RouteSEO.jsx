import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;
const DEFAULT_IMAGE = `${SITE_URL}/assets/Gemini_Generated_Image_yykl3wyykl3wyykl-removebg-preview-Bt_MIysS.png`;

const routeMeta = {
  '/': {
    title: 'LEO Education - Gia sư online 1-1 cho học sinh Việt Nam',
    description: 'LEO Education cung cấp chương trình gia sư online 1-1 với lộ trình cá nhân hóa cho Toán, Tiếng Anh, Vật lý, Hóa học, Ngữ văn và luyện thi.',
  },
  '/courses': {
    title: 'Khóa học online - LEO Education',
    description: 'Khám phá các khóa gia sư online theo môn học, cấp lớp và mục tiêu học tập tại LEO Education.',
  },
  '/teachers': {
    title: 'Đội ngũ giáo viên - LEO Education',
    description: 'Đội ngũ giáo viên LEO Education đồng hành cùng học sinh bằng phương pháp học cá nhân hóa, rõ lộ trình và sát năng lực.',
  },
  '/pricing': {
    title: 'Học phí và gói học - LEO Education',
    description: 'Tham khảo các gói học online linh hoạt, phù hợp theo nhu cầu học thử, học dài hạn và luyện thi.',
  },
  '/about': {
    title: 'Về LEO Education',
    description: 'LEO Education là nền tảng gia sư online giúp học sinh học đúng năng lực, tiến bộ theo lộ trình rõ ràng.',
  },
  '/contact': {
    title: 'Liên hệ tư vấn online - LEO Education',
    description: 'Để lại thông tin để LEO Education tư vấn lộ trình học online phù hợp cho học sinh.',
  },
  '/privacy': {
    title: 'Chính sách bảo mật - LEO Education',
    description: 'Chính sách bảo mật thông tin đăng ký tư vấn và dữ liệu liên hệ của LEO Education.',
  },
  '/terms': {
    title: 'Điều khoản sử dụng - LEO Education',
    description: 'Điều khoản sử dụng website và dịch vụ tư vấn học online của LEO Education.',
  },
};

const setMeta = (selector, attr, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [, key, name] = selector.match(/\[(name|property)="([^"]+)"\]/) || [];
    if (key && name) element.setAttribute(key, name);
    document.head.appendChild(element);
  }
  element.setAttribute(attr, value);
};

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const setJsonLd = (data) => {
  const id = 'LEO Education-jsonld';
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};

export const getRouteMeta = (pathname) => {
  if (pathname.startsWith('/courses/')) {
    return {
      title: 'Chi tiết khóa học online - LEO Education',
      description: 'Thông tin chi tiết khóa học online, lộ trình học và đăng ký tư vấn tại LEO Education.',
    };
  }

  return routeMeta[pathname] || routeMeta['/'];
};

export const RouteSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    const canonical = `${SITE_URL}${location.pathname === '/' ? '/' : location.pathname}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[name="robots"]', 'content', 'index, follow');
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', DEFAULT_IMAGE);
    setMeta('meta[property="og:locale"]', 'content', 'vi_VN');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setLink('canonical', canonical);

    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'LEO Education',
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      email: 'leoeducation.vn@gmail.com',
      telephone: '+84866123170',
      areaServed: 'VN',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+84866123170',
        contactType: 'customer support',
        availableLanguage: ['vi'],
      },
      sameAs: ['https://www.facebook.com/leoeducation.vn?locale=vi_VN'],
      offers: {
        '@type': 'OfferCatalog',
        name: 'Khóa học gia sư online',
        itemListElement: [
          { '@type': 'Course', name: 'Gia sư Toán online' },
          { '@type': 'Course', name: 'Gia sư Tiếng Anh online' },
          { '@type': 'Course', name: 'Luyện thi online' },
        ],
      },
    });
  }, [location.pathname]);

  return null;
};
