import React from 'react';
import { X, Download, FileText, CheckCircle2, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { soundFx } from './SoundEngine';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const triggerDownloadCV = () => {
    soundFx.playClickSound();
    
    // Confetti animation celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Create virtual CV text download blob
    const cvText = `SHIVANSH YADAV — FULL STACK & AI ENGINEER
Email: raoshivansh10@gmail.com | Portfolio: https://shivanshyadav.dev

SUMMARY
Full Stack Developer & AI Engineer specializing in modern web applications using React, Next.js, TypeScript, Node.js, Python, OpenAI APIs, and MediaPipe computer vision.

TECHNICAL SKILLS
Frontend: React, Next.js, TypeScript, Tailwind CSS, Three.js / R3F, Framer Motion, GSAP
Backend: Node.js, Python, FastAPI, MongoDB, PostgreSQL, Firebase
AI & Vision: OpenAI API, MediaPipe, TensorFlow.js, Prompt Engineering, Autonomous Agents
Tools: Docker, Git, GitHub, Vercel, Linux

PROJECTS
1. AI Gym Tracker (Python, MediaPipe, React, FastAPI)
   - Real-time pose keypoint estimation workout repetition counting & posture score.
2. Herbs Supplier Platform (Next.js, Node.js, PostgreSQL, Stripe)
   - E-commerce & supply chain portal for wholesale organic botanical products.
3. AI Form Analyzer (Python, GPT-4o, FastAPI, Docker)
   - Automated LLM document parsing engine for structured JSON form data extraction.

EDUCATION
B.Tech in Computer Science & Engineering (CSE)
Raj Kumar Goel Institute of Technology (RKGIT)
`;

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Shivansh_Yadav_Resume.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[10020] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#0d0d14] border border-white/15 rounded-3xl shadow-[0_0_60px_rgba(0,245,212,0.25)] overflow-hidden glass-panel my-auto max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-clash text-xl font-bold text-white">
                Shivansh Yadav — Resume Viewer
              </h3>
              <p className="font-mono text-xs text-slate-400">
                Full Stack Developer • AI Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={triggerDownloadCV}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-xs font-grotesk font-bold text-black flex items-center space-x-2 shadow-[0_0_15px_#00f5d4] hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>
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
        </div>

        {/* Resume Content Body */}
        <div 
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="p-6 overflow-y-auto space-y-6 flex-1 overscroll-contain text-xs font-mono"
        >
          {/* Header Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>raoshivansh10@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>shivanshyadav.dev</span>
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div>
            <h4 className="font-clash text-base font-bold text-white mb-3 uppercase tracking-wider text-cyan-400">
              Core Technical Competencies
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'React 18 & Next.js 14',
                'TypeScript & Python',
                'FastAPI & REST APIs',
                'Three.js & R3F',
                'MediaPipe & Vision',
                'OpenAI APIs & Agents',
                'Node.js & GraphQL',
                'PostgreSQL & MongoDB',
              ].map((skill, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white/[0.04] border border-white/5 flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Featured Projects Summary */}
          <div>
            <h4 className="font-clash text-base font-bold text-white mb-3 uppercase tracking-wider text-blue-300">
              Key Engineering Projects
            </h4>
            <div className="space-y-3 font-sans">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="font-grotesk font-bold text-white">AI Gym Tracker</h5>
                <p className="text-xs text-slate-400 mt-1">Real-time computer vision pose estimation & exercise repetition feedback using MediaPipe, Python, FastAPI, and React.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="font-grotesk font-bold text-white">Herbs Supplier Wholesale Platform</h5>
                <p className="text-xs text-slate-400 mt-1">Next.js e-commerce portal with dynamic pricing calculations and PostgreSQL order management pipeline.</p>
              </div>
            </div>
          </div>

          {/* Section: Education & Degree */}
          <div>
            <h4 className="font-clash text-base font-bold text-white mb-3 uppercase tracking-wider text-emerald-400">
              Academic Education
            </h4>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 font-sans">
              <h5 className="font-grotesk font-bold text-white text-sm">
                B.Tech in Computer Science & Engineering (CSE)
              </h5>
              <p className="text-xs text-slate-300 mt-0.5">
                Raj Kumar Goel Institute of Technology (RKGIT)
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Ready for Immediate Deployment</span>
          <button
            onClick={triggerDownloadCV}
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
          >
            Click here to download PDF/TXT copy
          </button>
        </div>
      </div>
    </div>
  );
};
