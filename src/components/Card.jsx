import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-white shadow-lg',
    glass: 'glass-strong shadow-xl border border-white/50',
    elevated: 'bg-white shadow-2xl border border-slate-100',
    flat: 'bg-slate-50 border border-slate-200',
    gradient: 'bg-white shadow-lg relative overflow-hidden',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`rounded-2xl overflow-hidden ${variants[variant]} ${
        hover ? 'hover:shadow-2xl transition-shadow duration-300' : ''
      } ${className}`}
      {...props}
    >
      {variant === 'gradient' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-gold-400 to-navy-500" />
      )}
      {children}
    </motion.div>
  );
};

