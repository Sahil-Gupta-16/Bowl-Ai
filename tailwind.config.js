// Tailwind CSS configuration - Dark sports tech theme
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#34d399',
          500: '#2d9d68',
          600: '#10b981',
          700: '#059669',
        },
        secondary: {
          500: '#ff8216',
          600: '#ea580c',
        },
        accent: {
          500: '#a855f7',
          600: '#9333ea',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
