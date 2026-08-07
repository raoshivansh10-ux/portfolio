import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Code, 
  User, 
  FolderGit2, 
  Mail, 
  FileText, 
  Volume2, 
  VolumeX, 
  Github, 
  Linkedin, 
  Sparkles, 
  X 
} from 'lucide-react';
import { soundFx } from './SoundEngine';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          soundFx.playClickSound();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (id: string) => {
    soundFx.playClickSound();
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const newState = soundFx.toggleMute();
    setIsMuted(!newState);
  };

  const items = [
    {
      title: 'View Projects & AI Demos',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => navigateTo('projects'),
    },
    {
      title: 'About Shivansh & Vision',
      category: 'Navigation',
      icon: User,
      action: () => navigateTo('about'),
    },
    {
      title: 'Interactive 3D Physics Lanyard Card',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigateTo('lanyard-badge'),
    },
    {
      title: 'Interactive Tech Stack Sphere',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigateTo('skills'),
    },
    {
      title: 'Interactive Code Playground',
      category: 'Navigation',
      icon: Code,
      action: () => navigateTo('playground'),
    },
    {
      title: 'Get In Touch / Hire Me',
      category: 'Navigation',
      icon: Mail,
      action: () => navigateTo('contact'),
    },
    {
      title: 'View & Download Resume',
      category: 'Quick Action',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      title: isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound',
      category: 'Audio',
      icon: isMuted ? VolumeX : Volume2,
      action: handleToggleSound,
    },
    {
      title: 'Open GitHub Profile',
      category: 'Social',
      icon: Github,
      action: () => window.open('https://github.com', '_blank'),
    },
    {
      title: 'Open LinkedIn Profile',
      category: 'Social',
      icon: Linkedin,
      action: () => window.open('https://linkedin.com', '_blank'),
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div 
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
    >
      <div 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0e0e14] border border-[#F598F2]/30 rounded-2xl shadow-[0_0_50px_rgba(245,152,242,0.15)] overflow-hidden glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-[#F598F2] mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 outline-none font-figtree text-base"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div 
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="max-h-[60vh] overflow-y-auto p-2 space-y-1 overscroll-contain"
        >
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-slate-400 font-figtree">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  onMouseEnter={() => soundFx.playHoverSound()}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-all text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-[#F598F2]/10 text-[#F598F2] group-hover:bg-[#F598F2] group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-figtree text-sm font-medium text-slate-200 group-hover:text-white">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-[#38BDF8]">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Command Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/5 text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-3">
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded">ESC</kbd> close</span>
            <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd> select</span>
          </div>
          <span className="text-[#F598F2]">Shivansh Portfolio v2.5</span>
        </div>
      </div>
    </div>
  );
};
