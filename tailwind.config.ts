import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        app: '#0E0A1A',
        card: '#1A1428',
        'card-hover': '#221A38',
        primary: '#C084FC',
        'primary-dark': '#A855F7',
        gold: '#F59E0B',
        coral: '#F97316',
        'text-main': '#FAF8FF',
        'text-muted': '#9CA3AF',
        success: '#10B981',
        error: '#EF4444',
        border: 'rgba(192,132,252,0.15)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(192,132,252,0.2)',
        'glow-sm': '0 0 12px rgba(192,132,252,0.15)',
        'glow-gold': '0 0 16px rgba(245,158,11,0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'folio-gradient': 'linear-gradient(135deg, #C084FC 0%, #818CF8 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
export default config
