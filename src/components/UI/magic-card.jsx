// src/components/UI/magic-card.jsx
import React, { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

export const MagicCard = ({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#8b5cf6",
  gradientOpacity = 0.8,
}) => {
  const mouseMove = useCallback((e) => {
    if (!e.currentTarget) return;
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--gradient-size", `${gradientSize}px`);
    document.documentElement.style.setProperty("--gradient-color", gradientColor);
    document.documentElement.style.setProperty("--gradient-opacity", gradientOpacity.toString());
  }, [gradientSize, gradientColor, gradientOpacity]);

  return (
    <div
      onMouseMove={mouseMove}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-xl bg-black border border-white/10 text-white shadow-2xl",
        "before:absolute before:size-full before:opacity-0 before:transition-opacity before:duration-500 before:content-['']",
        "before:bg-[radial-gradient(var(--gradient-size)_circle_at_var(--mouse-x,_0)_var(--mouse-y,_0),_var(--gradient-color),_transparent_var(--gradient-opacity,_0))]",
        "hover:before:opacity-100",
        "after:absolute after:inset-[1px] after:rounded-[11px] after:bg-black after:content-['']",
        className
      )}
    >
      <div className="relative z-10 flex size-full flex-col">
        {children}
      </div>
    </div>
  );
};