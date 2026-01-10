import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const VantaWavesBackground = ({
  className,
  children,
  waveHeight = 20,
  waveSpeed = 1,
  color = 0x000000,
  shininess = 80,
  zoom = 0.75,
  ...props
}) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [isVantaLoaded, setIsVantaLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const initializationRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initializationRef.current) return;
    initializationRef.current = true;

    let isMounted = true;
    
    const loadScript = (src, id, integrity = null) => {
      return new Promise((resolve, reject) => {
        // Check if script already exists
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = false;
        if (integrity) {
          script.integrity = integrity;
          script.crossOrigin = 'anonymous';
        }
        
        script.onload = () => {
          console.log(`✅ ${id} loaded successfully`);
          resolve();
        };
        script.onerror = () => {
          console.error(`❌ Failed to load ${id} from ${src}`);
          reject(new Error(`Failed to load ${id}`));
        };
        
        document.head.appendChild(script);
      });
    };

    const initializeVanta = async () => {
      try {
        console.log('🌊 Starting Vanta Waves initialization...');
        
        // Load Three.js first - using r128 which is more stable
        await loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 
          'threejs-vanta'
        );
        
        // Wait a bit for Three.js to be ready
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Verify Three.js loaded
        if (!window.THREE) {
          throw new Error('THREE.js failed to load or initialize');
        }
        console.log('✅ THREE.js version:', window.THREE.REVISION);
        
        // Load Vanta Waves - using a more reliable CDN
        await loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js', 
          'vanta-waves'
        );
        
        // Wait for Vanta to be ready
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Verify Vanta loaded
        if (!window.VANTA || !window.VANTA.WAVES) {
          throw new Error('VANTA.WAVES failed to load');
        }
        console.log('✅ Vanta.js loaded successfully');
        
        // Double-check the element is ready
        if (!isMounted || !vantaRef.current) {
          console.warn('⚠️ Component unmounted or element not ready');
          return;
        }

        // Clean up any existing effect
        if (vantaEffect.current) {
          try {
            vantaEffect.current.destroy();
          } catch (e) {
            console.warn('Previous effect cleanup failed:', e);
          }
          vantaEffect.current = null;
        }

        console.log('🎯 Initializing Vanta effect...');
        
        // Initialize Vanta with error handling
        vantaEffect.current = window.VANTA.WAVES({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: color,
          shininess: shininess,
          waveHeight: waveHeight,
          waveSpeed: waveSpeed,
          zoom: zoom,
          // Additional stability options
          forceAnimate: true,
          camera: {
            fov: 30,
            near: 0.1,
            far: 1000
          }
        });

        if (vantaEffect.current && isMounted) {
          console.log('🎉 Vanta effect initialized successfully!');
          setIsVantaLoaded(true);
          setLoadingError(null);
        } else {
          throw new Error('Vanta effect creation returned null');
        }
        
      } catch (error) {
        console.error('❌ Vanta initialization error:', error);
        setLoadingError(error.message);
        setIsVantaLoaded(false);
      }
    };

    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (isMounted && vantaRef.current) {
        initializeVanta();
      }
    }, 100);

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      
      if (vantaEffect.current) {
        try {
          console.log('🧹 Cleaning up Vanta effect...');
          vantaEffect.current.destroy();
          vantaEffect.current = null;
        } catch (e) {
          console.warn('Cleanup error:', e);
        }
      }
    };
  }, []); // Empty dependency array - only run once

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect.current && vantaEffect.current.resize) {
        vantaEffect.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={vantaRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Content - Always visible */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Enhanced Fallback Background */}
      {!isVantaLoaded && (
        <div className="absolute inset-0 z-0">
          {/* Primary background gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, 
                  #0f0f23 0%, 
                  #1a1a2e 25%,
                  #16213e 50%, 
                  #0f3460 75%,
                  #533483 100%
                )
              `
            }}
          />
          
          {/* Animated wave-like gradients */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                radial-gradient(ellipse 1400px 700px at 50% 120%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
                radial-gradient(ellipse 1200px 600px at 20% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse 1000px 500px at 80% 20%, rgba(44, 182, 125, 0.25) 0%, transparent 50%)
              `,
              animation: 'waveAnimation 15s ease-in-out infinite alternate'
            }}
          />
          
          {/* Moving overlay for wave effect */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at 30% 60%, rgba(147, 51, 234, 0.3) 0%, transparent 40%),
                radial-gradient(circle at 70% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 40%)
              `,
              animation: 'floatAnimation 20s ease-in-out infinite alternate-reverse'
            }}
          />
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            <div className="absolute w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" 
                 style={{top: '15%', left: '10%', animationDelay: '0s', animationDuration: '3s'}} />
            <div className="absolute w-1 h-1 bg-blue-400/50 rounded-full animate-pulse" 
                 style={{top: '70%', left: '85%', animationDelay: '1s', animationDuration: '4s'}} />
            <div className="absolute w-1.5 h-1.5 bg-pink-400/35 rounded-full animate-pulse" 
                 style={{top: '30%', left: '70%', animationDelay: '2s', animationDuration: '5s'}} />
            <div className="absolute w-1 h-1 bg-purple-300/45 rounded-full animate-pulse" 
                 style={{top: '85%', left: '25%', animationDelay: '3s', animationDuration: '3.5s'}} />
            <div className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse" 
                 style={{top: '50%', left: '50%', animationDelay: '4s', animationDuration: '6s'}} />
          </div>
        </div>
      )}

      {/* Error message for development */}
      {loadingError && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-red-900/80 text-red-200 p-3 rounded-lg text-sm z-50 max-w-sm">
          <div className="font-semibold mb-1">Vanta Loading Error:</div>
          <div className="text-xs opacity-90">{loadingError}</div>
        </div>
      )}

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg text-xs z-50 space-y-1">
          <div>Vanta: {isVantaLoaded ? '✅ Active' : '❌ Fallback'}</div>
          <div>THREE: {typeof window !== 'undefined' && window.THREE ? `✅ r${window.THREE.REVISION}` : '❌'}</div>
          <div>VANTA.WAVES: {typeof window !== 'undefined' && window.VANTA?.WAVES ? '✅' : '❌'}</div>
          {loadingError && <div className="text-red-400">Error: {loadingError}</div>}
        </div>
      )}

      <style jsx>{`
        @keyframes waveAnimation {
          0% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) scale(1.08) rotate(2deg);
          }
          100% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
        }

        @keyframes floatAnimation {
          0% {
            transform: translateX(0px) translateY(0px) scale(1);
          }
          33% {
            transform: translateX(-30px) translateY(-20px) scale(1.05);
          }
          66% {
            transform: translateX(30px) translateY(-35px) scale(0.95);
          }
          100% {
            transform: translateX(0px) translateY(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Simplified version that always works
export const SimpleWavesBackground = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Guaranteed working background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                #0f0f23 0%, 
                #1a1a2e 25%,
                #16213e 50%, 
                #0f3460 75%,
                #533483 100%
              )
            `
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(ellipse 1200px 600px at 50% 100%, rgba(120, 119, 198, 0.4) 0%, transparent 60%),
              radial-gradient(ellipse 1000px 500px at 0% 50%, rgba(255, 107, 107, 0.3) 0%, transparent 60%),
              radial-gradient(ellipse 800px 400px at 100% 0%, rgba(44, 182, 125, 0.25) 0%, transparent 60%)
            `,
            animation: 'gentleWave 20s ease-in-out infinite alternate'
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes gentleWave {
          0% {
            transform: translateX(0px) translateY(0px) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translateX(-20px) translateY(-30px) scale(1.05);
            opacity: 0.8;
          }
          66% {
            transform: translateX(20px) translateY(-20px) scale(0.98);
            opacity: 0.6;
          }
          100% {
            transform: translateX(0px) translateY(0px) scale(1);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

// Export wave presets
export const WavePresets = {
  ocean: {
    color: 0x1a1a2e,
    waveHeight: 20,
    waveSpeed: 1,
    shininess: 30,
    zoom: 0.75
  },
  purple: {
    color: 0x4a148c,
    waveHeight: 25,
    waveSpeed: 1.2,
    shininess: 40,
    zoom: 0.8
  },
  blue: {
    color: 0x0d47a1,
    waveHeight: 18,
    waveSpeed: 0.8,
    shininess: 25,
    zoom: 0.7
  },
  dark: {
    color: 0x0a0a0a,
    waveHeight: 30,
    waveSpeed: 1.5,
    shininess: 50,
    zoom: 0.9
  }
};

// Alternative: Fallback component that guarantees to work
export const ReliableWavesBackground = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Pure CSS animated background - always works */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Wave layers */}
        <div className="absolute inset-0 opacity-70">
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-purple-600/30"
            style={{
              animation: 'wave1 15s ease-in-out infinite alternate',
              borderRadius: '50%',
              transform: 'scale(1.5) translateY(10%)'
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-bl from-indigo-600/25 via-transparent to-pink-600/25"
            style={{
              animation: 'wave2 20s ease-in-out infinite alternate-reverse',
              borderRadius: '40%',
              transform: 'scale(1.3) translateY(-10%)'
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 via-transparent to-violet-600/20"
            style={{
              animation: 'wave3 25s ease-in-out infinite alternate',
              borderRadius: '60%',
              transform: 'scale(1.1)'
            }}
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave1 {
          0%, 100% { transform: scale(1.5) translateY(10%) rotate(0deg); }
          50% { transform: scale(1.7) translateY(-5%) rotate(5deg); }
        }
        
        @keyframes wave2 {
          0%, 100% { transform: scale(1.3) translateY(-10%) rotate(0deg); }
          50% { transform: scale(1.5) translateY(5%) rotate(-3deg); }
        }
        
        @keyframes wave3 {
          0%, 100% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(2deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};