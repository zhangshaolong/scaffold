module.exports = [
  {
    rules: ['^/mock-api/'],
    mockConfig: {
      path: 'mock',
      ext: '.js'
    }
  },
  {
    rules: ['^/local-proxy-api/'],
    proxyConfig: {
      host: 'localhost',
      port: 8890,
      // isHttps: true,
      // timeout: 30000,
      excludes: [
        '^/local-proxy-api/exclude'
      ],
      redirect: (path) => {
        return '/audit-api/material/audit'
      }
    },
    mockConfig: {
      path: 'mock',
      ext: '.js'
    }
  },
  {
    rules: ['/middle-api/'],
    mockConfig: {
      path: 'mock',
      ext: '.js'
    }
  },
  {
    rules: ['^/api_v2/'],
    proxyConfig: {
      host: 'slardar.bytedance.net',
      port: 443,
      isHttps: true,
      timeout: 30000,
      excludes: {},
      headers: {
        cookie: ''
      }
    },
    mockConfig: {
      path: 'mock',
      ext: '.js'
    }
  }
]