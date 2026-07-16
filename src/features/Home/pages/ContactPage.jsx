import React from 'react';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';

export const ContactPage = () => {
  return (
    <div className="bottom-safe bg-[#fffdf6] pt-[118px] dark:bg-navy-950">
      <ContactForm />
      <Footer />
    </div>
  );
};
