import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Cpu,
  Brain,
  Code,
  Sparkles,
  School,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Education() {
  const { education = [] } = usePortfolio();

  const getIconForHighlight = (idx) => {
    const icons = [Code, Brain, Sparkles, Cpu, BookOpen, School];
    return icons[idx % icons.length];
  };

  const getBadgeIcon = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('school') || t.includes('sslc') || t.includes('10th') || t.includes('secondary')) {
      return School;
    }
    return BookOpen;
  };

  return (
    <section id="education" className="relative pt-10 sm:pt-14 pb-6 sm:pb-8 overflow-hidden border-b border-gold-400/20">
      {/* Subtle background golden glow - GPU accelerated */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gold-300/15 rounded-full blur-[60px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
            Education & Growth
          </h2>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-gold-400/40 ml-4 sm:ml-8 mt-8 mb-0 space-y-12">
          {education.map((item, idx) => {
            const BadgeIcon = getBadgeIcon(item.type);
            const isCompleted = item.status && item.status.toLowerCase().includes('completed');

            return (
              <div key={item.id || idx} className="relative pl-6 sm:pl-10">
                {/* Glowing Timeline Marker in Gold */}
                <div className="absolute -left-[17px] top-1.5 flex items-center justify-center">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gold-500 shadow-lg shadow-gold-500/40">
                    <span className={`w-2.5 h-2.5 rounded-full bg-gold-500 ${!isCompleted ? 'animate-pulse' : ''}`}></span>
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-gold-500/60 transition-all duration-300">
                  {/* Ambient inner glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-400/20 transition-all" />

                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 text-gold-900 text-xs font-mono border border-gold-400/40 font-bold uppercase">
                      <BadgeIcon className="w-3.5 h-3.5" />
                      {item.type || 'ACADEMIC PROGRAM'}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-900 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        {item.status || 'Completed'}
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-gold-900 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/30 font-bold">
                        {item.status || 'Active Program'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-950 mb-1">
                    {item.degree}
                  </h3>
                  <h5 className="text-sm font-display font-semibold text-stone-800 mb-1">
                    {item.institution}
                  </h5>
                  <h6 className="text-xs font-mono font-bold text-gold-800 mb-3">
                    {item.period}
                  </h6>

                  <p className="text-stone-700 leading-relaxed text-base mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Highlights Grid if present */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="pt-6 border-t border-gold-400/20">
                      <span className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-4">
                        Core Academic Focus Areas:
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {item.highlights.map((h, hIdx) => {
                          const IconComp = getIconForHighlight(hIdx);
                          return (
                            <div
                              key={h.title || hIdx}
                              className="flex items-start gap-3 p-3.5 rounded-xl bg-white/90 border border-gold-400/25 hover:border-gold-400/50 hover:bg-gold-50/50 transition-all shadow-xs"
                            >
                              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-700 border border-gold-400/30 mt-0.5 shrink-0">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-stone-900">
                                  {h.title}
                                </h4>
                                <p className="text-xs text-stone-600 mt-0.5 font-normal">
                                  {h.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
