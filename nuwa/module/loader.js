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

export default (path, querys, container, context) => {
  if (!moduleLoader) {
    return
  }
  Promise.all(moduleLoader(path)).then((values) => {
    const module = new (values[0].default)(querys)
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
    module.tpl = values[1].default
    context.module = module
    module.init(querys)
  })
}

export {
  setLoader
}
