import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F7FA',
          50: '#FFFFFF',
          100: '#F5F7FA',
          200: '#E8ECF2',
          300: '#D0D8E6',
        },
        gold: {
          DEFAULT: '#FF5722',
          50: '#FFF3EF',
          100: '#FFE2D6',
          200: '#FFC3A8',
          300: '#FF9A72',
          400: '#FF6B35',
          500: '#FF5722',
          600: '#E04010',
          700: '#B8300A',
          800: '#8C2207',
          900: '#5A1504',
        },
        earth: {
          DEFAULT: '#1B2A4A',
          50: '#EEF1F8',
          100: '#D5DDEF',
          200: '#A8B9DE',
          300: '#708FC8',
          400: '#3D64AF',
          500: '#2A4A94',
          600: '#213A78',
          700: '#1B2A4A',
          800: '#111C33',
          900: '#090F1C',
        },
        forest: {
          DEFAULT: '#0D9488',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        sand: {
          DEFAULT: '#BAE6FD',
          100: '#F0F9FF',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-playfair)', 'ui-serif', 'Georgia'],
        display: ['var(--font-playfair)', 'ui-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom, rgba(27,42,74,0.25) 0%, rgba(27,42,74,0.55) 55%, rgba(27,42,74,0.90) 100%)',
        'card-gradient': 'linear-gradient(to top, rgba(27,42,74,0.92) 0%, rgba(27,42,74,0.35) 60%, transparent 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      letterSpacing: {
        'ultra': '0.25em',
        'luxury': '0.3em',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(27, 42, 74, 0.08)',
        'card-hover': '0 10px 40px rgba(27, 42, 74, 0.16)',
        'luxury': '0 20px 60px rgba(27, 42, 74, 0.14)',
        'glow': '0 0 30px rgba(255, 87, 34, 0.40)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [typography],
}

export default config
