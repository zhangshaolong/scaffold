import { Module } from 'cmodule'

import './index.less'

export default class Header extends Module {

  dispose () {
    super.dispose()
    console.log('header dispose')
  }
}