const webpack = require('webpack')
const common = require('./webpack.common.js')(true)
const Uglify = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const config = {
  mode: 'production',
  optimization: {
    minimizer: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new Uglify({
        parallel: true,
        cache: true,
        exclude: /node_modules/,
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = common.mergeConfig(config)