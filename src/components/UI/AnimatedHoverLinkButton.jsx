import React from "react";
import { cn } from "@/lib/utils";

export function AnimatedHoverLinkButton({ 
  href, 
  children, 
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  ...props 
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white rounded-lg group transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
      
      {/* Button text */}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
    </a>
  );
}
