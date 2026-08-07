import React from 'react';
import { 
  Code, 
  Server, 
  BrainCircuit, 
  Palette, 
  Sparkles, 
  Globe, 
  Bot 
} from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import { SectionReveal } from '../ui/SectionReveal';
import { AnimatedText } from '../ui/AnimatedText';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Frontend Development',
      desc: 'Building responsive, scalable web applications with React, Next.js, TypeScript, and clean modular component architecture.',
      icon: Code,
      color: 'text-[#F598F2]',
    },
    {
      title: 'Backend Development',
      desc: 'Architecting REST & GraphQL APIs, Node.js microservices, Python FastAPI servers, and robust database models.',
      icon: Server,
      color: 'text-[#38BDF8]',
    },
    {
      title: 'AI & Vision Development',
      desc: 'Integrating LLM agents, MediaPipe computer vision keypoint trackers, RAG vector search, and OpenAI APIs.',
      icon: BrainCircuit,
      color: 'text-[#10B981]',
    },
    {
      title: 'Website & UI Design',
      desc: 'Crafting futuristic dark glassmorphic design systems, sleek color palettes, typography, and premium user experiences.',
      icon: Palette,
      color: 'text-[#F598F2]',
    },
    {
      title: 'UI Motion & 3D Animation',
      desc: 'Engineering 60 FPS WebGL 3D scenes with Three.js, React Three Fiber, GSAP, and smooth parallax interactions.',
      icon: Sparkles,
      color: 'text-[#38BDF8]',
    },
    {
      title: 'API Integration & Automation',
      desc: 'Automating multi-step workflows, payment gateways, webhook pipelines, and third-party SaaS integrations.',
      icon: Bot,
      color: 'text-[#10B981]',
    },
  ];

  return (
    <SectionReveal>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
            <Globe className="w-3.5 h-3.5 text-[#F598F2]" />
            <span>WHAT I OFFER</span>
          </div>
          <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
            <AnimatedText text="CREATIVE" mode="chars" className="mr-3" />
            <AnimatedText 
              text="SERVICES" 
              mode="chars" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]"
            />
          </h2>
          <AnimatedText 
            text="End-to-end full stack development, artificial intelligence engineering, and 3D web motion design." 
            mode="words"
            as="p"
            className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => soundFx.playHoverSound()}
                className="glass-panel glass-panel-hover p-8 rounded-3xl border border-white/10 flex flex-col justify-between group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(245,152,242,0.25)] hover:border-[#F598F2]/40"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#F598F2]/40 transition-all duration-300">
                    <Icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <h3 className="font-clash text-xl font-bold text-white mb-3 group-hover:text-[#F598F2] transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-[#F598F2] transition-colors">
                  <span>0{idx + 1}</span>
                  <span>EXPLORE &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SectionReveal>
  );
};
