export default (path, querys, container) => {
  return new Promise((resolve, reject) => {
    import(`src/${path}`).then(({default: Module}) => {
      const module = new Module(querys)
      module.container = container
      module.init(querys)
      resolve(module)
    }).catch((err) => {
      console.log(err.message)
      reject(err.message)
    })
  })
}