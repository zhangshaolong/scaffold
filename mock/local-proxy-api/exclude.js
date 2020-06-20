/**
 * @path /local-proxy-api/exclude
 * @method post|get
 * @type json
 * @params {id:1,name:'test',type: 1}
 * @params.id Number,必填,账号ID
 * @params.name String,选填,用户名
 * @params.price Number,选填,价格
 * @headers {}
 * @desc 代理规则排除的接口
 */
let total = 0
return function (params) {
  return {
    sleep: 500,
    code: 0,
    data: {
      id: 1,
      total: ++total, // 这个是可以累积的，只要mock服务一直服务，就一直累积
      name: '这个是被排除的proxy接口',
      price: 300000,
      params
    },
    msg: 'success'
  }
}