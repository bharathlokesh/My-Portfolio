import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose, resumeUrl }) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 bg-stone-950/85 backdrop-blur-lg animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[920px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gold-400/50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-warmwhite-100 via-white to-warmwhite-100 border-b border-gold-400/30 shrink-0 gap-3 shadow-xs">
          
          {/* Left: Document Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400/25 to-amber-500/15 border border-gold-400/40 flex items-center justify-center text-gold-800 shrink-0 shadow-xs">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  id="resume-modal-title"
                  className="text-sm sm:text-base font-bold text-stone-900 truncate"
                >
                  Bharath Lokesh — Resume / CV
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium truncate">
                AI & ML Developer • Preview before downloading
              </p>
            </div>
          </div>

          {/* Right: Actions (Download + Open in Tab + Close) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Primary Action: Download Resume */}
            <a
              href={resumeUrl}
              download="Bharath_Resume.pdf"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 hover:from-gold-400 hover:to-amber-500 shadow-sm shadow-gold-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Download PDF file to your device"
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              <span className="hidden xs:inline sm:inline">Download Resume</span>
              <span className="inline xs:hidden sm:hidden">Download</span>
            </a>

            {/* Open Full PDF in New Tab */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-gold-400/35 hover:border-gold-500 bg-white hover:bg-gold-50 text-stone-700 hover:text-stone-950 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Open full PDF viewer in a separate browser tab"
            >
              <ExternalLink className="w-4 h-4 text-gold-700 shrink-0" />
              <span className="hidden md:inline">Open in Tab</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-950 transition-colors shadow-xs cursor-pointer"
              aria-label="Close Resume Preview"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded PDF Canvas */}
        <div className="relative flex-1 w-full h-full bg-stone-100/90 overflow-hidden">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            title="Bharath Lokesh Resume Document"
            className="w-full h-full border-0 select-auto"
          />

          {/* Floating Mobile Prompt */}
          <div className="sm:hidden absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-400/40 shadow-xl text-xs text-stone-700 flex items-center justify-between gap-2">
            <span>Having trouble previewing on mobile?</span>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gold-700 underline shrink-0"
            >
              Open Fullscreen
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
