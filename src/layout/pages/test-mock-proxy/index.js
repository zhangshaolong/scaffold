import { Module } from 'cmodule'

import service from 'service-api'

import './index.less'

service.config({
  globalContextType: 'application/json'
  // globalContextType: 'application/x-www-form-urlencoded'
})

export default class TestMockProxy extends Module {
  constructor (querys) {
    super(querys)
    console.log('mock proxy test')
  }

  bindEvents () {
    return {
      click: [
        {
          type: 'className',
          value: 'click',
          handler: (element, event) => {
            service.post(element.getAttribute('path'), {
              name: 'test',
              id: 122,
              ts: Date.now()
            }, {
              context: element.parentNode
            }).then((resp) => {
              element.nextSibling.innerHTML = JSON.stringify(resp)
            }).catch((resp) => {
              element.nextSibling.innerHTML = JSON.stringify(resp)
            })
          }
        }
      ]
    }
  }
}