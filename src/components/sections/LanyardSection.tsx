import React from 'react';
import Lanyard from '../ui/Lanyard';
import { SectionReveal } from '../ui/SectionReveal';
import { AnimatedText } from '../ui/AnimatedText';
import { ShieldCheck, Move } from 'lucide-react';

export const LanyardSection: React.FC = () => {
  return (
    <SectionReveal>
      <section id="lanyard-badge" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F598F2]" />
            <span>INTERACTIVE 3D BADGE</span>
          </div>
          <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
            <AnimatedText text="PHYSICS" mode="chars" className="mr-3" />
            <AnimatedText 
              text="LANYARD CARD" 
              mode="chars" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]"
            />
          </h2>
          <p className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base flex items-center justify-center space-x-2">
            <Move className="w-4 h-4 text-[#38BDF8] animate-bounce" />
            <span>Click and drag the physical ID card to interact with the rope physics simulation.</span>
          </p>
        </div>

        {/* 3D Physics Lanyard Canvas Container */}
        <div className="relative w-full h-[550px] sm:h-[650px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)]">
          <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} lanyardWidth={1.2} />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-2 rounded-full glass-panel border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
            [ Grab & flick card to test Rapier rigid body physics ]
          </div>
        </div>
      </section>
    </SectionReveal>
  );
};
