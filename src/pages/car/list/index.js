import tpl from './index.tpl'

import Module from 'src/common/module'

export default class CarList extends Module {
  constructor (querys) {
    super(tpl)

    console.log('car list', querys)
    this.data = {
      p: 'car list'
    }
  }

  bindEvents () {
    return {
      click: [
        {
          type: 'className',
          value: 'car-name',
          handler: (element, event) => {
            console.log('name', element)
          }
        },
        {
          type: 'id',
          value: 'car-id',
          handler: (element, event) => {
            console.log('id', element)
          }
        },
        {
          type: 'element',
          value: this.container.childNodes[2],
          handler: (element, event) => {
            console.log('element', element)
          }
        }
      ]
    }
  }

  update (querys) {
    console.log('list update', querys)
  }

  dispose () {
    super.dispose()
    console.log('car list dispose')
  }
}