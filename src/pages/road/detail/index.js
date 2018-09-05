import tpl from './index.tpl'

import Module from 'src/common/module'

export default class RoadDetail extends Module {
  constructor (querys) {
    super(tpl)

    console.log('road detail', querys)
  }

  update (querys) {
    console.log('RoadDetail update', querys)
  }

  bindEvents () {
    this.container.addEventListener('click', (e) => {
      console.log('click', e.target)
    }, false)
  }

  dispose () {
    console.log('RoadDetail dispose')
  }
}