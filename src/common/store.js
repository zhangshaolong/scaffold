/**
 * @file global data management
 * @author zhangshaolong
 */

'use strict'

const datasource = {}

const set = (key, val) => {
  if (typeof key === 'string') {
    datasource[key] = val
  }
}

const get = (key) => {
  return arguments.length ? datasource[key] : datasource
}

const dump = (key) => {
  let result = {}
  if (key) {
    if (key.constructor === Array) {
      for (let i = 0, len = key.length; i < len; i++) {
        let k = key[i]
        result[k] = JSON.parse(JSON.stringify(datasource[k]))
      }
    } else {
      result[key] = JSON.parse(JSON.stringify(datasource[key]))
    }
  } else {
    return JSON.parse(JSON.stringify(datasource))
  }
  return result
}

export default {
  get,
  set,
  dump
}