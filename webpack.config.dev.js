const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base')
const { DefinePlugin } = require('webpack')

module.exports = merge(baseWebpackConfig, {
  devServer: {
    static: './public',
    hot: true,
    open: true
  },

  plugins: [
    new DefinePlugin(
      {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    })
  ],
  mode: 'development'
})