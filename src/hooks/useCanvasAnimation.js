import { useEffect, useRef } from 'react';
import { PARTICLE_CONFIG, COLORS } from '@/constants';

export const useCanvasAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const shootingStarsRef = useRef([]);

  const createSparkles = (canvas) => {
    const particles = [];
    const particleCount = Math.min(
      PARTICLE_CONFIG.SPARKLE_COUNT, 
      Math.floor(window.innerWidth / 8)
    );
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (PARTICLE_CONFIG.MAX_PARTICLE_SIZE - PARTICLE_CONFIG.MIN_PARTICLE_SIZE) + PARTICLE_CONFIG.MIN_PARTICLE_SIZE,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * (PARTICLE_CONFIG.TWINKLE_SPEED_MAX - PARTICLE_CONFIG.TWINKLE_SPEED_MIN) + PARTICLE_CONFIG.TWINKLE_SPEED_MIN,
        hue: Math.random() * (PARTICLE_CONFIG.HUE_MAX - PARTICLE_CONFIG.HUE_MIN) + PARTICLE_CONFIG.HUE_MIN,
        brightness: Math.random() * (PARTICLE_CONFIG.BRIGHTNESS_MAX - PARTICLE_CONFIG.BRIGHTNESS_MIN) + PARTICLE_CONFIG.BRIGHTNESS_MIN,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  };

  const createShootingStars = (canvas) => {
    const stars = [];
    for (let i = 0; i < PARTICLE_CONFIG.SHOOTING_STAR_COUNT; i++) {
      stars.push({
        x: -100,
        y: Math.random() * canvas.height * 0.5,
        speedX: Math.random() * 8 + 4,
        speedY: Math.random() * 2 + 1,
        life: 1,
        maxLife: Math.random() * 60 + 40,
        tail: [],
        active: false,
        delay: Math.random() * 200 + i * 100,
      });
    }
    return stars;
  };

  const resizeCanvas = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const animate = (canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create starry night gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    
    const time = Date.now() * 0.0003;
    const opacity1 = 0.15 + Math.sin(time) * 0.05;
    const opacity2 = 0.08 + Math.cos(time * 1.1) * 0.03;
    
    gradient.addColorStop(0, `hsla(260, 50%, 10%, ${opacity1})`);
    gradient.addColorStop(0.3, `hsla(240, 60%, 20%, ${opacity2})`);
    gradient.addColorStop(0.6, `hsla(220, 40%, 15%, ${opacity2 * 0.7})`);
    gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0.95)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Animate sparkles
    particlesRef.current.forEach((particle) => {
      particle.twinklePhase += particle.twinkleSpeed;
      const twinkle = Math.sin(particle.twinklePhase) * 0.5 + 0.5;
      const currentOpacity = particle.opacity * (0.3 + twinkle * 0.7);
      const currentSize = particle.size * (0.8 + twinkle * 0.4);

      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.fillStyle = `hsl(${particle.hue}, 70%, ${particle.brightness}%)`;
      
      // Draw star with sparkle effect
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x = particle.x + Math.cos(angle) * currentSize;
        const y = particle.y + Math.sin(angle) * currentSize;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    // Animate shooting stars
    shootingStarsRef.current.forEach((star) => {
      if (!star.active) {
        star.delay--;
        if (star.delay <= 0) {
          star.active = true;
        }
        return;
      }

      star.x += star.speedX;
      star.y += star.speedY;
      star.life -= 0.02;

      if (star.life <= 0 || star.x > canvas.width || star.y > canvas.height) {
        star.x = -100;
        star.y = Math.random() * canvas.height * 0.5;
        star.life = 1;
        star.active = false;
        star.delay = Math.random() * 200;
        star.tail = [];
      }

      // Draw shooting star
      if (star.life > 0) {
        ctx.save();
        ctx.globalAlpha = star.life;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.speedX * 3, star.y - star.speedY * 3);
        ctx.stroke();
        ctx.restore();
      }
    });

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas);
    
    particlesRef.current = createSparkles(canvas);
    shootingStarsRef.current = createShootingStars(canvas);
    
    window.addEventListener('resize', () => resizeCanvas(canvas));
    animate(canvas, ctx);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    startAnimation();
    return stopAnimation;
  }, []);

  return { canvasRef };
};
