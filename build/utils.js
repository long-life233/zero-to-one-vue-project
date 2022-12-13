const fs = require('fs')
const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const ENTRY_PATH = path.resolve(__dirname, '../entries')

exports.entries = function() {
  const entryFiles = glob.sync(ENTRY_PATH + '/*/*.js')
  const map = {}
  entryFiles.forEach(filePath => {
    const filename = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.js)$/, (rs, $1) => $1)
    // { entry1: /webpack-demo/entries/entry1/main.js }
    map[filename] = filePath
  })
  return map
}


/**
[
  {
    template: "/multi-entry-vue/entries/entry1/index.html",
    chunks: ['manifest', 'vendor', 'entry1'],
    filename: "entry1.html",
    chunksSortMode: 'dependency'
  },
  { ... }   // 下一个入口的配置
]
*/
exports.htmlPlugin = function() {
  let entryHtml = glob.sync(ENTRY_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach(filePath => {
    let filename = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.js)$/, (rs, $1) => $1)
    let conf = {
      template: filePath,
      filename: filename + '.html',
      chunks: [filename],
      inject: true
    }

    // production 生产模式下配置
    // if (process.env.NODE_ENV === 'production') {
    //   conf = merge(conf, {
    //     chunks: ['manifest', 'vendor'],
    //     minify: {
    //       removeComments: true,
    //       collapseWhitespace: true,
    //       removeAttributeQuotes: true
    //     },
    //     chunksSortMode: 'dependency'
    //   })
    // }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}