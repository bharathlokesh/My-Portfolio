import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  Copy,
  Check,
  Phone,
  MapPin
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './Icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const placeholderEmail = 'bharathlokesh07@gmail.com';
  const phoneNumber = '+91 9611673039';
  const locationText = 'Tumkur, Karnataka, India';

  const handleCopyPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    // Simulate responsive transmission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(placeholderEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative pt-10 sm:pt-14 pb-6 sm:pb-8 overflow-hidden border-b border-gold-400/20">
      {/* Background golden radiance - GPU accelerated */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-gold-300/15 rounded-full blur-[65px] pointer-events-none -z-10 transform-gpu will-change-transform" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-amber-200/15 rounded-full blur-[55px] pointer-events-none -z-10 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-900 text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight">
            Let's Build Something New
          </h2>
          <p className="text-stone-700 mt-3 text-sm sm:text-base font-normal">
            Have an idea!, project or opportunity!? Let's connect.
          </p>
          <div className="mt-3 w-16 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Direct Connect & Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-xl font-display font-bold text-stone-900 mb-2">
                Open for Collaborations
              </h3>
              <p className="text-sm text-stone-700 mb-6 leading-relaxed font-normal">
                Currently exploring internship opportunities, research collaborations, and impactful AI/IoT engineering projects.
              </p>

              {/* Contact Channels (Details aligned under title) */}
              <div className="space-y-3.5 mb-6">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-50/50 transition-all shadow-xs group">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0 border border-gold-400/30 shadow-xs group-hover:scale-105 group-hover:text-gold-900 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-mono font-bold tracking-widest text-gold-900 uppercase">
                        EMAIL
                      </span>
                      <a
                        href={`mailto:${placeholderEmail}`}
                        className="block text-sm sm:text-base font-bold text-stone-900 hover:text-gold-700 truncate transition-colors"
                        title="Send email"
                      >
                        {placeholderEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="p-2 rounded-xl bg-white hover:bg-gold-500/15 text-stone-700 hover:text-gold-900 border border-gold-400/30 transition-all shadow-xs shrink-0 ml-2"
                    aria-label="Copy email address"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-50/50 transition-all shadow-xs group">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0 border border-gold-400/30 shadow-xs group-hover:scale-105 group-hover:text-gold-900 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-mono font-bold tracking-widest text-gold-900 uppercase">
                        PHONE
                      </span>
                      <a
                        href={`tel:${phoneNumber.replace(/[\s+]/g, '')}`}
                        className="block text-sm sm:text-base font-bold text-stone-900 hover:text-gold-700 truncate transition-colors"
                        title="Call phone number"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    type="button"
                    className="p-2 rounded-xl bg-white hover:bg-gold-500/15 text-stone-700 hover:text-gold-900 border border-gold-400/30 transition-all shadow-xs shrink-0 ml-2"
                    aria-label="Copy phone number"
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-gold-400/30 hover:border-gold-400 hover:bg-gold-50/50 transition-all shadow-xs group">
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0 border border-gold-400/30 shadow-xs group-hover:scale-105 group-hover:text-gold-900 transition-all">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-mono font-bold tracking-widest text-gold-900 uppercase">
                        LOCATION
                      </span>
                      <span className="block text-sm sm:text-base font-bold text-stone-900">
                        {locationText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Networks (GitHub, LinkedIn, Instagram, Email) */}
              <div className="pt-4 border-t border-gold-400/20">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/bharathlokesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white text-stone-800 hover:text-gold-700 border border-gold-400/40 hover:border-gold-500 transition-all shadow-xs hover:-translate-y-0.5"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/bharath-lokesh07/?isSelfProfile=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white text-stone-800 hover:text-gold-700 border border-gold-400/40 hover:border-gold-500 transition-all shadow-xs hover:-translate-y-0.5"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a
                    href="https://www.instagram.com/bhrrtth/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white text-stone-800 hover:text-gold-700 border border-gold-400/40 hover:border-gold-500 transition-all shadow-xs hover:-translate-y-0.5"
                    aria-label="Instagram Profile"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  <a
                    href={`mailto:${placeholderEmail}`}
                    className="p-2.5 rounded-xl bg-white text-stone-800 hover:text-gold-700 border border-gold-400/40 hover:border-gold-500 transition-all shadow-xs hover:-translate-y-0.5"
                    aria-label="Send direct email"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-xl font-display font-bold text-stone-900 mb-6">
                Send a Direct Message
              </h3>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-gold-500/15 border border-gold-400/40 text-center animate-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-800 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mb-1">
                    Message Transmitted Successfully!
                  </h4>
                  <p className="text-xs text-stone-700 max-w-sm mx-auto font-normal">
                    Thank you for reaching out. Bharath Lokesh will review your message and connect back promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-bold text-stone-800 uppercase tracking-wider mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" Your Good Name"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gold-400/40 text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-bold text-stone-800 uppercase tracking-wider mb-2"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your E-Mail ID"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gold-400/40 text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono font-bold text-stone-800 uppercase tracking-wider mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your project details, inquiry, or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gold-400/40 text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all text-sm resize-none shadow-xs"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-stone-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 hover:from-gold-400 hover:to-amber-500 shadow-lg shadow-gold-600/20 transition-all duration-300 disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-stone-950" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
