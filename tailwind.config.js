/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        riga: {
          bg: '#0A0D14',
          surface: '#121722',
          card: '#1A2130',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#10B981', // emerald glow
          accentHover: '#059669',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          blue: '#3B82F6',
          latvia: '#9E2A2B' // Traditional Latvian Red accent
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
