import tpl from './index.tpl'

import Module from 'src/common/module'
import EventEmitter from 'event-async-emitter'

let menu

const routerChangeHandler = (path) => {
  if (menu) {
    menu.find('a').each((idx, a) => {
      const li = a.parentNode.parentNode
      if (a.getAttribute('href') === '#' + path) {
        li.classList.add('ui-state-focus')
      } else {
        li.classList.remove('ui-state-focus')
      }
    })
  }
}

export default class Menu extends Module {

  constructor (querys) {
    super(tpl)
  }

  inited () {
    menu = $('#menu', this.container).menu()
    EventEmitter.on('router-change', routerChangeHandler)
  }

  bindEvents () {
    return {
      click: {
        type: 'tag',
        value: 'a',
        handler: (element, event) => {
          console.log('a', element)
        }
      }
    }
  }

  dispose () {
    super.dispose()
    EventEmitter.un('router-change', routerChangeHandler)
    console.log('menu dispose')
  }
}