import tpl from './index.tpl'

import Module from 'src/common/module'

import Router from 'tools/router'
import routers from 'configs/router'

import './index.less'

export default class Layout extends Module {

  constructor (querys) {
    super(tpl)
  }

  bindEvents () {
    Router.start(routers, document.getElementById('root-container'))
  }

  dispose () {
    super.dispose()
    console.log('layout dispose')
  }
}