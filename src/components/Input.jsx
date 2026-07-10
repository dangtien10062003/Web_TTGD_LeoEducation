import React from 'react';
import { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  className = '',
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
            placeholder:text-slate-400
            ${Icon ? 'pl-11' : ''}
            ${error
              ? 'border-coral-300 focus:border-coral-500 focus:ring-4 focus:ring-coral-500/10 bg-coral-50/30'
              : 'border-slate-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 bg-white hover:border-slate-300'
            }
            ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-coral-600 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

