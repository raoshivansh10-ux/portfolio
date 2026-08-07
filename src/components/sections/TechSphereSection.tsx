import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Code2, Cpu, Server, Wrench } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import { SectionReveal } from '../ui/SectionReveal';
import { AnimatedText } from '../ui/AnimatedText';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
  level: string;
}

export const TechSphereSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'ai' | 'tools'>('all');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const skillsList: TechItem[] = [
    { name: 'React', category: 'frontend', level: 'Expert' },
    { name: 'Next.js', category: 'frontend', level: 'Advanced' },
    { name: 'TypeScript', category: 'frontend', level: 'Advanced' },
    { name: 'Tailwind CSS', category: 'frontend', level: 'Expert' },
    { name: 'JavaScript', category: 'frontend', level: 'Expert' },
    { name: 'Three.js / R3F', category: 'frontend', level: 'Intermediate' },
    { name: 'Node.js', category: 'backend', level: 'Advanced' },
    { name: 'Python', category: 'ai', level: 'Advanced' },
    { name: 'FastAPI', category: 'backend', level: 'Advanced' },
    { name: 'MongoDB', category: 'backend', level: 'Intermediate' },
    { name: 'PostgreSQL', category: 'backend', level: 'Intermediate' },
    { name: 'Firebase', category: 'backend', level: 'Intermediate' },
    { name: 'OpenAI API', category: 'ai', level: 'Expert' },
    { name: 'MediaPipe', category: 'ai', level: 'Advanced' },
    { name: 'Docker', category: 'tools', level: 'Intermediate' },
    { name: 'Git & GitHub', category: 'tools', level: 'Advanced' },
    { name: 'Vercel', category: 'tools', level: 'Expert' },
  ];

  // Interactive 3D Sphere Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 400);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 400;
      }
    };
    window.addEventListener('resize', handleResize);

    const techNames = skillsList.map((s) => s.name);
    const radius = Math.min(width, height) * 0.38;

    interface Node3D {
      x: number;
      y: number;
      z: number;
      text: string;
    }

    const nodes: Node3D[] = techNames.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / techNames.length);
      const theta = Math.sqrt(techNames.length * Math.PI) * phi;
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        text,
      };
    });

    let mouseX = 0.003;
    let mouseY = 0.003;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) * 0.0001;
      mouseY = (e.clientY - cy) * 0.0001;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        const cosY = Math.cos(mouseX);
        const sinY = Math.sin(mouseX);
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        const cosX = Math.cos(mouseY);
        const sinX = Math.sin(mouseY);
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        node.x = x1;
        node.y = y1;
        node.z = z2;

        const scale = 300 / (300 + node.z);
        const alpha = Math.max(0.2, (node.z + radius) / (2 * radius));
        const projX = node.x * scale + width / 2;
        const projY = node.y * scale + height / 2;

        ctx.save();
        ctx.font = `${Math.max(10, Math.floor(13 * scale))}px 'Figtree', sans-serif`;
        ctx.fillStyle = `rgba(245, 152, 242, ${alpha})`;
        ctx.shadowBlur = 10 * scale;
        ctx.shadowColor = '#F598F2';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.text, projX, projY);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [skillsList]);

  const filteredSkills = skillsList.filter(
    (s) => activeTab === 'all' || s.category === activeTab
  );

  return (
    <SectionReveal>
      <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#F598F2]/15 rounded-full blur-[150px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F598F2]" />
            <span>TECH ARSENAL</span>
          </div>
          <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
            <AnimatedText text="SKILLS &" mode="chars" className="mr-3" />
            <AnimatedText 
              text="3D TECH SPHERE" 
              mode="chars" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]"
            />
          </h2>
          <AnimatedText 
            text="Interactive technology cloud and 3D floating cards representing modern stack capabilities." 
            mode="words"
            as="p"
            className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Sphere Interactive Canvas */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 relative flex flex-col items-center justify-center">
            <span className="absolute top-4 left-5 text-xs font-mono text-[#F598F2] uppercase tracking-wider">
              Interactive 3D Sphere
            </span>
            <canvas ref={canvasRef} className="w-full h-[380px] cursor-grab active:cursor-grabbing" />
            <span className="text-[11px] font-mono text-slate-500">
              [ Move cursor over sphere to rotate tech cloud ]
            </span>
          </div>

          {/* Floating 3D Cards Grid */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Tech', icon: Code2 },
                { id: 'frontend', label: 'Frontend', icon: Cpu },
                { id: 'backend', label: 'Backend', icon: Server },
                { id: 'ai', label: 'AI & Vision', icon: Sparkles },
                { id: 'tools', label: 'Tools & DevOps', icon: Wrench },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClickSound();
                      setActiveTab(tab.id as any);
                    }}
                    onMouseEnter={() => soundFx.playHoverSound()}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-figtree font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F598F2] to-[#38BDF8] text-black font-bold shadow-[0_0_20px_rgba(245,152,242,0.4)]'
                        : 'glass-panel text-slate-300 hover:text-white border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Cards Grid with Wave Stagger Animation */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-3.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              {filteredSkills.map((skill, idx) => (
                <motion.div
                  key={skill.name + idx}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9, rotate: -3 },
                    visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
                  }}
                  whileHover={{ y: -6, scale: 1.05, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onMouseEnter={() => soundFx.playHoverSound()}
                  className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(245,152,242,0.25)] hover:border-[#F598F2]/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-figtree font-bold text-sm text-white group-hover:text-[#F598F2] transition-colors">
                      {skill.name}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="capitalize text-[#F598F2]/90">{skill.category}</span>
                    <span className="text-slate-400">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
};
