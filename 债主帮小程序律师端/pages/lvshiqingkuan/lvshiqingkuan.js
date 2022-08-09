// pages/requestFunds/requestFunds.js
const app = getApp()
import { requstUrl } from "../../utils/requestUrl"
const http = require("../../utils/httputils")

// pages/lvshiqingkuan/lvshiqingkuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    debtor_number: '',
    height: '',
    index: 0,
    index2: 0,
    Currency: [],
    fangshi: ['给付', '折抵', '其他'],
    parmas: {
      collection_currency_id: 1,
      collection_amount: '',
      collection_mode: '给付',
      collection_date: '',
      collection_remarks: ''
    },
    FxRiskFee: '', //风险律师费率
    lawyerFee: 0,
    show2: false,
    caseOff: '',
    textToast: false,
    ToastText: ''
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

  //币种选择
  onChange(event) {
    let parmas = this.data.parmas
    parmas.collection_currency_id = event.target.dataset.id
    this.setData({
      parmas,
      index: event.detail.value
    })
  },

  //回款方式选择
  onChange2(event) {
    let parmas = this.data.parmas
    parmas.collection_mode = this.data.fangshi[event.detail.value]
    this.setData({
      parmas,
      index2: event.detail.value
    })
  },

  //请款日期选择
  bindDateChange(event) {
    let parmas = this.data.parmas
    parmas.collection_date = event.detail.value
    this.setData({
      parmas,
    })
  },

  //输入框输入回调
  onChange3(event) {
    let parmas = this.data.parmas
    parmas[event.target.dataset.prop] = event.detail.value
    this.setData({
      parmas,
    })
  },

  //重新计算律师费
  Recalculate() {
    if (this.data.parmas.collection_amount == 0) {
      this.openTextToast('回款金额不可为空')
      return false
    }
    let prime = this.data.parmas.collection_amount * (this.data.FxRiskFee * 0.01)
    this.setData({
      lawyerFee: prime.toFixed(2),
      show2: true
    })
  },

  //获取案件报价
  GetCaseQuotedPrice() {
    const that = this
    http.getRequest(requstUrl.GetCaseQuotedPrice, { debtor_number: that.data.debtor_number }, function (res) {
      that.setData({
        caseOff: res.data,
        FxRiskFee: res.data.final_lawyer_risk_fee
      })
    })
  },

  openTextToast(text) {
    this.setData({
      textToast: true,
      ToastText: text
    });
    setTimeout(() => {
      this.setData({
        hideTextToast: true,
      });
      setTimeout(() => {
        this.setData({
          textToast: false,
          hideTextToast: false,
        });
      }, 300);
    }, 3000);
  },

  //下一步
  next() {
    if (!this.data.show2) {
      this.Recalculate()
    } else {
      const that = this
      let parmas = this.data.parmas
      parmas['type'] = 1
      parmas['debtor_number'] = that.data.debtor_number
      parmas['lawyer_fixed_fee'] = 0
      http.postRequest(requstUrl.AddCaseFinance, parmas, function (res) {
        if (res.state) {
          // that.openTextToast(res.msg)
          app.router.navigateTo({
            url: '/pages/requestFunds/requestFunds?debtor_number=' + that.data.debtor_number
          })
        } else {
          // that.openTextToast(res.msg)
        }
      })
    }
  },

  //上一步
  shangyibu() {
    this.setData({
      show2: false
    })
  },
  //获取今天日期
  getDate() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var dates = date.getDate()
    var arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var day = date.getDay()
    return year + '-' + month + '-' + dates
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let parmas = this.data.parmas
    parmas.collection_date = this.getDate()
    this.setData({
      debtor_number: options.debtor_number,
      height: wx.getSystemInfoSync().windowHeight - 135,
      parmas: parmas
    })
    this.getAllCurrency()
    this.GetCaseQuotedPrice()
  },

  //返回上一页
  goBack() {
    app.router.navigateBack({ changed: true });//返回上一页
  },

  //返回首页
  goHome(e) {
    app.router.navigateTo({
      url: '/pages/index/index',
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

  }
})