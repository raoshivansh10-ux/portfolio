import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../ui/SoundEngine';

interface HeroSectionProps {
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoSources, setVideoSources] = useState<string[]>([
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4',
  ]);

  const [hasRevealed, setHasRevealed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const rawVideoUrls = [
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4',
  ];

  // Preload videos as Blobs for instant playback
  useEffect(() => {
    let isMounted = true;
    const blobUrls: string[] = [];

    const preloadVideos = async () => {
      const fetchedSources = await Promise.all(
        rawVideoUrls.map(async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Fetch failed');
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            blobUrls.push(objectUrl);
            return objectUrl;
          } catch {
            return url;
          }
        })
      );

      if (isMounted) {
        setVideoSources(fetchedSources);
      }
    };

    preloadVideos();

    return () => {
      isMounted = false;
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // IntersectionObserver for reveal animations at 0.35 threshold
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const videoModes = [
    { label: '01 / WATER WAVE', index: 0 },
    { label: '02 / GRIDWAVE', index: 1 },
    { label: '03 / LIGHT TUNNEL', index: 2 },
  ];

  const scrollToSection = (id: string) => {
    soundFx.playClickSound();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isPink = activeIndex === 0;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full bg-black text-white font-figtree select-none overflow-hidden"
    >
      {/* Background Videos (Stacked absolutely, simultaneous render with 1200ms opacity crossfade) */}
      <div aria-hidden="true" className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {videoSources.map((src, i) => (
          <video
            key={i}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              activeIndex === i ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          />
        ))}
        {/* Darkening Overlay */}
        <div className="absolute inset-0 bg-black/10 z-[1]" />
      </div>

      {/* Main Hero Content (z-[2]) */}
      <div className="relative z-[2] max-w-[1340px] mx-auto min-h-screen flex flex-col justify-end items-end gap-[150px] pt-[190px] pb-[60px] px-[15px] mobile:justify-end mobile:items-start mobile:gap-[72px] mobile:pt-[140px] mobile:px-[18px] mobile:pb-11 md-tablet:gap-[150px]">
        
        {/* Section 1: Video Switcher + Availability */}
        <div className="w-full flex justify-between items-start mobile:flex-col mobile:gap-7">
          {/* Left: Video Switcher Buttons */}
          <div className="flex-[4] mobile:flex-none flex flex-col gap-2 items-start">
            {videoModes.map((mode) => {
              const isActive = activeIndex === mode.index;
              return (
                <button
                  key={mode.index}
                  onClick={() => {
                    soundFx.playClickSound();
                    setActiveIndex(mode.index);
                  }}
                  onMouseEnter={() => soundFx.playHoverSound()}
                  className={`role-link text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-left transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-55 hover:opacity-75'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Right: Pulsing Availability Dot */}
          <div className="flex-1 mobile:flex-none flex items-center gap-2.5">
            <span
              className="w-[7px] h-[7px] rounded-full animate-dotPulse"
              style={{
                backgroundColor: isPink ? '#F598F2' : '#ffffff',
                boxShadow: isPink ? '0 0 10px #F598F2' : '0 0 10px #ffffff',
              }}
            />
            <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white">
              Available for work
            </span>
          </div>
        </div>

        {/* Section 2: Name + CTA */}
        <div className="w-full flex justify-between items-end mobile:flex-col mobile:items-start mobile:gap-8">
          {/* Left: Giant Name with Accent Dot */}
          <div className="flex-[2] mobile:flex-none overflow-hidden">
            <h1
              className={`font-medium uppercase text-[200px] leading-[81%] tracking-[-6px] md-tablet:text-[129.6px] md-tablet:leading-[113.4px] md-tablet:tracking-[-7.7px] mobile:text-[clamp(68px,21vw,80px)] mobile:leading-[96px] mobile:tracking-[-4.8px] ${
                hasRevealed ? 'animate-revealUp' : 'opacity-0 translate-y-20'
              }`}
            >
              Shivansh
              <span
                className="transition-colors duration-500"
                style={{ color: isPink ? '#F598F2' : '#ffffff' }}
              >
                .
              </span>
            </h1>
          </div>

          {/* Right: Paragraph + Start a Project Button */}
          <div className="flex-1 pl-[50px] md-tablet:pl-6 mobile:pl-0 mobile:flex-none flex flex-col gap-6 items-start">
            <p
              className={`text-base leading-6 tracking-[-0.16px] font-medium max-w-[420px] text-white/90 ${
                hasRevealed ? 'animate-revealRight' : 'opacity-0 translate-x-24'
              }`}
            >
              I craft bold brands and modern websites with purpose. Specializing in AI engineering, high-performance full stack applications, and creative motion.
            </p>

            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => soundFx.playHoverSound()}
              className={`btn-fill-up border border-white text-white px-7 py-3 rounded-full text-xs font-medium uppercase tracking-wide cursor-pointer ${
                hasRevealed ? 'animate-revealRight [animation-delay:80ms]' : 'opacity-0 translate-x-24'
              }`}
            >
              <span>start a project</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
