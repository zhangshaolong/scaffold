import { Module } from 'cmodule'

export default class RoadList extends Module {
  constructor (querys) {
    super(querys)
    console.log('road list', querys)
  }

  update (querys) {
    console.log('RoadList update', querys)
  }

  inited () {
    console.log('road list', this.data)
  }

  dispose () {
    super.dispose()
    console.log('RoadList dispose')
  }
}