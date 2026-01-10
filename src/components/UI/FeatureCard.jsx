import React from 'react';
import { ANIMATION_DELAYS, ANIMATION_DURATIONS } from '@/constants';

const FeatureCard = ({ icon, text, index }) => {
  return (
    <div
      className="group flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * ANIMATION_DELAYS.STAGGER}ms` }}
    >
      <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
        {icon}
      </span>
      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
        {text}
      </span>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default FeatureCard;
