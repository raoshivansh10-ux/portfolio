import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrambleIn } from './ScrambleIn';

interface HeroSectionProps {
  onEntranceComplete: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEntranceComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entranceComplete, setEntranceComplete] = useState(false);

  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceComplete(true);
      onEntranceComplete();
    }, 800);
    return () => clearTimeout(timer);
  }, [onEntranceComplete]);

  // System 1: Video autoplay continuously
  // System 2: Mouse mousemove listener updates mouseRef for subtle parallax transform
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays continuously
    video.play().catch(() => {});

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Permanent 60 FPS parallax animation loop
    const animateParallax = () => {
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      if (video) {
        video.style.transform = `translate3d(${mouseRef.current.currentX}px, ${mouseRef.current.currentY}px, 0) scale(1.06)`;
      }

      animationFrameRef.current = requestAnimationFrame(animateParallax);
    };

    animationFrameRef.current = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-screen h-[100dvh] bg-black overflow-hidden flex flex-col select-none">
      {/* Hero Background Video (Autoplay continuous loop + subtle parallax) */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform scale-[1.06]"
      />

      {/* 24x24px Dot Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Large Background Watermark Text "SHIVANSH" in Anton SC */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-10 text-center uppercase tracking-[-4px] font-anton whitespace-nowrap"
        style={{
          transform: 'translate(-50%, calc(-50% + 50px))',
          fontSize: 'clamp(120px, 30vw, 521px)',
          background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        SHIVANSH
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 flex-1 flex flex-col justify-between px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
      >
        <div className="flex-1" />

        {/* Bottom Row Typography & Description */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Shivansh" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Yadav" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed font-mono"
            >
              AI Engineer & Creative Full Stack Developer. Engineering high-performance neural interfaces, computer vision engines, and 60 FPS 3D web experiences.
            </motion.p>
          </div>

          {/* Right Column */}
          <div className="text-left md:text-right">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Creative" delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Developer" delay={1000} triggered={entranceComplete} />
            </h1>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
