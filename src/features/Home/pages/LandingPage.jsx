import React from 'react';
import { Hero } from '../components/Hero';
import { LearningPath } from '../components/LearningPath';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <LearningPath />
      <Testimonials />
      <Footer />
    </div>
  );
};
