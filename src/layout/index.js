import { Module, Router } from 'cmodule'

import routers from '../../router'

import './index.less'

export default class Layout extends Module {

  inited () {
    Router.start(routers, document.getElementById('root-container'))
  }

  dispose () {
    super.dispose()
    console.log('layout dispose')
  }
}