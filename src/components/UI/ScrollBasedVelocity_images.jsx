import React, { useRef, useEffect, useState } from 'react';

// Utility function for class names
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

// Logo Component
const LogoItem = ({ src, alt, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleError = () => {
    setImageError(true);
  };

  if (imageError) {
    // Fallback to text if image fails to load
    return (
      <div className={cn(
        "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20",
        className
      )}>
        <span className="text-white/60 text-xs font-medium text-center px-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10 group",
      className
    )}>
      <img
        src={src}
        alt={alt}
        onError={handleError}
        className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        loading="eager"
      />
    </div>
  );
};

// Smooth VelocityScroll Component for Logos
const LogoVelocityScroll = ({
  logos,
  default_velocity = 1,
  className = "",
  reverse = false,
}) => {
  const containerRef = useRef(null);
  const [velocity, setVelocity] = useState(default_velocity);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let rafId;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      const newScrollVelocity = Math.abs(scrollDelta) * 0.015;
      setScrollVelocity(newScrollVelocity);
      
      lastScrollY.current = currentScrollY;
      
      rafId = requestAnimationFrame(() => {
        setScrollVelocity(prev => prev * 0.98);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const currentVelocity = default_velocity + Math.min(scrollVelocity, 1.5);
  const animationDuration = Math.max(25, 50 / currentVelocity);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="inline-flex animate-scroll-logos gap-8 md:gap-12"
        style={{
          animationDuration: `${animationDuration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={i}>
            {logos.map((logo, logoIndex) => (
              <LogoItem
                key={`${i}-${logoIndex}`}
                src={logo.src}
                alt={logo.alt}
                className="flex-shrink-0"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Main component with logo scrolling
const ScrollBasedVelocitySection = () => {
  // Company logos (using placeholder service - replace with your actual logo URLs)
  const companyLogos = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", alt: "Google" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg", alt: "Microsoft" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", alt: "Meta" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazon/amazon-original.svg", alt: "Amazon" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg", alt: "Apple" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png", alt: "Netflix" },
  ];

  // Technology logos
  const techLogos = [
    { src: "@src/assets/react-original.svg", alt: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
  ];

  // AI/ML logos (you'll need to replace these with actual logo URLs)
  const aiLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg", alt: "TensorFlow" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg", alt: "PyTorch" },
    { src: "https://python-langchain.readthedocs.io/en/latest/_static/wordmark.png", alt: "LangChain" },
    { src: "https://docs.llamaindex.ai/en/stable/_static/logo/LlamaIndex_Logo_Square_Light.svg", alt: "LlamaIndex" },
    { src: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", alt: "Hugging Face" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/a/ab/TensorFlow_logo.svg", alt: "OpenAI" },
  ];

  return (
    <section className="relative w-full py-16 bg-transparent overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/3 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/2 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-purple-500/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 space-y-16">
        {/* Header */}
        

        {/* Logo scrolling rows */}
        <div className="space-y-16">
          {/* Company logos - slow forward */}
          <LogoVelocityScroll
            logos={companyLogos}
            default_velocity={0.7}
            reverse={false}
            className="w-full"
          />
          
          {/* Tech stack logos - slow reverse */}
          <LogoVelocityScroll
            logos={techLogos}
            default_velocity={0.9}
            reverse={true}
            className="w-full"
          />
          
          {/* AI/ML logos - medium forward */}
          <LogoVelocityScroll
            logos={aiLogos}
            default_velocity={0.5}
            reverse={false}
            className="w-full"
          />
        </div>

        {/* Subtle indicator */}
        
      </div>

      <style jsx>{`
        @keyframes scroll-logos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 12));
          }
        }
        
        .animate-scroll-logos {
          animation: scroll-logos linear infinite;
          will-change: transform;
        }
        
        /* Performance optimizations */
        .animate-scroll-logos {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translateZ(0);
        }
        
        /* Radial gradient utility */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Smooth transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Logo hover effects */
        .group:hover img {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default ScrollBasedVelocitySection;