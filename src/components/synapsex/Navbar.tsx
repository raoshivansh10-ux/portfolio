import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SynapseXLogo } from './SynapseXLogo';
import { SquashHamburger } from './SquashHamburger';
import { ScrambleText } from './ScrambleText';

interface NavbarProps {
  entranceComplete: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ entranceComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);

  const scrollToSection = (target: number | string) => {
    if (typeof target === 'string') {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight * target,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-auto"
    >
      {/* DESKTOP NAV (hidden on mobile, sm:flex) */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Logo Pill */}
        <AnimatePresence>
          {!isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.22)' }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] flex items-center gap-2.5 cursor-pointer transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <SynapseXLogo className="w-[18px] h-[18px] text-white" />
              <span className="text-[16px] font-medium tracking-tight text-white">Shivansh.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanding Menu Pill */}
        <motion.div
          initial={{ width: 48 }}
          animate={{ width: isMenuOpen ? 460 : 48 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="h-12 bg-white/15 backdrop-blur-md rounded-[14px] flex items-center overflow-hidden relative"
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center justify-center transition-all ${
              isMenuOpen
                ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5 cursor-pointer'
                : 'w-12 h-12 rounded-[14px] cursor-pointer'
            }`}
            aria-label="Toggle Menu"
          >
            <SquashHamburger isOpen={isMenuOpen} isMobile={false} />
          </button>

          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-5 ml-4"
            >
              <button
                onClick={() => scrollToSection('about')}
                onMouseEnter={() => setHoveredLink('about')}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[15px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
              </button>

              <button
                onClick={() => scrollToSection(2)}
                onMouseEnter={() => setHoveredLink('metrics')}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[15px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                <ScrambleText text="Impact" isHovered={hoveredLink === 'metrics'} />
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                onMouseEnter={() => setHoveredLink('projects')}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[15px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                <ScrambleText text="Projects" isHovered={hoveredLink === 'projects'} />
              </button>

              <button
                onClick={() => scrollToSection(4)}
                onMouseEnter={() => setHoveredLink('stack')}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[15px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                <ScrambleText text="Stack" isHovered={hoveredLink === 'stack'} />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => setHoveredLink('contact')}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[15px] font-normal text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                <ScrambleText text="Contact" isHovered={hoveredLink === 'contact'} />
              </button>
            </motion.nav>
          )}
        </motion.div>
      </div>

      {/* Direct Email Header Link (Desktop) */}
      <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
        <a
          href="mailto:raoshivansh10@gmail.com"
          className="text-xs text-white/60 hover:text-white font-mono transition-colors"
        >
          raoshivansh10@gmail.com
        </a>
      </div>

      {/* MOBILE NAV (visible below sm) */}
      <div className="flex sm:hidden items-center gap-2 w-full justify-between">
        <div className="flex items-center gap-2 flex-1">
          {/* Logo Pill Mobile */}
          <motion.div
            animate={{
              width: isMenuOpen ? 0 : 'auto',
              opacity: isMenuOpen ? 0 : 1,
              paddingLeft: isMenuOpen ? 0 : 12,
              paddingRight: isMenuOpen ? 0 : 12,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="h-9 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-2 overflow-hidden shrink-0 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <SynapseXLogo className="w-4 h-4 text-white shrink-0" />
            <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">Shivansh.</span>
          </motion.div>

          {/* Expanding Menu Pill Mobile */}
          <motion.div
            animate={{ width: isMenuOpen ? '100%' : 36 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="h-9 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center overflow-hidden relative"
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center transition-all ${
                isMenuOpen
                  ? 'w-7 h-7 rounded-[8px] bg-white/10 ml-1 shrink-0'
                  : 'w-9 h-9 shrink-0'
              }`}
              aria-label="Toggle Menu"
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={true} />
            </button>

            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 ml-2"
              >
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-[12px] font-normal text-white/85 hover:text-white"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection(2)}
                  className="text-[12px] font-normal text-white/85 hover:text-white"
                >
                  Impact
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-[12px] font-normal text-white/85 hover:text-white"
                >
                  Work
                </button>
                <button
                  onClick={() => scrollToSection(4)}
                  className="text-[12px] font-normal text-white/85 hover:text-white"
                >
                  Stack
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-[12px] font-normal text-white/85 hover:text-white"
                >
                  Contact
                </button>
              </motion.nav>
            )}
          </motion.div>
        </div>

        {/* Resume Button Mobile */}
        {!isMenuOpen && (
          <motion.a
            href="mailto:raoshivansh10@gmail.com"
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            className="h-9 px-3.5 bg-white text-black rounded-full flex items-center gap-1.5 text-[13px] font-medium shrink-0 cursor-pointer"
          >
            <i className="bi bi-file-earmark-text text-[13px]"></i>
            <span>Resume</span>
          </motion.a>
        )}
      </div>

      {/* DESKTOP Resume Button (hidden on mobile, sm:flex) */}
      <motion.a
        href="mailto:raoshivansh10@gmail.com"
        onMouseEnter={() => setIsDownloadHovered(true)}
        onMouseLeave={() => setIsDownloadHovered(false)}
        whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
        whileTap={{ scale: 0.97 }}
        className="hidden sm:flex h-12 px-6 bg-white text-black rounded-full items-center gap-2 text-[16px] font-medium cursor-pointer transition-colors shadow-lg"
      >
        <i className="bi bi-file-earmark-text text-[16px]"></i>
        <ScrambleText text="Resume" isHovered={isDownloadHovered} />
      </motion.a>
    </motion.header>
  );
};
