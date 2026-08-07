import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';

export const TechnologySection: React.FC = () => {
  const projects = [
    {
      title: 'AI Gym Tracker',
      desc: 'Real-time pose estimation & workout feedback engine built with MediaPipe & TensorFlow.js.',
      url: 'https://demo.example.com',
    },
    {
      title: 'Herbs Supplier',
      desc: 'Wholesale botanical e-commerce portal with dynamic volume pricing & Next.js ISR.',
      url: 'https://demo.example.com',
    },
    {
      title: 'AI Form Analyzer',
      desc: 'Automated document parsing engine powered by GPT-4o vision models & FastAPI.',
      url: 'https://demo.example.com',
    },
    {
      title: '3D Physics Lanyard',
      desc: 'Interactive Rapier rigid body physics simulation badge & WebGL R3F canvas.',
      url: '#lanyard-badge',
    },
  ];

  const handleProjectClick = (url?: string) => {
    soundFx.playClickSound();
    if (!url) return;
    if (url.startsWith('#')) {
      const el = document.querySelector(url);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="relative w-full h-screen h-[100dvh] bg-black overflow-hidden flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16 select-none">
      {/* Background Video #4 (Autoplay, Muted, Loop) */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Top Area */}
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0 }}
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
        >
          Featured <br /> Projects
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2 font-mono"
        >
          Full stack applications built with high performance, artificial intelligence, and cinematic UI design.
        </motion.p>
      </div>

      <div className="flex-1" />

      {/* Bottom Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
      >
        {projects.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            onClick={() => handleProjectClick(item.url)}
            onMouseEnter={() => soundFx.playHoverSound()}
            className="flex flex-col cursor-pointer group p-3 -m-3 rounded-xl hover:bg-white/[0.05] transition-all duration-300"
          >
            <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2 group-hover:text-[#38BDF8] transition-colors flex items-center justify-between">
              <span>{item.title}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#38BDF8] shrink-0 ml-1" />
            </h3>
            <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed font-mono group-hover:text-white/70 transition-colors">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

