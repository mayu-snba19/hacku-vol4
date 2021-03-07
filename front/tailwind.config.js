module.exports = {
  // tailwindを使用するファイルを指定
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
        text: '#FDF5E6',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
