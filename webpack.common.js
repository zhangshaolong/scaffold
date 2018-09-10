const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const config = require('./config')

const buildPath = __dirname + config.buildPath

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
        main: __dirname + '/src/index.js'
      },
      output: {
        path: buildPath,
        filename: isProt ? '[name].[hash:8].bundle.js' : '[name].bundle.js',
        chunkFilename: isProt ? '[name]-[id].[hash:8].bundle.js' : '[name]-[id].bundle.js'
      },
      resolve: {
        alias: {
          src: path.join(__dirname, 'src'),
          configs: path.join(__dirname, 'src', 'configs'),
          pages: path.join(__dirname, 'src', 'pages'),
          tools: path.join(__dirname, 'src', 'tools')
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
                  minimize: isProt //css压缩
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
      node: {
        fs: 'empty'
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          hash: false,
          chunksSortMode: 'dependency',
          template: __dirname + '/src/index.html',
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
        })
      ]
    }
  }
}
