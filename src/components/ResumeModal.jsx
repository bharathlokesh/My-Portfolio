import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, resumeUrl }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const previewImgUrl = `${import.meta.env.BASE_URL}resume/resume_preview.webp`;
  const fallbackImgUrl = `${import.meta.env.BASE_URL}resume/resume_preview.png`;

  const handleClose = useCallback(() => {
    setZoomLevel(100);
    onClose();
  }, [onClose]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 80));
  const handleZoomReset = () => setZoomLevel(100);

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-2 sm:p-5 md:p-8 bg-stone-950/85 backdrop-blur-lg animate-in fade-in duration-200 select-none"
      onClick={handleClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl h-[94vh] max-h-[940px] bg-warmwhite-100 rounded-2xl sm:rounded-3xl shadow-2xl border border-gold-400/50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Top Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-3.5 bg-white border-b border-gold-400/30 shrink-0 gap-2 shadow-xs">
          
          {/* Left: Document Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gold-400/25 to-amber-500/15 border border-gold-400/40 flex items-center justify-center text-gold-800 shrink-0 shadow-xs">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3
                  id="resume-modal-title"
                  className="text-xs sm:text-base font-bold text-stone-900 truncate"
                >
                  Bharath Lokesh — Resume
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-500 font-medium truncate">
                AI & ML Developer • Ready to download or print
              </p>
            </div>
          </div>

          {/* Right: Actions (Zoom + Download + Tab + Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Zoom Controls (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/80 mr-1">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 80}
                className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono font-semibold text-stone-700 px-1 min-w-[42px] text-center">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 160}
                className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 100 && (
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-950 hover:bg-white transition-all cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Primary Download Button */}
            <a
              href={resumeUrl}
              download="Bharath_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 hover:from-gold-400 hover:to-amber-500 shadow-sm shadow-gold-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Download official PDF copy"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              <span>Download PDF</span>
            </a>

            {/* Open Raw PDF in New Tab */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-gold-400/35 hover:border-gold-500 bg-white hover:bg-gold-50 text-stone-700 hover:text-stone-950 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Open vector PDF file in separate tab"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-700 shrink-0" />
              <span className="hidden md:inline">Open in Tab</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="p-2 sm:p-2.5 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-950 transition-colors shadow-xs cursor-pointer"
              aria-label="Close Resume Preview"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Modal Body: Instant, High-Resolution Document Canvas with Smooth Scrolling */}
        <div className="relative flex-1 w-full h-full bg-stone-200/60 overflow-y-auto overflow-x-auto p-3 sm:p-6 md:p-8 flex justify-center items-start">
          <div
            className="transition-transform duration-200 ease-out origin-top flex justify-center"
            style={{ width: `${zoomLevel}%`, maxWidth: zoomLevel === 100 ? '780px' : 'none' }}
          >
            <div className="w-full bg-white rounded-lg shadow-2xl ring-1 ring-stone-900/10 overflow-hidden">
              <picture>
                <source srcSet={previewImgUrl} type="image/webp" />
                <img
                  src={fallbackImgUrl}
                  alt="Bharath Lokesh Curriculum Vitae Preview"
                  width="1530"
                  height="1980"
                  loading="eager"
                  decoding="sync"
                  className="w-full h-auto object-contain block select-text"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="px-4 py-2.5 bg-white border-t border-gold-400/25 shrink-0 flex items-center justify-between text-[11px] text-stone-500 font-medium">
          <span>Viewing Page 1 of 1</span>
          <div className="flex items-center gap-2">
            <span>Interested in working together?</span>
            <a
              href={resumeUrl}
              download="Bharath_Resume.pdf"
              className="font-bold text-gold-700 hover:text-gold-900 underline"
            >
              Download PDF Version
            </a>
          </div>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
