import { Module } from 'cmodule'

import service from 'service-api'

export default class CarDetail extends Module {

  constructor (querys) {
    super(querys)
    console.log('car detail', querys)
    this.data = {
      p: 'car detail'
    }
  }

  bindEvents () {

    return {
      click: [
        {
          type: 'className',
          value: 'car-name',
          handler: (element, event) => {
            this.container.querySelector('#cm').setAttribute('c-props', new Date().getTime() + '')
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
          type: 'rule',
          value: ':nth-child(2)',
          handler: (element, event) => {
            console.log('rule', element, ':nth-child(2)')
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
    // this.inited(querys)
    console.log('detail update', querys)
  }

  dispose () {
    super.dispose()
    service.clear()
    console.log('car detail dispose')
  }
}