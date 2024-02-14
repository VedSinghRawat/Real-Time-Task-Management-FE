/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: {
        light: '#1665a2',
        normal: '#114d7b',
        medium: '#0c385a',
        dark: '#072236',
      },
      secondary: {
        light: '#33ffcf',
        normal: '#00ffc5',
        medium: '#00e0ac',
        dark: '#00b88d',
      },
      tertiary: {
        light: '#fff',
        normal: '#ece5f0',
        medium: '#d9cbe1',
        dark: '#c6b1d2',
      },

      white: '#FFF',
      black: '#000',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
