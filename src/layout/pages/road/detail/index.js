import { Module } from 'cmodule'

export default class RoadDetail extends Module {
  constructor (querys) {
    super(querys)
    console.log('road detail', querys)
  }

  update (querys) {
    console.log('RoadDetail update', querys)
  }

  bindEvents () {}

  inited () {
    console.log('road detail', this.data)
  }

  dispose () {
    super.dispose()
    console.log('RoadDetail dispose')
  }
}