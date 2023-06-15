/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: {
        900: '#000000',
        800: '#0A0A0A',
        700: '#141414',
        600: '#1F1F1F',
        500: '#292929',
        400: '#333333',
        300: '#3D3D3D',
      },
      secondary: {
        900: '#BBAEC2',
        800: '#C4B9CA',
        700: '#CEC5D3',
        600: '#D8D1DC',
        500: '#DFD9E2',
        400: '#EBE8ED',
        300: '#F5F4F6',
      },
      tertiary: {
        900: '#00A35C',
        800: '#00B868',
        700: '#00CC74',
        600: '#00E07F',
        500: '#0FFF95',
        400: '#33FFA7',
        300: '#47FFAF',
      },
    },
  },
  plugins: [],
}
