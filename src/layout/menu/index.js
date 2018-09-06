import tpl from './index.tpl'

import Module from 'src/common/module'

export default class Menu extends Module {

  constructor (querys) {
    super(tpl)
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