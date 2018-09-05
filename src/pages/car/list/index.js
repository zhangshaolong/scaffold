import tpl from './index.tpl'

import Module from 'src/common/module'

export default class CarList extends Module {
  constructor (querys) {
    super(tpl)

    console.log('car list', querys)
  }

  update (querys) {
    console.log('list update', querys)
  }

  dispose () {
    console.log('car list dispose')
  }
}