/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: {
        1: '#002900',
        2: '#012f00',
        3: '#003a00',
        4: '#004200',
        5: '#004900',
        6: '#005300',
        7: '#146200',
        8: '#337c00',
        9: '#458b00',
        10: '#549700',
        11: '#00dc00',
        12: '#d2fbcd',
      },
      secondary: {
        1: '#142223',
        2: '#1b292a',
        3: '#1d3336',
        4: '#233a3c',
        5: '#2a4043',
        6: '#32494c',
        7: '#3f5659',
        8: '#556d70',
        9: '#ebfdff',
        10: '#e2f4f6',
        11: '#a2bcbf',
        12: '#e0f2f4',
      },

      white: '#FCF7F8',
      black: '#1F1F1F',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
