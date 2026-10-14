import React from 'react';
import { 
  ExternalLink, 
  Eye, 
  Activity, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';
import { Github } from './Icons';

export default function ProjectCard({ project, onOpenModal }) {
  // Render project-specific high-tech visual graphic in light gold and white theme
  const renderProjectVisual = () => {
    switch (project.type) {
      case 'iot':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-gold-50/50 to-champagne-100/60 dark:from-stone-950 dark:via-stone-900 dark:to-stone-850 rounded-xl overflow-hidden p-4 border border-gold-400/35 flex flex-col justify-between shadow-inner">
            {/* Background grid */}
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-800 dark:text-gold-300 font-mono text-[10px] border border-gold-400/40 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                ESP32 ACTIVE
              </span>
              <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400 font-medium">HOME_NODE_01</span>
            </div>

            {/* Central sensor dashboard graphic */}
            <div className="relative z-10 grid grid-cols-3 gap-2 my-auto">
              <div className="p-2 rounded-lg bg-white/90 dark:bg-stone-900/90 border border-gold-400/30 text-center shadow-sm">
                <span className="text-[9px] text-stone-500 dark:text-stone-400 font-mono block">TEMP</span>
                <span className="text-sm font-bold text-gold-700 dark:text-gold-300 font-mono">24.2°C</span>
              </div>
              <div className="p-2 rounded-lg bg-white/90 dark:bg-stone-900/90 border border-gold-400/30 text-center shadow-sm">
                <span className="text-[9px] text-stone-500 dark:text-stone-400 font-mono block">LIGHTS</span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono">ON</span>
              </div>
              <div className="p-2 rounded-lg bg-white/90 dark:bg-stone-900/90 border border-gold-400/30 text-center shadow-sm">
                <span className="text-[9px] text-stone-500 dark:text-stone-400 font-mono block">FANS</span>
                <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400 font-mono">ACTIVE</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-600 dark:text-stone-400 border-t border-gold-400/20 pt-2 font-medium">
              <span className="text-gold-700 dark:text-gold-400 flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3 h-3" /> Lights & Fans: AUTOMATED
              </span>
              <span>Uptime: 99.4%</span>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-champagne-50/50 to-gold-100/50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-850 rounded-xl overflow-hidden p-4 border border-gold-400/35 flex flex-col justify-between shadow-inner">
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-800 dark:text-gold-300 font-mono text-[10px] border border-gold-400/40 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-ping"></span>
                FACE RECOGNITION
              </span>
              <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400 font-medium">60 FPS CV2</span>
            </div>

            {/* Target Bounding Box in Gold */}
            <div className="relative z-10 my-auto flex items-center justify-center">
              <div className="relative w-28 h-24 border-2 border-dashed border-gold-500/80 rounded-lg p-2 flex flex-col items-center justify-center bg-gold-500/10 shadow-sm">
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-gold-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-gold-600" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-gold-600" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-gold-600" />
                
                <Eye className="w-7 h-7 text-gold-600 dark:text-gold-400 mb-1" />
                <span className="text-[10px] font-mono text-gold-900 dark:text-gold-200 font-bold">MATCH: 99.2%</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-600 dark:text-stone-400 border-t border-gold-400/20 pt-2 font-medium">
              <span className="text-gold-800 dark:text-gold-300 font-semibold">Identity: Verified</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Log Timestamp: OK</span>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-gold-50/50 to-amber-100/50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-850 rounded-xl overflow-hidden p-4 border border-gold-400/35 flex flex-col justify-between shadow-inner">
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-800 dark:text-gold-300 font-mono text-[10px] border border-gold-400/40 font-semibold">
                <Activity className="w-3 h-3 text-gold-600" />
                MQTT TELEMETRY
              </span>
              <span className="font-mono text-[10px] text-gold-700 dark:text-gold-400 font-semibold">Broker: Online</span>
            </div>

            {/* SVG Telemetry Sine Wave in Gold */}
            <div className="relative z-10 my-auto py-2">
              <svg className="w-full h-14" viewBox="0 0 240 60" fill="none">
                <path
                  d="M0 40 Q 30 10, 60 30 T 120 20 T 180 40 T 240 15"
                  stroke="#b8862d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 40 Q 30 10, 60 30 T 120 20 T 180 40 T 240 15 L 240 60 L 0 60 Z"
                  fill="url(#goldPulseGrad)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="goldPulseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#dfbc74" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-600 dark:text-stone-400 border-t border-gold-400/20 pt-2 font-medium">
              <span>Ping: 12ms</span>
              <span className="text-gold-800 dark:text-gold-300 font-semibold">Live Socket Stream</span>
            </div>
          </div>
        );

      case 'vision-leaf':
      default:
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-champagne-50/50 to-gold-100/50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-850 rounded-xl overflow-hidden p-4 border border-gold-400/35 flex flex-col justify-between shadow-inner">
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-800 dark:text-gold-300 font-mono text-[10px] border border-gold-400/40 font-semibold">
                <Sparkles className="w-3 h-3 text-gold-600" />
                CNN PATHOLOGY SCAN
              </span>
              <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400 font-medium">Model: ResNet</span>
            </div>

            {/* Convolutional feature scanning visual */}
            <div className="relative z-10 my-auto flex items-center justify-center gap-3">
              <div className="relative w-20 h-20 rounded-full border-2 border-gold-400/60 flex items-center justify-center bg-gold-500/10 p-2 shadow-inner">
                <div className="w-12 h-12 rounded-full border border-dashed border-gold-600 animate-spin-slow flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gold-500/60 animate-ping" />
                </div>
              </div>
              <div className="text-left font-mono">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">DIAGNOSIS</span>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">Classified Sample</span>
                <span className="text-[10px] text-gold-700 dark:text-gold-400 font-semibold">Confidence: 97.8%</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-600 dark:text-stone-400 border-t border-gold-400/20 pt-2 font-medium">
              <span className="text-gold-800 dark:text-gold-300 font-semibold">Multi-class inference</span>
              <span>Dataset: PlantDoc</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Graphic Visual */}
      <div className="mb-5 overflow-hidden rounded-xl">
        {renderProjectVisual()}
      </div>

      {/* Main Info */}
      <div className="flex-1 flex flex-col">
        {/* Category Badge & Status */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-gold-900 dark:text-gold-300 bg-gold-500/15 dark:bg-gold-500/20 px-3 py-1 rounded-full border border-gold-400/40">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 font-medium">
            {project.metrics}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-display font-bold text-stone-900 dark:text-stone-100 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-5 flex-1 font-normal">
          {project.description}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-warmwhite-100 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 border border-gold-400/25"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons: GitHub & Live Demo */}
      <div className="pt-4 border-t border-gold-400/20 flex items-center gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (project.githubUrl === '#') {
              e.preventDefault();
              onOpenModal(project, 'code');
            }
          }}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/90 dark:bg-stone-900/80 border border-gold-400/35 text-stone-800 dark:text-stone-200 hover:text-gold-700 dark:hover:text-gold-300 dark:hover:bg-stone-800 hover:border-gold-500 transition-all duration-200 shadow-sm"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Github className="w-3.5 h-3.5" />
          <span>Code</span>
        </a>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (project.liveUrl === '#') {
              e.preventDefault();
              onOpenModal(project, 'demo');
            }
          }}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-stone-950 dark:text-white bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 dark:from-gold-500 dark:via-gold-600 dark:to-amber-700 hover:from-gold-400 hover:to-amber-500 dark:hover:from-gold-400 dark:hover:to-amber-600 shadow-sm transition-all duration-200"
          aria-label={`View live demo of ${project.title}`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-stone-950 dark:text-white" />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  );
}
