/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f4ebd2',
          300: '#ebd7a8',
          400: '#dfbc74',
          500: '#d4a444',
          600: '#b8862d',
          700: '#946624',
          800: '#795123',
          900: '#644220',
          950: '#3a2410',
        },
        champagne: {
          50: '#fdfcf9',
          100: '#faf6ee',
          200: '#f4ebd8',
          300: '#ebd9ba',
          400: '#dec096',
          500: '#cca573',
          600: '#be8f5a',
        },
        warmwhite: {
          50: '#ffffff',
          100: '#fdfcf9',
          200: '#faf8f5',
          300: '#f5f2eb',
          400: '#eeeae1',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        stylish: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -4px rgba(212, 164, 68, 0.35)',
        'glow-gold-lg': '0 10px 40px -5px rgba(212, 164, 68, 0.28)',
        'glow-gold-sm': '0 0 15px 0 rgba(212, 164, 68, 0.25)',
        'gold-card': '0 10px 30px -10px rgba(184, 134, 45, 0.1), 0 4px 12px 0 rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spinReverse 25s linear infinite',
        'radar': 'radar 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tech-grid-gold': 'linear-gradient(to right, rgba(212, 164, 68, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 164, 68, 0.08) 1px, transparent 1px)',
        'gold-gradient': 'linear-gradient(135deg, #dfbc74 0%, #b8862d 50%, #d4a444 100%)',
        'gold-metallic': 'linear-gradient(135deg, #f6e5b8 0%, #d4a444 50%, #b8862d 100%)',
      }
    },
  },
  plugins: [],
}
