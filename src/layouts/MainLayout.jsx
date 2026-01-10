import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/UI/scroll-progress";

export default function MainLayout({ children, showNavbar = true, showFooter = true }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent relative">
      {/* Scroll Progress - Always visible */}
      <ScrollProgress className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 z-[9999] h-1" />
      
      {/* Navbar - Conditionally rendered */}
      {showNavbar && (
        <div className="relative w-full bg-transparent z-50">
          <Navbar />
        </div>
      )}

     

      {/* Main Content */}
      <main className="flex-1 w-full bg-transparent relative z-10">
        {children}
      </main>

      {/* Footer - Conditionally rendered */}
      {showFooter && (
        <div className="relative w-full bg-transparent z-50">
          <Footer />
        </div>
      )}
    </div>
  );
}