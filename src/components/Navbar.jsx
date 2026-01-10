import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CoolMode } from "./magicui/cool-mode";
// Enhanced navbar button component
const NavbarButton = ({ children, variant = "primary", className, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20",
    secondary: "border-2 border-white/20 text-white hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
  };
  
  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

// Animated mobile menu toggle
const MobileMenuToggle = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="relative p-2 text-white hover:text-gray-300 transition-colors duration-300 group"
  >
    <div className="w-6 h-6 flex flex-col justify-center items-center">
      <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
        isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
      }`} />
      <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`} />
      <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
        isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
      }`} />
    </div>
  </button>
);

// Animated navigation link
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group text-white/80 hover:text-white transition-all duration-300 py-2 text-lg md:text-xl"
  >
    <span className="relative z-10">{children}</span>
    {/* Animated underline */}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
    {/* Glow effect */}
    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-purple-500 to-blue-500 blur-sm transition-opacity duration-300 rounded" />
  </Link>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Features", link: "/#features" },
    { name: "About us", link: "/#about" },
    { name: "Contact", link: "/#contact" },
  ];

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 relative z-50">
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between px-8 py-6">
          {/* Logo with animation */}
          <Link 
            to="/" 
            className="group flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
              Unicron
            </span>
          </Link>
          

          {/* Navigation Links */}
          <div className="flex items-center space-x-12">
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.link}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 ">
            <Link to="/login">
              <NavbarButton variant="secondary">
                Login
              </NavbarButton>
            </Link>
            <Link to="/signup">
              <NavbarButton variant="primary">
                Sign Up
              </NavbarButton>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-6">
            <Link 
              to="/" 
              className="group flex items-center space-x-2"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                Unicron
              </span>
            </Link>
            <MobileMenuToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>

          {/* Mobile Menu with animation */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-6 pb-6 space-y-6 border-t border-white/10">
              {/* Mobile Navigation Links */}
              <div className="space-y-4 pt-6">
                {navItems.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`transform transition-all duration-500 ${
                      isMobileMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <NavLink 
                      to={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </div>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className={`flex flex-col gap-4 transform transition-all duration-500 ${
                isMobileMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <NavbarButton variant="secondary" className="w-full">
                    Login
                  </NavbarButton>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <NavbarButton variant="primary" className="w-full">
                    Sign Up
                  </NavbarButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}