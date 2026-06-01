import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { About } from '../components/About';
import { CoursesList } from '../components/CoursesList';
import { Instructors } from '../components/Instructors';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { Blog } from '../components/Blog';
import { FAQ } from '../components/FAQ';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { Modal } from '../../../components/Modal';
import { RegistrationForm } from '../components/RegistrationForm';

export const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Restore scroll position on reload
  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash) {
      // Wait for content to load then scroll to hash
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Restore scroll position from localStorage
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition));
        }, 100);
      }
    }

    // Save scroll position before unload
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
      <Testimonials />
      <Pricing />
      <Blog />
      <FAQ />
      <ContactForm />
      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Đăng ký khóa học"
      >
        {/* Backend hiện chưa có endpoint /api/registrations (tránh lỗi 500) */}
        <div className="p-6 text-center text-gray-700">
          Tạm thời chưa hỗ trợ đăng ký khóa học. Vui lòng thử lại sau.
        </div>
      </Modal>




    </div>
  );
};


