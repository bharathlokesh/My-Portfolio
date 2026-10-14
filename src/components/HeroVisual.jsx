import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import robotImg from '../assets/robot_transparent.png';

const GREETING_TEXT = "Hello! I am AURA, Bharath's AI companion. Welcome to his portfolio! Feel free to explore his projects in Machine Learning, Computer Vision, and IoT systems.";

export default function HeroVisual() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  const typingTimerRef = useRef(null);

  // Text-to-speech handler
  const handleVoiceWish = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported by your browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setShowSpeechBubble(false);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      return;
    }

    window.speechSynthesis.cancel();
    setShowSpeechBubble(true);
    setDisplayedText('');

    // Typewriter effect while speaking
    let index = 0;
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    typingTimerRef.current = setInterval(() => {
      index++;
      setDisplayedText(GREETING_TEXT.slice(0, index));
      if (index >= GREETING_TEXT.length) {
        clearInterval(typingTimerRef.current);
      }
    }, 28);

    const utterance = new SpeechSynthesisUtterance(GREETING_TEXT);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = 0.98;
    utterance.pitch = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => setShowSpeechBubble(false), 3000);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setShowSpeechBubble(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Clean up timer and voice speech on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[420px] select-none mx-auto flex flex-col items-center justify-center">

      {/* Ambient background golden radiance - hardware accelerated */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] bg-gradient-radial from-gold-400/25 via-amber-300/15 to-transparent rounded-full blur-3xl -z-10 pointer-events-none transform-gpu will-change-transform" />

      {/* Robot Stage - Zero White Background, Pure Webpage Visibility */}
      <div 
        onClick={handleVoiceWish}
        className="relative group cursor-pointer flex flex-col items-center justify-center transition-transform duration-500 hover:scale-[1.02]"
        title="Click to interact with AURA"
      >
        {/* Floating Voice Toggle Button - Sleek, minimal floating action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVoiceWish();
          }}
          type="button"
          className={`absolute top-2 right-2 sm:right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border ${
            isSpeaking
              ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse shadow-emerald-500/30 ring-2 ring-emerald-400/40 scale-105'
              : 'bg-white/80 hover:bg-gold-100 text-stone-900 border-gold-400/40 backdrop-blur-md hover:scale-110 active:scale-95'
          }`}
          title={isSpeaking ? "Mute Voice Greeting" : "Play Voice Greeting"}
          aria-label={isSpeaking ? "Mute Voice Greeting" : "Play Voice Greeting"}
        >
          {isSpeaking ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-gold-800" />
          )}
        </button>

        {/* Dynamic Floating Speech Bubble when Speaking */}
        {showSpeechBubble && (
          <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-gold-400/40 shadow-xl shadow-gold-500/15 z-30 transition-all duration-300 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gold-400/20">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-gold-700">
                <Sparkles className="w-3 h-3 text-gold-500" />
                AURA Speaking...
              </span>
              {/* Audio Equalizer Bars */}
              <div className="flex items-center gap-1">
                {[4, 10, 6, 12, 5, 11, 7].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emerald-500 rounded-full animate-bounce"
                    style={{
                      height: `${h}px`,
                      animationDuration: `${0.35 + (i % 3) * 0.15}s`
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-800 leading-relaxed font-normal">
              {displayedText}
              {isSpeaking && <span className="inline-block w-1.5 h-3 bg-gold-500 ml-1 animate-pulse" />}
            </p>
          </div>
        )}

        {/* The Transparent Isolated Robot Image - Floating seamlessly on page */}
        <div className="relative animate-float transform-gpu will-change-transform">
          <img
            src={robotImg}
            alt="AI Companion Robot AURA welcoming visitors"
            width="409"
            height="974"
            loading="eager"
            decoding="async"
            className="w-auto h-[380px] sm:h-[440px] md:h-[480px] max-w-full object-contain select-none filter drop-shadow-[0_12px_24px_rgba(212,164,68,0.18)]"
            draggable="false"
          />
        </div>

        {/* Grounding Contact Shadow */}
        <div className="w-40 sm:w-48 h-3.5 bg-stone-900/15 rounded-[100%] blur-sm -mt-2 pointer-events-none transform-gpu" />

        {/* Subtle Interactive Hint */}
        <span className="mt-2 text-[10px] font-mono text-stone-600 tracking-wide opacity-75 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-gold-500" />
          Tap robot to hear greeting
        </span>
      </div>

    </div>
  );
}
