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
          DEFAULT: '#61dafb', // React Cyan
          dark: '#4fa8c7'
        },
        surface: '#1e1e1e',
        background: '#121212',
      }
    },
  },
  plugins: [],
}
