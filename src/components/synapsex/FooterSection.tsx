import React from 'react';
import { SynapseXLogo } from './SynapseXLogo';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full bg-black overflow-hidden select-none border-t border-white/10">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Left Column: Video #5 (Autoplay, Muted, Loop) */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Right Column: Branding & Copyright */}
        <div className="w-full md:w-1/2 p-10 sm:p-16 flex flex-col justify-between bg-black">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <SynapseXLogo className="w-[18px] h-[18px] text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">Shivansh Yadav</span>
            </div>

            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm font-mono mb-6">
              Crafting the next generation of intelligent web applications and 3D user experiences. Open for high-impact AI & full-stack engineering roles.
            </p>

            <div className="flex flex-wrap gap-4 font-mono text-xs text-white/60">
              <a
                href="mailto:raoshivansh10@gmail.com"
                className="hover:text-white transition-colors underline"
              >
                raoshivansh10@gmail.com
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="text-white/25 text-[12px] mt-12 font-mono">
            &copy; 2026 Shivansh Yadav. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
