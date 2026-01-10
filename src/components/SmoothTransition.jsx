import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SmoothTransition = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to various animation values
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <div className="relative h-40 bg-black overflow-hidden">
      {/* Animated gradient waves */}
      <motion.div
        style={{ opacity, scale, y }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Wave 1 */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-full h-2 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-sm"
        />
        
        {/* Wave 2 */}
        <motion.div
          animate={{
            x: [100, -100, 100],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-sm mt-4"
        />
        
        {/* Wave 3 */}
        <motion.div
          animate={{
            x: [-150, 150, -150],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute w-full h-3 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-md -mt-4"
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transform-gpu"
      />

      {/* Gradient overlays for smooth blending */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default SmoothTransition;