import React from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1.2
      }
    }
  };

  const scrollDotVariants = {
    animate: {
      y: [0, 12, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      variants={scrollIndicatorVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <motion.div
          className="w-1 h-3 bg-white/60 rounded-full mt-2"
          variants={scrollDotVariants}
          animate="animate"
        />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
