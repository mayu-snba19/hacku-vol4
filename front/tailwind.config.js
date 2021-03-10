module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
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
          300: '#fa9a8c',
          400: '#F57E6B',
          700: '#EC563E',
        },
        text: '#FDF5E6',
      },
      fontFamily: {
        sans: ["'M PLUS Rounded 1c'", 'Noto Sans JP'],
        pop: ['Yusei Magic'],
      },
      spacing: {
        iost: 'env(safe-area-inset-top)',
        iosb: 'env(safe-area-inset-bottom)',
        iosl: 'env(safe-area-inset-left)',
        iosr: 'env(safe-area-inset-right)',
      },
      boxShadow: {
        up: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      scale: ['active'],
      ringWidth: ['focus-visible'],
      outline: ['focus-visible'],
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const extendUnderline = {
        '.underline': {
          textDecoration: 'underline #F57E6B 4px',
          textDecorationThickness: '4px',
          '-webkit-text-decoration-line': 'underline',
          '-webkit-text-decoration-color': '#F57E6B',
          '-webkit-text-decoration-thickness': '4px',
        },
        '.link': {
          textDecoration: 'underline #3B82F6',
          '-webkit-text-decoration-line': 'underline',
          '-webkit-text-decoration-color': '#F57E6B',
          '-webkit-text-decoration': 'underline #F57E6B 4px',
          color: '#3B82F6',
        },
      }
      addUtilities(extendUnderline)
    },
  ],
}
