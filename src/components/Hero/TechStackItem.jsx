import React from 'react';

const TechStackItem = ({ icon, name, alt, isEmoji = false }) => (
  <div className="flex items-center space-x-2">
    {isEmoji ? (
      <span className="text-white text-lg">{icon}</span>
    ) : (
      <img src={icon} alt={alt} className="w-8 h-8" />
    )}
    <span className="text-white">{name}</span>
  </div>
);

export default TechStackItem;
