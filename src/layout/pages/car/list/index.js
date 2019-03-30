import { Module } from 'nuwa'

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
          type: 'element',
          value: this.container.childNodes[2],
          handler: (element, event) => {
            console.log('element', element)
          }
        }
      ]
    }
  }

  inited () {
    let datepicker = $('#datepicker').datepicker({
      altFormat: "yy-mm-dd",
      appendText: "(yyyy-mm-dd)",
      dateFormat: "yy-mm-dd"
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