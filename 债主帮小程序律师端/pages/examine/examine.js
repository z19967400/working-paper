const app = getApp()
const http = require("../../utils/httputils")
import { requstUrl } from "../../utils/requestUrl"
// pages/examine/examine.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    steps: [
      {
        text: '提交认证',
        desc: '',
      },
      {
        text: '审核中',
        desc: '',
      },
      {
        text: '认证完成',
        desc: '',
      }
    ],
    type: 0,  //认证审核状态  0 待审核 1未通过
    setpType: "success",
    stepColor: "#ec193a",
    stepText: ['', '审核中', '认证完成'],
    isIPhoneX: false,
    audit_feedback: "" // 审核反馈
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let active = this.data.active
    let steps = this.data.steps
    let stepColor = this.data.stepColor
    this.setData({
      isIPhoneX: app.globalData.isIPhoneX
    })
    if (options.type == 0) { //待审核
      active = 1
      this.setData({
        type: options.type,
        active: active,

      })
    } else {
      active = 2
      steps = [
        {
          text: '提交认证',
          desc: '',
        },
        {
          text: '审核中',
          desc: '',
        },
        {
          text: '未通过',
          desc: '',
        }
      ]
      stepColor = "#ec193a"
      this.setData({
        type: options.type,
        setpType: "plus",
        steps: steps,
        active: active,
        stepColor: stepColor,
        audit_feedback: app.globalData.lawInfo.data.audit_feedback
      })
    }

  },

  //获取律师认证详情
  getLawInfo() {
    let that = this
    http.getRequest(requstUrl.getlawInfo, {}, function (res) {
      if (res.code == 2) {
        wx.navigateTo({
          url: '/pages/authentication/authentication',
        })
      } else {
        if (res.data) {
          that.setData({
            type: res.code,
            audit_feedback: res.data.audit_feedback
          })
        }
      }
    })
  },
  //审核失败重新提交
  reSubmit() {
    wx.navigateTo({
      url: '/pages/authentication/authentication'
    })
  },
  //返回上一页
  goBack() {
    wx.navigateBack({ changed: true });//返回上一页
  },
  goHome(e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  onShow() {
    console.log(111);
    this.getLawInfo()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})