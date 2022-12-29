// nodejs 内置模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // 相对 entry 的根目录
  context: path.resolve(__dirname, ''),
  // 指定入口文件
  entry: './src/main.js',
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
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false
              }
            }
          }
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./src"),
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      }
    ]
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
      fix: true,
      cache: true
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
  ]
}