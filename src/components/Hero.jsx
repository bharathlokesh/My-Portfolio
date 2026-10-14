import React from 'react';
import { ArrowDown, Download } from 'lucide-react';
import HeroVisual from './HeroVisual';

export default function Hero() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center pt-16 sm:pt-20 pb-10 sm:pb-12 overflow-hidden border-b border-gold-400/20"
    >
      {/* Ambient background golden radiance - GPU accelerated */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gold-300/15 rounded-full blur-[70px] pointer-events-none -z-10 transform-gpu will-change-transform" />
      <div className="absolute top-1/3 right-1/4 w-[360px] h-[360px] bg-amber-200/20 rounded-full blur-[60px] pointer-events-none -z-10 transform-gpu will-change-transform" />
      <div className="absolute bottom-10 left-10 w-[280px] h-[280px] bg-champagne-300/15 rounded-full blur-[50px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-10">

            {/* Status Badge: Light Gold & White */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-gold-300/80 text-xs font-mono tracking-wide shadow-sm shadow-gold-500/15 mb-4 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500 shadow-sm shadow-gold-500/50"></span>
              </span>
              <span className="font-bold text-gold-900 uppercase tracking-wider text-[11px]">
                Available for Opportunities
              </span>
            </div>

            {/* Large Name */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-stone-900 mb-2 leading-tight">
              BHARATH LOKESH
            </h1>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient-gold tracking-wide mb-4">
              AI &amp; ML DEVELOPER
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-stone-600 max-w-2xl leading-relaxed mb-6 font-normal">
              Specializing in Machine Learning, Computer Vision, and connected IoT systems — engineering intelligent solutions from embedded edge to the web.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-4 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 hover:from-gold-400 hover:to-amber-500 shadow-lg shadow-gold-600/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-stone-950" />
              </a>

              <a
                href={`${import.meta.env.BASE_URL}resume/Bharath_Resume.pdf`}
                download="Bharath_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-stone-950 bg-white/90 hover:bg-gold-100/60 shadow-sm backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-gold-400/40"
                aria-label="Download Resume"
              >
                <Download className="w-4 h-4 text-stone-950" />
                <span>Download Resume</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive AI Companion Showcase */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center relative">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
