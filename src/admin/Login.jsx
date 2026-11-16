import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Shield, Eye, EyeOff, ArrowLeft, KeyRound, AlertCircle, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both Login ID and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);

      if (result.success) {
        navigate('/admin', { replace: true });
      } else {
        setError(result.message);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-warmwhite-200 text-stone-900 flex flex-col justify-center items-center px-4 relative selection:bg-gold-500/20 selection:text-gold-900">

      {/* Background Subtle Gold Grid Overlay - GPU isolated */}
      <div className="fixed inset-0 tech-grid-pattern opacity-40 pointer-events-none z-0 transform-gpu will-change-transform" />

      {/* Background Ambient Gold Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-radial from-gold-300/20 via-amber-200/5 to-transparent blur-[80px] pointer-events-none z-0" />

      {/* Return to Portfolio Link */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-700 hover:text-stone-950 transition-colors py-2 px-4 rounded-full border border-gold-400/30 hover:border-gold-500 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-gold-600" />
        <span>Return to Portfolio</span>
      </Link>

      {/* Main Login Card - Light Gold & White Luxury Glass */}
      <div className="w-full max-w-md bg-white/95 border border-gold-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-gold-900/10 relative overflow-hidden backdrop-blur-xl z-10">

        {/* Ambient Top Border Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-400/40 flex items-center justify-center text-gold-700 mb-4 shadow-sm">
            <Shield className="w-7 h-7 stroke-[1.8]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-[10px] font-mono tracking-widest uppercase text-gold-900 font-bold mb-2">
            <Lock className="w-3 h-3 text-gold-700" />
            <span>Authenticated Admin Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-stone-900">
            Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Management portal for Bharath Lokesh Portfolio
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in zoom-in-95">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold mb-2">
              Login ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Login ID"
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all font-mono shadow-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-gold-900 font-bold">
                Password
              </label>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-warmwhite-50 border border-gold-400/35 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all font-mono shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl btn-gold text-stone-950 font-bold text-sm tracking-wide shadow-md shadow-gold-500/20 hover:shadow-gold-500/30 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-stone-950" />
                <span>Enter Admin Console</span>
              </>
            )}
          </button>
        </form>

        {/* Credentials Helper Pill */}
        <div className="mt-6 pt-5 border-t border-gold-400/20 text-center">
          <div className="inline-block p-2.5 rounded-xl bg-gold-50/80 border border-gold-400/30 text-[11px] font-mono text-stone-600">
            <span className="text-stone-500">Default Login ID: </span>
            <span className="text-gold-900 font-bold">bharathlokesh07@gmail.com</span>
            <span className="text-stone-400"> / </span>
            <span className="text-gold-900 font-bold">bharath2026</span>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <p className="mt-8 text-stone-500 text-[11px] font-mono z-10">
        Bharath Lokesh Portfolio Management • Secure Admin System
      </p>

    </div>
  );
}
