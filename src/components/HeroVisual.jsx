import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  X,
  GripHorizontal,
  Move
} from 'lucide-react';
import devImg from '../assets/developer_3d_transparent.png';

const GREETING_TEXT = "Hello! I am Bharath Lokesh. Welcome to my portfolio! Check out my work in Machine Learning, Computer Vision, and connected IoT systems. Dive in and Explore!";

export default function HeroVisual() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  // Draggable speech bubble state
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // Smooth typing stream refs
  const targetIndexRef = useRef(0);
  const smoothStreamTimerRef = useRef(null);
  const typingTimerRef = useRef(null);

  // Draggable Speech Bubble Handlers
  const handleDragStart = (e) => {
    // Prevent drag when clicking the dismiss button
    if (e.target.closest('button')) return;

    e.preventDefault();
    e.stopPropagation();

    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: bubblePos.x,
      initialY: bubblePos.y
    };

    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleDragMove = (e) => {
      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragStartRef.current.startX;
      const deltaY = clientY - dragStartRef.current.startY;

      setBubblePos({
        x: dragStartRef.current.initialX + deltaX,
        y: dragStartRef.current.initialY + deltaY
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

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
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (smoothStreamTimerRef.current) clearInterval(smoothStreamTimerRef.current);
      return;
    }

    window.speechSynthesis.cancel();
    setShowSpeechBubble(true);
    setDisplayedText('');
    targetIndexRef.current = 0;

    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    if (smoothStreamTimerRef.current) {
      clearInterval(smoothStreamTimerRef.current);
      smoothStreamTimerRef.current = null;
    }

    // Start continuous smooth typewriter ticker (interpolates characters smoothly & fluidly)
    smoothStreamTimerRef.current = setInterval(() => {
      setDisplayedText((prev) => {
        const target = targetIndexRef.current;
        if (prev.length < target) {
          // If falling behind more than 5 characters, advance by 2, otherwise smooth 1-by-1
          const step = target - prev.length > 5 ? 2 : 1;
          const nextLen = Math.min(target, prev.length + step);
          return GREETING_TEXT.slice(0, nextLen);
        }
        return prev;
      });
    }, 20); // 20ms per tick: silky smooth progressive typing appearance

    const utterance = new SpeechSynthesisUtterance(GREETING_TEXT);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v =>
      v.lang.startsWith('en') &&
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('David'))
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = 0.98;
    utterance.pitch = 1.05;

    // Track speech boundary to reveal words synchronized with speech
    let boundaryWorked = false;
    const words = GREETING_TEXT.split(' ');
    let wordIndex = 0;

    // Native Speech boundary handler: smoothly streams each spoken word
    utterance.onboundary = (event) => {
      boundaryWorked = true;
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      const charIndex = typeof event.charIndex === 'number' ? event.charIndex : 0;
      let endIndex = charIndex;
      // Advance to end of current word
      while (endIndex < GREETING_TEXT.length && !/\s/.test(GREETING_TEXT[endIndex])) {
        endIndex++;
      }
      // Include any attached punctuation
      while (endIndex < GREETING_TEXT.length && /[,.!?]/.test(GREETING_TEXT[endIndex])) {
        endIndex++;
      }
      targetIndexRef.current = endIndex;
    };

    // Word-by-word fallback matching normal human speech cadence (if onboundary is unsupported)
    const stepWord = () => {
      if (boundaryWorked) return;
      if (wordIndex < words.length) {
        wordIndex++;
        const currentTargetText = words.slice(0, wordIndex).join(' ');
        targetIndexRef.current = currentTargetText.length;

        const currentWord = words[wordIndex - 1];
        let delay = 330;
        if (/[.!?]$/.test(currentWord)) {
          delay = 550; // pause at sentence endings
        } else if (/[,]$/.test(currentWord)) {
          delay = 420; // pause at commas
        }
        typingTimerRef.current = setTimeout(stepWord, delay);
      }
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
      setTimeout(() => {
        if (!boundaryWorked && wordIndex === 0) {
          stepWord();
        }
      }, 150);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      targetIndexRef.current = GREETING_TEXT.length;
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      setTimeout(() => {
        setDisplayedText(GREETING_TEXT);
        if (smoothStreamTimerRef.current) {
          clearInterval(smoothStreamTimerRef.current);
          smoothStreamTimerRef.current = null;
        }
      }, 350);
      setTimeout(() => setShowSpeechBubble(false), 3500);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setShowSpeechBubble(false);
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      if (smoothStreamTimerRef.current) {
        clearInterval(smoothStreamTimerRef.current);
        smoothStreamTimerRef.current = null;
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleDismissBubble = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setShowSpeechBubble(false);
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    if (smoothStreamTimerRef.current) {
      clearInterval(smoothStreamTimerRef.current);
      smoothStreamTimerRef.current = null;
    }
  };

  // Clean up timer and voice speech on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      if (smoothStreamTimerRef.current) {
        clearInterval(smoothStreamTimerRef.current);
        smoothStreamTimerRef.current = null;
      }
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[430px] select-none mx-auto flex flex-col items-center justify-center">

      {/* Ambient background golden radiance - soft warm light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] bg-gradient-radial from-gold-400/20 via-amber-300/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none transform-gpu will-change-transform" />

      {/* Main Avatar Stage - Grounded, stable, calm presentation with zero floating */}
      <div
        onClick={handleVoiceWish}
        className="relative group cursor-pointer flex flex-col items-center justify-center w-full"
        title="Click to interact with Bharath's 3D avatar"
      >
        {/* Floating Voice Toggle Button - Positioned in the upper right corner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVoiceWish();
          }}
          type="button"
          className={`absolute top-2 right-2 sm:right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border ${isSpeaking
              ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse shadow-emerald-500/30 ring-2 ring-emerald-400/40 scale-105'
              : 'bg-white/85 hover:bg-gold-100 text-stone-900 border-gold-400/40 backdrop-blur-md hover:scale-105 active:scale-95 shadow-gold-500/10'
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

        {/* Dynamic & Draggable Speech Bubble - Shaped as Classic Comic Speech Balloon from Reference Image */}
        {showSpeechBubble && (
          <div
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `translate3d(${bubblePos.x}px, ${bubblePos.y}px, 0)`,
              touchAction: 'none'
            }}
            className={`w-[94%] sm:w-[330px] lg:w-[320px] xl:w-[340px] lg:absolute lg:top-4 lg:-left-20 xl:-left-28 z-50 px-5 pt-3.5 pb-4 rounded-[36px] sm:rounded-[42px] bg-white border-[2.5px] border-stone-900 shadow-2xl shadow-stone-900/15 transition-shadow duration-200 select-none my-2 lg:my-0 ${isDragging
                ? 'cursor-grabbing shadow-2xl scale-[1.02] ring-2 ring-gold-400/50'
                : 'cursor-grab hover:shadow-2xl'
              }`}
          >
            {/* Classic Comic Curved Speech Tail at Bottom-Left matching reference image */}
            <div className="absolute -bottom-[21px] left-9 sm:left-11 w-10 h-6 pointer-events-none">
              <svg viewBox="0 0 40 24" fill="none" className="w-full h-full overflow-visible">
                {/* White mask fill to seamlessly join the speech bubble body */}
                <path
                  d="M 10 -2 C 8 8, 3 16, 0 24 C 8 20, 24 14, 34 -2 Z"
                  fill="#ffffff"
                />
                {/* Left curved stroke */}
                <path
                  d="M 10 0 C 8 8, 3 16, 0 24"
                  stroke="#1c1917"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Right curved stroke */}
                <path
                  d="M 0 24 C 8 20, 24 14, 34 0"
                  stroke="#1c1917"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Header: Clean, minimalist, no divider lines */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1.5">
                <GripHorizontal className="w-3.5 h-3.5 text-stone-400 hover:text-stone-700 transition-colors shrink-0" />
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-900 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
                  Bharath
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Audio Equalizer Bars */}
                <div className="flex items-center gap-0.5">
                  {[4, 10, 6, 12, 5, 11, 7].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 sm:w-1 bg-emerald-500 rounded-full animate-bounce"
                      style={{
                        height: `${h}px`,
                        animationDuration: `${0.35 + (i % 3) * 0.15}s`
                      }}
                    />
                  ))}
                </div>
                {/* Dismiss Button */}
                <button
                  onClick={handleDismissBubble}
                  type="button"
                  className="p-1 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors ml-1 cursor-pointer"
                  title="Close dialogue"
                  aria-label="Close dialogue"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Spoken Dialogue Text with typewriter effect */}
            <p className="text-[12px] sm:text-xs text-stone-900 font-sans leading-relaxed font-medium pt-1 pb-1">
              {displayedText}
              {isSpeaking && <span className="inline-block w-1.5 h-3 bg-gold-600 ml-1 animate-pulse" />}
            </p>

            {/* Footer Drag Hint */}
            <div className="mt-1 flex items-center justify-center text-[9px] font-mono text-stone-400">
              <span className="flex items-center gap-1">
                <Move className="w-2.5 h-2.5 text-stone-500" />
                Drag to move
              </span>
            </div>
          </div>
        )}

        {/* Transparent Isolated 3D Character - Gently floats up only when cursor arrives */}
        <div className="relative transform-gpu transition-all duration-500 ease-out group-hover:-translate-y-1.5 will-change-transform">
          <img
            src={devImg}
            alt="Bharath Lokesh - 3D Developer Avatar"
            width="736"
            height="736"
            loading="eager"
            decoding="async"
            className="w-auto h-[350px] sm:h-[400px] md:h-[430px] max-w-full object-contain select-none filter drop-shadow-[0_10px_20px_rgba(212,164,68,0.15)] group-hover:drop-shadow-[0_16px_28px_rgba(212,164,68,0.24)] transition-all duration-500 ease-out"
            draggable="false"
          />
        </div>

        {/* Grounding Contact Shadow - Softens gently when cursor arrives */}
        <div className="w-48 sm:w-56 h-3 bg-stone-900/12 rounded-[100%] blur-sm -mt-1.5 pointer-events-none transform-gpu transition-all duration-500 ease-out group-hover:scale-95 group-hover:opacity-60" />

        {/* Subtle Interactive Hint */}
        <span className="mt-2.5 text-[10px] font-mono text-stone-600 tracking-wide opacity-75 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
          <Sparkles className="w-2.5 h-2.5 text-gold-500" />
          Tap avatar to hear voice greeting
        </span>
      </div>

    </div>
  );
}
