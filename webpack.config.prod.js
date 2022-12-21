// nodejs 内置模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // 相对 entry 的根目录
  context: path.resolve(__dirname, ''),
  // 指定入口文件
  entry: './src/main.js',
  // 指定打包后的输出目录
  output: {
    // 指定打包后的文件名。相对的是 output.path。只能是相对路径
    filename: './js/main.js',
    // 指定打包后的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包时先清空输出目录下的文件
    clean: true,
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ],
  },
  plugins: [
    // 使用插件
    new HtmlWebpackPlugin({
      // 文档上说，可以是相对路径或者绝对路径
      template: './public/index.html'
    }),
    new ESLintPlugin({
      context: path.resolve(__dirname, ''),
      extensions: ['js', 'jsx'],
      exclude: ['node_modules', 'dist'],
      fix: true
    })
  ],
  mode: 'production'
}