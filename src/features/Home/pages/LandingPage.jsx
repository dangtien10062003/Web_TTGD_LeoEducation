import React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { CoursesList } from '../components/CoursesList';
import { Instructors } from '../components/Instructors';
import { LearningPath } from '../components/LearningPath';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { Modal } from '../../../components/Modal';
import { RegistrationForm } from '../components/RegistrationForm';

export const LandingPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);



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
      <Hero />
      <About />
      <CoursesList onRegisterClick={handleRegisterClick} />
      <Instructors />
      <LearningPath />
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactForm />
      <Footer />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Đăng ký khóa học">
        {selectedCourse && (
          <RegistrationForm selectedCourse={selectedCourse} onSuccess={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};
