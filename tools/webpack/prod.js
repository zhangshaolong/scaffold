const webpack = require('webpack')
const common = require('./common')(true)
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = {
  mode: 'production',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new OptimizeCSSAssetsPlugin()
  ]
}

module.exports = common.mergeConfig(config)