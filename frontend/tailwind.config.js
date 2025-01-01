/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,jsx,js}'],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['orbitron', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

