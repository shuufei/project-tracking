const { addTailwindPlugin } = require('@ngneat/tailwind');
const tailwindConfig = require('./theme/default/tailwind.config.js');

module.exports = (config) => {
  addTailwindPlugin({
    webpackConfig: config,
    tailwindConfig,
    patchComponentsStyles: true,
  });
  return config;
};
