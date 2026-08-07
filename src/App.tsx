import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/synapsex/Navbar';
import { HeroSection } from './components/synapsex/HeroSection';
import { CinematicTextSection } from './components/synapsex/CinematicTextSection';
import { MetricsSection } from './components/synapsex/MetricsSection';
import { TechnologySection } from './components/synapsex/TechnologySection';
import { ArchitectureSection } from './components/synapsex/ArchitectureSection';
import { FooterSection } from './components/synapsex/FooterSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { CinematicProjectsShowcase } from './components/sections/CinematicProjectsShowcase';
import { SplashCursor } from './components/ui/SplashCursor';
import { AnimatedBackground } from './components/ui/AnimatedBackground';

export const App: React.FC = () => {
  const [entranceComplete, setEntranceComplete] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      style={{ fontFamily: '"Space Mono", monospace' }}
      className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-mono overflow-x-hidden"
    >
      {/* Living Space Nebula & Particle System Background (Always continuous) */}
      <AnimatedBackground />

      {/* WebGL Interactive Fluid Splash Cursor Overlay */}
      <SplashCursor
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1440}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        RAINBOW_MODE={true}
      />

      {/* Fixed Navigation Bar */}
      <Navbar entranceComplete={entranceComplete} />

      {/* Main Single-Page Sections */}
      <main className="relative z-10">
        <HeroSection onEntranceComplete={() => setEntranceComplete(true)} />
        <CinematicTextSection />
        <MetricsSection />
        <TechnologySection />
        <ArchitectureSection />
        <CinematicProjectsShowcase />
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default App;
