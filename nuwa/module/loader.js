import Scope from './scope'

let moduleLoader = null

const modulesMap = {}

const getParentModule = (node, tagName) => {
  let parentNode
  while (parentNode = node.parentNode) {
    if (parentNode.tagName === tagName) {
      return modulesMap[parentNode.getAttribute('path')]
    }
    node = node.parentNode
  }
}

const setLoader = (loader) => {
  moduleLoader = loader
}

export default (path, querys, container, callback) => {
  if (!moduleLoader) {
    return
  }
  let loaded = 0
  let module = null
  let tpl = null
  moduleLoader(path)[0].then((Module) => {
    module = new (Module.default)(querys)
    const parentModule = getParentModule(container, container.tagName)
    let data
    if (parentModule) {
      data = parentModule.data.child()
      if (module.data) {
        for (let key in module.data) {
          data[key] = module.data[key]
        }
      }
    } else {
      data = new Scope(module.data)
    }
    module.data = data
    module.container = container
    modulesMap[path] = module
    loaded++
    if (loaded === 2) {
      module.tpl = tpl
      module.init(querys)
      callback(module, tpl)
    }
  }).catch((err) => {
    console.log(err)
  })
  // load tpl file
  moduleLoader(path)[1].then((t) => {
    loaded++
    tpl = t.default
    if (loaded === 2) {
      module.tpl = tpl
      module.init(querys)
      callback(module, tpl)
    }
  })
}

export {
  setLoader
}
