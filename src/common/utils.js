/**
 * @file: common tool functions
 * @author: 369669902@qq.com
 */

import service from 'service-api'

/**
 * @param {object} data  json data，required
 * @param {bool} codeStyle highlight
 * @param {number} space
 * @param indents 当前行需要的缩进（内部参数，调用者不要设置）
 */
const formatJSON = (data, codeStyle, space, indents) => {
  if (null == data) {
    return '' + data
  }
  space = space != null ? space : '  '
  indents = indents || ''
  var constructor = data.constructor
  if (constructor === String) {
    return codeStyle ? '<span class="json-string-value">"' + data + '"</span>' : '"' + data + '"'
  } else if (constructor === Number || constructor === Boolean) {
    return codeStyle ? '<span class="json-number-value">' + data + '</span>' : data
  } else if (constructor === Array) {
    var astr = codeStyle ? '<span class="json-array-tag">[</span>\n' : '[\n'
    var len = data.length
    if (len) {
      for (var i = 0; i < len - 1; i++) {
        astr += indents + space + formatJSON(data[i], codeStyle, space, indents + space) + ',\n'
      }
      astr += indents + space + formatJSON(data[len - 1], codeStyle, space, indents + space) + '\n'
    }
    return astr + indents + (codeStyle ? '<span class="json-array-tag">]</span>' : ']')
  } else if (constructor === Object) {
    var ostr = codeStyle ? '<span class="json-object-tag">{</span>\n' : '{\n'
    var isEmpty = true
    for (var key in data) {
      isEmpty = false
      ostr += indents + space + (codeStyle ? '<span class="json-object-key">' + '"' + key + '"' + '</span>' : '"' + key + '"')
        + ': ' + formatJSON(data[key], codeStyle, space, indents + space) + ',\n'
    }
    if (!isEmpty) {
      ostr = ostr.slice(0, -2) + '\n'
    }
    return ostr + indents + (codeStyle ? '<span class="json-object-tag">}</span>' : '}')
  }
}

/**
 * @param {string} data  formated (contain \n and space and so on) pb text data，required
 * note：just simple parse，not really format，depend on the formated data
 */
const formatPbText = (data) => {
  if (null == data) {
    return ''
  }
  let lines = data.split(/\n/)
  let results = []
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    line.replace(/^(\s*)([\w]+)(\s*)(\{)$/, (all, p1, p2, p3, p4) => {
      results.push(p1 + '<span class="json-object-key">' + p2 + '</span>' + p3 + '<span class="json-object-tag">{</span>')
    })
    line.replace(/^(\s*)([\w]+):(\s*)(['"].*)$/, (all, p1, p2, p3, p4) => {
      results.push(p1 + '<span class="json-object-key">' + p2 + '</span>:' + p3 + '<span class="json-string-value">' + p4 + '</span>')
    })
    line.replace(/^(\s*)([\w]+):(\s*)([\w].*)$/, (all, p1, p2, p3, p4) => {
      results.push(p1 + '<span class="json-object-key">' + p2 + '</span>:' + p3 + '<span class="json-number-value">' + p4 + '</span>')
    })
    line.replace(/^(\s*)(\})$/, (all, p1, p2) => {
      results.push(p1 + '<span class="json-object-tag">}</span>')
    })
  }
  return results.join('\n')
}

/**
   * get the url' args
   * @param {string} queryStr location.search | location.hash
   * @param {string} if key，return the vaule of key，other return the map of all key->value
   * @return {string|Object}
   */
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

/**
   * update the url args
   * @param {string} queryStr location.search | location.hash
   * @param {string|object} params key or the map of key -> value which need update
   * @param {string} value when the key is string the value is set to the key
   * @return {string}
   */
const refreshQueryString = function (queryStr, params) {
  let len = arguments.length
  if (len === 3 && typeof params === 'string') {
    let obj = {}
    obj[params] = arguments[2]
    params = obj
    obj = null
  }
  for (let ki in params) {
    let has = false
    let value = params[ki]
    queryStr = queryStr.replace(new RegExp('([?#&]' + ki + '=)([^&$]*)'), (all, k, v) => {
      has = true
      if (value === '') {
        return ''
      }
      return k + encodeURIComponent(value)
    })
    if (!has && value !== '') {
      queryStr += '&' + ki + '=' + encodeURIComponent(value)
    }
  }
  return queryStr.replace(/[?&]/, '?')
}

