import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ImageRevealProps {
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt = '',
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const media = mediaRef.current;
    if (!container || !media) return;

    const ctx = gsap.context(() => {
      // Clip path reveal on container
      gsap.fromTo(
        container,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.2 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Inner image scaling & parallax
      gsap.fromTo(
        media,
        { scale: 1.25, y: -20, filter: 'brightness(0.6)' },
        {
          scale: 1,
          y: 0,
          filter: 'brightness(1)',
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl transform-gpu ${className}`}
    >
      <div ref={mediaRef} className="w-full h-full transform-gpu transition-all">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
