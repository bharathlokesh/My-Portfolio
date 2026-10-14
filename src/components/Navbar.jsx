import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(item => item.href.substring(1));
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 20;
          setIsScrolled(prev => (prev !== isPast ? isPast : prev));

          const scrollPosition = window.scrollY + 140;
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el && scrollPosition >= el.offsetTop) {
              setActiveSection(prev => (prev !== sectionIds[i] ? sectionIds[i] : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'py-3 bg-white/85 backdrop-blur-xl border-b border-gold-400/25 shadow-md shadow-gold-900/5'
        : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="bharathlokesh - Home"
          >
            <div className="relative flex items-center justify-center w-11 h-11 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gold-400/60 group-hover:border-gold-400 transition-all duration-300 shadow-sm shadow-gold-500/20">
                <img
                  src={profileImg}
                  alt="Bharath Lokesh"
                  className="w-full h-full object-cover object-[center_28%] group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <span className="font-stylish font-bold tracking-tight text-base sm:text-lg text-stone-900 group-hover:text-gold-700 transition-colors">
              Bharath Lokesh
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 p-1.5 rounded-2xl bg-white/70 backdrop-blur-xl shadow-sm border border-gold-400/20">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 xl:px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-200 rounded-xl ${isActive
                    ? 'bg-stone-900 text-white font-bold shadow-md'
                    : 'text-stone-600 hover:text-stone-950 font-semibold hover:bg-gold-500/10'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Connect CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Contact Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 hover:from-gold-400 hover:to-amber-500 shadow-md shadow-gold-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-950" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg border border-gold-400/30 bg-white/80 text-stone-800 hover:text-gold-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-4 rounded-2xl glass-panel bg-white/95 border border-gold-400/30 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all ${isActive
                    ? 'bg-stone-900 text-white font-bold shadow-sm'
                    : 'text-stone-600 hover:bg-gold-500/10 hover:text-stone-950 font-semibold'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2 mt-2 border-t border-gold-400/20 flex gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center py-2.5 text-xs font-bold rounded-xl text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 shadow-sm"
              >
                Let's Connect
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
