/**
 * @path /car/detail
 * @method post|get
 * @type json
 * @params {id:1}
 * @params.id Number,必填,车辆ID
 * @desc 获取车辆详情信息
 */

function (params) {
  return {
    sleep: 2000,
    code: 0,
    data: {
      id: 1,
      name: 'polo',
      price: 300000
    },
    msg: 'success'
  }
}