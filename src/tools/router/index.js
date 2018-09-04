import {getQueryString} from 'tools/utils'

const Router = {
  context: {
    path: null,
    module: null
  },
  start: (pathMap, rootNode) => {
    window.addEventListener('hashchange', (e) => {
      let hash = window.location.hash
      if (!hash) {
        hash = '#/' // reset to root path
      }
      let pair = hash.slice(1).split('?')
      let querys = getQueryString('?' + pair[1])
      let path = pair[0]
      let Clazz = pathMap[path]
      if (!Clazz) {
        Clazz = pathMap['404']
      }
      if (Clazz) {
        const context = Router.context
        if (context.path !== path) {
          context.path = path
          if (context.module) {
            context.module.dispose()
          }
          context.module = new Clazz(querys)
          context.module.init(rootNode)
        } else {
          context.module.update(querys)
        }
      } else {
        // 404
        console.log('404')
      }
    }, false)
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('hashchange', true, true)
    window.dispatchEvent(evt)
  }
}

export default Router