import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('light');
    root.classList.remove('dark');
    // Clear any previously saved dark theme preference
    localStorage.removeItem('portfolio-theme-gold');
  }, []);

  return (
    <div className="min-h-screen bg-warmwhite-200 text-stone-900 relative selection:bg-gold-500/20 selection:text-gold-900">
      
      {/* Background Subtle Gold Grid Overlay - GPU isolated */}
      <div className="fixed inset-0 tech-grid-pattern opacity-40 pointer-events-none z-0 transform-gpu will-change-transform" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
