import {getQueryString} from 'tools/utils'

const Router = {
  context: {
    path: null
  },
  start: (pathMap, rootModule) => {
    window.addEventListener('hashchange', (e) => {
      let hash = window.location.hash
      if (!hash) {
        hash = '#/' // reset to root path
      }
      let pair = hash.slice(1).split('?')
      let querys = getQueryString('?' + pair[1])
      let path = pair[0]
      let modulePath = pathMap[path]
      if (!modulePath) {
        modulePath = pathMap['404']
      }
      if (modulePath) {
        const context = Router.context
        if (context.path !== path) {
          context.path = path
          rootModule.setAttribute('path', modulePath)
        }
        rootModule.setAttribute('querys', JSON.stringify(querys))
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