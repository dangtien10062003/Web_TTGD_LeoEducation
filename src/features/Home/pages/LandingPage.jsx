import React from 'react';
import { Hero } from '../components/Hero';
import { HeroInfo } from '../components/HeroInfo';
import { Teachers } from '../components/Teachers';
import { LearningPath } from '../components/LearningPath';
import { ParentFeedback } from '../components/ParentFeedback';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-navy-950">
      <Hero />
      <HeroInfo />
      <Teachers />
      <LearningPath />
      <ParentFeedback />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};
