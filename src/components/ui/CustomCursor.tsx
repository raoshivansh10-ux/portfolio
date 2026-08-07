import React, { useEffect, useRef, useState } from 'react';
import { soundFx } from './SoundEngine';

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
}

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [hasMoved, setHasMoved] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const particles = useRef<TrailParticle[]>([]);

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Add light trail particle
      if (Math.random() < 0.6) {
        const colors = ['#F598F2', '#38BDF8', '#10B981', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1.5,
          color,
          alpha: 0.8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
        });
      }

      // Check hover states
      const target = e.target as HTMLElement | null;
      if (target) {
        const hoverable = target.closest('a, button, [data-hover], input, textarea, [role="button"]');
        if (hoverable) {
          setIsHovered(true);
          const customText = hoverable.getAttribute('data-hover');
          setHoverText(customText || '');
        } else {
          setIsHovered(false);
          setHoverText('');
        }
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      soundFx.playClickSound();
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Canvas particle trail animation loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      // Lerp ring towards mouse
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.02;
          p.size *= 0.95;

          if (p.alpha <= 0 || p.size <= 0.2) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasMoved]);

  if (!hasMoved) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998]"
      />
      
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100000] rounded-full transition-transform duration-75 flex items-center justify-center ${
          isClicking
            ? 'w-3.5 h-3.5 bg-[#F598F2] shadow-[0_0_20px_#F598F2]'
            : isHovered
            ? 'w-7 h-7 bg-[#F598F2]/90 shadow-[0_0_25px_#F598F2]'
            : 'w-3.5 h-3.5 bg-white shadow-[0_0_12px_#ffffff]'
        }`}
      >
        {hoverText && (
          <span className="absolute text-[9px] font-grotesk font-bold text-black uppercase tracking-wider whitespace-nowrap">
            {hoverText}
          </span>
        )}
      </div>

      {/* Outer Glowing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border transition-all duration-300 cubic-bezier(0.16,1,0.3,1) ${
          isHovered
            ? 'w-16 h-16 border-[#F598F2]/70 bg-[#F598F2]/15 backdrop-blur-[2px] shadow-[0_0_35px_rgba(245,152,242,0.4)]'
            : isClicking
            ? 'w-10 h-10 border-[#38BDF8]/90 bg-[#38BDF8]/25'
            : 'w-10 h-10 border-white/40 bg-transparent'
        }`}
      />
    </>
  );
};
