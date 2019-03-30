import loader from '../module/loader'

const getQueryString = function (queryStr) {
  let len = arguments.length
  if (len === 1) {
    let querys = {}
    queryStr.replace(/(?:\?|&)([^=]+)=([^&$]*)/g, (all, key, val) => {
      querys[key] = decodeURIComponent(val)
    })
    return querys
  } else if (len === 2) {
    let rst = new RegExp('[?&]' + arguments[1] + '=([^&$]*)').exec(queryStr)
    return rst && decodeURIComponent(rst[1])
  }
}

const watches = []

const Router = {
  context: {
    path: null,
    module: null
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
        rootModule.setAttribute('path', modulePath)
        const context = Router.context
        let oldPath = context.path
        if (oldPath !== path) {
          context.path = path
          context.module && context.module.dispose()
          loader(modulePath, querys, rootModule, (module) => {
            context.module = module
          })
        } else {
          context.module.update(querys)
        }

        watches.forEach((watcher) => {
          watcher(path, oldPath, querys)
        })
      } else {
        // 404
        console.log('404')
      }
    }, false)
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('hashchange', true, true)
    window.dispatchEvent(evt)
  },
  watch: (watcher) => {
    watches.push(watcher)
  }
}

export default Router