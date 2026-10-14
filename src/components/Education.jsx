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

export default function Education() {
  const highlights = [
    { title: 'Core Programming', desc: 'Python, C, C++, Java, Object-Oriented Design', icon: Code },
    { title: 'Machine Learning', desc: 'Supervised/Unsupervised Learning, Neural Nets', icon: Brain },
    { title: 'Computer Vision', desc: 'OpenCV, Image Processing & Pattern Recognition', icon: Sparkles },
    { title: 'IoT Systems', desc: 'Microcontrollers, Sensor Interfacing & MQTT', icon: Cpu },
  ];

  const sslcHighlights = [
    { title: 'Mathematics & Logic', desc: 'Algebra, Geometry & Analytical Problem Solving', icon: Code },
    { title: 'General Science', desc: 'Core Physics, Chemistry & Natural Sciences', icon: Sparkles },
    { title: 'Computer Concepts', desc: 'Foundations of Computing & Digital Literacy', icon: Cpu },
    { title: 'Communication Skills', desc: 'English & Regional Language Fluency', icon: BookOpen },
  ];

  return (
    <section id="education" className="relative pt-10 sm:pt-14 pb-6 sm:pb-8 overflow-hidden border-b border-gold-400/20 dark:border-gold-500/15">
      {/* Subtle background golden glow - GPU accelerated */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gold-300/15 dark:bg-gold-600/10 rounded-full blur-[60px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-800 dark:text-gold-300 text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Education & Growth
          </h2>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-gold-400/40 ml-4 sm:ml-8 mt-8 mb-0 space-y-12">

          {/* Timeline Item 1: Diploma */}
          <div className="relative pl-6 sm:pl-10">
            {/* Glowing Timeline Marker in Gold */}
            <div className="absolute -left-[17px] top-1.5 flex items-center justify-center">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-stone-900 border-2 border-gold-500 shadow-lg shadow-gold-500/40">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-500 animate-pulse"></span>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-gold-500/60 transition-all duration-300">
              {/* Ambient inner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-400/20 transition-all" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 text-gold-900 dark:text-gold-300 text-xs font-mono border border-gold-400/40 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  DIPLOMA SPECIALIZATION
                </span>
                <span className="text-xs font-mono text-gold-800 dark:text-gold-300 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/30 font-semibold">
                  Active Program
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 dark:text-stone-100 mb-1">
                Diploma in AI & Machine Learning
              </h3>
              <h5 className="text-sm font-display font-medium text-stone-500 dark:text-stone-100 mb-1">
                Government Tool Room and Training Centre (GTTC), Magadi
              </h5>
              <h6 className="text-xs font-display font-medium text-stone-500 dark:text-stone-100 mb-1">
                2023 - 2027
              </h6>

              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base mb-6 font-normal">
                Diploma studies focused on programming, artificial intelligence, machine learning and emerging technologies.
              </p>

              {/* Curriculum Highlights Grid */}
              <div className="pt-6 border-t border-gold-400/20">
                <span className="block text-xs font-mono uppercase tracking-wider text-gold-800 dark:text-gold-400 font-bold mb-4">
                  Core Academic Focus Areas:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-warmwhite-100 dark:bg-stone-900/60 border border-gold-400/20 hover:border-gold-400/50 hover:bg-gold-50/50 dark:hover:bg-stone-800 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-gold-500/10 text-gold-700 dark:text-gold-400 border border-gold-400/30 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {item.title}
                          </h4>
                          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Timeline Item 2: SSLC */}
          <div className="relative pl-6 sm:pl-10">
            {/* Timeline Marker in Gold */}
            <div className="absolute -left-[17px] top-1.5 flex items-center justify-center">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-stone-900 border-2 border-gold-500/70 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-500"></span>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-gold-500/60 transition-all duration-300">
              {/* Ambient inner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-400/20 transition-all" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 text-gold-900 dark:text-gold-300 text-xs font-mono border border-gold-400/40 font-semibold">
                  <School className="w-3.5 h-3.5" />
                  SECONDARY EDUCATION (SSLC)
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Completed
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 dark:text-stone-100 mb-1">
                Secondary School Leaving Certificate (SSLC)
              </h3>
              <h5 className="text-sm font-display font-medium text-stone-500 dark:text-stone-100 mb-1">
                Mahathma Gandhi High School, Kunigal
              </h5>
              <h6 className="text-xs font-display font-medium text-stone-500 dark:text-stone-100 mb-1">
                2021 - 2023
              </h6>

              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base mb-6 font-normal">
                Completed secondary school education with strong fundamentals in Mathematics, Science, and foundational computer concepts, establishing the analytical groundwork for technical engineering.
              </p>

              {/* Curriculum Highlights Grid */}
              <div className="pt-6 border-t border-gold-400/20">
                <span className="block text-xs font-mono uppercase tracking-wider text-gold-800 dark:text-gold-400 font-bold mb-4">
                  Core Foundational Focus Areas:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sslcHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-warmwhite-100 dark:bg-stone-900/60 border border-gold-400/20 hover:border-gold-400/50 hover:bg-gold-50/50 dark:hover:bg-stone-800 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-gold-500/10 text-gold-700 dark:text-gold-400 border border-gold-400/30 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            {item.title}
                          </h4>
                          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
