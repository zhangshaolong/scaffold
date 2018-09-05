import tpl from './index.tpl'

import Module from 'src/common/module'

import service from 'service-api'

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
    console.log('car detail dispose')
  }
}