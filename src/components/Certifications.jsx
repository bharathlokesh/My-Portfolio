import React from 'react';
import { Award, ShieldCheck, ExternalLink, Calendar, Hash } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Certifications() {
  const { certificates = [] } = usePortfolio();

  // Hide entire section until user adds and confirms certificates in the admin panel
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative pt-6 sm:pt-8 pb-10 sm:pb-12 overflow-hidden border-b border-gold-400/20">
      {/* Background glow in gold - GPU accelerated */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gold-300/15 rounded-full blur-[60px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Award className="w-3.5 h-3.5 text-gold-700" />
            <span>Credentials & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
            Certifications
          </h2>
          <p className="text-stone-700 mt-3 text-sm sm:text-base font-normal">
            Professional certifications and coursework accreditations in Artificial Intelligence, Machine Learning, and Cloud/IoT.
          </p>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Real Certified Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-gold-500/60 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md hover:shadow-gold-500/10"
            >
              {/* Corner glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color || 'from-gold-300/20 to-amber-400/20'} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/95 border border-gold-400/35 text-gold-700 group-hover:scale-105 transition-transform shadow-xs">
                    <ShieldCheck className="w-6 h-6 text-gold-700" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-900 border border-gold-400/40 font-bold">
                    {cert.badge || 'Verified Credential'}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-stone-900 mb-1.5 group-hover:text-gold-700 transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-sm font-semibold text-stone-800 mb-1">
                  {cert.organization}
                </p>

                {cert.year && (
                  <p className="text-xs font-mono font-bold text-gold-800 flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>{cert.year}</span>
                  </p>
                )}

                {cert.description && (
                  <p className="text-xs text-stone-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>

              {(cert.credentialId || cert.credentialUrl) && (
                <div className="mt-5 pt-3.5 border-t border-gold-400/20 flex items-center justify-between text-xs text-stone-600 font-medium">
                  {cert.credentialId ? (
                    <span className="font-mono text-[10px] text-stone-600 truncate flex items-center gap-1">
                      <Hash className="w-3 h-3 text-gold-600 shrink-0" />
                      <span className="truncate">{cert.credentialId}</span>
                    </span>
                  ) : <span />}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-900 hover:text-gold-700 hover:underline inline-flex items-center gap-1 font-bold text-xs shrink-0 ml-2"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
