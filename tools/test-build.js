/*
 * run command line：node test.js
 *
**/

const express = require('express')
const mockProxyMiddleware = require('mock-proxy-middleware')
const mocks = require('./configs/mock-proxy')
const commander = require('child_process')
const path = require('path')
const config = require('./configs/server')
const buildPath = config.buildPath
const publicPath = config.publicPath
const app = express()
app.use(publicPath, express.static(path.resolve(__dirname, buildPath)))
for (let i = 0; i < mocks.length; i++) {
  app.use(mockProxyMiddleware(mocks[i]))
}
app.listen(config.testPort)

let cmd;
if (process.platform == 'wind32') {
  cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
} else if (process.platform == 'linux') {
  cmd = 'xdg-open';
} else if (process.platform == 'darwin') {
  cmd = 'open';
}
commander.exec(`${cmd} http://localhost:${config.testPort}${publicPath}/`)