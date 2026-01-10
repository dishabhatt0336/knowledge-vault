"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export const ResizableNavbar = ({ items }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky top-0 inset-x-0 z-40 w-full", "bg-transparent")}
    >
      <NavBody visible={visible}>
        {items.map((item) => (
          <a key={item.name} href={item.link} className="mx-4">
            {item.name}
          </a>
        ))}
      </NavBody>
    </motion.div>
  );
};

const NavBody = ({ children, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34,42,53,0.06), 0 16px 68px rgba(47,48,55,0.05)"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "mx-auto flex justify-between items-center rounded-full px-6 py-3 bg-transparent",
        visible && "bg-white/80 dark:bg-neutral-950/80"
      )}
    >
      {children}
    </motion.div>
  );
};
