/**
 * @path /api_v2/app/app_list/list
 * @method post|get
 * @type form
 * @params {id:1,name:'test',type: 1}
 * @params.id Number,必填,账号ID
 * @params.name String,选填,用户名
 * @params.ts Long,选填,当前时间戳
 * @desc 获取app列表
 */

function (params) {
  return {
    sleep: 20,
    code: 0,
    data: {
      desc: '这个是本地的数据', // 加点注释
      params
    },
    msg: 'success'
  }
}