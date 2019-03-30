import 'webpack-jquery-ui'
import Simplite from 'simplite'
import { configService } from 'src/common/utils'

import { setLoader, Module, Router } from 'cmodule'

import 'webpack-jquery-ui/css'
import './index.less'

Simplite.dataKey = 'data'

Simplite.addFilter('aaa', (data) => {
  return data + 'eeeeee'
})

// config c module base path
// only load index.js as asynchronous module
const loader = (path) => {
  if (path) {
    path += '/'
  }
  return [
    import(`src/layout/${path}index.js`),
    import(`src/layout/${path}index.tpl`)
  ]
}

setLoader(loader)

configService({})