import Scope from './scope'

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

export default (path, querys, container) => {
  return new Promise((resolve, reject) => {
    import(`src/${path}`).then(({default: Module}) => {
      let module = new Module(querys)
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
      module.init(querys)
      resolve(module)
    }).catch((err) => {
      console.log(err.message)
      reject(err.message)
    })
  })
}