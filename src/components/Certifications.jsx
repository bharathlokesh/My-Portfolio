import React from 'react';
import { Award, PlusCircle, ShieldCheck, ExternalLink } from 'lucide-react';

const PLACEHOLDER_CERTS = [
  {
    title: 'Certification Title',
    organization: 'Issuing Organization',
    year: 'Year / In Progress',
    badge: 'Verified Credential',
    color: 'from-gold-300/20 to-amber-400/20',
    borderColor: 'border-gold-400/40'
  },
  {
    title: 'Certification Title',
    organization: 'Issuing Organization',
    year: 'Year / In Progress',
    badge: 'Technical Assessment',
    color: 'from-champagne-300/20 to-gold-400/20',
    borderColor: 'border-gold-400/40'
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative pt-6 sm:pt-8 pb-10 sm:pb-12 overflow-hidden border-b border-gold-400/20 dark:border-gold-500/15">
      {/* Background glow in gold - GPU accelerated */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gold-300/15 dark:bg-gold-600/10 rounded-full blur-[60px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-800 dark:text-gold-300 text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Certifications
          </h2>
          <p className="text-stone-600 dark:text-stone-300 mt-3 text-sm sm:text-base">
            Professional certifications and coursework accreditations in Artificial Intelligence, Machine Learning, and Cloud/IoT.
          </p>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_CERTS.map((cert, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-gold-500/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Corner glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/90 dark:bg-stone-900/80 border border-gold-400/30 text-gold-600 dark:text-gold-400 group-hover:scale-105 transition-transform shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-900 dark:text-gold-300 border border-gold-400/40 font-semibold">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-stone-900 dark:text-stone-100 mb-1 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {cert.organization}
                </p>

                <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  {cert.year}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-400/20 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
                <span className="font-mono text-[11px]">VERIFICATION ID: PLACEHOLDER</span>
                <span className="text-gold-700 dark:text-gold-400 hover:underline inline-flex items-center gap-1 cursor-pointer font-semibold">
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

          {/* Add Certification Placeholder Card in Light Gold & White */}
          <div className="rounded-2xl p-6 border-2 border-dashed border-gold-400/40 bg-white/50 dark:bg-stone-900/30 hover:border-gold-500 hover:bg-gold-50/40 dark:hover:bg-stone-800/60 transition-all duration-300 flex flex-col items-center justify-center text-center group min-h-[220px]">
            <div className="p-3.5 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-400/30 mb-3 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            
            <h3 className="text-base font-display font-bold text-stone-800 dark:text-stone-200 mb-1">
              Add Certification
            </h3>
            
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-xs">
              Placeholder for upcoming certifications, course completions, and competitive hackathon honors.
            </p>

            <span className="mt-4 px-3 py-1 rounded-full bg-gold-500/15 text-gold-900 dark:text-gold-300 text-[10px] font-mono border border-gold-400/30 font-semibold">
              Future Credential Slot
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
