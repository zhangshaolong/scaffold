import { Module, Router } from 'cmodule'

export default class RoadList extends Module {
  constructor () {
    super()
    console.log('road list constructor', Router.querys)
  }

  update (changed) {
    console.log('RoadList update', changed)
  }

  inited () {
    console.log('road list', this.data)
  }

  dispose () {
    super.dispose()
    console.log('RoadList dispose')
  }
}