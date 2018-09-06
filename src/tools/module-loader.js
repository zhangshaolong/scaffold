import Simplite from 'simplite'

export default (path, querys, container) => {
  return new Promise((resolve, reject) => {
    import(`src/${path}`).then(({default: Module}) => {
      const module = new Module(querys)
      if (module.tpl) {
        Simplite.addTemplate(`src/${path}`, module.tpl)
        module.tplRender = Simplite.compile(`src/${path}`)
      }
      module.container = container
      module.init(querys)
      resolve(module)
    }).catch((err) => {
      console.log(err.message)
      reject(err.message)
    })
  })
}