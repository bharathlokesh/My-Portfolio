import React, { useState } from 'react';
import { 
  Code, 
  Globe, 
  BrainCircuit, 
  Cpu, 
  Wrench, 
  Sparkles,
  Users 
} from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Code,
    color: 'from-amber-400/20 to-gold-400/20',
    borderColor: 'border-gold-400/40',
    iconColor: 'text-gold-700 dark:text-gold-400',
    skills: [
      { name: 'Python', detail: 'ML & Scripting' },
      { name: 'C Programming', detail: 'Systems & Low-Level' },
      { name: 'C++', detail: 'Embedded & Performance' },
      { name: 'Java', detail: 'OOP & Core Logic' }
    ]
  },
  {
    id: 'web',
    title: 'Web',
    icon: Globe,
    color: 'from-gold-400/20 to-yellow-400/20',
    borderColor: 'border-gold-400/40',
    iconColor: 'text-gold-700 dark:text-gold-400',
    skills: [
      { name: 'HTML', detail: 'Semantic Markup' },
      { name: 'CSS', detail: 'Modern Styling' },
      { name: 'JavaScript', detail: 'Dynamic Logic' },
      { name: 'React', detail: 'Component Architecture' }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI / ML',
    icon: BrainCircuit,
    color: 'from-amber-500/20 to-champagne-400/20',
    borderColor: 'border-gold-400/40',
    iconColor: 'text-gold-700 dark:text-gold-400',
    skills: [
      { name: 'Machine Learning', detail: 'Models & Inference' },
      { name: 'Computer Vision', detail: 'Image Processing & Recognition' },
      { name: 'Data Analysis', detail: 'Insights & Preprocessing' }
    ]
  },
  {
    id: 'iot',
    title: 'IoT',
    icon: Cpu,
    color: 'from-gold-500/20 to-amber-600/20',
    borderColor: 'border-gold-400/40',
    iconColor: 'text-gold-700 dark:text-gold-400',
    skills: [
      { name: 'ESP32', detail: 'Wi-Fi & Microcontroller' },
      { name: 'Arduino', detail: 'Hardware Prototyping' },
      { name: 'MQTT', detail: 'Lightweight Messaging' },
      { name: 'Sensors', detail: 'Environmental & Telemetry' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    color: 'from-champagne-400/20 to-gold-500/20',
    borderColor: 'border-gold-400/40',
    iconColor: 'text-gold-700 dark:text-gold-400',
    skills: [
      { name: 'Git', detail: 'Version Control' },
      { name: 'GitHub', detail: 'Repo Management' },
      { name: 'VS Code', detail: 'Development Environment' },
      { name: 'Jupyter', detail: 'Notebooks & Exploration' }
    ]
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    icon: Users,
    color: 'from-amber-400/20 to-gold-500/20',
    borderColor: 'border-gold-400/40',
    iconColor: 'text-gold-700 dark:text-gold-400',
    skills: [
      { name: 'Problem Solving', detail: 'Analytical & Structured' },
      { name: 'Team Collaboration', detail: 'Agile & Communication' },
      { name: 'Adaptability', detail: 'Continuous Tech Learning' },
      { name: 'Project Planning', detail: 'Time & Delivery Focus' }
    ]
  }
];

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredCategories = selectedFilter === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(cat => cat.id === selectedFilter);

  return (
    <section id="skills" className="relative pt-8 sm:pt-10 pb-10 sm:pb-12 overflow-hidden border-b border-gold-400/20 dark:border-gold-500/15">
      {/* Background aura - GPU accelerated */}
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-gold-300/15 dark:bg-gold-600/10 rounded-full blur-[65px] pointer-events-none -z-10 transform-gpu will-change-transform" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-amber-200/15 dark:bg-amber-700/10 rounded-full blur-[55px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-800 dark:text-gold-300 text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Technical Skills
          </h2>
          <p className="text-stone-600 dark:text-stone-300 mt-3 text-sm sm:text-base">
            Comprehensive skill set spanning programming, machine intelligence, embedded IoT hardware, and modern web interfaces.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              selectedFilter === 'all'
                ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 dark:from-gold-500 dark:via-gold-600 dark:to-amber-700 text-stone-950 dark:text-white font-bold shadow-md shadow-gold-600/20'
                : 'bg-white/80 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-gold-50 dark:hover:bg-stone-800'
            }`}
          >
            All Disciplines
          </button>
          {SKILL_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedFilter(category.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedFilter === category.id
                  ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 dark:from-gold-500 dark:via-gold-600 dark:to-amber-700 text-stone-950 dark:text-white font-bold shadow-md shadow-gold-600/20'
                  : 'bg-white/80 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 hover:bg-gold-50 dark:hover:bg-stone-800'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="glass-card rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 flex flex-col justify-between"
              >
                {/* Corner glow */}
                <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${category.color} blur-2xl group-hover:scale-150 transition-transform duration-500`} />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className={`p-3 rounded-xl bg-white/90 dark:bg-stone-900/80 border ${category.borderColor} ${category.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-stone-900 dark:text-stone-100">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-gold-700 dark:text-gold-400 font-medium">
                        {category.skills.length} core proficiencies
                      </span>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-warmwhite-100 dark:bg-stone-900/60 hover:bg-gold-50/50 dark:hover:bg-stone-800 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-stone-800 dark:text-stone-200">
                            {skill.name}
                          </span>
                          <span className="text-[11px] font-mono font-medium text-gold-800 dark:text-gold-300 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-400/25">
                            {skill.detail}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech bar footer indicator */}
                <div className="mt-6 pt-4 border-t border-gold-400/20 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  <span className="text-gold-800 dark:text-gold-400 font-semibold">DISCIPLINE READY</span>
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
