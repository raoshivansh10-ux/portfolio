import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';

export const CinematicTextSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(springScroll, [0, 1], [60, -120]);
  const opacity = useTransform(springScroll, [0.3, 0.5], [0, 1]);

  const transformStyle = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Video #2 (Autoplay, Muted, Loop) */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Top 180px Gradient Overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-[180px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, #010103 0%, transparent 100%)',
        }}
      />

      {/* 3D Perspective Text Container */}
      <div className="relative z-20 w-full max-w-5xl flex items-center justify-center [perspective:400px]">
        <motion.div
          style={{
            transform: transformStyle,
            opacity: opacity,
          }}
          className="w-full select-none px-6 sm:px-12 text-center"
        >
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={3}
            blurStrength={6}
            containerClassName="!m-0"
            textClassName="!text-white !font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] leading-[1.35] tracking-[-0.02em] text-center"
          >
            A creative engineer operating at the convergence of artificial intelligence, full stack system architecture, and 3D web motion. Transforming complex LLM workflows and computer vision algorithms into intuitive, production-grade applications. Every line of code is structured, scalable, and responsive.
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
};
