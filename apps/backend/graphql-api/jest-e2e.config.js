module.exports = {
  displayName: 'backend-graphql-api-e2e',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.e2e.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/backend/graphql-api-e2e',
  testMatch: ['**/+(*.)+(e2e-spec|test).+(ts|js)?(x)'],
};
