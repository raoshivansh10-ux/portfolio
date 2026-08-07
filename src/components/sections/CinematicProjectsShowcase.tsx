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
  Cpu,
  ArrowRight,
  Eye,
  Zap
} from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';
import { AnimatedText } from '../ui/AnimatedText';
import { SectionReveal } from '../ui/SectionReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ShowcaseProject {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  glowColor: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  architectureDiagram: string[];
  interactiveDemoType: 'gym' | 'herbs' | 'form' | 'lanyard';
}

export const CinematicProjectsShowcase: React.FC = () => {
  const showcaseProjects: ShowcaseProject[] = [
    {
      id: 'ai-gym-tracker',
      number: '01',
      title: 'AI Gym Tracker',
      category: 'AI & Computer Vision',
      subtitle: 'Real-Time Keypoint Pose Estimation & Workout Feedback',
      description: 'Engineered a computer vision workout assistant using MediaPipe and TensorFlow.js. Tracks 33 body keypoints at 60 FPS in real-time, calculates joint angles, counts repetitions, and provides live voice form coaching.',
      accentColor: '#F598F2',
      bgGradient: 'from-[#2e0828] via-[#15041a] to-black',
      glowColor: 'rgba(245, 152, 242, 0.4)',
      techStack: ['Python', 'MediaPipe', 'React 18', 'TypeScript', 'TensorFlow.js', 'FastAPI'],
      features: [
        'Real-time joint keypoint tracking at 60 FPS',
        'Automated posture scoring & repetition counting',
        'Voice audio coaching feedback during workouts',
        'Historical progress analytics dashboard',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      architectureDiagram: [
        'Webcam Video Stream -> MediaPipe 33-Keypoint Pose Model',
        'Joint Angle Math -> Form Threshold & Posture Validator',
        'FastAPI Analytics Backend -> Client Audio Synthesizer',
      ],
      interactiveDemoType: 'gym',
    },
    {
      id: 'ai-form-analyzer',
      number: '02',
      title: 'AI Form Analyzer',
      category: 'LLM & Document Intelligence',
      subtitle: 'Multimodal OCR Parsing & Automated JSON Extractor',
      description: 'Automated document processing platform powered by OpenAI GPT-4o. Parses complex multi-page PDF forms, invoices, and handwritten documents into verified JSON schemas with sub-second latency.',
      accentColor: '#38BDF8',
      bgGradient: 'from-[#082338] via-[#04121d] to-black',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      techStack: ['Python', 'OpenAI GPT-4o', 'FastAPI', 'Next.js 14', 'TypeScript', 'Docker'],
      features: [
        'Multimodal OCR & vision field extraction',
        'Custom JSON schema builder for invoices',
        'Batch async processing API endpoints',
        'Export to JSON, CSV & Client Webhooks',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      architectureDiagram: [
        'Document PDF Upload -> Async Preprocessing Pipeline',
        'GPT-4o Vision API -> JSON Schema Normalizer',
        'Webhook Event Bus -> Client Integration Endpoint',
      ],
      interactiveDemoType: 'form',
    },
    {
      id: 'herbs-supplier',
      number: '03',
      title: 'Herbs Supplier Platform',
      category: 'Full Stack & E-Commerce',
      subtitle: 'Wholesale Botanical Supply Chain & E-Commerce Portal',
      description: 'High-performance e-commerce web platform built for wholesale organic botanical suppliers. Features real-time stock inventory, bulk pricing algorithms, sub-second page loads with Next.js ISR, and glass UI.',
      accentColor: '#10B981',
      bgGradient: 'from-[#06291a] via-[#02140d] to-black',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      techStack: ['Next.js 14', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
      features: [
        'Dynamic wholesale volume discount engine',
        'Interactive botanical lab certificate viewer',
        'Sub-second page rendering with Next.js ISR',
        'Glassmorphic order tracking pipeline',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://demo.example.com',
      architectureDiagram: [
        'Next.js 14 App Router -> Node.js GraphQL Gateway',
        'PostgreSQL Database -> Stripe Checkout Payment Gateway',
      ],
      interactiveDemoType: 'herbs',
    },
    {
      id: 'shivansh-3d-lanyard',
      number: '04',
      title: '3D Physics Lanyard',
      category: '3D WebGL & Physics Motion',
      subtitle: 'Interactive Physical ID Badge Simulation',
      description: 'Futuristic developer showcase featuring Three.js React Three Fiber canvas geometries, rigid body rope physics via Rapier, custom lighting shaders, and magnetic cursor interaction.',
      accentColor: '#C084FC',
      bgGradient: 'from-[#230938] via-[#10031c] to-black',
      glowColor: 'rgba(192, 132, 252, 0.4)',
      techStack: ['React 18', 'Three.js', 'React Three Fiber', 'Rapier Physics', 'Framer Motion'],
      features: [
        'Custom WebGL Torus & Lanyard Mesh Geometry',
        'Real-time rope physics & gravity reaction',
        'Interactive magnetic cursor drag & swing',
        '60 FPS smooth canvas render loop',
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://shivansh.dev',
      architectureDiagram: [
        'R3F Canvas Context -> Rapier Joint Physics World',
        'Mouse Drag Listener -> Rigid Body Force Application',
      ],
      interactiveDemoType: 'lanyard',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<ShowcaseProject | null>(null);

  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const card3DRef = useRef<HTMLDivElement>(null);

  // GSAP Pinned ScrollTrigger Timeline
  useEffect(() => {
    const section = pinnedSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: `+=350%`,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            Math.floor(progress * showcaseProjects.length),
            showcaseProjects.length - 1
          );
          setActiveIndex((prev) => (prev !== idx ? idx : prev));

          // Apply 3D card camera tilt as user scrolls through project
          if (card3DRef.current) {
            const phaseProgress = (progress * showcaseProjects.length) % 1;
            const rotY = (phaseProgress - 0.5) * 12;
            const rotX = Math.sin(phaseProgress * Math.PI) * -8;
            gsap.to(card3DRef.current, {
              rotateY: rotY,
              rotateX: rotX,
              duration: 0.2,
              overwrite: 'auto',
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [showcaseProjects.length]);

  const activeProject = showcaseProjects[activeIndex];

  return (
    <div id="projects" className="relative select-none font-mono">
      
      {/* PINNED STICKY SHOWCASE CONTAINER (350vh scroll height) */}
      <div ref={pinnedSectionRef} className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between">
        
        {/* Animated Background Ambient Gradient Environment per Project */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-br ${activeProject.bgGradient} pointer-events-none z-0`}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none"
              style={{ backgroundColor: activeProject.accentColor, opacity: 0.18 }}
            />
            {/* Subtle Grid Lines Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Header Bar */}
        <div className="relative z-20 w-full px-6 sm:px-10 pt-24 sm:pt-28 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeProject.accentColor }} />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/80">
              FEATURED WORK • CINEMATIC SHOWCASE
            </span>
          </div>

          {/* Top Progress Dots & Number */}
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono text-white/60">
              PROJECT <span style={{ color: activeProject.accentColor }}>{activeProject.number}</span> / 04
            </span>
            <div className="flex space-x-2">
              {showcaseProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className="w-8 h-1 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: activeIndex === idx ? activeProject.accentColor : 'rgba(255,255,255,0.2)',
                    boxShadow: activeIndex === idx ? `0 0 10px ${activeProject.accentColor}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CENTER 3D PROJECT CARD DISPLAY */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 my-auto flex flex-col items-center">
          
          <div 
            ref={card3DRef}
            className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] transform-gpu transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details Column (6 Cols) */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="flex items-center space-x-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 border backdrop-blur-md"
                    style={{ color: activeProject.accentColor, borderColor: `${activeProject.accentColor}50` }}
                  >
                    {activeProject.number} • {activeProject.category}
                  </span>
                </div>

                <div>
                  <h2 className="font-clash text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                    {activeProject.title}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-slate-300 mt-2">
                    {activeProject.subtitle}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-3 py-1 rounded-md bg-white/[0.05] text-slate-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      soundFx.playClickSound();
                      setActiveModalProject(activeProject);
                    }}
                    onMouseEnter={() => soundFx.playHoverSound()}
                    className="px-6 py-3 rounded-full font-figtree text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-lg hover:scale-105"
                    style={{
                      backgroundColor: activeProject.accentColor,
                      color: '#000000',
                      boxShadow: `0 0 25px ${activeProject.glowColor}`,
                    }}
                  >
                    <span>Explore Case Study & Demo</span>
                    <Play className="w-4 h-4 fill-black text-black" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors border border-white/10"
                      title="GitHub Repo"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-[#38BDF8] hover:text-white transition-colors border border-white/10"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Live Simulation / Visual Header Column (6 Cols) */}
              <div className="lg:col-span-6 h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden relative border border-white/15 bg-black/80 p-6 flex flex-col justify-between">
                
                {/* Live Sandbox Logs Animation */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
                  <span className="font-mono text-xs uppercase tracking-wider flex items-center space-x-2" style={{ color: activeProject.accentColor }}>
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>Live Simulation Sandbox</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                    ● 60 FPS ACTIVE
                  </span>
                </div>

                <div className="my-auto space-y-3 font-mono text-xs z-10 text-slate-200">
                  {activeProject.interactiveDemoType === 'gym' && (
                    <>
                      <p className="text-[#F598F2]">[MediaPipe] Keypoints: Elbow(0.98), Knee(0.94), Shoulder(0.96)</p>
                      <p className="text-[#38BDF8]">[Posture AI] Squat Depth Form: 110° — Score: 96%</p>
                      <p className="text-[#10B981]">[Rep Counter] Repetition #5 Completed!</p>
                    </>
                  )}
                  {activeProject.interactiveDemoType === 'form' && (
                    <>
                      <p className="text-[#38BDF8]">[GPT-4o Vision] Extracting Invoice PDF Data...</p>
                      <p className="text-[#F598F2]">[JSON Schema] Vendor: "Acme Corp" | Total: "$1,650.00"</p>
                      <p className="text-[#10B981]">[Webhook] Verified JSON schema dispatched.</p>
                    </>
                  )}
                  {activeProject.interactiveDemoType === 'herbs' && (
                    <>
                      <p className="text-[#10B981]">[Stock Engine] 50kg Organic Ashwagandha available.</p>
                      <p className="text-[#F598F2]">[Wholesale Engine] Bulk Tier 2 Applied (-18% discount)</p>
                      <p className="text-[#38BDF8]">[Next.js ISR] Static page regenerated in 12ms.</p>
                    </>
                  )}
                  {activeProject.interactiveDemoType === 'lanyard' && (
                    <>
                      <p className="text-[#C084FC]">[R3F Canvas] Three.js mesh geometry loaded.</p>
                      <p className="text-[#38BDF8]">[Rapier Physics] Joint force vector: [0.12, -9.81, 0]</p>
                      <p className="text-[#10B981]">[Cursor Magnetic] Drag spring active at 60 FPS.</p>
                    </>
                  )}
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 z-10">
                  <span>Architecture: {activeProject.category}</span>
                  <span className="text-white/60">Shivansh AI Studio</span>
                </div>

                {/* Ambient Radial Lighting Glow in Sandbox */}
                <div 
                  className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: activeProject.accentColor, opacity: 0.25 }}
                />
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Hint */}
        <div className="relative z-20 w-full px-6 pb-6 text-center text-xs font-mono text-white/40 flex items-center justify-center space-x-2">
          <ArrowRight className="w-3.5 h-3.5 rotate-90 text-[#F598F2] animate-bounce" />
          <span>[ SCROLL DOWN TO EXPLORE NEXT PROJECT ]</span>
        </div>

      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <CaseStudyModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
};

/* Interactive Case Study Modal Component */
const CaseStudyModal: React.FC<{
  project: ShowcaseProject;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'demo'>('overview');
  const [demoStep, setDemoStep] = useState(0);

  return (
    <div 
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[10010] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn select-none font-mono"
    >
      <div 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0c0c12] border border-white/15 rounded-3xl shadow-[0_0_60px_rgba(245,152,242,0.25)] overflow-hidden glass-panel my-auto max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: project.accentColor }}>
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
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 px-6 bg-black/40 shrink-0">
          {[
            { id: 'overview', label: 'Overview & Features' },
            { id: 'architecture', label: 'Architecture Pipeline' },
            { id: 'demo', label: 'Interactive Sandbox' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab(tab.id as any);
              }}
              className={`px-5 py-3 font-figtree text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#F598F2] text-[#F598F2]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
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
                  <CheckCircle2 className="w-5 h-5" style={{ color: project.accentColor }} />
                  <span>Key Architecture Features</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-sans text-slate-300 flex items-start space-x-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: project.accentColor }} />
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
                      className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 font-mono text-xs text-white"
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
                    <div 
                      className="w-7 h-7 rounded-full text-black flex items-center justify-center font-bold text-xs shrink-0"
                      style={{ backgroundColor: project.accentColor }}
                    >
                      0{idx + 1}
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 w-full text-slate-200 shadow-inner">
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
                <span className="font-mono text-xs uppercase tracking-widest flex items-center space-x-2" style={{ color: project.accentColor }}>
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Live Interactive Simulation Sandbox</span>
                </span>
                <button
                  onClick={() => setDemoStep((prev) => (prev + 1) % 3)}
                  className="px-4 py-1.5 rounded-lg font-mono text-xs border transition-colors cursor-pointer"
                  style={{
                    backgroundColor: `${project.accentColor}20`,
                    borderColor: `${project.accentColor}40`,
                    color: project.accentColor,
                  }}
                >
                  Trigger Simulation Step ({demoStep + 1}/3)
                </button>
              </div>

              <div className="h-56 rounded-xl bg-slate-950 border border-white/15 p-5 flex flex-col justify-between font-mono text-xs relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-slate-400">
                  <span>Engine Log Stream</span>
                  <span className="text-[#10B981]">● Live 60 FPS</span>
                </div>

                <div className="my-auto space-y-2">
                  {project.interactiveDemoType === 'gym' && (
                    <>
                      <p className="text-[#F598F2]">[MediaPipe Keypoints] Nose(0.98), LeftElbow(0.94), RightKnee(0.91)</p>
                      <p className="text-[#38BDF8]">[Posture AI] Squat Angle: {100 + demoStep * 15}° — Posture Score: {92 + demoStep}%</p>
                      <p className="text-[#10B981]">[Rep Counter] Repetition #{4 + demoStep} Completed!</p>
                    </>
                  )}
                  {project.interactiveDemoType === 'form' && (
                    <>
                      <p className="text-[#38BDF8]">[GPT-4o Vision] Parsing PDF Page {demoStep + 1}...</p>
                      <p className="text-[#F598F2]">[JSON Schema] Vendor: "Acme Corp" | Total: "${1250 + demoStep * 400}.00"</p>
                      <p className="text-[#10B981]">[Schema Validator] Schema valid. Webhook fired.</p>
                    </>
                  )}
                  {project.interactiveDemoType === 'herbs' && (
                    <>
                      <p className="text-[#10B981]">[Wholesale Engine] Stock Tier {demoStep + 1} Applied.</p>
                      <p className="text-[#38BDF8]">[Botanical API] 50kg Organic Extract Reserved.</p>
                      <p className="text-[#F598F2]">[Stripe Payment] Session token generated.</p>
                    </>
                  )}
                  {project.interactiveDemoType === 'lanyard' && (
                    <>
                      <p className="text-[#C084FC]">[R3F Render Loop] Frame time: 1.1ms (85 FPS)</p>
                      <p className="text-[#38BDF8]">[Rapier RigidBody] Vector velocity updated.</p>
                      <p className="text-[#10B981]">[Cursor Drag] Spring force applied.</p>
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

        {/* Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-white/[0.02] flex justify-end space-x-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-figtree font-semibold text-slate-200 border border-white/10 flex items-center space-x-2 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repo</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-xl text-xs font-figtree font-bold text-black flex items-center space-x-2 transition-all hover:scale-105"
            style={{ backgroundColor: project.accentColor }}
          >
            <span>Live Project Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
