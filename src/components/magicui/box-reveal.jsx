"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function BoxReveal({ children, backgroundColor = "#5046e6", duration = 0.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.set("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="relative inline-block overflow-hidden align-middle"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Opaque Box Overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ 
          background: backgroundColor,
          borderRadius: "inherit"
        }}
        variants={boxVariants}
        transition={{ duration, ease: "easeInOut" }}
      />

      {/* Text */}
      <motion.div
        className="relative z-20"
        variants={textVariants}
        transition={{ duration: 0.5, delay: duration - 0.1, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Variants
const containerVariants = {
  hidden: {},
  visible: {},
};

const boxVariants = {
  hidden: { x: "0%" }, // covers fully
  visible: { x: "100%" }, // slides to right
};

const textVariants = {
  hidden: { opacity: 0, y: "100%" }, // below view
  visible: { opacity: 1, y: "0%" }, // slides up
};
