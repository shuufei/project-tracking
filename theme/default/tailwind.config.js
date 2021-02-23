module.exports = {
  prefix: '',
  purge: {
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        default: 'var(--bison-primary-default)',
        light1: 'var(--bison-primary-light1)',
        light2: 'var(--bison-primary-light2)',
        light3: 'var(--bison-primary-light3)',
        light4: 'var(--bison-primary-light4)',
      },
      success: {
        default: 'var(--bison-success-default)',
        light1: 'var(--bison-success-light1)',
        light2: 'var(--bison-success-light2)',
        light3: 'var(--bison-success-light3)',
      },
      warn: {
        default: 'var(--bison-warn-default)',
        light1: 'var(--bison-warn-light1)',
        light2: 'var(--bison-warn-light2)',
        light3: 'var(--bison-warn-light3)',
      },
      black: {
        default: 'var(--bison-black-default)',
        light1: 'var(--bison-black-light1)',
        light2: 'var(--bison-black-light2)',
        light3: 'var(--bison-black-light3)',
        light4: 'var(--bison-black-light4)',
      },
      white: 'var(--bison-white)',
    },
    fontFamily: {
      sans: 'var(--bison-font-family-sans)',
    },
    fontSize: {
      l4: 'var(--bison-font-size-l4)',
      l3: 'var(--bison-font-size-l3)',
      l2: 'var(--bison-font-size-l2)',
      l1: 'var(--bison-font-size-l1)',
      base: 'var(--bison-font-size-base)',
      s1: 'var(--bison-font-size-s1)',
      s2: 'var(--bison-font-size-s2)',
      s3: 'var(--bison-font-size-s3)',
      s4: 'var(--bison-font-size-s4)',
      s5: 'var(--bison-font-size-s5)',
    },
    fontWeight: {
      light: 'var(--bison-font-weight-light)',
      medium: 'var(--bison-font-weight-medium)',
    },
    boxShadow: {
      s: 'var(--bison-box-shadow-s)',
      m: 'var(--bison-box-shadow-m)',
      l: 'var(--bison-box-shadow-l)',
      outline_primary: 'var(--bison-box-shadow-outline-primary)',
      outline_success: 'var(--bison-box-shadow-outline-success)',
      outline_warn: 'var(--bison-box-shadow-outline-warn)',
      outline_black: 'var(--bison-box-shadow-outline-black)',
    },
    outline: {
      none: ['none'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
