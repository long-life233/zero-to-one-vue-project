// nodejs 内置模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  // 相对 entry 的根目录
  context: path.resolve(__dirname, ''),
  // 指定入口文件
  entry: './src/main.js',
  // 指定打包后的输出目录
  output: {
    // 指定打包后的文件名。相对的是 output.path。只能是相对路径
    filename: './js/[name].[hash:8].js',
    // filename: './js/main.js',
    // 指定打包后的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包时先清空输出目录下的文件
    clean: true,
    publicPath: '',
    chunkFilename:'./js/[name].[hash:8].js',
    assetModuleFilename: 'static/media/[name].[hash:8].[ext]'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        ]
      }
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    // 代码分割配置
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
    }),
    new MiniCssExtractPlugin()
  ],
  mode: 'production'
}