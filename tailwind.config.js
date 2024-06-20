/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: {
        1: '#5b5b5b',
        2: '#474747',
        3: '#323232',
        4: '#1e1e1e',
        5: '#0A0A0A',
      },
      secondary: {
        1: '#61ff47',
        2: '#39ff14',
        3: '#25f500',
        4: '#1fcc00',
        5: '#18a300',
      },
      tertiary: {
        1: '#70486b',
        2: '#573853',
        3: '#3E283B',
        4: '#251824',
        5: '#0c080c',
      },

      white: '#FFF',
      black: '#000',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
