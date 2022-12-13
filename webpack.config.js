const path = require('path');
const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prodWebpackConfig = require('./build/webpack.prod.conf')

module.exports = merge(prodWebpackConfig, {
  context: path.resolve(__dirname,'./'), // entry 会将此目录作为根目录
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  mode: 'production'
})