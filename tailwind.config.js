/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e4ccaa',
          DEFAULT: '#d4b48c',
          dark: '#c4a06c',
        },
        dark: {
          100: '#2a3642',
          200: '#1C242C',
          300: '#161e24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
};