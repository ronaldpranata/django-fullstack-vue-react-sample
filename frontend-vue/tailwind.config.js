/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#42b883', // Vue Green
          dark: '#33a06f'
        },
        surface: '#1e1e1e',
        background: '#121212',
      }
    },
  },
  plugins: [],
}
