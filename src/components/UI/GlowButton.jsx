import React from 'react';
import { ANIMATION_DURATIONS } from '@/constants';

const GlowButton = ({ children, className = "", ...props }) => {
  return (
    <a
      className={`group inline-flex items-center px-8 py-4 border-2 border-white/20 text-white rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-${ANIMATION_DURATIONS.NORMAL} font-semibold text-lg backdrop-blur-sm transform hover:scale-105 active:scale-95 relative overflow-hidden ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center">
        {children}
      </span>
    </a>
  );
};

export default GlowButton;
