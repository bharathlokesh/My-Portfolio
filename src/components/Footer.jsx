import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-warmwhite-100 py-4 sm:py-5 border-t border-gold-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700 font-mono text-center sm:text-left">
          <p className="font-semibold">Hey! Thank you for visiting my portfolio.</p>
          <p className="flex items-center gap-1.5 text-gold-900 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0 animate-pulse" />
            <span>Crafted with an original mindset & custom color palette</span>
          </p>
          <button
            onClick={scrollToTop}
            type="button"
            className="px-3 py-1.5 rounded-xl bg-white text-stone-900 font-bold hover:text-gold-700 border border-gold-400/40 hover:border-gold-500 transition-all group shadow-xs flex items-center gap-1.5 text-xs font-mono"
            aria-label="Scroll to top of page"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-gold-700" />
          </button>
        </div>
      </div>
    </footer>
  );
}
