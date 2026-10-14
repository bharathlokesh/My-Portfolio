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
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-gold-50/70 to-champagne-100/60 rounded-xl overflow-hidden p-4 border border-gold-400/40 flex flex-col justify-between shadow-xs">
            {/* Background grid */}
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-900 font-mono text-[10px] border border-gold-400/40 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                ESP32 ACTIVE
              </span>
              <span className="font-mono text-[10px] text-stone-600 font-semibold">HOME_NODE_01</span>
            </div>

            {/* Central sensor dashboard graphic */}
            <div className="relative z-10 grid grid-cols-3 gap-2 my-auto">
              <div className="p-2 rounded-lg bg-white/95 border border-gold-400/35 text-center shadow-xs">
                <span className="text-[9px] text-stone-600 font-mono block font-semibold">TEMP</span>
                <span className="text-sm font-extrabold text-gold-800 font-mono">24.2°C</span>
              </div>
              <div className="p-2 rounded-lg bg-white/95 border border-gold-400/35 text-center shadow-xs">
                <span className="text-[9px] text-stone-600 font-mono block font-semibold">LIGHTS</span>
                <span className="text-sm font-extrabold text-amber-700 font-mono">ON</span>
              </div>
              <div className="p-2 rounded-lg bg-white/95 border border-gold-400/35 text-center shadow-xs">
                <span className="text-[9px] text-stone-600 font-mono block font-semibold">FANS</span>
                <span className="text-sm font-extrabold text-yellow-800 font-mono">ACTIVE</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-700 border-t border-gold-400/25 pt-2 font-medium">
              <span className="text-gold-900 flex items-center gap-1 font-bold">
                <CheckCircle className="w-3 h-3 text-gold-600" /> Lights & Fans: AUTOMATED
              </span>
              <span className="text-stone-600 font-semibold">Uptime: 99.4%</span>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-champagne-50/70 to-gold-100/60 rounded-xl overflow-hidden p-4 border border-gold-400/40 flex flex-col justify-between shadow-xs">
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-900 font-mono text-[10px] border border-gold-400/40 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-ping"></span>
                FACE RECOGNITION
              </span>
              <span className="font-mono text-[10px] text-stone-600 font-semibold">60 FPS CV2</span>
            </div>

            {/* Target Bounding Box in Gold */}
            <div className="relative z-10 my-auto flex items-center justify-center">
              <div className="relative w-28 h-24 border-2 border-dashed border-gold-500/80 rounded-lg p-2 flex flex-col items-center justify-center bg-gold-500/10 shadow-xs">
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-gold-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-gold-600" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-gold-600" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-gold-600" />
                
                <Eye className="w-7 h-7 text-gold-700 mb-1" />
                <span className="text-[10px] font-mono text-gold-950 font-bold">MATCH: 99.2%</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-700 border-t border-gold-400/25 pt-2 font-medium">
              <span className="text-gold-900 font-bold">Identity: Verified</span>
              <span className="text-emerald-800 font-bold">Log Timestamp: OK</span>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-gold-50/70 to-amber-100/60 rounded-xl overflow-hidden p-4 border border-gold-400/40 flex flex-col justify-between shadow-xs">
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-900 font-mono text-[10px] border border-gold-400/40 font-bold">
                <Activity className="w-3 h-3 text-gold-600" />
                MQTT TELEMETRY
              </span>
              <span className="font-mono text-[10px] text-gold-900 font-bold">Broker: Online</span>
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

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-700 border-t border-gold-400/25 pt-2 font-medium">
              <span className="text-stone-600 font-semibold">Ping: 12ms</span>
              <span className="text-gold-900 font-bold">Live Socket Stream</span>
            </div>
          </div>
        );

      case 'vision-leaf':
      default:
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-white via-champagne-50/70 to-gold-100/60 rounded-xl overflow-hidden p-4 border border-gold-400/40 flex flex-col justify-between shadow-xs">
            <div className="absolute inset-0 tech-grid-pattern opacity-40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-900 font-mono text-[10px] border border-gold-400/40 font-bold">
                <Sparkles className="w-3 h-3 text-gold-600" />
                CNN PATHOLOGY SCAN
              </span>
              <span className="font-mono text-[10px] text-stone-600 font-semibold">Model: ResNet</span>
            </div>

            {/* Convolutional feature scanning visual */}
            <div className="relative z-10 my-auto flex items-center justify-center gap-3">
              <div className="relative w-20 h-20 rounded-full border-2 border-gold-400/70 flex items-center justify-center bg-gold-500/10 p-2 shadow-inner">
                <div className="w-12 h-12 rounded-full border border-dashed border-gold-600 animate-spin-slow flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gold-500/70 animate-ping" />
                </div>
              </div>
              <div className="text-left font-mono">
                <span className="text-[10px] text-stone-600 block font-semibold">DIAGNOSIS</span>
                <span className="text-xs font-extrabold text-stone-900 block">Classified Sample</span>
                <span className="text-[10px] text-gold-800 font-bold">Confidence: 97.8%</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-stone-700 border-t border-gold-400/25 pt-2 font-medium">
              <span className="text-gold-900 font-bold">Multi-class inference</span>
              <span className="text-stone-600 font-semibold">Dataset: PlantDoc</span>
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
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-gold-900 bg-gold-500/15 px-3 py-1 rounded-full border border-gold-400/40">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-stone-600 font-bold">
            {project.metrics}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-display font-bold text-stone-900 group-hover:text-gold-700 transition-colors mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-700 leading-relaxed mb-5 flex-1 font-normal">
          {project.description}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/90 text-stone-800 font-semibold border border-gold-400/30 shadow-xs"
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
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-white/90 border border-gold-400/40 text-stone-800 hover:text-gold-800 hover:bg-gold-50 hover:border-gold-500 transition-all duration-200 shadow-xs"
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
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 hover:from-gold-400 hover:to-amber-500 shadow-sm transition-all duration-200"
          aria-label={`View live demo of ${project.title}`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-stone-950" />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  );
}
