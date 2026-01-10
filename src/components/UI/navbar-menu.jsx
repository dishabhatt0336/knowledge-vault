"use client";
import React from "react";
import { Link } from "react-router-dom";

export const MenuItem = ({
  setActive,
  active,
  item,
  to,
  children
}) => {
  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      className="relative"
    >
      <Link 
        to={to || "#"} 
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white transition-opacity duration-300"
      >
        {item}
      </Link>
      {active !== null && (
        <div className={`transition-all duration-300 ${active === item ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
                <div className="w-max h-full p-4">
                  {children}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  to,
  src
}) => {
  return (
    <Link to={to} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, to }) => {
  return (
    <Link
      to={to}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black transition-colors"
    >
      {children}
    </Link>
  );
};
