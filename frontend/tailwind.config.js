/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
          bg: '#0A0D14',
          card: '#121824',
          cardHover: '#182030',
          border: '#1E293B',
          primary: '#3B82F6',
          success: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
          purple: '#8B5CF6',
          textMuted: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(239, 68, 68, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
