/**
 * @path /start/middle-api/test
 * @method post|get
 * @type json
 * @params {id:1,name:'test',type: 1}
 * @params.id Number,必填,账号ID
 * @params.name String,选填,用户名
 * @params.price Number,选填,价格
 * @headers {}
 * @desc 测试规则是中间的情况，不是太常用
 */

function (params) {
  return {
    sleep: 2000,
    code: 0,
    data: {
      id: 1,
      name: '中间规则',
      price: 100,
      params
    },
    msg: 'success'
  }
}