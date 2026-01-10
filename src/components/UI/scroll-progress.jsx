"use client";

import * as React from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollProgress({ className }) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn("fixed top-0 left-0 right-0 h-1 bg-blue-500", className)}
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  );
}
