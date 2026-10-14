import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-warmwhite-100 dark:bg-[#120f0c] py-4 sm:py-5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 font-mono text-center sm:text-left">
          <p>Hey! Thank you for visiting my portfolio.</p>
          <p className="flex items-center gap-1.5 text-gold-800 dark:text-gold-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400 shrink-0 animate-pulse" />
            <span>Crafted with an original mindset & custom color palette</span>
          </p>
          <button
            onClick={scrollToTop}
            type="button"
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:text-gold-700 dark:hover:text-gold-400 border border-gold-400/35 hover:border-gold-500 transition-all group shadow-sm flex items-center gap-1.5 text-xs font-mono"
            aria-label="Scroll to top of page"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
