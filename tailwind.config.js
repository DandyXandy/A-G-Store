/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ag-black': '#050505',
        'ag-card': '#0d0d0d',
        'ag-purple': '#8B5CF6',
        'ag-purple-glow': '#A855F7',
        'ag-gray': '#111111',
        'ag-border': 'rgba(255, 255, 255, 0.06)'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'], 
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'purple-neon': '0 0 25px rgba(139, 92, 246, 0.4)',
        'purple-soft': '0 0 50px rgba(139, 92, 246, 0.1)',
      }
    },
  },
  plugins: [],
}