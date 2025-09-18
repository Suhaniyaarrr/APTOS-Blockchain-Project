/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#13274F',
        forest: '#355E3B',
        coral: '#FF7F50',
        greybg: '#F8F9FA',
        charcoal: '#495057'
      }
    }
  },
  plugins: []
}


