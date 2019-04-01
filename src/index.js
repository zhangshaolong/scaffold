import 'webpack-jquery-ui'
import Simplite from 'simplite'
import { configService } from 'src/common/utils'

import { setLoader, Module, Router } from 'cmodule'
import store from 'src/common/store'

import 'webpack-jquery-ui/css'
import './index.less'

Simplite.dataKey = 'data'

Simplite.addFilter('aaa', (data) => {
  return data + 'eeeeee'
})

// config custom module base path
// only load index.js as asynchronous module
const loader = (path) => {
  if (path) {
    path += '/'
  }
  return [
    import(`src/layout/${path}index.js`),
    import(`src/layout/${path}index.tpl`),
    store,
    import('src/common/store')
  ]
}

setLoader(loader, {
  2: 'async-store',
  3: 'sycn-store' // add a plugin and auto attach to custom module instance
})

configService({})