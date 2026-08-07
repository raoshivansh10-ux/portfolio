import React from 'react';
import { Github, GitCommit, GitBranch, Star, Users, ExternalLink, Activity } from 'lucide-react';
import { soundFx } from '../ui/SoundEngine';

export const GitHubSection: React.FC = () => {
  // Generate 52 weeks x 7 days contribution matrix (364 days)
  const weeks = 52;
  const daysPerWeek = 7;
  const contributionGrid: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const weekDays: number[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const rand = Math.random();
      if (rand > 0.8) weekDays.push(4); // intense floral pink/sky blue
      else if (rand > 0.6) weekDays.push(3);
      else if (rand > 0.4) weekDays.push(2);
      else if (rand > 0.25) weekDays.push(1);
      else weekDays.push(0);
    }
    contributionGrid.push(weekDays);
  }

  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#F598F2] shadow-[0_0_8px_#F598F2]';
      case 3:
        return 'bg-[#38BDF8]/90 shadow-[0_0_6px_#38BDF8]';
      case 2:
        return 'bg-[#10B981]/70';
      case 1:
        return 'bg-[#F598F2]/30';
      default:
        return 'bg-white/[0.04]';
    }
  };

  const githubStats = [
    { label: 'Total Contributions', value: '1,480+', icon: Activity, color: 'text-[#F598F2]' },
    { label: 'Public Repositories', value: '38', icon: GitBranch, color: 'text-[#38BDF8]' },
    { label: 'GitHub Stars', value: '120+', icon: Star, color: 'text-[#10B981]' },
    { label: 'Commits (2024-2025)', value: '980+', icon: GitCommit, color: 'text-[#F598F2]' },
  ];

  return (
    <section id="github" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-[#F598F2]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#F598F2]/30 text-xs font-mono text-[#F598F2] uppercase tracking-widest mb-4">
          <Github className="w-3.5 h-3.5 text-[#F598F2]" />
          <span>OPEN SOURCE ACTIVITY</span>
        </div>
        <h2 className="font-clash text-4xl sm:text-6xl font-bold tracking-tight text-white">
          GITHUB <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F598F2] via-[#38BDF8] to-[#10B981]">CONTRIBUTIONS</span>
        </h2>
        <p className="max-w-2xl mt-4 font-sans text-slate-300 text-sm sm:text-base">
          Real-time coding activity matrix and repository statistics.
        </p>
      </div>

      {/* GitHub Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {githubStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playHoverSound()}
              className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-[#F598F2]/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
              <span className="font-clash text-3xl sm:text-4xl font-extrabold text-white">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Contribution Heatmap Matrix */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 overflow-x-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 min-w-[650px]">
          <div className="flex items-center space-x-3">
            <Github className="w-5 h-5 text-white" />
            <span className="font-figtree font-bold text-base text-white">
              @ShivanshYadav Activity Graph
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-[#F598F2] hover:text-[#38BDF8] flex items-center space-x-1.5"
          >
            <span>Follow on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Heatmap Grid */}
        <div className="flex justify-between gap-1 min-w-[700px]">
          {contributionGrid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  title={`Level ${level} contributions`}
                  className={`w-3 h-3 rounded-sm transition-all duration-300 hover:scale-125 ${getCellColor(level)}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end space-x-2 mt-6 text-xs font-mono text-slate-400 min-w-[650px]">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-white/[0.04]" />
          <div className="w-3 h-3 rounded-sm bg-[#F598F2]/30" />
          <div className="w-3 h-3 rounded-sm bg-[#10B981]/70" />
          <div className="w-3 h-3 rounded-sm bg-[#38BDF8]/90" />
          <div className="w-3 h-3 rounded-sm bg-[#F598F2] shadow-[0_0_8px_#F598F2]" />
          <span>More</span>
        </div>
      </div>
    </section>
  );
};
