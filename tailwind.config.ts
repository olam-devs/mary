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
          DEFAULT: '#F47B25',
          50: '#FFF4EC',
          100: '#FFE4CE',
          200: '#FFC79A',
          300: '#FFAA66',
          400: '#F9954A',
          500: '#F47B25',
          600: '#D9611A',
          700: '#B04C14',
          800: '#87390F',
          900: '#5A250A',
        },
        earth: {
          DEFAULT: '#2B1D14',
          50: '#F4EEE9',
          100: '#DEC1B1',
          200: '#B99880',
          300: '#8F6E58',
          400: '#644939',
          500: '#4A342A',
          600: '#3A2721',
          700: '#2B1D14',
          800: '#1B110B',
          900: '#120B07',
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
