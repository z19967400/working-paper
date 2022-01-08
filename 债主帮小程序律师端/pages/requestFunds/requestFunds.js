// pages/requestFunds/requestFunds.js
const app = getApp()
import { requstUrl } from "../../utils/requestUrl"
const http = require("../../utils/httputils")
import Toast from '../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '律师费请款',
    debtor_number: '',
    isIPhoneX: false,
    list: [1, 2, 3], //请款记录
    height: '',
    show: true, //选择弹窗
    show2: false,
    active: 2, //选项步骤
    type: '2', //请款类别 1：固定服务费 2:风险服务费
    price: '', //请款金额 固定服务费
    Currency: [],
    minHour: 10,
    maxHour: 20,
    minDate: new Date(1970, 10, 1).getTime(),
    maxDate: new Date(2050, 10, 1).getTime(),
    currentDate: new Date().getTime(),
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
    this.getAllCurrency()
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
  //关闭选择弹窗
  close() {
    this.setData({
      show: false,
      active: 1
    })
  },
  //获取选择组件返回值1
  getSelectVal1(e) {
    this.setData({
      type: e.detail,
      active: 2
    })
  },
  //获取固定金额返回值
  getSelectVal2(e) {
    this.setData({
      price: e.detail,
    })

  },
  //打开选择弹窗
  openSelect() {
    this.setData({
      show: true
    })
  },
  //获取所有币种
  getAllCurrency() {
    const that = this
    http.getRequest(requstUrl.GetAllCurrency, {}, function (res) {
      that.setData({
        Currency: res.data
      })
    })
  },
  //时间选择确认
  onInput(event) {
    console.log(event);
    this.setData({
      currentDate: event.detail,
    });
  },
  //关闭时间选择
  cancel() {
    this.setData({
      show2: false
    })
  }
})