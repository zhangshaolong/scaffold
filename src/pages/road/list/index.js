import tpl from './index.tpl'
import Module from 'src/common/module'

export default class RoadList extends Module {
  constructor (querys) {
    super(tpl)

    console.log('road list', querys)
  }

  update (querys) {
    console.log('RoadList update', querys)
  }

  dispose () {
    console.log('RoadList dispose')
  }
}