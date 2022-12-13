const utils = require('./utils')
const path = require('path');

module.exports = {
  entry: utils.entries(),   // 使用函数生成 entry 配置
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
    publicPath: '/', // 静态资源公共路径
  }
}