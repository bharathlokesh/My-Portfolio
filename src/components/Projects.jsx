import React, { useState } from 'react';
import { projects, projectCategories } from '../data/projects';
import ProjectCard from './ProjectCard';
import { Layers, X, CheckCircle } from 'lucide-react';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModal, setActiveModal] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const handleOpenModal = (project, mode) => {
    setActiveModal({ project, mode });
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <section id="projects" className="relative pt-10 sm:pt-14 pb-12 sm:pb-14 overflow-hidden border-b border-gold-400/20">
      {/* Background ambient lighting in gold - GPU accelerated */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-gold-300/15 via-amber-200/5 to-transparent blur-[70px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
            Selected Projects
          </h2>
          <p className="text-stone-700 mt-3 text-sm sm:text-base font-normal">
            Hardware-software integrated systems, deep learning computer vision, and distributed IoT pipelines.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 text-stone-950 font-bold shadow-md shadow-gold-600/20 scale-105'
                  : 'bg-white/90 text-stone-800 border border-gold-400/30 hover:bg-gold-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

      </div>

      {/* Project Quick Preview Modal */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div 
            className="glass-panel bg-white/98 rounded-2xl max-w-lg w-full p-6 border border-gold-400/60 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-xl text-stone-600 hover:text-stone-950 hover:bg-gold-500/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-900 font-mono text-[11px] border border-gold-400/40 font-bold">
                {activeModal.project.category}
              </span>
              <span className="text-xs text-stone-600 font-mono font-medium">
                {activeModal.mode === 'code' ? 'Repository Details' : 'Live Deployment'}
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold text-stone-950 mb-2">
              {activeModal.project.title}
            </h3>

            <p className="text-stone-700 text-sm leading-relaxed mb-4 font-normal">
              {activeModal.project.description}
            </p>

            <div className="p-4 rounded-xl bg-gold-50/80 border border-gold-400/35 mb-5 shadow-sm">
              <div className="text-xs font-mono text-gold-900 mb-2 flex items-center gap-1.5 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-gold-600" />
                <span>Architecture Verified</span>
              </div>
              <p className="text-xs text-stone-700 leading-normal font-normal">
                This project represents original engineering work in AI/ML & IoT. Repository source code and interactive hardware simulation walkthroughs are available for academic, internship, and technical review upon direct request.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeModal.project.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-white text-gold-900 border border-gold-400/40 font-semibold shadow-xs"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-900 bg-white border border-gold-400/40 hover:bg-gold-50 transition-all shadow-xs"
              >
                Close Preview
              </button>
              <a
                href="#contact"
                onClick={() => {
                  handleCloseModal();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 hover:from-gold-400 hover:to-amber-500 shadow-md shadow-gold-600/20"
              >
                Request Code Access
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
