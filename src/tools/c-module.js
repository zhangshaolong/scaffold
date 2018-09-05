import Simplite from 'simplite'

class Module extends HTMLElement {
  static get observedAttributes() {
    return ['path', 'querys']
  }

  constructor () {
    super()
  }

  importModule (path, querys) {
    import(`src/${path}`).then(({default: Module}) => {
      const module = this.module = new Module(querys)
      if (module.tpl) {
        Simplite.addTemplate(`src/${path}`, module.tpl)
        module.tplRender = Simplite.compile(`src/${path}`)
      }
      module.container = this
      module.init(querys)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  connectedCallback () {
    let path = this.getAttribute('path')
    if (path) {
      this.importModule(path, JSON.parse(this.getAttribute('querys')))
    }
  }

  disconnectedCallback () {
    this.module && this.module.dispose()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const querys = JSON.parse(this.getAttribute('querys'))
    if (name === 'path') {
      if (this.hasAttribute('root')) {
        this.importModule(newValue, querys)
      }
    } else {
      this.module && this.module.update(querys)
    }
  }
}

customElements.define('c-module', Module)