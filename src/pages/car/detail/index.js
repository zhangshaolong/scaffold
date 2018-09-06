import tpl from './index.tpl'

import Module from 'src/common/module'

import service from 'service-api'

export default class CarDetail extends Module {

  constructor (querys) {
    super(tpl)
    console.log('car detail', querys)
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

  inited (querys) {
    service.get('/car/detail', querys, {
      context: this.container
    }).then((resp) => {
      let data = resp.data
      this.render(data)
    })
  }

  update (querys) {
    this.inited(querys)
    console.log('detail update', querys)
  }

  dispose () {
    super.dispose()
    console.log('car detail dispose')
  }
}