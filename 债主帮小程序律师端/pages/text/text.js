const app = getApp()
import { requstUrl } from "../../utils/requestUrl"
Page({
  data: {
    code: ""
  },
  onLoad: function () {
    let that = this
    wx.login({
      success: function (res2) {
        that.setData({
          code: res2.code
        })
      }
    })
  },
  //返回首页
  goHome(e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  //返回上一页
  goBack() {
    wx.navigateBack({ changed: true });//返回上一页
  },
  //获取粉丝
  WechatFans(prams) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: requstUrl.login,
        data: prams,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data != null) {
            wx.setStorageSync("token7", res.data.data)
            app.globalData.token = res.data.data
            resolve(res)
          }
        }
      })
    })
  },
  //点击授权按钮
  bindGetUserInfo(res) {
    let that = this
    if (res.detail.userInfo) {
      let prams = {
        fans_source: 3,
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv,
        code: that.data.code
      }
      that.WechatFans(prams).then((res3) => {
        wx.request({
          url: requstUrl.getlawInfo,
          data: {},
          header: {
            'content-type': 'application/json',
            usertokey: res3.data.data
          },
          success(res) {
            app.globalData.lawInfo = res.data
            wx.navigateTo({
              url: "/pages/index/index",
            })
          }
        })
      })
    } else {
      console.log('用户点击了取消按钮')
    }
  }
})