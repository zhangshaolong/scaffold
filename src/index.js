import 'tools/c-module'
import service from 'service-api'
import Simplite from 'simplite'
Simplite.dataKey = 'data'

Simplite.addFilter('aaa', (data) => {
  return data + 'eeeeee'
})

import './index.less'

const showLoading = (container, tip) => {
  let loadingCount = container.dataset._loadingCount || 0
  container.dataset._loadingCount = ++loadingCount
  if (loadingCount === 1) {
    container.classList.add('loading')
    let mask = document.createElement('center')
    mask.className = 'mask'
    mask.onclick = function (e) {
      e.stopPropagation()
    }
    container.appendChild(mask)
  }
  updateLoading(container, tip)
}

const hideLoading = (container) => {
  if (--container.dataset._loadingCount <= 0) {
    container.classList.remove('loading')
    let mask = container.querySelector('.mask')
    if (mask) {
      container.removeChild(mask)
    }
  }
}

const updateLoading = (container, tip) => {
  if (tip) {
    let mask = container.querySelector('.mask')
    if (mask) {
      mask.innerHTML = tip
    }
  }
}

service.config({
  showLoading: showLoading,
  hideLoading: hideLoading,
  dealError: (error) => {
    if (error.response) {
      let status = error.response.status
      if (status === 405) {
        // to login
        // location.href = '/account/sso/login/?jumpto=' + encodeURIComponent(location.href)
      } else if (status === 403) {
        alert('您还没有权限，请先申请权限，谢谢')
      }
    }
    return Promise.reject(error)
  }
})