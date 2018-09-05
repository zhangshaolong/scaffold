import loader from './import-module'

class Module extends HTMLElement {
  static get observedAttributes() {
    return ['path', 'querys']
  }

  constructor () {
    super()
  }

  connectedCallback () {
    let path = this.getAttribute('path')
    if (path) {
      loader(path, JSON.parse(this.getAttribute('querys')), this).then((module) => {
        this.module = module
      })
    }
  }

  disconnectedCallback () {
    this.module && this.module.dispose()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'querys') {
      this.module && this.module.update(JSON.parse(newValue))
    }
  }
}

customElements.define('c-module', Module)