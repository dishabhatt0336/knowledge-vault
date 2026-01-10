import { useState, useEffect } from 'react';
import { ANIMATION_DELAYS } from '@/constants';

export const useTypingAnimation = (text, speed = ANIMATION_DELAYS.TYPING, repeat = false, repeatDelay = 2000) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeoutId;
    let intervalId;

    const startTyping = () => {
      i = 0;
      setDisplayedText("");
      setIsComplete(false);

      intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(intervalId);
          
          // If repeat is enabled, restart after delay
          if (repeat) {
            timeoutId = setTimeout(startTyping, repeatDelay);
          }
        }
      }, speed);
    };

    startTyping();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, repeat, repeatDelay]);

  return { displayedText, isComplete };
};
