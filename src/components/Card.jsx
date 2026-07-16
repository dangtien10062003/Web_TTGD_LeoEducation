import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-white shadow-lg dark:bg-navy-800 dark:border dark:border-navy-600',
    glass: 'glass-strong shadow-xl border border-white/50 dark:border-navy-600',
    elevated: 'bg-white shadow-2xl border border-gold-100 dark:bg-navy-800 dark:border-navy-600',
    flat: 'bg-gold-50 border border-gold-100 dark:bg-navy-800 dark:border-navy-600',
    gradient: 'bg-white shadow-lg relative overflow-hidden dark:bg-navy-800 dark:border dark:border-navy-600',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`rounded-2xl overflow-hidden dark:rounded-xl ${variants[variant]} ${
        hover ? 'hover:shadow-2xl transition-shadow duration-300 dark:hover:shadow-none dark:hover:border-gold-500/60' : ''
      } ${className}`}
      {...props}
    >
      {variant === 'gradient' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 dark:bg-gold-500 dark:bg-none" />
      )}
      {children}
    </motion.div>
  );
};

