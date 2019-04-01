import { Module } from 'cmodule'

import './index.less'

export default class Home extends Module {

  constructor () {
    super()
    console.log('home constructor')
    this.data = {
      location: 'home'
    }
  }
}