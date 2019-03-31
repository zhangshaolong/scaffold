import { Module } from 'cmodule'

export default class CarList extends Module {
  constructor (querys) {
    super(querys)
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
          type: 'rule',
          value: ':nth-child(1)',
          handler: (element, event) => {
            console.log('rule', ':nth-child(1)')
          }
        }
      ]
    }
  }

  inited () {
    let datepicker = $('#datepicker').datepicker({
      altFormat: 'yy-mm-dd',
      appendText: '(yyyy-mm-dd)',
      dateFormat: 'yy-mm-dd'
      // gotoCurrent: true,
      // onSelect: () => {
      //   datepicker.show()
      // }
    })
  }

  update (querys) {
    console.log('list update', querys)
  }

  dispose () {
    super.dispose()
    console.log('car list dispose')
  }
}