/**
 * 请求头
 */
var header = {
  'content-type': 'application/x-www-form-urlencoded',
  'Authorization': "Bearer " + wx.getStorageSync("token7"),
  'os': 'android',
  'version': '1.0.0',
  'device_token': 'ebc9f523e570ef14',
  'usertokey': wx.getStorageSync("token7")
}

/**
 * 供外部post请求调用  
 */
function post(url, params, onSuccess, onFailed) {
  // console.log("请求方式：", "POST")
  request(url, params, "POST", onSuccess, onFailed);

}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed) {
  // console.log("请求方式：", "GET")
  request(url, params, "GET", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
  wx.showLoading({
    title: "正在加载中...",
  })
  wx.request({
    url: url,
    data: dealParams(params),
    method: method,
    header: header,
    success: function (res) {
      wx.hideLoading();
      if (res.data) {
        /** start 根据需求 接口的返回状态码进行处理 */
        if (res.statusCode == 200) {
          onSuccess(res.data); //request success
        } else {
          // onFailed(res.data.message); //request failed
          console.log('请求异常')
        }
        /** end 处理结束*/
      }
    },
    fail: function (error) {
      // onFailed(""); //failure for other reasons
      console.log('请求异常')
    }
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  return params;
}


// 1.通过module.exports方式提供给外部调用
module.exports = {
  postRequest: post,
  getRequest: get,
}
