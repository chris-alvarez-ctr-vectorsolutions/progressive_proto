/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0B0B0C',
          900: '#111113',
          800: '#1A1A1D',
          700: '#26262B',
          500: '#5A5A63',
        },
        bone: '#F2EEE5',
        sulfur: '#D8FF3D',
      },
    },
  },
  plugins: [],
}
