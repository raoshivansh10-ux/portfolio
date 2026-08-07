import React, { useRef, useEffect } from 'react';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import { AnimatedText } from '../ui/AnimatedText';
import { SectionReveal } from '../ui/SectionReveal';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ExperienceTimeline: React.FC = () => {
  const experiences = [
    {
      role: 'Creative Full Stack & AI Engineer Intern',
      company: 'Stealth AI Startup',
      location: 'Remote',
      period: '2024 - Present',
      description: 'Architecting high-performance LLM agentic interfaces, vision keypoint estimators with MediaPipe, and WebGL 3D frontend visualizers.',
      achievements: [
        'Reduced computer vision inference latency by 35% using Web Worker offloading',
        'Engineered responsive 60 FPS 3D canvas landing experiences using R3F',
        'Implemented automated multi-page invoice parser with GPT-4o vision',
      ],
    },
    {
      role: 'Frontend Developer & UI Specialist',
      company: 'Freelance & Contract Work',
      location: 'India',
      period: '2023 - 2024',
      description: 'Delivered custom web applications for e-commerce, botanical wholesale suppliers, and SaaS platforms using Next.js and Tailwind CSS.',
      achievements: [
        'Shipped Herbs Supplier Platform with wholesale automated volume calculator',
        'Optimized Lighthouse core web vitals score to 95+ across all clients',
      ],
    },
  ];

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = timelineContainerRef.current;
    const line = progressLineRef.current;
    if (!container || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <SectionReveal>
      <section id="timeline" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#F598F2]" />
            <span>CAREER MILESTONES</span>
          </div>
          <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
            <AnimatedText text="EXPERIENCE" mode="chars" className="mr-3" />
            <AnimatedText 
              text="TIMELINE" 
              mode="chars" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]"
            />
          </h2>
          <AnimatedText 
            text="Proven history of engineering production apps and innovative AI interfaces." 
            mode="words"
            as="p"
            className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base"
          />
        </div>

        {/* Illuminated Vertical Timeline */}
        <div ref={timelineContainerRef} className="relative max-w-4xl mx-auto">
          {/* Background Dim Central Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full" />

          {/* Scrubbed Animated Progress Line */}
          <div
            ref={progressLineRef}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F598F2] via-[#38BDF8] to-[#10B981] shadow-[0_0_20px_#F598F2] -translate-x-1/2 rounded-full origin-top transform-gpu"
          />

          <div className="space-y-16 relative z-10">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Indicator */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, ease: 'backOut' }}
                    className="absolute left-4 sm:left-1/2 w-6 h-6 rounded-full bg-[#F598F2] border-4 border-[#050505] shadow-[0_0_25px_#F598F2] -translate-x-1/2 z-20"
                  />

                  {/* Content Glass Card with Alternating Side Slide-in */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 80 : -80 }}
                    whileInView={{ opacity: 0.98, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}
                  >
                    <div
                      onMouseEnter={() => soundFx.playHoverSound()}
                      className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border border-white/10 group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,152,242,0.25)] hover:border-[#F598F2]/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-[#F598F2] px-3 py-1 rounded-full bg-[#F598F2]/10 border border-[#F598F2]/20">
                          {exp.period}
                        </span>
                        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <h3 className="font-clash text-xl sm:text-2xl font-bold text-white group-hover:text-[#F598F2] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="font-figtree text-sm font-semibold text-[#38BDF8] mb-4">
                        {exp.company}
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <div className="space-y-2 pt-3 border-t border-white/5">
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start space-x-2 text-xs font-sans text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
};
