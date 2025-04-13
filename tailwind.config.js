/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      animation: {
        slide: 'slide linear infinite',
      },
    },
    colors: {
      primary: {
        1: '#002900',
        2: '#012f00',
        3: '#003a00',
        4: '#004200',
        5: '#004a00',
        6: '#005300',
        7: '#006200',
        8: '#007e00',
        9: '#008d00',
        10: '#009b00',
        11: '#00dc00',
        12: '#d2fbcd',
      },
      secondary: {
        1: '#1f1f1f',
        2: '#262626',
        3: '#2f2f2f',
        4: '#353535',
        5: '#3b3b3b',
        6: '#434343',
        7: '#505050',
        8: '#666',
        9: '#efefef',
        10: '#e6e6e6',
        11: '#b6b6b6',
        12: '#eee',
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
