const merge = require('webpack-merge')
const prodEnv = (process.env.APP_MODE === 'widget')
  ? require('./prod-widget.env')
  : require('./prod-website.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
