import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    isHovered: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse Move Event Listener - SYSTEM 2 (Only updates Ref values, zero re-renders)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovered = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle Stars System
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 160);
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      alphaSpeed: number;
      speedX: number;
      speedY: number;
      color: string;
      orbitRadius: number;
      orbitSpeed: number;
      angle: number;
    }> = [];

    const colors = ['#F598F2', '#38BDF8', '#10B981', '#E0E7FF', '#C084FC'];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const alpha = Math.random() * 0.7 + 0.2;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2.2 + 0.6,
        baseAlpha: alpha,
        alpha,
        alphaSpeed: (Math.random() - 0.5) * 0.012,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
        orbitRadius: Math.random() * 30 + 10,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // SYSTEM 1 - Permanent, Continuous 60 FPS Render Loop (Never stops)
    const render = () => {
      time += 0.008;

      // Smoothly lerp mouse coordinates inside render loop
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Layer 1: Living Organic Nebula Clouds (Flowing procedural background) ---
      const nebulaNodes = [
        {
          cx: canvas.width * 0.25 + Math.sin(time * 0.7) * 80 + (mouseX - canvas.width / 2) * 0.03,
          cy: canvas.height * 0.3 + Math.cos(time * 0.5) * 60 + (mouseY - canvas.height / 2) * 0.03,
          r: Math.min(canvas.width, canvas.height) * 0.45,
          colorStops: [
            { stop: 0, color: 'rgba(245, 152, 242, 0.14)' },
            { stop: 0.5, color: 'rgba(56, 189, 248, 0.08)' },
            { stop: 1, color: 'rgba(0, 0, 0, 0)' },
          ],
        },
        {
          cx: canvas.width * 0.75 + Math.cos(time * 0.6) * 90 + (mouseX - canvas.width / 2) * 0.02,
          cy: canvas.height * 0.7 + Math.sin(time * 0.8) * 70 + (mouseY - canvas.height / 2) * 0.02,
          r: Math.min(canvas.width, canvas.height) * 0.5,
          colorStops: [
            { stop: 0, color: 'rgba(56, 189, 248, 0.12)' },
            { stop: 0.5, color: 'rgba(16, 185, 129, 0.06)' },
            { stop: 1, color: 'rgba(0, 0, 0, 0)' },
          ],
        },
        {
          cx: canvas.width * 0.5 + Math.sin(time * 0.4) * 110,
          cy: canvas.height * 0.5 + Math.cos(time * 0.6) * 90,
          r: Math.min(canvas.width, canvas.height) * 0.38,
          colorStops: [
            { stop: 0, color: 'rgba(192, 132, 252, 0.10)' },
            { stop: 0.6, color: 'rgba(245, 152, 242, 0.04)' },
            { stop: 1, color: 'rgba(0, 0, 0, 0)' },
          ],
        },
      ];

      nebulaNodes.forEach((node) => {
        const grad = ctx.createRadialGradient(node.cx, node.cy, 0, node.cx, node.cy, node.r);
        node.colorStops.forEach((cs) => grad.addColorStop(cs.stop, cs.color));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.cx, node.cy, node.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Layer 2: Particle Starfield & Gravitational Pull ---
      particles.forEach((p) => {
        // Continuous organic motion
        p.angle += p.orbitSpeed;
        p.x += p.speedX + Math.cos(p.angle) * 0.2;
        p.y += p.speedY + Math.sin(p.angle) * 0.2;

        // Screen wrap
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Subtle twinkling
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.1 || p.alpha >= 0.85) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Mouse Gravitational Influence (Subtle pull toward cursor)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 240;

        let drawX = p.x;
        let drawY = p.y;
        let alphaMultiplier = 1;

        if (dist < maxDist && dist > 1) {
          const force = (1 - dist / maxDist) * 0.35;
          drawX += (dx / dist) * force * 35;
          drawY += (dy / dist) * force * 35;
          alphaMultiplier = 1 + (1 - dist / maxDist) * 0.6;
        }

        // Draw particle star
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.alpha * alphaMultiplier);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * (dist < maxDist ? 1.25 : 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // --- Layer 3: Subtle Gravitational Ripple around Cursor ---
      if (mouseRef.current.isHovered) {
        const pulseR = 60 + Math.sin(time * 4) * 15;
        const cursorGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, pulseR);
        cursorGrad.addColorStop(0, 'rgba(245, 152, 242, 0.15)');
        cursorGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.06)');
        cursorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, pulseR, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform">
      {/* Particle & Living Nebula Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Subtle Cosmic Grain Noise Overlay */}
      <div className="absolute inset-0 noise-bg opacity-20 mix-blend-overlay pointer-events-none" />
    </div>
  );
};

