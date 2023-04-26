/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  safeList: [
    'bg-blue-400',
    'bg-green-400',
    'bg-red-400'
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [
    // require('postcss-import'),
    // require('tailwindcss'),
    // require('autoprefixer'),
  ],
}

