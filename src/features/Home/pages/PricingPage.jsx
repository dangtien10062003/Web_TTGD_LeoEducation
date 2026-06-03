import React from 'react';
import { Footer } from '../components/Footer';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';

export const PricingPage = () => {
  return (
    <div className="pt-24">
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};
