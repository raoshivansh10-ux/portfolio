import React from 'react';
import { motion } from 'framer-motion';

export const ArchitectureSection: React.FC = () => {
  const pillars = [
    { num: 'Pillar 1', name: 'React / Next.js / TS / Tailwind' },
    { num: 'Pillar 2', name: 'Node.js / Python / FastAPI / Postgres' },
    { num: 'Pillar 3', name: 'OpenCV / MediaPipe / GPT-4o' },
    { num: 'Pillar 4', name: 'Docker / Git / Vercel / Linux' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center select-none py-32 px-6">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* Heading Block */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col items-center"
        >
          <div className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8 font-mono">
            Tech Stack Architecture
          </div>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Four pillars. Zero friction.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto font-mono">
            Frontend layer delivers 60 FPS motion. Backend layer powers scalable microservices. AI layer executes intelligent agentic workflows. DevOps layer orchestrates containerized deployment.
          </p>
        </motion.div>

        {/* Pillar Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-full mt-20 flex flex-col items-center gap-4"
        >
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="w-full max-w-lg h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 bg-white/[0.02] backdrop-blur-sm"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase font-mono">
                {pillar.num}
              </span>
              <span className="text-white text-[14px] sm:text-[16px] font-light">
                {pillar.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
