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
    payment_request_object: '1', //1律师费 //2平台管理费
    list: [], //请款记录
    height: '',
    show: false, //选择弹窗
    show2: false,
    active: 1, //选项步骤
    type: '1', //请款类别 1：固定服务费 2:风险服务费
    price: '', //请款金额 固定服务费
    Currency: [],
    minHour: 10,
    maxHour: 20,
    minDate: new Date(1970, 10, 1).getTime(),
    maxDate: new Date(2050, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    time: '', //请款日期
    caseOff: {} //案件报价信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      debtor_number: options.debtor_number,
      payment_request_object: options.type,
      height: wx.getSystemInfoSync().windowHeight - 135,
      isIPhoneX: app.globalData.isIPhoneX
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAllCurrency()
    this.GetCaseQuotedPrice()
    this.GetFinancialRecords()
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
  //获取案件报价
  GetCaseQuotedPrice() {
    const that = this
    http.getRequest(requstUrl.GetCaseQuotedPrice, { debtor_number: that.data.debtor_number }, function (res) {
      that.setData({
        caseOff: res.data
      })
    })
  },
  //获取案件请款记录
  GetFinancialRecords() {
    const that = this
    http.getRequest(requstUrl.GetFinancialRecords, { debtor_number: that.data.debtor_number }, function (res) {
      that.setData({
        list: res.data
      })
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
  },
  //关闭选择弹窗
  close() {
    const caseOff = this.data.caseOff
    if (caseOff.customer_select == '-1' || caseOff.customer_select == '2') {
      //未选择报价或选择固定+风险
      this.setData({
        show: false,
        active: 1,
        type: '1'
      })
    } else {
      //选择固定或风险报价
      this.setData({
        show: false,
        active: 2,
        type: caseOff.customer_select == 0 ? '1' : '2'
      })
    }

  },
  //获取选择组件返回值1
  getSelectVal1(e) {
    this.setData({
      type: e.detail,
      active: 2
    })
  },
  //选择固定服务费请款
  getSelectVal2(e) {
    const that = this
    if (e.detail == '') {
      Toast('金额不能为空')
      return false
    }
    let parmas = {
      type: 0,
      debtor_number: that.data.debtor_number,
      collection_currency_id: 0,
      collection_amount: 0,
      collection_mode: '',
      collection_date: '',
      collection_remarks: '',
      lawyer_fixed_fee: e.detail
    }
    http.postRequest(requstUrl.AddCaseFinance, parmas, function (res) {
      if (res.state) {
        that.close()
        that.GetFinancialRecords()
      } else {
        Toast(res.msg)
        that.close()
      }
    })
  },
  //风险服务返回值
  getSelectVal3(event) {
    const that = this
    let parmas = event.detail
    parmas['type'] = 1
    parmas['debtor_number'] = that.data.debtor_number
    parmas['lawyer_fixed_fee'] = 0
    console.log(event);
    http.postRequest(requstUrl.AddCaseFinance, parmas, function (res) {
      if (res.state) {
        that.close()
        that.GetFinancialRecords()
      } else {
        Toast(res.msg)
        that.close()
      }
    })
  },
  //打开选择弹窗
  openSelect() {
    const that = this
    http.getRequest(requstUrl.GetInvoiceAndTicketAddress, {}, function (res) {
      if (res.data.invoice !== null && res.data.ticket_address !== null) {
        that.setData({
          show: true
        })
      } else {
        Toast('请完善发票信息和收票信息')
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/requestFundsInfo/requestFundsInfo?debtor_number=' + that.data.debtor_number
          })
        }, 2000);
      }
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
    let time = this.getYMDHMS(event.detail)
    this.setData({
      time: time,
      show2: false
    });
  },
  //关闭时间选择
  cancel() {
    this.setData({
      show2: false
    })
  },
  //打开时间选择
  openTimeBox() {
    this.setData({
      show2: true
    })
  },
  //时间戳转化
  getYMDHMS(timestamp) {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const date = (time.getDate()).toString().padStart(2, '0')
    const hours = (time.getHours()).toString().padStart(2, '0')
    const minute = (time.getMinutes()).toString().padStart(2, '0')
    const second = (time.getSeconds()).toString().padStart(2, '0')
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
  }
})