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
    
  }

  dispose () {
    super.dispose()
    console.log('RoadDetail dispose')
  }
}