const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
  plugins: [].concat(utils.htmlPlugin())
})