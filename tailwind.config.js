/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        charcoal: '#121212',
        glass: 'rgba(255, 255, 255, 0.05)',
        'glass-hover': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slow-zoom': 'slowZoom 20s linear infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        glint: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slow-zoom': 'slowZoom 20s linear infinite alternate',
        'scan': 'scan 4s linear infinite',
        'glint': 'glint 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
