import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Features from "@/components/Features";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import ScrollBasedVelocitySection from "@/components/UI/ScrollBasedVelocity";
import { Hero } from "@/components/Hero";
import { ScrollComponent } from "@/components/ScrollComponent";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Meteors } from '@/components/magicui/meteors';
import { Scroll } from 'lucide-react';
import { useEffect } from "react";

// Lazy load components for better performance
// const LoginPage = lazy(() => import("@/pages/Login"));
// const SignupPage = lazy(() => import("@/pages/Signup"));

function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-0">
        
        <Hero />
        <ScrollBasedVelocitySection />
        <Features />
        {/* Scroll animation showcase - reduced gap */}
        <div className="mt-0">
        <ScrollComponent />
        </div>
        
      </div>
    </MainLayout>
  );
}


function ExternalLoginRedirect() {
  useEffect(() => {
    window.location.href = "https://doc-assistant-xghg.onrender.com/";
  }, []);

  return null;
}
function ExternalSigninRedirect() {
  useEffect(() => {
    window.location.href = "https://doc-assistant-xi.vercel.app/";
  }, []);

  return null;
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Global Animated Background */}
      <GlobalAnimatedBackground />

      {/* App Content */}
      <div className="relative z-10 min-h-screen">
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/" element={<ExternalLoginRedirect />} />
              <Route path="/" element={<ExternalSigninRedirect />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>
  );
}