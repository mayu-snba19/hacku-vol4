import { fontFamily } from 'tailwindcss/defaultTheme'
export const purge = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
]
export const darkMode = false
export const theme = {
  extend: {
    colors: {
      brand: {
        100: '#B3CAD7',
        300: '#97B1C0',
        400: '#7499A9',
        600: '#4e7281',
        700: '#3e6272',
      },
      accent: {
        100: '#ECD8D5',
        400: '#F57E6B',
        700: '#EC563E',
      },
      text: '#FDF5E6',
    },
    fontFamily: {
      sans: ["'M PLUS Rounded 1c'", 'Noto Sans JP', ...fontFamily.sans],
      pop: ['Yusei Magic'],
    },
  },
}
export const variants = {
  extend: {},
}
export const plugins = [
  ({ addUtilities }) => {
    const extendUnderline = {
      '.underline': {
        textDecoration: 'underline #F57E6B 4px',
      },
    }
    addUtilities(extendUnderline)
  },
]
