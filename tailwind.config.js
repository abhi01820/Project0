/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070A12',
        surface: {
          DEFAULT: '#0D1322',
          light: '#131C31',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: '#19243E'
        },
        cyan: {
          DEFAULT: '#00E5FF',
          muted: 'rgba(0, 229, 255, 0.15)',
          glow: 'rgba(0, 229, 255, 0.4)'
        },
        violet: {
          DEFAULT: '#A855F7',
          muted: 'rgba(168, 85, 247, 0.15)',
          glow: 'rgba(168, 85, 247, 0.4)'
        },
        emerald: {
          DEFAULT: '#10B981',
          muted: 'rgba(16, 185, 129, 0.15)'
        },
        rose: {
          DEFAULT: '#F43F5E',
          muted: 'rgba(244, 63, 94, 0.15)'
        },
        amber: {
          DEFAULT: '#F59E0B',
          muted: 'rgba(245, 158, 11, 0.15)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-flow': 'glowFlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glowFlow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(0, 229, 255, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.75))' },
        }
      }
    },
  },
  plugins: [],
}
