// pages/caseProgressInfo/caseProgressInfo.js
import { requstUrl } from "../../utils/requestUrl"
const http = require("../../utils/httputils")
import Toast from '../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matters_from_id: "",
    list: [],
    height: 0,
    name: "案件进程",
    from_details: [],
    debtor_number: "",
    isIPhoneX: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      matters_from_id: options.id,
      height: wx.getSystemInfoSync().windowHeight - 110,
      name: options.name,
      debtor_number: options.debtor_number,
      isIPhoneX: app.globalData.isIPhoneX
    })
    this.getCaseMatters()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取案件事项
  getCaseMatters() {
    let that = this
    let matters_from_id = that.data.matters_from_id
    wx.request({
      url: requstUrl.getCaseFromDetails,
      data: { matters_from_id },
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let res = ress.data
        let from_details = []
        res.data.forEach(item => {
          let obj = {
            id: item.id,
            form_value: item.form_value
          }
          from_details.push(obj)
        })
        that.setData({
          list: res.data,
          from_details: from_details
        })
      }
    })
  },
  //子组件传值
  children_up(e) {
    let fromId = e.detail.id
    let value = e.detail.value
    this.data.from_details.forEach(item => {
      if (item.id == fromId) {
        item.form_value = value
      }
    })
  },
  //提交
  submit() {
    let parmas = {
      debtor_number: this.data.debtor_number,
      matters_from_id: this.data.matters_from_id,
      execution_status: 0,
      from_details: this.data.from_details
    }
    wx.request({
      url: requstUrl.lawyerSaveMatterForm,
      data: { data: JSON.stringify(parmas) },
      method: "POST",
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let res = ress.data
        if (res.state) {
          Toast.success(res.msg);
          wx.navigateTo({
            url: '/pages/caseProgress/caseProgress?debtor_number=' + that.data.debtor_number
          })
        } else {
          Toast.fail(res.msg);
        }
      }
    })
  },
  //下一步
  next() {
    let that = this
    let parmas = {
      debtor_number: that.data.debtor_number,
      matters_from_id: that.data.matters_from_id,
      execution_status: 1,
      from_details: that.data.from_details
    }
    http.postRequest(requstUrl.lawyerSaveMatterForm, { data: JSON.stringify(parmas) }, function (res) {
      if (res.state) {
        Toast.success(res.msg);
        wx.navigateTo({
          url: '/pages/caseProgress/caseProgress?debtor_number=' + that.data.debtor_number
        })
      } else {
        Toast.fail(res.msg);
      }
    })
  },
  //返回上一页
  goBack() {
    wx.navigateBack({ changed: true });//返回上一页
  },
  //返回首页
  goHome(e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})