import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';

export const CertificatesSection: React.FC = () => {
  const certs = [
    {
      title: 'Full Stack Web Development & Next.js',
      issuer: 'Meta / Coursera',
      date: '2024',
      badge: 'PRO CERTIFIED',
      desc: 'Mastery in React, Next.js App Router, SSR, Tailwind CSS, and REST API architecture.',
    },
    {
      title: 'Deep Learning & Artificial Intelligence',
      issuer: 'DeepLearning.AI',
      date: '2024',
      badge: 'AI SPECIALIST',
      desc: 'Neural networks, computer vision, LLM fine-tuning, and prompt engineering.',
    },
    {
      title: 'Responsive Web Design & 3D Motion',
      issuer: 'freeCodeCamp / Creative Dev',
      date: '2023',
      badge: 'TOP CREATIVE',
      desc: 'Advanced CSS grid, responsive glassmorphism, Framer Motion, and Three.js canvas.',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>RECOGNITION & CERTIFICATIONS</span>
        </div>
        <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
          CERTIFICATES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-400">ACHIEVEMENTS</span>
        </h2>
        <p className="max-w-2xl mt-4 font-sans text-slate-400 text-sm sm:text-base">
          Verified technical certifications, awards, and professional skill badges.
        </p>
      </div>

      {/* Certs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <div
            key={idx}
            onMouseEnter={() => soundFx.playHoverSound()}
            className="glass-panel glass-panel-hover p-7 rounded-3xl border border-white/10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] font-bold text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30">
                  {cert.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">{cert.date}</span>
              </div>
              <h3 className="font-clash text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {cert.title}
              </h3>
              <p className="font-grotesk text-xs font-semibold text-purple-300 mb-3">
                {cert.issuer}
              </p>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                {cert.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Credential</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
