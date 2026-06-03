import React from 'react';
import { Footer } from '../components/Footer';
import { About } from '../components/About';
import { Instructors } from '../components/Instructors';

export const AboutPage = () => {
  return (
    <div className="pt-24">
      <About />
      <Instructors />
      <Footer />
    </div>
  );
};
