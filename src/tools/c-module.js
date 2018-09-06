import loader from './module-loader'

class CModule extends HTMLElement {
  static get observedAttributes() {
    return ['querys']
  }

  constructor () {
    super()
    this.attributeChangedTimer = null
  }

  connectedCallback () {
    let path = this.getAttribute('path')
    if (path) {
      let a = JSON.parse(this.getAttribute('querys'))
      loader(path, JSON.parse(this.getAttribute('querys')), this).then((module) => {
        this.module = module
      })
    }
  }

  disconnectedCallback () {
    this.module && this.module.dispose()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    clearTimeout(this.attributeChangedTimer)
    this.attributeChangedTimer = setTimeout(() => {
      if (name === 'querys') {
        this.module && this.module.update(JSON.parse(newValue))
      }
    }, 0)
  }
}

customElements.define('c-module', CModule)