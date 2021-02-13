module.exports = {
  prefix: '',
  purge: {
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        default: '#202020',
        light1: '#717171',
        light2: '#C0C0C0',
        light3: '#EAEAEA',
        light4: 'FAFAFA',
      },
      success: {
        default: '#74C558',
      },
      warn: {
        default: '#D81717',
      },
      black: {
        default: '#101010',
        light1: '#3A3A3A',
        light2: '#707070',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
