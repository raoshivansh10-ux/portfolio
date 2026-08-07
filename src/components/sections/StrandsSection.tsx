import React from 'react';
import Strands from '../ui/Strands';
import { SectionReveal } from '../ui/SectionReveal';
import { AnimatedText } from '../ui/AnimatedText';
import { Sparkles } from 'lucide-react';

export const StrandsSection: React.FC = () => {
  return (
    <SectionReveal>
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F598F2]" />
            <span>LIGHT WAVE SYNTHESIS</span>
          </div>
          <h2 className="font-clash text-3xl sm:text-5xl font-bold tracking-tight text-white">
            <AnimatedText text="CREATIVE ENERGY" mode="chars" className="mr-3" />
            <AnimatedText 
              text="STRANDS" 
              mode="chars" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]"
            />
          </h2>
        </div>

        {/* Strands Container Box */}
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-[0_0_60px_rgba(245,152,242,0.25)]">
          <Strands
            colors={["#F598F2", "#38BDF8", "#10B981", "#7C3AED", "#F97316"]}
            count={4}
            speed={0.6}
            amplitude={1.2}
            waviness={1.1}
            thickness={0.85}
            glow={2.8}
            taper={2.5}
            spread={1.2}
            intensity={0.7}
            saturation={1.6}
            opacity={0.95}
            scale={1.4}
            glass={false}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
            <span className="font-mono text-xs text-[#F598F2] uppercase tracking-widest">
              OGL WebGL Shader Processing Engine
            </span>
            <span className="font-mono text-xs text-slate-400">
              60 FPS Dynamic Waveforms
            </span>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
};