/**
   * update the url args which is location.search
   * @param {string|Object} key or map of key -> value
   * @param {string} value value of the key
   */
const refreshQuery = function () {
  let args = Array.prototype.slice.apply(arguments)
  args.unshift(location.search)
  return refreshQueryString.apply(null, args)
}

/**
   * get the args from url
   * @param {string} key get value by this key, default return all values of all keys
   * @param {boolean} isHash is get the args from location.hash
   * @return {string|Object} if key，return the vaule of key，other return the map of all key->value
   */
const getQuery = function () {
  let args = Array.prototype.slice.apply(arguments)
  args.unshift(location.search)
  return getQueryString.apply(null, args)
}

const refreshFrag = function (key, value) {
  let args = Array.prototype.slice.apply(arguments)
  args.unshift(location.hash)
  return refreshQueryString.apply(null, args)
}

const getFrag = function (key) {
  let args = Array.prototype.slice.apply(arguments)
  args.unshift(location.hash)
  return getQueryString.apply(null, args)
}

const showLoading = (container, tip) => {
  let loadingCount = container.dataset._loadingCount || 0
  container.dataset._loadingCount = ++loadingCount
  if (loadingCount === 1) {
    container.classList.add('loading')
    let mask = document.createElement('center')
    mask.className = 'mask'
    let slot = document.createElement('div')
    mask.appendChild(slot)
    container.appendChild(mask)
    if (tip) {
      slot.innerHTML = tip
    }
    mask.onclick = function (e) {
      e.stopPropagation()
    }
  }
}

const hideLoading = (container) => {
  if (--container.dataset._loadingCount <= 0) {
    container.classList.remove('loading')
    let mask = null
    for (let i = 0; i < container.children.length; i++) {
      if (container.children[i].classList.contains('mask')) {
        mask = container.children[i]
        break
      }
    }
    if (mask) {
      container.removeChild(mask)
    }
  }
}

const updateLoading = (container, tip) => {
  if (tip) {
    let mask = null
    for (let i = 0; i < container.children.length; i++) {
      if (container.children[i].classList.contains('mask')) {
        mask = container.children[i]
        break
      }
    }
    if (mask) {
      mask.innerHTML = tip
    }
  }
}


/**
 * @param {Blob | object} content   as file content
 * @param {string} name    as file name
 * @param {string} type    as file content mime type
 */
const downloadFile = ({content, name, type = 'application/octet-stream'}) => {
  let anchor = document.createElement('a')
  if (name) {
    anchor.setAttribute('download', name)
  }
  anchor.style.display = 'none'
  let url = window.URL.createObjectURL(new Blob([content], {
    type: type
  }))
  anchor.href = url
  document.documentElement.appendChild(anchor)
  anchor.click()
  document.documentElement.removeChild(anchor)
  window.URL.revokeObjectURL(url)
}

const htmlEncode = (str) => {
  if (typeof str === 'undefined') {
    return ''
  }
  if (typeof str !== 'string') {
    return str
  }
  let result = ''
  let i = 0
  let index
  let char
  const len = str.length
  for (index = 0; i < len; ++i) {
    switch (str.charCodeAt(i)) {
      case 34:
        char = '&quot;'
        break
      case 60:
        char = '&lt;'
        break
      case 62:
        char = '&gt;'
        break
      case 38:
        char = '&amp;'
        break
      case 39:
        char = '&#39;'
        break
      default:
        continue
    }
    if (index !== i) {
      result += str.substring(index, i)
    }
    index = i + 1
    result += char
  }
  if (index !== i) {
    return result + str.substring(index, i)
  }
  return result
}

const createWorker = (task) => {
  try {
    let blob = new Blob(['(' + task + ')()'], {type: 'application/javascript;charset=utf-8'})
    return new Worker(window.URL.createObjectURL(blob))
  } catch (e) {}
}

