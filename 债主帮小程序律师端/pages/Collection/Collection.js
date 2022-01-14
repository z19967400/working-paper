// pages/requestFundsInfo/requestFundsInfo.js
const app = getApp()
import { requstUrl } from "../../utils/requestUrl"
const http = require("../../utils/httputils")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '律所收款信息',
    height: '',
    list: [
      { id: 'Invoice_Type_2', name: '增值税专用发票(纸质)' },
      { id: 'Invoice_Type_0', name: '增值税普通发票(电子)' }
    ],
    defaultOption: {
      id: 'Invoice_Type_2',
      name: '增值税专用发票(纸质)'
    },
    //收款信息
    invoice: {
      id: 0,
      invoice_type: '',
      invoice_tax_rate: '',
      account_name: '',
      account_number: '',
      bank_full_name: '',
      bank_no: '',
      telephone: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      debtor_number: options.debtor_number,
      height: wx.getSystemInfoSync().windowHeight - 135,
      isIPhoneX: app.globalData.isIPhoneX
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  },
  //发票类型选择回调
  onChange(event) {
    let invoice = this.data.invoice
    invoice.invoice_type = event.detail.id
    if (event.detail.id == 'Invoice_Type_2') {
      invoice.invoice_tax_rate = 6
    } else {
      invoice.invoice_tax_rate = 1
    }
    this.setData({
      invoice
    })
  },
  //普通输入框回调
  onChange2(event) {
    let invoice = this.data.invoice
    Object.keys(invoice).forEach(key => {
      if (event.target.dataset.prop == key) {
        invoice[key] = event.detail.value
      }
    })
    this.setData({
      invoice
    })
  }
})