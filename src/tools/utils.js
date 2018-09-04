/**
 * @file: common tool functions
 * @author: 369669902@qq.com
 */

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
    queryStr = queryStr.replace(new RegExp('([?#&]' + ki + '=)([^&$]*)'), (all, k, v) => {
      has = true
      return k + encodeURIComponent(params[ki])
    })
    if (!has) {
      queryStr += (queryStr.indexOf('?') > -1 ? '&' : '?') + ki + '=' + encodeURIComponent(params[ki])
    }
  }
  return queryStr
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

/**
 * use latlng to get city info, just support suzhou and beijing now
 */


const getCity = (lat, lng) => {
  lng = parseFloat(lng)
  lat = parseFloat(lat)
  const HAIDIAN_LAT_MAX = 40.09, HAIDIAN_LAT_MIN = 39.53, HAIDIAN_LNG_MAX = 116.23, HAIDIAN_LNG_MIN = 116.03
  const BEIJING_LAT_MAX = 40.63065370180113, BEIJING_LAT_MIN = 39.55382471316116, BEIJING_LNG_MAX = 117.14053069269947, BEIJING_LNG_MIN = 115.70136294189204
  const SUZHOU_LAT_MAX = 31.564065556886117, SUZHOU_LAT_MIN = 31.086889975184427, SUZHOU_LNG_MAX = 121.09976426743266, SUZHOU_LNG_MIN = 120.43049958346607
  const cityInfo = {}
  if (lat >= HAIDIAN_LAT_MIN && lat <= HAIDIAN_LAT_MAX && lng >= HAIDIAN_LNG_MIN && lng <= HAIDIAN_LNG_MAX) {
    cityInfo.id = 7
    cityInfo.name = 'Haidian'
  } else if (lat >= BEIJING_LAT_MIN && lat <= BEIJING_LAT_MAX && lng >= BEIJING_LNG_MIN && lng <= BEIJING_LNG_MAX) {
    cityInfo.id = 4
    cityInfo.name = 'Shunyi'
  } else if (lat >= SUZHOU_LAT_MIN && lat <= SUZHOU_LAT_MAX && lng >= SUZHOU_LNG_MIN && lng <= SUZHOU_LNG_MAX) {
    cityInfo.id = 2
    cityInfo.name = 'Suzhou'
  }
  return cityInfo
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

export {
  formatJSON,
  formatPbText,
  getQueryString,
  refreshQueryString,
  refreshQuery,
  getQuery,
  refreshFrag,
  getFrag,
  downloadFile,
  htmlEncode,
  getCity,
  copyText2Clipboard
}