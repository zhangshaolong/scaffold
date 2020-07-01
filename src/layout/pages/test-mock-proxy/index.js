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
            let params = element.getAttribute('params')
            if (params) {
              params = JSON.parse(params)
            } else {
              params = {
                name: 'test',
                id: 122,
                ts: Date.now()
              }
            }
            service.post(element.getAttribute('path'), params, {
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