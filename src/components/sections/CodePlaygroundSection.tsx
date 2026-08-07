import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, Sparkles, Sliders, RefreshCw } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';

export const CodePlaygroundSection: React.FC = () => {
  const [accentColor, setAccentColor] = useState<'pink' | 'sky' | 'emerald' | 'purple'>('pink');
  const [glassBlur, setGlassBlur] = useState<number>(16);
  const [borderOpacity, setBorderOpacity] = useState<number>(20);
  const [isGlowing, setIsGlowing] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const getAccentClass = () => {
    switch (accentColor) {
      case 'pink':
        return 'from-[#F598F2] to-[#38BDF8] border-[#F598F2] text-black font-bold shadow-[0_0_25px_rgba(245,152,242,0.5)]';
      case 'sky':
        return 'from-[#38BDF8] to-[#10B981] border-[#38BDF8] text-black font-bold shadow-[0_0_25px_rgba(56,189,248,0.5)]';
      case 'emerald':
        return 'from-[#10B981] to-[#38BDF8] border-[#10B981] text-black font-bold shadow-[0_0_25px_rgba(16,185,129,0.5)]';
      default:
        return 'from-purple-500 to-pink-500 border-purple-400 text-white shadow-[0_0_25px_rgba(157,78,225,0.5)]';
    }
  };

  const generatedCode = `<div className="glass-panel p-6 rounded-2xl border border-white/${borderOpacity}"
     style={{ backdropFilter: 'blur(${glassBlur}px)' }}>
  <button className="px-6 py-3 rounded-xl bg-gradient-to-r ${getAccentClass()}
                     font-figtree font-bold text-xs uppercase tracking-wider
                     transition-all transform hover:-translate-y-1">
    Shivansh AI Interactive Component
  </button>
</div>`;

  const handleCopyCode = () => {
    soundFx.playClickSound();
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F598F2]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
          <Terminal className="w-3.5 h-3.5 text-[#F598F2]" />
          <span>INTERACTIVE SANDBOX</span>
        </div>
        <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
          LIVE CODE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]">PLAYGROUND</span>
        </h2>
        <p className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base">
          Customize micro-animations, glass blur strength, and neon colors in real-time.
        </p>
      </div>

      {/* Playground Console Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Controls Column */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-clash font-bold text-lg text-white flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-[#F598F2]" />
              <span>Component Controls</span>
            </span>
            <button
              onClick={() => {
                soundFx.playClickSound();
                setAccentColor('pink');
                setGlassBlur(16);
                setBorderOpacity(20);
                setIsGlowing(true);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset Settings"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Accent Color Chooser */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Floral & Sky Accent Theme
            </label>
            <div className="flex gap-2">
              {[
                { id: 'pink', color: 'bg-[#F598F2]' },
                { id: 'sky', color: 'bg-[#38BDF8]' },
                { id: 'emerald', color: 'bg-[#10B981]' },
                { id: 'purple', color: 'bg-purple-500' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    soundFx.playClickSound();
                    setAccentColor(c.id as any);
                  }}
                  className={`w-9 h-9 rounded-xl ${c.color} border-2 transition-all ${
                    accentColor === c.id ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Glass Blur Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Backdrop Blur Filter</span>
              <span className="text-[#F598F2]">{glassBlur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={glassBlur}
              onChange={(e) => setGlassBlur(Number(e.target.value))}
              className="w-full accent-[#F598F2] bg-white/10 rounded-lg h-2"
            />
          </div>

          {/* Border Opacity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Glass Border Opacity</span>
              <span className="text-[#F598F2]">{borderOpacity}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(Number(e.target.value))}
              className="w-full accent-[#F598F2] bg-white/10 rounded-lg h-2"
            />
          </div>

          {/* Glow Toggle */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Enable Neon Shadow Glow
            </span>
            <button
              onClick={() => {
                soundFx.playClickSound();
                setIsGlowing(!isGlowing);
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                isGlowing ? 'bg-[#F598F2]' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black transition-transform ${
                  isGlowing ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Live Preview & Generated Code Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Live Render Output Canvas Box */}
          <div className="glass-panel p-10 rounded-3xl border border-white/10 relative min-h-[260px] flex flex-col items-center justify-center overflow-hidden">
            <span className="absolute top-4 left-5 text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center space-x-2">
              <Play className="w-3.5 h-3.5 text-[#F598F2]" />
              <span>Real-Time Component Render</span>
            </span>

            {/* Rendered Component */}
            <div
              className="p-8 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-4"
              style={{
                backgroundColor: 'rgba(18, 18, 24, 0.5)',
                backdropFilter: `blur(${glassBlur}px)`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
              }}
            >
              <button
                onMouseEnter={() => soundFx.playHoverSound()}
                className={`px-7 py-3.5 rounded-xl bg-gradient-to-r ${
                  isGlowing ? getAccentClass() : 'from-slate-700 to-slate-800 text-white'
                } font-figtree font-bold text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Shivansh Glass UI Button</span>
              </button>
              <span className="font-mono text-[11px] text-slate-400">
                [ Interactive Hover & Sound Feedback ]
              </span>
            </div>
          </div>

          {/* Generated Code Snippet Box */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-black/60 relative">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="font-mono text-xs text-[#F598F2]">JSX Output Snippet</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {generatedCode}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
