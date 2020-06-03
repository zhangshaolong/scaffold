const mockProxyMiddleware = require('mock-proxy-middleware')
const common = require('./common')(false)
const mocks = require('../configs/mock-proxy')
const serverConfig = require('../configs/server')
const commander = require('child_process')

// 可以通过下边的命令行修改本地server的端口
// npm start --port 8880
let port = serverConfig.devPort
let isHttps = false // 本地服务是否开启https
const args = process.argv
if (args.length) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port') {
      port = args[i + 1] || port
    }
  }
}
const publicPath = serverConfig.publicPath
const config = {
  mode: 'development',
  cache: true,
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    contentBase: serverConfig.buildPath,
    host: '0.0.0.0',
    port: port,
    publicPath: publicPath,
    https: isHttps,
    // public: 'localhost:' + port + publicPath,
    historyApiFallback: true,
    compress: true,
    clientLogLevel: 'none',
    watchOptions: {
      ignored: [/\/node_modules\//, /\/mock\//]
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
      commander.exec(`${cmd} http${isHttps ? 's' : ''}://localhost:${port}${publicPath}/`)
    }
  }
}

module.exports = common.mergeConfig(config)
