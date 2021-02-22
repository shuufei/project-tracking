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
        default: '#137717',
        light1: '#50A753',
        light2: '#91CF94',
        light3: '#D9F6DA',
      },
      warn: {
        default: '#D81717',
        light1: '#E75959',
        light2: '#EA9090',
        light3: '#F6CFCF',
      },
      black: {
        default: '#101010',
        light1: '#3A3A3A',
        light2: '#707070',
        light3: '#A0A0A0',
        light4: '#CFCFCF',
      },
      white: '#ffffff',
    },
    fontFamily: {
      sans: ['Hiragino Sans', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      l4: 'calc(1rem * 8 / 4)',
      l3: 'calc(1rem * 8 / 5)',
      l2: 'calc(1rem * 8 / 6)',
      l1: 'calc(1rem * 8 / 7)',
      base: 'calc(1rem * 8 / 8)',
      s1: 'calc(1rem * 8 / 9)',
      s2: 'calc(1rem * 8 / 10)',
      s3: 'calc(1rem * 8 / 11)',
      s4: 'calc(1rem * 8 / 12)',
      s5: 'calc(1rem * 8 / 13)',
    },
    fontWeight: {
      light: '300',
      medium: '500',
    },
    boxShadow: {
      s: '0px 1px 1px rgba(0, 0, 0, 0.12)',
      m: '0px 3px 6px rgba(0, 0, 0, 0.13)',
      l: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 3px 8px rgba(0, 0, 0, 0.12)',
      outline_primary: '0 0 0 1px #202020',
      outline_success: '0 0 0 1px #137717',
      outline_warn: '0 0 0 1px #D81717',
      outline_black: '0 0 0 1px #101010',
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