const copyText2Clipboard = (text) => {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  textarea.value = text
  textarea.select()
  document.execCommand('Copy')
  document.body.removeChild(textarea)
}

// 提供对一些高频调用的函数进行优化，降低js调用频率，排除不必要的干扰因素
const bindFun = function () {
  /**
   * 判断是否是注册滚动事件的元素触发的滚动事件
   * element 被监听滚动的元素
   * event 滚动事件的事件对象
   */
  const isElementSelf = (element, event) => {
    return element === event.target || (element === window && event.target === document)
  }

  /**
   * 清除队列中未执行的任务，终止这些不满足条件的调用
   */
  const clearTimerQueue = (timerQueue) => {
    // 保证最后一个会被调用到
    while (timerQueue.length) {
      clearTimeout(timerQueue.shift())
    }
  }

  /**
   * element 被监听滚动的元素 必需
   * type    事件类型
   * handler 滚动时，调用的函数   必需
   * timeInterval 每隔timeInterval，最多执行一次handler的函数调用，此字段设置为非负数数字时有效
   * watchAll 是否触发其他元素的滚动条事件
   */
  return (element, type, handler, timeInterval, watchAll) => {
    let invokeTimerQueue = []
    let fun = null
    if (isNaN(timeInterval) || timeInterval < 0) {
      if (watchAll) {
        fun = handler
      } else {
        fun = (event) => {
          if (isElementSelf(element, event)) {
            handler.call(element, event)
          }
        }
      }
    } else {
      if (watchAll) {
        fun = (event) => {
          clearTimerQueue(invokeTimerQueue)
          invokeTimerQueue.push(
            setTimeout(() => {
              handler.call(element, event)
            }, timeInterval)
          )
        }
      } else {
        fun = (event) => {
          clearTimerQueue(invokeTimerQueue)
          invokeTimerQueue.push(
            setTimeout(() => {
              if (isElementSelf(element, event)) {
                handler.call(element, event)
              }
            }, timeInterval)
          )
        }
      }
    }
    element.addEventListener(type, fun, false)
    return () => {
      element.removeEventListener(type, fun, false)
    }
  }
}()

const getCookie = (cname) => {
  let name = `${cname}=`
  let ca = document.cookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const setCookie = (cname, cvalue, exdays, path = '/') => {
  let expires = ''
  if (exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    expires = `; expires=${d.toGMTString()}`
  }
  document.cookie = `${cname}=${cvalue}${expires}; path=${path}`
}

const defaultServiceConfig = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  dealError: (error) => {
    if (error.response) {
      let status = error.response.status
      if (status === 405) {
        if (
          window.location.hostname === 'localhost'
        ) {
          location.href = '/account/sso/login/?jumpto=' + encodeURIComponent(location.href)
        } else {
          let iframe = document.getElementById('iframe-login')
          if (!iframe) {
            iframe = document.createElement('iframe')
            iframe.id = 'iframe-login'
            iframe.style.display = 'none'
            document.body.appendChild(iframe)
            window.addEventListener('message', (event) => {
              if (event.data.type === 'dev-login') {
                setCookie('ticket', event.data.ticket)
                setCookie('username', event.data.username)
                location.reload()
              }
            }, false)
            iframe.src = '//online.com'
          }
        }
      } else if (status === 403) {
        alert('您还没有权限，请先申请权限，谢谢')
      }
    }
    return Promise.reject(error)
  }
}

const configService = (config) => {
  service.config(Object.assign({}, defaultServiceConfig, config))
  if (self !== top) { // in iframe
    let ticket = getCookie('ticket')
    let username = getCookie('username')
    top.postMessage({
      type: 'dev-login',
      ticket,
      username
    }, '*')
  }
}

export {
  formatJSON,
  formatPbText,
  getQueryString,
  refreshQueryString,
  refreshQuery,
  getQuery,
  refreshFrag,
  getFrag,
  showLoading,
  hideLoading,
  updateLoading,
  downloadFile,
  htmlEncode,
  copyText2Clipboard,
  bindFun,
  getCookie,
  setCookie,
  configService
}