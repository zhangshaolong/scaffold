const mockProxyMiddleware = require('mock-proxy-middleware')
const common = require('./webpack.common.js')(false)
const mocks = require('./mock-proxy-config')
const commander = require('child_process')
const config = require('./config')

// 可以通过下边的命令行修改本地server的端口
// npm start --port xxxx
let port = config.devPort
const args = process.argv
if (args.length) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port') {
      port = args[i + 1] || port
    }
  }
}

const publicPath = config.publicPath
const webpackConfig = {
  mode: 'development',
  cache: true,
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    contentBase: config.buildPath,
    host: '0.0.0.0',
    port: port,
    publicPath: publicPath,
    // public: 'localhost:' + port + publicPath,
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
  plugins: []
}

module.exports = common.mergeConfig(webpackConfig)
