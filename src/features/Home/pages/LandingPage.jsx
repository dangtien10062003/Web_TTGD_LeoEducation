import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { HeroInfo } from '../components/HeroInfo';
import { Teachers } from '../components/Teachers';
import { LearningPath } from '../components/LearningPath';
import { CoursesList } from '../components/CoursesList';
import { ParentFeedback } from '../components/ParentFeedback';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { Modal } from '../../../components/Modal';
import { RegistrationForm } from '../components/RegistrationForm';

export const LandingPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="bottom-safe min-h-screen bg-[#fffdf6] transition-colors duration-200 dark:bg-navy-950">
      <Hero />
      <HeroInfo />
      <LearningPath />
      <CoursesList onRegisterClick={(course) => setSelectedCourse(course)} />
      <Teachers />
      <ParentFeedback />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <Modal isOpen={Boolean(selectedCourse)} onClose={() => setSelectedCourse(null)} title="Đăng ký khóa học">
        {selectedCourse && (
          <RegistrationForm selectedCourse={selectedCourse} onSuccess={() => setSelectedCourse(null)} />
        )}
      </Modal>
    </div>
  );
};
