import { Module, loadModule } from 'cmodule'

import service from 'service-api'

service.config({
  globalContextType: 'application/json'
  // globalContextType: 'application/x-www-form-urlencoded'
})

export default class CarDetail extends Module {

  constructor () {
    super()
    console.log('car detail')
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

  inited () {
    // service.post('/api/material/audit?d=415', {a: '12', b: {c: 554}}, {
    //   context: this.container
    // }).then((resp) => {
    //   debugger
    // }).catch((resp) => {
    //   debugger
    // })
    
    service.get('/api/material/audit?d=123', {c: '12rrr', d: {e: 51114}}, {
      context: this.container
    }).then((resp) => {
      debugger
    }).catch((resp) => {
      debugger
    })

    // service.post('/audit-api/material/audit?d=415', {a: '12', b: {c: 554}}, {
    //   context: this.container
    // }).then((resp) => {
    //   debugger
    // }).catch((resp) => {
    //   debugger
    // })

    service.get('/audit-api/material/audit', null, {
      context: this.container
    }).then((resp) => {
      debugger
    }).catch((resp) => {
      debugger
    })
    // service.post('/car/detail?d=415', {a: '12', b: {c: 554}}, {
    //   context: this.container
    // }).then((resp) => {
    //   let data = resp.data
    //   this.render(data)
    //   loadModule('pages/custom/module', this.container.querySelector('#custom-module')).then((subModuleinitReturn) => {
    //     console.log(subModuleinitReturn)
    //   })
    // })
  }

  update (changed) {
    console.log('detail update', changed)
  }

  dispose () {
    super.dispose()
    service.clear()
    console.log('car detail dispose')
  }
}