const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mockProxyMiddleware = require('mock-proxy-middleware')
const mocks = require('./mock-proxy-config')
const commander = require('child_process')

const buildPath = path.resolve(__dirname, 'asset')

const publicPath = ''//'/scaffold'

// 可以通过下边的命令行修改本地server的端口
// npm start -- --port 8010
let port = 8800
const args = process.argv
if (args.length) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port') {
      port = args[i + 1] || port
    }
  }
}

module.exports = {
  mode: 'development',
  entry: './src/index',
  output: {
    path: buildPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
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
      },
      {
        test: /\.tpl$/,
        exclude: /node_modules/,
        use: {
          loader: 'simplite-loader'
        }
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
  devServer: {
    disableHostCheck: true,
    contentBase: buildPath,
    host: '0.0.0.0',
    port: port,
    publicPath: publicPath,
    historyApiFallback: true,
    compress: true,
    clientLogLevel: 'none',
    watchOptions: {
      ignored: [/node_modules/, /mock/]
    },
    before: (app) => {
      for (let i = 0; i < mocks.length; i++) {
        app.use(mockProxyMiddleware(mocks[i]))
      }
    },
    after: () => {
      let cmd
      if (process.platform == 'wind32') {
        cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"'
      } else if (process.platform == 'linux') {
        cmd = 'xdg-open'
      } else if (process.platform == 'darwin') {
        cmd = 'open'
      }
      commander.exec(`${cmd} http://localhost:${port}${publicPath}/`)
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
