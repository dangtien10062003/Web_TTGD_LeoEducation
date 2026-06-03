import React from 'react';
import { useState } from 'react';
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
          <div className="p-6 text-center text-slate-700">
            Tạm thời chưa hỗ trợ đăng ký. Vui lòng liên hệ hotline.
          </div>
        )}
      </Modal>
      <Footer />
    </div>
  );
};
