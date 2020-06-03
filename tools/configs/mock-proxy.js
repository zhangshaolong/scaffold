module.exports = [
  {
    type: 'prefix',
    rules: ['/car/', '/audit-api/'],
    proxyConfig: {
      // host: 'localhost',
      // port: 8890,
      // isHttps: true,
      // timeout: 30000,
      // ignorePaths: {}
    },
    mockConfig: {
      path: 'mock',
      ext: '.js'
    }
  }
]