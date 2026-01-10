import React from 'react';
import { ANIMATION_DURATIONS } from '@/constants';

const ShimmerButton = ({ children, href, className = "", ...props }) => {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 active:scale-95 transition-all duration-${ANIMATION_DURATIONS.NORMAL} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
    </a>
  );
};

export default ShimmerButton;
