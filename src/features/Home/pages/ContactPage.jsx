import React from 'react';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';

export const ContactPage = () => {
  return (
    <div className="pt-24">
      <ContactForm />
      <Footer />
    </div>
  );
};
