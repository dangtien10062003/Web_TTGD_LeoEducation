import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { About } from '../components/About';
import { CoursesList } from '../components/CoursesList';
import { Instructors } from '../components/Instructors';
import { LearningPath } from '../components/LearningPath';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { Blog } from '../components/Blog';
import { FAQ } from '../components/FAQ';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { Modal } from '../../../components/Modal';
import { RegistrationForm } from '../components/RegistrationForm';

export const LandingPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Restore scroll position on reload
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition));
        }, 100);
      }
    }
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleRegisterClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <About />
      <CoursesList onRegisterClick={handleRegisterClick} />
      <Instructors />
      <LearningPath />
      <Testimonials />
      <Pricing />
      <Blog />
      <FAQ />
      <ContactForm />
      <Footer />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Đăng ký khóa học">
        {/* Backend hiện chưa có endpoint /api/registrations */}
        <div className="p-6 text-center text-slate-700 dark:text-gray-300">
          {t('contact.backendError') || 'Tạm thời chưa hỗ trợ đăng ký khóa học. Vui lòng liên hệ hotline 0703.428.300.'}
        </div>
      </Modal>
    </div>
  );
};
