import { Module, Router } from 'cmodule'

let menu

const routerChangeHandler = (path) => {
  console.log(Router.querys)
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

  inited () {
    menu = $('#menu', this.container).menu()
    Router.watch(routerChangeHandler)
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
    console.log('menu dispose')
  }
}