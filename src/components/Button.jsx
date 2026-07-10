import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none';

  const variants = {
    primary: 'bg-gradient-to-r from-gold-200 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-navy-900 shadow-lg hover:shadow-xl hover:shadow-gold-500/25 ring-1 ring-gold-300',
    secondary: 'bg-white hover:bg-gold-50 text-navy-700 border-2 border-gold-200 hover:border-gold-300 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-gold-500 text-navy-700 hover:bg-gold-500 hover:text-white dark:border-gold-500 dark:text-gold-100 dark:hover:bg-gold-600 dark:hover:text-white',
    ghost: 'bg-transparent text-navy-700 hover:bg-gold-50 hover:text-navy-800',
    gradientTeal: 'bg-gradient-to-r from-gold-200 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-navy-900 shadow-lg hover:shadow-xl hover:shadow-gold-500/25 ring-1 ring-gold-300',
    gradientGold: 'bg-gradient-to-r from-gold-200 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-navy-900 shadow-lg hover:shadow-xl hover:shadow-gold-500/25 ring-1 ring-gold-300',
    gradientBlue: 'bg-gradient-to-r from-gold-200 to-gold-400 hover:from-gold-300 hover:to-gold-500 text-navy-900 shadow-lg hover:shadow-xl hover:shadow-gold-500/25 ring-1 ring-gold-300',
    soft: 'bg-gold-50 text-gold-700 hover:bg-gold-100 border border-gold-200',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm rounded-xl',
    md: 'py-3 px-6 text-base rounded-2xl',
    lg: 'py-4 px-8 text-lg rounded-2xl',
    xl: 'py-4 px-10 text-lg rounded-full',
    icon: 'p-3 rounded-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.03, y: props.disabled ? 0 : -2 }}
      whileTap={{ scale: props.disabled ? 1 : 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

