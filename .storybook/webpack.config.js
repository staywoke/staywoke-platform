const path = require('path');

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: [/\.stories\.js$/, /index\.js$/],
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    include: [path.resolve(__dirname, '../src')],
    enforce: 'pre',
  });

  if (typeof defaultConfig.resolve !== 'undefined') {
    defaultConfig.resolve.alias['@'] = path.resolve(__dirname, '../src')
  }

  return defaultConfig;
};
