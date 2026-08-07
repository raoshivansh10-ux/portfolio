import React, { useEffect, useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    'INITIALIZING SYNAPSE CORE...',
    'LOADING NEURAL WEAVINGS...',
    'COMPILING 3D SHADERS...',
    'MOUNTING GLASS SURFACES...',
    'SHIVANSH YADAV PORTFOLIO READY',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 3;
        const bounded = next > 100 ? 100 : next;
        
        // Cycle status updates
        if (bounded > 20 && bounded <= 45) setStatusIndex(1);
        if (bounded > 45 && bounded <= 70) setStatusIndex(2);
        if (bounded > 70 && bounded <= 90) setStatusIndex(3);
        if (bounded > 90) setStatusIndex(4);

        return bounded;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[10050] bg-[#13121A] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Animated Glow Orb */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#B775BF]/30 via-[#6CD9BA]/25 to-[#1E18D9]/30 rounded-full blur-[140px] animate-pulse-glow" />

      {/* Futuristic 3D Wireframe Logo Loader */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-2xl border border-[#6CD9BA]/50 animate-spin-slow shadow-[0_0_30px_rgba(108,217,186,0.35)]" />
          <div className="absolute inset-2 rounded-2xl border border-[#B775BF]/50 animate-spin-slow [animation-direction:reverse]" />
          
          {/* Center Pulsing Monogram */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#B775BF] to-[#6CD9BA] p-[1.5px] shadow-[0_0_25px_rgba(183,117,191,0.6)]">
            <div className="w-full h-full bg-[#13121A] rounded-xl flex items-center justify-center">
              <span className="font-clash text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#6CD9BA] to-[#B775BF]">
                SY
              </span>
            </div>
          </div>
        </div>

        {/* Progress Display */}
        <div className="text-center font-clash text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          <span className="bg-gradient-to-r from-white via-[#6CD9BA] to-[#B775BF] bg-clip-text text-transparent">
            {progress}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden mb-6 p-[1px] border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div
            className="h-full bg-gradient-to-r from-[#B775BF] via-[#6CD9BA] to-[#1E18D9] rounded-full transition-all duration-200 shadow-[0_0_12px_#6CD9BA]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Console Text */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#6CD9BA] tracking-widest uppercase bg-white/[0.03] px-4 py-2 rounded-full border border-white/10">
          <Terminal className="w-3.5 h-3.5 animate-pulse text-[#B775BF]" />
          <span>{statuses[statusIndex]}</span>
        </div>
      </div>
    </div>
  );
};
