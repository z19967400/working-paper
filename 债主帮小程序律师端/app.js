//app.js
import { requstUrl } from "./utils/requestUrl"
App({
  onLaunch: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    this.overShare()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var token = wx.getStorageSync('token7') || null
    logs.unshift(Date.now())
    this.checkIsIPhoneX()
    wx.setStorageSync('logs', logs)
    let that = this
    if (token == null) {
      wx.login({
        success: function (res2) {
          wx.getUserInfo({
            success: function (res1) {
              let prams = {
                fans_source: 3,
                encryptedData: res1.encryptedData,
                iv: res1.iv,
                code: res2.code
              }
              that.WechatFans(prams).then((res3) => {
                if (!res3.data.state) {
                  that.onLaunch()
                  return false
                }
                let token2 = res3.data.data
                wx.request({
                  url: requstUrl.getlawInfo,
                  data: {},
                  header: {
                    'content-type': 'application/json',
                    usertokey: token2
                  },
                  success(res) {
                    that.globalData.lawInfo = res.data
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(that.globalData)
                    }
                  }
                })
              })
            },
            fail: function (err) { //未授权
              wx.navigateTo({
                url: '/pages/text/text',
              })
            }
          })
        }
      })
    } else {
      wx.request({
        url: requstUrl.getlawInfo,
        data: {},
        header: {
          'content-type': 'application/json',
          usertokey: token
        },
        success(res) {
          that.globalData.lawInfo = res.data
          that.globalData.token = token
          if (that.userInfoReadyCallback) {
            that.userInfoReadyCallback(that.globalData)
          }
        }
      })
    }
  },
  // 判断设备是否为 iPhone X
  checkIsIPhoneX: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        // 判断设备是否为刘海屏
        if (res.screenHeight == 812 || res.screenHeight == 896) {
          that.globalData.isIPhoneX = true
        }
      }
    })
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
            that.globalData.token = res.data.data
            resolve(res)
          }
        }
      })
    })
  },
  //重写分享方法
  overShare: function () {
    let _this = this
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            //重写分享配置
            return {
              title: '债主帮·律师端',
              path: "/pages/index/index",    //分享页面地址
              imageUrl: 'http://file.debteehelper.com/weapp-img/share.png'
            };
          }
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    active: 0,
    lawInfo: null,
    isIPhoneX: false,
    token: ""
  }
})