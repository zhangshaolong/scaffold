const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const config = require('../configs/server')

const buildPath = path.resolve(__dirname, config.buildPath)

module.exports = (isProt) => {

  return {
    buildPath: buildPath,
    mergeConfig: function (config) {
      for (let key in config) {
        let val = this.configs[key]
        if (Array.isArray(val)) {
          this.configs[key] = this.configs[key].concat(config[key])
        } else {
          this.configs[key] = config[key]
        }
      }
      return this.configs
    },
    configs: {
      entry: {
        main: path.resolve(__dirname, '../../src/index.js')
      },
      output: {
        path: buildPath,
        filename: isProt ? '[name].[hash:8].bundle.js' : '[name].bundle.js',
        chunkFilename: isProt ? '[name]-[id].[hash:8].bundle.js' : '[name]-[id].bundle.js'
      },
      resolve: {
        alias: {
          src: path.resolve(__dirname, '../../src'),
          cmodule: '@zhangshaolongjj/c-module'
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.(?:c|le)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  minimize: isProt
                }
              },
              'less-loader'
            ]
          },
          {
            test: /\.tpl$/,
            exclude: /node_modules/,
            use: {
              loader: 'simplite-loader'
            }
          },
          {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
            use: 'url-loader?limit=100000&name=[name].[ext]'
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: 'head',
          hash: false,
          chunksSortMode: 'dependency',
          template: path.resolve(__dirname, '../../src/index.html'),
          favicon: path.resolve(__dirname, '../../favicon.ico'),
          minify: isProt ? {
            collapseInlineTagWhitespace: true,
            removeComments: true,
            collapseWhitespace: true,
            removeTagWhitespace: true
          } : false
        }),
        new MiniCssExtractPlugin({
          filename: isProt ? '[name]-[hash].css' : '[name].css',
          disable: !isProt,
          allChunks: true
        }),
        new webpack.ProvidePlugin({
          '$': 'jquery',
          'jQuery': 'jquery',
          'window.jQuery': 'jquery',
          'window.$': 'jquery'
        })
      ]
    }
  }
}
