import React from 'react';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

const TypingAnimation = ({ 
  text, 
  className = "", 
  speed = 200, 
  repeat = true,
  repeatDelay = 2000 
}) => {
  const { displayedText, isComplete } = useTypingAnimation(text, speed, repeat, repeatDelay);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse ml-1">|</span>}
    </span>
  );
};

export default TypingAnimation;
