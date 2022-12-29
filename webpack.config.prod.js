// nodejs 内置模块
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');


const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  output: {
    // 指定打包后的文件名。相对的是 output.path。只能是相对路径
    filename: './js/[name].[hash:8].js',
    // filename: './js/main.js',
    // 指定打包后的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包时先清空输出目录下的文件
    clean: true,
    publicPath: '',
    chunkFilename: './js/[name].[hash:8].js',
    assetModuleFilename: 'static/media/[name].[hash:8].[ext]'
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: 'production'
})
