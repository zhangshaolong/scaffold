import loader, { setLoader } from './loader'

const checkCondition = {
  className: (node, value) => {
    return node.classList.contains(value)
  },
  id: (node, value) => {
    return node.getAttribute('id') === value
  },
  element: (node, value) => {
    return node === value
  },
  tag: (node, value) => {
    return node.tagName === value.toUpperCase()
  }
}

const loopCheck = (root, target, value, checkFun) => {
  if (target) {
    if (checkFun(target, value)) {
      return target
    } else {
      if (target !== root) {
        return loopCheck(root, target.parentNode, value, checkFun)
      }
    }
  }
}

class Module {

  constructor (querys) {
    this.toBeDisposes = []
  }

  init (querys) {
    this.render()
    let events = this.bindEvents()
    if (events) {
      this.delegate(events)
    }
    this.inited(querys)
  }

  inited (querys) {}

  bindEvents () {}

  update (querys) {}

  delegate (events) {
    for (let action in events) {
      let list = events[action]
      if (!Array.isArray(list)) {
        list = [list]
      }
      const fun = (e) => {
        const ele = e.target
        for (let i = 0; i < list.length; i++) {
          const handlerItem = list[i]
          const checkFun = checkCondition[handlerItem.type]
          let target = loopCheck(this.container, ele, handlerItem.value, checkFun)
          if (target) {
            handlerItem.handler.call(this, target, e)
          }
        }
      }
      this.container.addEventListener(action, fun, true)

      this.toBeDisposes.push(() => {
        this.container.removeEventListener(action, fun, true)
      })
    }
  }

  render (data) {
    if (this.tpl) {
      this.container.innerHTML = this.tpl(data || this.data)
    }
  }

  dispose () {
    this.toBeDisposes.forEach((dispose) => {
      dispose()
    })
    this.toBeDisposes.length = 0
  }
}

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
    if (path != null) {
      loader(path, JSON.parse(this.getAttribute('querys')), this, this)
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

export {
  Module,
  setLoader
}