import React from 'react';
import { Footer } from '../components/Footer';
import { About } from '../components/About';
import { Instructors } from '../components/Instructors';

export const AboutPage = () => {
  return (
    <div className="bottom-safe bg-[#fffdf6] pt-[118px] dark:bg-navy-950">
      <About />
      <Instructors />
      <Footer />
    </div>
  );
};
