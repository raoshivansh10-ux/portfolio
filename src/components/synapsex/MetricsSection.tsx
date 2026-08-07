import React from 'react';
import { motion } from 'framer-motion';

export const MetricsSection: React.FC = () => {
  const metrics = [
    { value: '60 FPS', label: 'WebGL 3D Canvas Performance' },
    { value: '99.7%', label: 'Model Inference Precision' },
    { value: '1.4k+', label: 'Open Source Contributions' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center select-none">
      {/* Background Video #3 (Autoplay, Muted, Loop) */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl pt-32 pb-32 px-6 flex flex-col items-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center font-mono"
        >
          Engineering Impact
        </motion.div>

        {/* Metrics Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                {metric.value}
              </div>
              <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide font-mono">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
