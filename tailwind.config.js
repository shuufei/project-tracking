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
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
