import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 120,
          scale: 0.92,
          filter: 'blur(20px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
};
