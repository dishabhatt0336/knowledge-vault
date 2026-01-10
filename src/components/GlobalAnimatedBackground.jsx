// src/components/GlobalAnimatedBackground.jsx
import { useRef, useEffect } from 'react';

const GlobalAnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particles = [];
      const particleCount = Math.min(60, Math.floor(window.innerWidth / 15)); // Slightly more particles for global use
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1, // Slightly larger particles
          speedX: (Math.random() - 0.5) * 0.8, // Slightly faster movement
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.2,
          hue: Math.random() * 60 + 240, // Purple to blue range
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create dynamic gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      
      // More dynamic gradient stops
      const time = Date.now() * 0.0005;
      const opacity1 = 0.1 + Math.sin(time) * 0.05;
      const opacity2 = 0.05 + Math.cos(time * 1.2) * 0.03;
      
      gradient.addColorStop(0, `hsla(270, 70%, 60%, ${opacity1})`);
      gradient.addColorStop(0.3, `hsla(240, 80%, 70%, ${opacity2})`);
      gradient.addColorStop(0.7, `hsla(220, 60%, 50%, ${opacity2 * 0.5})`);
      gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0.9)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Subtle size and opacity pulsing
        const pulse = Math.sin(Date.now() * 0.001 + index) * 0.5 + 0.5;
        const currentSize = particle.size * (0.8 + pulse * 0.4);
        const currentOpacity = particle.opacity * (0.7 + pulse * 0.3);

        // Draw particle with glow effect
        ctx.beginPath();
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 3
        );
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${currentOpacity * 0.8})`);
        glowGradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 60%, ${currentOpacity * 0.3})`);
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 80%, ${currentOpacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -10, // Lower z-index to stay behind everything
        background: 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%)'
      }}
    />
  );
};

export default GlobalAnimatedBackground;