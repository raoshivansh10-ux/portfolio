/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'mobile': { max: '809.98px' },
        'md-tablet': { min: '810px', max: '1199.98px' },
      },
      colors: {
        background: '#13121A',
        surface: {
          50: '#13121A',
          100: '#1c1a26',
          200: '#262335',
          300: '#3F289D',
        },
        palette: {
          pink: '#F598F2',
          sky: '#38BDF8',
          emerald: '#10B981',
          lavender: '#B775BF',
          mint: '#6CD9BA',
          indigo: '#3F289D',
          blue: '#1E18D9',
          dark: '#13121A',
        },
        accent: {
          pink: '#F598F2',
          sky: '#38BDF8',
          emerald: '#10B981',
          purple: '#B775BF',
          cyan: '#6CD9BA',
          blue: '#1E18D9',
        },
        glass: {
          bg: 'rgba(19, 18, 26, 0.55)',
          border: 'rgba(245, 152, 242, 0.15)',
          hover: 'rgba(56, 189, 248, 0.18)',
          highlight: 'rgba(245, 152, 242, 0.25)',
        }
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Space Mono"', 'monospace'],
        anton: ['"Anton SC"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        heavy: '32px',
      },
      boxShadow: {
        'glow-pink': '0 0 35px -5px rgba(245, 152, 242, 0.45)',
        'glow-sky': '0 0 35px -5px rgba(56, 189, 248, 0.45)',
        'glow-[#F598F2]': '0 0 35px -5px rgba(245, 152, 242, 0.45)',
        'glow-purple': '0 0 35px -5px rgba(183, 117, 191, 0.4)',
        'glow-cyan': '0 0 35px -5px rgba(108, 217, 186, 0.4)',
        'glow-blue': '0 0 35px -5px rgba(30, 24, 217, 0.4)',
        'glow-indigo': '0 0 35px -5px rgba(63, 40, 157, 0.5)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
