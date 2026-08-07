import React, { useRef, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import { SectionReveal } from '../ui/SectionReveal';
import { AnimatedText } from '../ui/AnimatedText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const TestimonialsMarquee: React.FC = () => {
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: 'Alex Vance',
      role: 'CTO @ Stealth AI Lab',
      content: 'Shivansh combines deep AI knowledge with world-class frontend motion skills. He built our 3D vision web demo in record time.',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Product Lead @ Botanical Supply Co.',
      content: 'The Herbs Supplier e-commerce platform delivered by Shivansh elevated our wholesale sales significantly. The glass UI is stunning!',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Senior Architect @ Tech Venturing',
      content: 'Clean TypeScript code, 60 FPS animations, and intuitive LLM workflow integrations. Shivansh is a rare high-caliber engineer.',
      rating: 5,
    },
    {
      name: 'Sarah Jenkins',
      role: 'Design Director @ Creative Agency',
      content: 'Working with Shivansh was seamless. He translated complex 3D wireframe concepts into responsive WebGL canvas magic.',
      rating: 5,
    },
  ];

  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  // Dynamic marquee speed based on scroll velocity
  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    let timeScale = 1;
    let tween: gsap.core.Tween;

    const ctx = gsap.context(() => {
      // Endless smooth horizontal movement
      tween = gsap.to(track, {
        xPercent: -33.333,
        repeat: -1,
        duration: 25,
        ease: 'none',
      });

      // Speed up marquee when scrolling fast
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const targetScale = 1 + Math.min(velocity / 200, 3.5);
          gsap.to(tween, { timeScale: targetScale, duration: 0.3, overwrite: 'auto' });
        },
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <SectionReveal>
      <section className="relative py-24 overflow-hidden border-y border-white/5 bg-black/40">
        <div className="flex flex-col items-center text-center mb-12 px-4">
          <span className="font-mono text-xs text-[#F598F2] uppercase tracking-widest mb-2">
            CLIENT & PEER REVIEWS
          </span>
          <h3 className="font-clash text-3xl sm:text-4xl font-bold text-white">
            <AnimatedText text="TESTIMONIALS & ENDORSEMENTS" mode="words" />
          </h3>
        </div>

        {/* Infinite Scrolling Marquee Track with Edge Gradient Mask & Velocity Physics */}
        <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div
            ref={marqueeTrackRef}
            className="flex gap-6 py-4 w-max cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]"
          >
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundFx.playHoverSound()}
                className="w-80 sm:w-96 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between shrink-0 hover:border-[#F598F2]/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-6 h-6 text-[#F598F2] opacity-70" />
                    <div className="flex text-[#F598F2] space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F598F2]" />
                      ))}
                    </div>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex flex-col border-t border-white/5 pt-3">
                  <span className="font-clash font-bold text-sm text-white">{item.name}</span>
                  <span className="font-mono text-[11px] text-[#38BDF8]">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
};
