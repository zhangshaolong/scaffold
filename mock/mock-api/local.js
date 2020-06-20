/**
 * @path /mock-api/local
 * @method post|get
 * @type json
 * @params {id:1,name:'test',type: 1}
 * @params.id Number,必填,账号ID
 * @params.name String,选填,用户名
 * @params.price Number,选填,价格
 * @headers {}
 * @desc 本地mock接口测试
 */

function (params) {
  return {
    sleep: 2000,
    code: 0,
    data: {
      id: 1,
      name: 'polo',
      price: 300000,
      params
    },
    msg: 'success'
  }
}