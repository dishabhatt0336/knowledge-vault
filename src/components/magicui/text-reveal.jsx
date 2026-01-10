"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const TextReveal = ({ children, className }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // trigger nicely
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-auto", className)}>
      <div className="sticky top-0 mx-auto flex h-auto max-w-4xl items-center bg-transparent px-2 py-1">
        <span
          className="flex flex-wrap p-1 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  // Left-to-right clip reveal
  const clip = useTransform(
    progress,
    range,
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  // Slight slide-in from left
  const x = useTransform(progress, range, [-20, 0]);
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1 lg:mx-1.5">
      {/* Low-opacity ghost text behind */}
      <span className="absolute opacity-30">{children}</span>

      {/* Animated word */}
      <motion.span
        style={{ clipPath: clip, x, opacity }}
        className="text-white dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  );
};
