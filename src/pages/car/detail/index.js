import tpl from './index.tpl'

import Module from 'src/common/module'

export default class CarDetail extends Module {

  constructor (querys) {
    super(tpl)

    console.log('car detail', querys)
  }

  bindEvents () {
    this.container.addEventListener('click', (e) => {
      console.log('click', e.target)
    }, false)
  }

  update (querys) {
    console.log('detail update', querys)
  }

  dispose () {
    console.log('car detail dispose')
  }
}