import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { CoursesList } from '../components/CoursesList';
import { Modal } from '../../../components/Modal';
import { RegistrationForm } from '../components/RegistrationForm';

export const CoursesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleRegisterClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24">
      <CoursesList onRegisterClick={handleRegisterClick} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Đăng ký khóa học">
        {selectedCourse && (
          <RegistrationForm selectedCourse={selectedCourse} onSuccess={() => setIsModalOpen(false)} />
        )}
      </Modal>
      <Footer />
    </div>
  );
};
