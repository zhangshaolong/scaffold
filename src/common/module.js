export default class Module {

  constructor (tpl) {
    this.tpl = tpl
    this.div = document.createElement('div')
  }

  init (querys) {
    this.render(querys)

    this.bindEvents()
  }

  bindEvents () {}

  update (querys) {}

  render (data) {
    if (this.tplRender) {
      this.container.innerHTML = this.tplRender(data)
    }
  }

  dispose () {
    console.log('dispose')
  }
}