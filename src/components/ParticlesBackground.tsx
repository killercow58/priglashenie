import { useEffect, useRef } from 'react';
import { Particle } from '../types';

interface ParticlesBackgroundProps {
  dinoMode: boolean;
  accentColor: string;
}

export default function ParticlesBackground({ dinoMode, accentColor }: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 40;
    const mouse = { x: -1000, y: -1000, radius: 120 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Generate random particle
    const createParticle = (x?: number, y?: number, isSplash = false): Particle => {
      const pX = x !== undefined ? x : Math.random() * canvas.width;
      const pY = y !== undefined ? y : Math.random() * canvas.height + (isSplash ? 0 : 50);
      const size = Math.random() * (isSplash ? 12 : 18) + (isSplash ? 4 : 8);
      
      const speedX = (Math.random() - 0.5) * (isSplash ? 3 : 1);
      // bubbles float upwards, dino sparkles float and drift
      const speedY = isSplash 
        ? (Math.random() - 0.5) * 3 
        : -(Math.random() * 0.8 + 0.3);

      const typePool: ('bubble' | 'star' | 'dino')[] = ['bubble', 'star'];
      if (dinoMode) typePool.push('dino');
      const type = typePool[Math.floor(Math.random() * typePool.length)];

      const colors = dinoMode
        ? ['rgba(57, 255, 20, 0.4)', 'rgba(34, 197, 94, 0.3)', 'rgba(16, 185, 129, 0.4)']
        : [
            'rgba(0, 240, 255, 0.3)', // Cyan
            'rgba(255, 0, 127, 0.25)', // Pink
            'rgba(157, 78, 221, 0.25)', // Purple
            'rgba(57, 255, 20, 0.2)', // Neon green
          ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        x: pX,
        y: pY,
        size,
        speedX,
        speedY,
        color,
        alpha: Math.random() * 0.5 + 0.2,
        type,
      };
    };

    // Populate initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const drawEmoji = (ctx: CanvasRenderingContext2D, char: string, x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `${size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, x, y);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if floats off top or side
        if (p.y < -50 || p.x < -50 || p.x > canvas.width + 50) {
          particles[idx] = createParticle(Math.random() * canvas.width, canvas.height + 20);
          return;
        }

        // Mouse interaction (repelling effect)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 3;
          const pushY = Math.sin(angle) * force * 3;
          
          p.x += pushX;
          p.y += pushY;
        }

        // Render particle
        if (p.type === 'bubble') {
          // Draw a soft bubble
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          
          // Draw highlight
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        } else if (p.type === 'star') {
          // Render as floating neon stars / glows or emojis like drinks/sun
          const emoji = dinoMode ? '🌴' : (idx % 3 === 0 ? '🍹' : idx % 3 === 1 ? '☀️' : '🫧');
          drawEmoji(ctx, emoji, p.x, p.y, p.size * 1.2, p.alpha);
        } else if (p.type === 'dino') {
          // Render a cute little dinosaur
          drawEmoji(ctx, '🦖', p.x, p.y, p.size * 1.5, p.alpha);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    // Add splashes on click
    const handleCanvasClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      // Create splash burst
      for (let i = 0; i < 12; i++) {
        particles.push(createParticle(clickX, clickY, true));
      }
      
      // Limit total particles to prevent performance hit
      if (particles.length > 80) {
        particles.splice(0, particles.length - 80);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dinoMode, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
