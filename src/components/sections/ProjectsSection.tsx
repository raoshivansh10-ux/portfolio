import React, { useState, useRef, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  Play, 
  X, 
  CheckCircle2, 
  Activity, 
  Cpu
} from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import { AnimatedText } from '../ui/AnimatedText';
import { ImageReveal } from '../ui/ImageReveal';
import { SectionReveal } from '../ui/SectionReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ProjectData {
  id: string;
  title: string;
  category: 'AI & ML' | 'Full Stack' | 'Creative Frontend';
  subtitle: string;
  description: string;
  imageBg: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  architectureDiagram: string[];
  interactiveDemoType: 'gym' | 'herbs' | 'form' | 'portfolio' | 'saas';
}

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'AI & ML' | 'Full Stack' | 'Creative Frontend'>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null);

  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const projects: ProjectData[] = [
    {
      id: 'ai-gym-tracker',
      title: 'AI Gym Tracker',
      category: 'AI & ML',
      subtitle: 'Real-Time Pose Estimation & Workout Feedback Engine',
      description: 'Computer vision workout assistant utilizing MediaPipe and TensorFlow.js to track body keypoints, analyze repetition form in real-time, count sets, and prevent injuries.',
      imageBg: 'from-pink-900/60 via-purple-900/40 to-black',
      techStack: ['Python', 'MediaPipe', 'React', 'TypeScript', 'TensorFlow.js', 'FastAPI', 'Tailwind CSS'],
      features: [
        'Real-time keypoint joint tracking at 60 FPS',
        'Automatic repetition counting & posture score',
        'Audio-visual voice coaching during exercises',
        'Historical workout analytics dashboard',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      architectureDiagram: [
        'Webcam Video Stream -> MediaPipe Skeleton Tracking Engine',
        'Joint Angle Calculation -> Pose Threshold Validator',
        'FastAPI Analytics Backend -> Historical Progress DB',
      ],
      interactiveDemoType: 'gym',
    },
    {
      id: 'herbs-supplier',
      title: 'Herbs Supplier Platform',
      category: 'Full Stack',
      subtitle: 'E-Commerce & Supply Chain Portal for Organic Botanicals',
      description: 'High-performance e-commerce platform built for wholesale organic botanical suppliers. Features real-time stock inventory, bulk pricing calculators, and slick glass UI.',
      imageBg: 'from-emerald-900/60 via-teal-900/40 to-black',
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Stripe'],
      features: [
        'Dynamic wholesale pricing algorithm',
        'Interactive botanical lab certificate viewer',
        'Sub-second page load times with Next.js ISR',
        'Glassmorphic order tracking pipeline',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      architectureDiagram: [
        'Next.js 14 Frontend -> Node.js GraphQL Gateway',
        'PostgreSQL Database -> Stripe Checkout Payment Engine',
      ],
      interactiveDemoType: 'herbs',
    },
    {
      id: 'ai-form-analyzer',
      title: 'AI Form Analyzer',
      category: 'AI & ML',
      subtitle: 'LLM Document Parsing & Schema Extraction Tool',
      description: 'Automated intelligence engine that parses complex multi-page PDF forms, invoices, and documents into structured JSON data using OpenAI GPT-4o models.',
      imageBg: 'from-sky-900/60 via-blue-900/40 to-black',
      techStack: ['Python', 'OpenAI API', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Docker'],
      features: [
        'OCR & vision document field extraction',
        'Validation schema builder for custom forms',
        'Batch processing API endpoint',
        'Export to JSON, CSV, and Webhooks',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      architectureDiagram: [
        'Document Ingestion -> OCR Vision Preprocessing',
        'GPT-4o Vision Pipeline -> JSON Schema Evaluator',
      ],
      interactiveDemoType: 'form',
    },
    {
      id: 'shivansh-portfolio',
      title: 'Shivansh 3D Portfolio',
      category: 'Creative Frontend',
      subtitle: 'Awwwards-Winning 3D Cinematic Portfolio Experience',
      description: 'Futuristic developer showcase featuring Three.js R3F canvas geometries, Lenis smooth scrolling, Web Audio synthesizer sound FX, custom trailing glowing cursor, and live code playground.',
      imageBg: 'from-fuchsia-900/60 via-pink-900/40 to-black',
      techStack: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Lenis'],
      features: [
        'Custom WebGL Torus Knot floating geometry',
        'Magnetic cursor snapping & particle trail',
        'Interactive Command Palette (Cmd + K)',
        'Built-in Web Audio API sound synthesizer',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://shivansh.dev',
      architectureDiagram: [
        'Vite React App -> R3F WebGL Renderer Context',
        'Custom SoundEngine -> Lenis Smooth Scroll System',
      ],
      interactiveDemoType: 'portfolio',
    },
    {
      id: 'future-ai-saas',
      title: 'Next-Gen Autonomous AI SaaS',
      category: 'AI & ML',
      subtitle: 'Multi-Agent Autonomous Workflow Studio (In Stealth)',
      description: 'Stealth AI platform designed for autonomous multi-agent task execution, custom memory vector stores, and automated devops pipeline orchestration.',
      imageBg: 'from-sky-950/80 via-emerald-950/60 to-black',
      techStack: ['Python', 'LangChain', 'FastAPI', 'Next.js', 'Pinecone', 'Docker', 'Tailwind CSS'],
      features: [
        'Multi-agent graph memory architecture',
        'Real-time streaming agent thought process',
        'Custom API tool execution sandbox',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      architectureDiagram: [
        'User Prompt -> LangGraph Supervisor Agent',
        'Tool Sandbox Execution -> Pinecone Vector Memory',
      ],
      interactiveDemoType: 'saas',
    },
  ];

  // Horizontal Pinning Scroll Animation Setup
  useEffect(() => {
    const section = horizontalSectionRef.current;
    const track = horizontalTrackRef.current;
    const bar = progressBarRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      const animation = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          onUpdate: (self) => {
            if (bar) {
              gsap.to(bar, { width: `${self.progress * 100}%`, duration: 0.1 });
            }
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#F598F2]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5 text-[#F598F2]" />
          <span>FEATURED WORK</span>
        </div>
        <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
          <AnimatedText text="CRAFTED" mode="chars" className="mr-3" />
          <AnimatedText 
            text="PROJECTS & AI DEMOS" 
            mode="chars" 
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]"
          />
        </h2>
        <AnimatedText 
          text="Interactive case studies built with high performance, artificial intelligence, and cinematic UI design." 
          mode="words"
          as="p"
          className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base"
        />
      </div>

      {/* HORIZONTAL SCROLL SHOWCASE SECTION */}
      <div ref={horizontalSectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black/40 border-y border-white/10 my-12">
        {/* Top Scroll Indicator & Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between z-20">
          <span className="font-mono text-xs text-[#F598F2] uppercase tracking-widest flex items-center space-x-2">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>CINEMATIC HORIZONTAL SHOWCASE [SCROLL DOWN TO NAVIGATE]</span>
          </span>
          <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div ref={progressBarRef} className="h-full bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981] w-0" />
          </div>
        </div>

        {/* Track Container */}
        <div ref={horizontalTrackRef} className="flex items-center space-x-8 px-8 py-10 w-max transform-gpu">
          {projects.map((project, idx) => (
            <div
              key={project.id + '-horiz'}
              onClick={() => {
                soundFx.playClickSound();
                if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }}
              className="w-[85vw] sm:w-[600px] md:w-[720px] shrink-0 glass-panel p-8 rounded-3xl border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-8 items-center group relative overflow-hidden cursor-pointer"
            >
              {/* Left Image / Visual Header */}
              <div className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden relative border border-white/10">
                <ImageReveal className="w-full h-full">
                  <div className={`w-full h-full bg-gradient-to-br ${project.imageBg} p-6 flex flex-col justify-between`}>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 text-[#F598F2] border border-[#F598F2]/30 backdrop-blur-md self-start">
                      0{idx + 1} / 0{projects.length} • {project.category}
                    </span>
                    <div>
                      <h3 className="font-clash text-2xl font-bold text-white group-hover:text-[#F598F2] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-slate-300 mt-1 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </ImageReveal>
              </div>

              {/* Right Details */}
              <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.05] text-slate-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClickSound();
                      setActiveModalProject(project);
                    }}
                    className="font-figtree text-xs font-bold text-[#F598F2] hover:text-[#38BDF8] flex items-center space-x-2 group/btn"
                  >
                    <span>EXPLORE CASE STUDY</span>
                    <Play className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#38BDF8]" />
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-[#38BDF8] hover:text-[#F598F2] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STICKY STACKED CARDS GRID SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-wrap justify-between items-center mb-10">
          <h3 className="font-clash text-2xl sm:text-3xl font-bold text-white">
            ALL PROJECTS & CASE STUDIES
          </h3>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            {['All', 'AI & ML', 'Full Stack', 'Creative Frontend'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClickSound();
                  setSelectedCategory(cat as any);
                }}
                onMouseEnter={() => soundFx.playHoverSound()}
                className={`px-4 py-1.5 rounded-full text-xs font-figtree font-semibold tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#F598F2] to-[#38BDF8] text-black font-bold shadow-[0_0_20px_rgba(245,152,242,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <SectionReveal key={project.id}>
              <div
                onClick={() => {
                  soundFx.playClickSound();
                  if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                }}
                onMouseEnter={() => soundFx.playHoverSound()}
                className="group glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(245,152,242,0.25)] h-full cursor-pointer"
              >
                {/* Visual Header Banner */}
                <div className={`relative h-48 bg-gradient-to-br ${project.imageBg} p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 text-[#F598F2] border border-[#F598F2]/30 backdrop-blur-md">
                      {project.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClickSound();
                        setActiveModalProject(project);
                      }}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                      title="Open Interactive Case Study Modal"
                    >
                      <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                    </button>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-clash text-2xl font-bold text-white group-hover:text-[#F598F2] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-slate-300 line-clamp-1 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F598F2]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClickSound();
                        setActiveModalProject(project);
                      }}
                      className="font-figtree text-xs font-bold text-[#F598F2] hover:text-[#38BDF8] flex items-center space-x-1.5 group/btn"
                    >
                      <span>CASE STUDY & DEMO</span>
                      <Play className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform text-[#38BDF8]" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-[#38BDF8] hover:text-[#F598F2] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <CaseStudyModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};

/* Interactive Case Study Modal Component */
const CaseStudyModal: React.FC<{
  project: ProjectData;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'demo'>('overview');
  const [demoState, setDemoState] = useState(0);

  return (
    <div 
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[10010] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0c0c12] border border-white/15 rounded-3xl shadow-[0_0_60px_rgba(245,152,242,0.2)] overflow-hidden glass-panel my-auto max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div>
            <span className="font-mono text-xs text-[#F598F2] uppercase tracking-widest">
              {project.category} • Case Study
            </span>
            <h3 className="font-clash text-2xl sm:text-3xl font-bold text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={() => {
              soundFx.playClickSound();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-white/10 px-6 bg-black/40 shrink-0">
          {[
            { id: 'overview', label: 'Overview & Features' },
            { id: 'architecture', label: 'Architecture Diagram' },
            { id: 'demo', label: 'Interactive Live Simulation' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab(tab.id as any);
              }}
              className={`px-5 py-3 font-figtree text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#F598F2] text-[#F598F2]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div 
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="p-6 overflow-y-auto space-y-6 flex-1 overscroll-contain"
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.description}
              </p>

              <div>
                <h4 className="font-clash text-lg font-bold text-white mb-3 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-[#F598F2]" />
                  <span>Key Architecture Features</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-sans text-slate-300 flex items-start space-x-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F598F2] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-clash text-base font-bold text-white mb-3">Technologies Leveraged</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#F598F2]/10 border border-[#F598F2]/30 font-mono text-xs text-[#F598F2]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="font-clash text-lg font-bold text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-[#38BDF8]" />
                <span>System Pipeline & Data Flow</span>
              </h4>
              <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 font-mono text-xs">
                {project.architectureDiagram.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#F598F2]/20 text-[#F598F2] flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 w-full text-slate-200 shadow-inner">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="p-6 rounded-2xl bg-black/70 border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#F598F2] uppercase tracking-widest flex items-center space-x-2">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Live Interactive Simulation Sandbox</span>
                </span>
                <button
                  onClick={() => setDemoState((prev) => (prev + 1) % 3)}
                  className="px-4 py-1.5 rounded-lg bg-[#F598F2]/20 hover:bg-[#F598F2]/30 text-[#F598F2] font-mono text-xs border border-[#F598F2]/30 transition-colors"
                >
                  Trigger Simulation Step ({demoState + 1}/3)
                </button>
              </div>

              {/* Simulation Sandbox Screen */}
              <div className="h-56 rounded-xl bg-slate-950 border border-white/15 p-4 flex flex-col justify-between font-mono text-xs text-[#38BDF8] relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span>Engine Output Log</span>
                  <span className="text-[#10B981]">● Live 60 FPS</span>
                </div>

                <div className="my-auto space-y-2 text-slate-300">
                  {project.interactiveDemoType === 'gym' && (
                    <>
                      <p className="text-[#F598F2]">[MediaPipe] Keypoints Detected: Nose(0.98), LeftElbow(0.94), RightKnee(0.91)</p>
                      <p className="text-[#38BDF8]">[Posture AI] Squat Form Angle: {100 + demoState * 15}° — Posture Score: {92 + demoState}%</p>
                      <p className="text-[#10B981]">[Rep Counter] Repetition #{4 + demoState} Completed successfully!</p>
                    </>
                  )}
                  {project.interactiveDemoType === 'herbs' && (
                    <>
                      <p className="text-[#F598F2]">[Order Engine] Calculating Wholesale Volume Discount (Tier {demoState + 1})...</p>
                      <p className="text-[#38BDF8]">[Botanical API] Organic Ashwagandha Extract: 50kg requested.</p>
                      <p className="text-[#10B981]">[Checkout] Stripe Payment Token Generated: ch_3N8k2x...</p>
                    </>
                  )}
                  {project.interactiveDemoType === 'form' && (
                    <>
                      <p className="text-[#F598F2]">[GPT-4o Vision] Parsing Invoice PDF Document Page {demoState + 1}...</p>
                      <p className="text-[#38BDF8]">[Schema Extractor] Extracted Vendor: "Acme Corp" | Total: "${1250 + demoState * 400}.00"</p>
                      <p className="text-[#10B981]">[JSON Validator] Schema valid. Webhook fired to client endpoint.</p>
                    </>
                  )}
                  {project.interactiveDemoType === 'portfolio' && (
                    <>
                      <p className="text-[#F598F2]">[R3F Render Loop] Frame render time: 1.2ms (83.3 FPS)</p>
                      <p className="text-[#38BDF8]">[SoundEngine] Audio Synthesizer playing frequency: {440 + demoState * 220} Hz</p>
                      <p className="text-[#10B981]">[Lenis Scroll] Parallax lerp index: 0.15 smooth frame active.</p>
                    </>
                  )}
                  {project.interactiveDemoType === 'saas' && (
                    <>
                      <p className="text-[#F598F2]">[LangGraph Supervisor] Routing prompt to Autonomous Coder Agent...</p>
                      <p className="text-[#38BDF8]">[Pinecone Memory] Querying top 5 embeddings for context...</p>
                      <p className="text-[#10B981]">[Docker Sandbox] Container initialized. Code snippet executed cleanly.</p>
                    </>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 flex justify-between border-t border-white/10 pt-2">
                  <span>Shivansh AI Architecture Studio</span>
                  <span>Status: READY</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-white/[0.02] flex justify-end space-x-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-figtree font-semibold text-slate-200 border border-white/10 flex items-center space-x-2 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#F598F2] to-[#38BDF8] text-xs font-figtree font-bold text-black flex items-center space-x-2 transition-all hover:shadow-[0_0_20px_#F598F2]"
          >
            <span>Live Project Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
