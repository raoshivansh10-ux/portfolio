import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  FileText,
  Command
} from 'lucide-react';
import { soundFx } from './SoundEngine';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResume,
}) => {
  const [timeString, setTimeString] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Live 24h Clock (CUP HH:MM:SS)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTimeString(`CUP ${formatter.format(now)}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { num: '01', label: 'Works', id: 'projects' },
    { num: '02', label: 'Services', id: 'skills' },
    { num: '03', label: 'About', id: 'about' },
    { num: '04', label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playClickSound();
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const active = soundFx.toggleMute();
    setIsMuted(!active);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 w-full font-figtree select-none">
      <div className="max-w-[1340px] mx-auto py-9 px-[15px] mobile:py-6 mobile:px-[18px] md-tablet:py-[30px] md-tablet:px-[18px] flex items-center justify-between">
        
        {/* Left Side: Nav items (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden mobile:hidden md:flex items-center gap-9 md-tablet:gap-4">
          {navItems.map((item) => (
            <button
              key={item.num}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => soundFx.playHoverSound()}
              className="flex items-baseline gap-1 text-white opacity-85 hover:opacity-100 hover:text-[#F598F2] transition-colors nav-link-underline cursor-pointer"
            >
              <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-[#F598F2]">
                {item.num} /
              </span>
              <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="hidden mobile:block">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle Menu"
            className="text-xs font-medium uppercase tracking-[-0.12px] text-white flex items-center gap-2 cursor-pointer"
          >
            {isMobileOpen ? (
              <>
                <span>Close</span>
                <X className="w-4 h-4 text-[#F598F2]" />
              </>
            ) : (
              <>
                <span>Menu</span>
                <Menu className="w-4 h-4 text-[#F598F2]" />
              </>
            )}
          </button>
        </div>

        {/* Right Side: Email, Live Clock, Sound & Action Tools */}
        <div className="flex items-center gap-6 md-tablet:gap-4">
          <a
            href="mailto:raoshivansh10@gmail.com"
            className="text-xs leading-4 tracking-[-0.12px] font-medium text-slate-300 hover:text-[#38BDF8] transition-colors nav-link-underline hidden sm:inline-block"
          >
            raoshivansh10@gmail.com
          </a>

          <span className="text-xs leading-4 tracking-[-0.12px] font-medium text-[#38BDF8] font-mono">
            {timeString}
          </span>

          {/* Quick Actions (Cmd K, Sound, CV) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClickSound();
                onOpenCommandPalette();
              }}
              onMouseEnter={() => soundFx.playHoverSound()}
              className="p-1.5 rounded-full bg-white/10 hover:bg-[#F598F2]/20 text-white transition-colors border border-white/10"
              title="Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-[#F598F2]" />
            </button>

            <button
              onClick={toggleSound}
              onMouseEnter={() => soundFx.playHoverSound()}
              className="p-1.5 rounded-full bg-white/10 hover:bg-[#F598F2]/20 text-white transition-colors border border-white/10"
              title={isMuted ? 'Enable Sound' : 'Mute Sound'}
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-[#F598F2]" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            <button
              onClick={() => {
                soundFx.playClickSound();
                onOpenResume();
              }}
              onMouseEnter={() => soundFx.playHoverSound()}
              className="p-1.5 px-3 rounded-full bg-[#F598F2]/15 hover:bg-[#F598F2]/25 text-white text-[11px] font-medium uppercase tracking-wider flex items-center gap-1 border border-[#F598F2]/30 transition-all shadow-[0_0_15px_rgba(245,152,242,0.2)]"
            >
              <FileText className="w-3 h-3 text-[#F598F2]" />
              <span>CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel with CSS Grid 420ms spring ease transition */}
      <div 
        className={`grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-[18px]">
          <div className="py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.num}
                onClick={() => handleNavClick(item.id)}
                className="flex items-baseline gap-3 text-left text-[28px] leading-8 tracking-[-0.84px] font-medium uppercase text-white hover:text-[#F598F2] transition-colors cursor-pointer"
              >
                <span className="text-xs font-mono text-[#F598F2]">{item.num}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-xs text-slate-400 font-mono">
              <a href="mailto:raoshivansh10@gmail.com" className="hover:text-[#38BDF8]">
                raoshivansh10@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
