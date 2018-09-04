const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildPath = path.resolve(__dirname, 'asset')

module.exports = {
  mode: 'development',
  entry: './src/index',
  output: {
    path: buildPath,
    filename: '[name].bundle.js',

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
          MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
      configs: path.join(__dirname, 'src', 'configs'),
      pages: path.join(__dirname, 'src', 'pages'),
      tools: path.join(__dirname, 'src', 'tools')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunksSortMode: 'dependency',
      template: __dirname + '/src/index.html',
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    })
  ]
}
