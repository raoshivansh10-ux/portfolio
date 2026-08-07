import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Code2, BrainCircuit, Terminal, Compass, CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import DecayCard from '../ui/DecayCard';
import DecryptedText from '../ui/DecryptedText';
import { CircularText } from '../ui/CircularText';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Rotating Titles on Right Side
  const roles = ['AI Engineer', 'Full Stack Developer', 'Creative Technologist'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt for Polaroid Frame
  const polaroidRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = polaroidRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(-3deg) translateY(-10px) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const el = polaroidRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(-5deg) translateY(0px) scale(1)';
  };

  const orbitBadges = [
    { name: 'React 18', pos: 'top-[-16px] left-[10%]', color: 'border-[#38BDF8]/40 text-[#38BDF8]' },
    { name: 'Next.js 14', pos: 'top-[30%] right-[-24px]', color: 'border-white/40 text-white' },
    { name: 'Python & AI', pos: 'bottom-[-16px] left-[25%]', color: 'border-[#F598F2]/40 text-[#F598F2]' },
    { name: 'TypeScript', pos: 'top-[50%] left-[-24px]', color: 'border-[#10B981]/40 text-[#10B981]' },
  ];

  const milestones = [
    { year: '2023', label: 'Started Coding', desc: 'Full Stack & JS algorithms' },
    { year: '2024', label: 'First AI Project', desc: 'MediaPipe & Computer Vision' },
    { year: '2025', label: 'Open Source & 3D', desc: 'WebGL, R3F & Agents' },
    { year: '2026+', label: 'Building for Millions', desc: 'High-impact AI platforms' },
  ];

  return (
    <section id="about" className="relative w-full bg-black select-none font-mono overflow-hidden">
      <div 
        ref={containerRef}
        className="relative py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      >
      {/* Background Editorial Texture & Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Blueprint Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Ambient Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#F598F2]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[160px]" />
      </div>

      {/* Section Header Label */}
      <div className="relative z-10 flex items-center justify-between mb-16 border-b border-white/10 pb-6">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F598F2] animate-ping" />
          <span className="text-xs font-mono tracking-[0.25em] text-[#F598F2] uppercase">
            EDITORIAL DOSSIER • ABOUT ME
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-[11px] font-mono text-white/40">
          <span>EST. 2026</span>
          <span>•</span>
          <span>AI ENGINEER</span>
          <span>•</span>
          <span>FULL STACK</span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Vintage Polaroid Photo + Tech Badges + Sticky Note + Milestones + Academics */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-12">
          
          {/* Polaroid Container with Orbiting Badges & Neural Lines */}
          <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
            
            {/* Background Neural Network Blueprint Overlay */}
            <svg 
              className="absolute -top-12 -left-12 w-[130%] h-[130%] pointer-events-none opacity-20 text-[#38BDF8]" 
              viewBox="0 0 400 400"
            >
              <line x1="50" y1="50" x2="350" y2="350" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="350" y1="50" x2="50" y2="350" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="50" cy="50" r="6" fill="currentColor" />
              <circle cx="350" cy="350" r="6" fill="currentColor" />
              <circle cx="350" cy="50" r="6" fill="currentColor" />
              <circle cx="50" cy="350" r="6" fill="currentColor" />
            </svg>

            {/* Orbiting Tech Badges */}
            {orbitBadges.map((badge, idx) => (
              <motion.span
                key={idx}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3 + idx,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute ${badge.pos} z-30 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border text-[11px] font-mono shadow-lg transition-transform ${badge.color}`}
              >
                {badge.name}
              </motion.span>
            ))}

            {/* Vintage Polaroid Card */}
            <motion.div
              ref={polaroidRef}
              initial={{ y: 60, opacity: 0, rotate: -5 }}
              animate={isInView ? { y: 0, opacity: 1, rotate: -5 } : {}}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => soundFx.playHoverSound()}
              className="relative w-full bg-[#f4efea] p-4 sm:p-5 pb-16 rounded-md shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/20 transform-gpu cursor-pointer transition-shadow duration-300 hover:shadow-[0_35px_80px_rgba(245,152,242,0.35)]"
              style={{ transformStyle: 'preserve-3d', transform: 'rotate(-5deg)' }}
            >
              {/* Photo Frame Container */}
              <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-black rounded-sm border border-black/10">
                <img 
                  src="/developer_portrait.png" 
                  alt="Shivansh Yadav Portrait"
                  className="w-full h-full object-cover object-center filter brightness-105 contrast-[1.03]"
                />
                
                {/* Subtle Glass Reflection Shader */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" />
                
                {/* Vintage Corner Editorial Text Marks */}
                <span className="absolute top-3 left-3 text-[9px] font-mono tracking-widest text-white/70 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  PORTRAIT // 01
                </span>
                <span className="absolute top-3 right-3 text-[9px] font-mono tracking-widest text-[#F598F2] bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  ★ AI ENGINEER
                </span>
              </div>

              {/* Handwritten Style Caption on Polaroid Bottom */}
              <div className="mt-4 flex items-center justify-between px-2 text-black/80">
                <span className="font-serif italic text-lg tracking-tight font-semibold">
                  Shivansh Yadav
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-black/60">
                  SHIVANSH.DEV • 2026
                </span>
              </div>

              {/* Tape Effect on Top Right */}
              <div className="absolute -top-4 right-8 w-20 h-7 bg-white/40 backdrop-blur-sm rotate-12 shadow-sm border border-white/30 pointer-events-none" />
            </motion.div>

            {/* Sticky Note Upgrade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 6 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-10 -right-6 sm:-right-10 z-20 w-56 p-4 rounded-lg bg-[#fef08a] text-black shadow-xl border border-yellow-300/60 rotate-6"
            >
              <div className="flex items-center space-x-1 mb-1 text-yellow-800 text-[10px] font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-3 h-3 text-yellow-900" />
                <span>PERSONAL MANIFESTO</span>
              </div>
              <p className="font-sans text-xs font-semibold leading-snug text-slate-900">
                "Building products where clean design meets artificial intelligence."
              </p>
            </motion.div>
          </div>

          {/* Vertical Milestone Timeline Upgrade */}
          <div className="w-full pt-8 space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] flex items-center space-x-2">
              <Compass className="w-4 h-4" />
              <span>EVOLUTION TIMELINE</span>
            </h4>
            <div className="space-y-4 border-l-2 border-white/10 pl-4 ml-2">
              {milestones.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-[#38BDF8] group-hover:bg-[#38BDF8] transition-colors" />
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#F598F2]">{item.year}</span>
                    <span className="font-sans text-xs font-semibold text-white">• {item.label}</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Academic Education Badge */}
            <div className="glass-panel p-4 rounded-2xl border border-white/15 space-y-2 hover:border-[#38BDF8]/50 transition-colors mt-6">
              <div className="flex items-center space-x-2 text-[#38BDF8] font-mono text-[11px] font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
                <span>ACADEMICS & DEGREE</span>
              </div>
              <div className="space-y-0.5">
                <p className="font-sans text-xs font-bold text-white">
                  B.Tech in Computer Science & Engineering (CSE)
                </p>
                <p className="font-sans text-[11px] text-slate-300">
                  Raj Kumar Goel Institute of Technology (RKGIT)
                </p>
              </div>
            </div>

            {/* Design Meets Intelligence Philosophy Badge with CircularText */}
            <div className="glass-panel p-5 rounded-2xl border border-white/15 hover:border-[#F598F2]/50 transition-colors mt-4 flex items-center justify-between gap-4 overflow-hidden relative">
              <div className="space-y-2 z-10">
                <div className="flex items-center space-x-2 text-[#F598F2] font-mono text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F598F2]" />
                  <span>CORE PHILOSOPHY</span>
                </div>
                <p className="font-clash text-lg sm:text-xl font-bold text-white tracking-wide">
                  Design Meets Intelligence
                </p>
                <p className="font-sans text-xs text-slate-300 font-medium italic">
                  "Driven by curiosity, powered by code"
                </p>
              </div>

              {/* Animated CircularText Badge */}
              <div className="shrink-0 z-10">
                <CircularText
                  text="DESIGN*MEETS*INTELLIGENCE*"
                  spinDuration={18}
                  onHover="speedUp"
                  className="text-[#F598F2]"
                />
              </div>
            </div>
          </div>

        </div>


        {/* RIGHT COLUMN: Editorial Storytelling Typography */}
        <div className="lg:col-span-7 space-y-10 pt-4">
          
          {/* Main Large Editorial Heading */}
          <div className="space-y-2">
            <motion.h3 
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-white/40 font-light text-4xl sm:text-6xl tracking-tight leading-none"
            >
              HI,
            </motion.h3>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-white font-medium text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95]"
            >
              I'm Shivansh.
            </motion.h1>

            {/* Rotating Role Pill */}
            <div className="h-10 pt-3 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roles[roleIndex]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F598F2]/20 via-[#38BDF8]/20 to-[#10B981]/20 border border-white/15 text-[#F598F2] font-mono text-sm font-semibold"
                >
                  <BrainCircuit className="w-4 h-4 text-[#38BDF8]" />
                  <span>{roles[roleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtitle / Intro Lead Quote */}
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-2xl border-l-2 border-[#F598F2] pl-5 py-1"
          >
            "I don't just build websites—I create digital experiences that blend artificial intelligence, clean engineering, and modern design. My focus is on building products that are fast, interactive, and solve real problems."
          </motion.p>

          {/* Three Storytelling Paragraphs with Large Highlighted Words */}
          <div className="space-y-8 pt-4">
            
            {/* SECTION 1: Curiosity */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-2 group"
            >
              <div className="flex items-center space-x-3">
                <DecryptedText
                  text="Curiosity"
                  speed={60}
                  maxIterations={15}
                  animateOn="inViewHover"
                  revealDirection="center"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] to-[#38BDF8]"
                  parentClassName="text-2xl sm:text-3xl font-bold font-clash tracking-wider group-hover:scale-105 transition-transform origin-left cursor-pointer"
                  encryptedClassName="text-[#F598F2]/60 opacity-80"
                />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#F598F2]/40 to-transparent" />
              </div>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                My journey into technology began with a simple curiosity about how software works. That curiosity grew into a passion for web development, where I discovered the joy of turning ideas into interactive experiences through code.
              </p>
            </motion.div>

            {/* SECTION 2: Innovation */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="space-y-2 group"
            >
              <div className="flex items-center space-x-3">
                <DecryptedText
                  text="Innovation"
                  speed={60}
                  maxIterations={15}
                  animateOn="inViewHover"
                  revealDirection="center"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#10B981]"
                  parentClassName="text-2xl sm:text-3xl font-bold font-clash tracking-wider group-hover:scale-105 transition-transform origin-left cursor-pointer"
                  encryptedClassName="text-[#38BDF8]/60 opacity-80"
                />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#38BDF8]/40 to-transparent" />
              </div>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                As I explored artificial intelligence, I realized its power to transform everyday applications. Today, I build AI-powered tools using modern technologies like React, Next.js, TypeScript, FastAPI, and computer vision to create products that are both intelligent and user-friendly.
              </p>
            </motion.div>

            {/* SECTION 3: Vision */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-2 group"
            >
              <div className="flex items-center space-x-3">
                <DecryptedText
                  text="Vision"
                  speed={60}
                  maxIterations={15}
                  animateOn="inViewHover"
                  revealDirection="center"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#F598F2]"
                  parentClassName="text-2xl sm:text-3xl font-bold font-clash tracking-wider group-hover:scale-105 transition-transform origin-left cursor-pointer"
                  encryptedClassName="text-[#10B981]/60 opacity-80"
                />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#10B981]/40 to-transparent" />
              </div>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                My goal is to build products that combine creativity with technology, pushing the boundaries of what modern web applications can do. I believe great software isn't just functional—it should be memorable, intuitive, and enjoyable to use.
              </p>
            </motion.div>

          </div>

          {/* Handwritten Style Animated Signature Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* Signature SVG animation */}
            <div className="space-y-1">
              <svg className="w-56 h-12 text-[#F598F2]" viewBox="0 0 280 60" fill="none">
                <motion.path
                  d="M10,40 C30,10 50,55 70,25 C85,5 95,50 115,20 C130,5 145,45 160,25 C175,10 190,40 210,15 C225,5 240,45 270,20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1 }}
                />
                <text x="15" y="45" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="white" opacity="0.9" fontStyle="italic">
                  Shivansh Yadav
                </text>
              </svg>
              <div className="font-mono text-xs text-[#38BDF8] tracking-wider uppercase">
                AI • Full Stack • Creative Developer
              </div>
            </div>

            {/* Direct Contact Action Button */}
            <a
              href="mailto:raoshivansh10@gmail.com"
              onMouseEnter={() => soundFx.playHoverSound()}
              className="px-6 py-3 rounded-full bg-white text-black font-figtree font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-[#F598F2] hover:text-black transition-colors shadow-lg"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>

      </div>
    </div>
  </section>
  );
};
