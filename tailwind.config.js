/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: {
        1: '#001d00',
        2: '#002300',
        3: '#002e00',
        4: '#003600',
        5: '#003f00',
        6: '#004a00',
        7: '#075a00',
        8: '#2d7500',
        9: '#3d8700',
        10: '#509400',
        11: '#00da00',
        12: '#d2fbcd',
      },
      secondary: {
        1: '#0d1619',
        2: '#101a1f',
        3: '#0f2b36',
        4: '#183742',
        5: '#24434f',
        6: '#31505d',
        7: '#41606d',
        8: '#52727f',
        9: '#d0e7f1',
        10: '#c6dde7',
        11: '#99bac9',
        12: '#cee5ef',
      },

      white: '#FCF7F8',
      black: '#141414',
      red: '#FF3333',
      green: '#4FBF26',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
