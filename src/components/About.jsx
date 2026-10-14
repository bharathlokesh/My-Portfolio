import React from 'react';
import {
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Globe,
  Workflow,
  Target,
  FolderGit2,
  Languages,
  Compass
} from 'lucide-react';

const INTERESTS = [
  { name: 'Artificial Intelligence', icon: Bot, color: 'text-amber-700', border: 'border-gold-400/40', bg: 'bg-white/95' },
  { name: 'Machine Learning', icon: BrainCircuit, color: 'text-amber-700', border: 'border-amber-400/40', bg: 'bg-white/95' },
  { name: 'Python', icon: Code2, color: 'text-amber-800', border: 'border-yellow-400/40', bg: 'bg-white/95' },
  { name: 'Web Development', icon: Globe, color: 'text-gold-800', border: 'border-gold-400/40', bg: 'bg-white/95' },
  { name: 'IoT', icon: Cpu, color: 'text-amber-800', border: 'border-amber-400/40', bg: 'bg-white/95' },
  { name: 'Automation', icon: Workflow, color: 'text-gold-900', border: 'border-gold-400/40', bg: 'bg-white/95' },
];

export default function About() {
  return (
    <section id="about" className="relative pt-8 sm:pt-10 pb-10 sm:pb-12 overflow-hidden border-b border-gold-400/20">
      {/* Background golden glows - GPU accelerated */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-300/15 rounded-full blur-[60px] pointer-events-none -z-10 transform-gpu will-change-transform" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/15 rounded-full blur-[60px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-mono tracking-widest uppercase mb-2.5 font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
            Who I Am
          </h2>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Top: Bio Narrative & Interests Main Card (Unified horizontal split) */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group mb-5 sm:mb-6 shadow-md shadow-gold-500/5">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/10 rounded-full blur-2xl group-hover:bg-gold-400/20 transition-all duration-500 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Bio Narrative */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 flex items-center gap-3">
                <span>Passionate AI, ML &amp; IoT Explorer</span>
              </h3>

              <div className="space-y-2.5 text-stone-700 leading-relaxed text-sm sm:text-base">
                <p>
                  I’m <strong className="text-stone-950 font-bold">Bharath</strong>, an{' '}
                  <span className="text-gold-700 font-bold">AI/ML, IoT &amp; Web Developer</span> passionate about transforming ideas into intelligent, connected solutions.
                </p>
                <p>
                  I combine <strong className="text-stone-900 font-semibold">artificial intelligence, embedded systems, IoT, and modern web technologies</strong> to design and develop automation systems that connect intelligent software with the physical world.
                </p>
              </div>
            </div>

            {/* Right Column: Core Interest Domains */}
            <div className="lg:col-span-5 lg:border-l lg:border-gold-400/20 lg:pl-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-gold-400/15">
              <span className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-3">
                Core Interest Domains:
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {INTERESTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${item.bg} border ${item.border} hover:bg-gold-50 shadow-sm transition-all duration-200`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
                      <span className="text-xs font-bold text-stone-900 truncate">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom: 3 Stat / Metric Cards in a balanced 3-column row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

          {/* Stat Card 1: 04+ Projects */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-gold-500/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-700 border border-gold-400/30 group-hover:scale-110 transition-transform duration-300">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] sm:text-xs tracking-wider text-gold-900 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-400/30 font-bold">
                  PORTFOLIO
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-stone-950 tracking-tight">
                  04+
                </span>
                <h4 className="text-base font-bold text-stone-900 mt-0.5">
                  Projects
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed font-normal">
                  Engineered end-to-end applications across IoT microcontrollers, computer vision, and reactive web telemetry.
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 2: 04+ Core Languages */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-400/30 group-hover:scale-110 transition-transform duration-300">
                  <Languages className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] sm:text-xs tracking-wider text-amber-900 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/30 font-bold">
                  FOUNDATIONS
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-stone-950 tracking-tight">
                  04+
                </span>
                <h4 className="text-base font-bold text-stone-900 mt-0.5">
                  Core Languages
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed font-normal">
                  Proficient in Python for data &amp; AI, C &amp; C++ for systems and embedded development, and Java for core OOP.
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 3: 01 Goal */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-gold-500/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-700 border border-gold-400/30 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] sm:text-xs tracking-wider text-gold-900 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-400/30 font-bold">
                  PURPOSE
                </span>
              </div>
              <div className="mt-3">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-stone-950 tracking-tight">
                  01
                </span>
                <h4 className="text-base font-bold text-stone-900 mt-0.5">
                  Goal
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed font-normal">
                  Engineer intelligent, scalable solutions that bridge physical devices with machine learning to solve real human problems.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
