import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Features from "@/components/Features";
import EnhancedHeroWithLamp from "@/components/Hero";
import SmoothTransition from "@/components/SmoothTransition";
import ScrollBasedVelocitySection from "@/components/UI/ScrollBasedVelocity";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Hero Section - Full screen without MainLayout */}
      <Navbar />
      
      {/* Smooth Transition between Hero and Content */}
      
      
      {/* Main Content with Layout */}
      <MainLayout>
        <div className="space-y-0">
          {/* Scroll Based Velocity Section */}
          <section className="relative">
            <ScrollBasedVelocitySection />
          </section>
          
          {/* Features Section */}
          <section id="features" className="relative">
            <Features />
          </section>
        </div>
      </MainLayout>
    </div>
  );
}