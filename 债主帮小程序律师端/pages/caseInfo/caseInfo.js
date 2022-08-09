// pages/caseInfo/caseInfo.js
const app = getApp()
import { requstUrl } from "../../utils/requestUrl"
const http = require("../../utils/httputils")
import Toast from '../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneX: false,
    show: false, //弹出层状态
    btnLoad: false, //接案按钮加载状态
    btnDisabled: false,// 接案按钮禁用状态
    debtor_number: "",
    height: 0,
    case_received: false, //是否接案
    is_allocated: false, //是否已分配案件
    info: {
      //基本信息
      basic: [
        { name: "案件编号", value: "-", prop: "debtor_number", type: true },
        { name: "案件类型", value: "-", prop: "collection_scene", type: true },
        { name: "案件评级", value: "-", prop: "case_rating", type: true },
        { name: "律师费模式", value: "-", prop: "service_fee_mode", type: true },
        { name: "风险服务费", value: "-", prop: "final_lawyer_risk_fee", type: false },
        { name: "固定服务费", value: "-", prop: "final_lawyer_fixed_fee", type: false },
        { name: "固定+风险", value: "-", prop: "gf_fixed_service_fee", type: false },
        // { name: "风险部分平台管理费", value: "-", prop: "commission_manage_rate_f", type: true }
      ],
      //债权人
      creditor: [
        { name: "委托人", value: "-", prop: "creditor_name", type: "Creditor_states" },
        // { name: "委托人类型", value: "", prop: "creditor_type" },
        // { name: "代理人姓名", value: "", prop: "agent_name" },
        // { name: "代理人身份证号", value: "", prop: "agent_id_number" },
        // { name: "代理人授权书", value: "", prop: "agent_authorization" },
        { name: "手机号码", value: "-", prop: "creditor_telphone", type: "Creditor_states" },
        { name: "电子邮箱", value: "-", prop: "creditor_email", type: "Creditor_states" },
        { name: "详细地址", value: "-", prop: "detailed_address", type: "Creditor_states" },
        // { name: "负责人姓名", value: "-", prop: "creditor_name", type: "Creditor_states_0" },
        // { name: "身份证号码", value: "-", prop: "id_card_no", type: "Creditor_states_1" }
        // { name: "证件种类 ", value: "", prop: "id_type" },
        // { name: "身份证正面 ", value: "", prop: "id_card_img_01" },
        // { name: "身份证反面 ", value: "", prop: "id_card_img_02" }
      ],
      //债务人  企业:Creditor_states_0 个人:Creditor_states_1 通用 Creditor_states
      obligor: [
        { name: "企业名称", value: "-", prop: "debtor_name", type: "Creditor_states_0", show: false },
        { name: "负责人姓名", value: "-", prop: "contact_person", type: "Creditor_states_0", show: false },
        { name: "债务人姓名", value: "-", prop: "debtor_name", type: "Creditor_states_1", show: false },
        { name: "身份证号码", value: "-", prop: "id_card_no", type: "Creditor_states_1", show: false },
        { name: "手机号码", value: "-", prop: "phone_number", type: "Creditor_states", show: false },
        { name: "地址", value: "-", prop: "detailed_address", type: "Creditor_states", show: false },
        // { name: "电子邮箱", value: "-", prop: "email", type: "Creditor_states", show: false },
        { name: "债务币种", value: "-", prop: "currency_id", type: "Creditor_states", show: true },
        { name: "债务本金", value: "-", prop: "arrears_principal", type: "Creditor_states", show: true },
        { name: "利息/违约金/滞纳金", value: "-", prop: "arrears_interest", type: "Creditor_states", show: true },
        { name: "约定付款日期", value: "-", prop: "agreed_payment_date", type: "Creditor_states", show: true },
        { name: "担保类型", value: "-", prop: "guarantee_type", type: "Creditor_states_0", show: true },
        { name: "担保", value: "-", prop: "guarantee_type", type: "Creditor_states_1", show: true },
        { name: "债务人状态", value: "-", prop: "debtor_status", type: "Creditor_states", show: true },
        // { name: "借款方式", value: "-", prop: "borrow_money_mode", type: "Creditor_states_0", show: true },
        { name: "债务人财产线索", value: "-", prop: "property_clues", type: "Creditor_states", show: true },
        { name: "财产线索补充", value: "-", prop: "property_clues_bc", type: "Creditor_states", show: true },
        // { name: "债务确认方式", value: "-", prop: "confirmation_method", type: "Creditor_states", show: true },
        { name: "最后一次催款日期", value: "-", prop: "confirmation_date", type: "Creditor_states", show: true },
        { name: "现有证据", value: "-", prop: "available_evidence", type: "Creditor_states", show: true },
        { name: "其他证据", value: "-", prop: "other_evidence", type: "Creditor_states", show: true },
        { name: "是否存在争议", value: "-", prop: "is_dispute", type: "Creditor_states", show: true },
        { name: "案件管辖地区", value: "-", prop: "jurisdiction_01_select", prop2: 'jurisdiction_01_txt', type: "Creditor_states", show: true },
        { name: "案件管辖地区一", value: "-", prop: "jurisdiction_02_select", prop2: 'jurisdiction_02_txt', type: "Creditor_states", show: true },
        { name: "案件管辖地区二", value: "-", prop: "jurisdiction_03_select", prop2: 'jurisdiction_03_txt', type: "Creditor_states", show: true },
        { name: "委托事项", value: "-", prop: "entrusted_matters", type: "Creditor_states", show: true },
        { name: "其他委托事项", value: "-", prop: "other_entrustment", type: "Creditor_states", show: true },
        { name: "备注", value: "-", prop: "d_remarks", type: "Creditor_states", show: true }
      ],
      //债务详情
      // debt: [
      //   { name: "债务本金", value: "", prop: "arrears_principal" },
      //   { name: "违约金", value: "", prop: "arrears_interest" }
      // ]
    },
    reason: [
      { name: "有胜诉把握", status: false },
      { name: "熟悉债务人", status: false },
      { name: "优势社会资源", status: false },
      { name: "充裕时间精力", status: false },
      { name: "业务经验丰富", status: false },
    ],
    otheReason: "", //其他理由
    currencys: [] //币种
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
  onShow() {
    this.getCaseType()
    this.getInfo()
    this.getCurrency()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //返回上一页
  goBack() {
    app.router.navigateBack({ changed: true });//返回上一页
  },
  //接案
  meetCase(e) {
    const that = this
    var token = wx.getStorageSync('token7')
    wx.request({
      url: requstUrl.getlawInfo,
      data: {},
      header: {
        'content-type': 'application/json',
        usertokey: token
      },
      success(res) {
        // let code = app.globalData.lawInfo.code
        let code = res.data.code
        if (code == -1) { //未认证
          app.router.navigateTo({
            url: '/pages/authentication/authentication'
          })
        } else if (code == 2) { //认证通过
          that.setData({
            btnLoad: true,
            show: true
          })
        } else { //待审核 或 未通过
          app.router.navigateTo({
            url: '/pages/examine/examine?type=' + code
          })
        }
      }
    })
  },
  //获取详情
  getInfo() {
    let that = this
    let debtor_number = that.data.debtor_number
    wx.request({
      url: requstUrl.getCaseInfo,
      data: { debtor_number },
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let res = ress.data
        let debtor_type = res.data.debtor.debtor_type
        let service_fee_mode = res.data.quoted_price.customer_select
        service_fee_mode = service_fee_mode == 2 ? '固定+风险' : service_fee_mode == 0 ? "纯固定" : "纯风险"
        if (service_fee_mode == '纯风险') {
          that.data.info.basic[4].type = true
        }
        if (service_fee_mode == '纯固定') {
          that.data.info.basic[5].type = true
        }
        if (service_fee_mode == '固定+风险') {
          that.data.info.basic[6].type = true
        }
        res.data.case_details.service_fee_mode = service_fee_mode
        let basic = that.data.info.basic
        let creditor = that.data.info.creditor.filter((item) => { return item.type == debtor_type || item.type == 'Creditor_states' })
        let obligor = that.data.info.obligor.filter((item) => { return item.type == debtor_type || item.type == 'Creditor_states' })
        if (res.data.case_details != null) {
          basic.forEach(item => {
            if (item.name == '固定+风险') {
              item.value = res.data.quoted_price['final_lawyer_fixed_fee'] + "元" + " + " + res.data.quoted_price['final_lawyer_risk_fee'] + '%'
            } else if (item.name == '风险服务费') {
              item.value = res.data.quoted_price[item.prop] + '%'
            } else if (item.name == '固定服务费') {
              item.value = res.data.quoted_price[item.prop]
            } else {
              item.value = res.data.case_details[item.prop]
            }

          })
        }
        if (res.data.creditor != null) {
          creditor.forEach(item => {
            if (item.prop == 'creditor_type') {
              item.value = res.data.creditor[item.prop]
            } else {
              let value = ''
              if (item.name == '委托人' || item.name == '详细地址') {
                value = res.data.creditor[item.prop] || '-'
              } else {
                value = res.data.debtor[item.prop] || '-'
              }

              item.value = that.data.is_allocated ? value : "仅接案律师可见"
            }
          })
        }
        if (res.data.debtor != null) {
          obligor.forEach(item => {
            if (item.show) {
              if (item.prop == 'currency_id') {
                item.value = that.getCurrencyName(res.data.debtor[item.prop])
              } else if (item.name == '债务本金' || item.name == '利息/违约金/滞纳金') {
                item.value = res.data.debtor[item.prop].toLocaleString() + ' 元'
              } else if (item.name == '案件管辖地区' || item.name == '案件管辖地区一' || item.name == '案件管辖地区二') {
                item.value = res.data.debtor[item.prop] || res.data.debtor[item.prop2] || '-'
              } else if (item.prop === 'confirmation_date') {
                if (res.data.debtor[item.prop].indexOf('T') != -1) {
                  let val = res.data.debtor[item.prop].replace('T', ' ')
                  item.value = val.substring(0, val.lastIndexOf('.'))
                } else {
                  item.value = res.data.debtor[item.prop]
                }

              } else {
                item.value = res.data.debtor[item.prop] || '-'
              }
            } else {
              let value = res.data.debtor[item.prop] || '-'
              item.value = that.data.is_allocated ? value : "仅接案律师可见"
              // item.value = value
            }
          })
        }
        let info = {
          basic,
          creditor,
          obligor
        }
        that.setData({
          info: info,
        })
      }
    })
  },
  //获取案件状态
  getCaseType() {
    let that = this
    let debtor_number = that.data.debtor_number
    wx.request({
      url: requstUrl.getCaseType,
      data: { debtor_number },
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(res) {
        let case_received = res.data.data.case_received
        let is_allocated = res.data.data.is_allocated
        that.setData({
          is_allocated: is_allocated,
          case_received: case_received
        })
      }
    })
  },
  //其他理由
  otheReason(e) {
    let text = e.detail.value
    this.setData({
      otheReason: text
    })
  },
  //关闭弹出层
  onClose() {
    this.setData({
      show: false,
      btnLoad: false
    })
  },
  //选择抢单理由
  selectReason(e) {
    let index = e.target.dataset.index
    let data = this.data.reason
    data.forEach((item, idx) => {
      if (idx == index) {
        item.status = !item.status
      }
    })
    this.setData({
      reason: data
    })
  },
  //提交理由
  reasonSubmit() {
    let that = this
    let data = that.data.reason
    let text = ""
    data.forEach(item => {
      if (item.status) {
        text += item.name + ','
      }
    })
    text += that.data.otheReason
    let order_grabbing_reasons = text
    let debtor_number = that.data.debtor_number
    http.getRequest(requstUrl.receCase, { debtor_number, order_grabbing_reasons }, function (res) {
      that.setData({
        btnLoad: false,
        show: false
      })
      if (res.state) {
        Toast.success(res.msg);
        setTimeout(() => {
          app.router.navigateTo({
            url: '/pages/cases/cases'
          })
        }, 1000);
      } else {
        Toast.fail(res.msg);
      }
    })
  },
  //跳转进程
  goProcess(e) {
    let debtor_number = e.currentTarget.dataset.debtor_number
    app.router.navigateTo({
      url: '/pages/caseProgress/caseProgress?debtor_number=' + debtor_number
    })
  },
  //获取后台设置的币种类别
  getCurrency() {
    let that = this
    // const p = new Promise((resolve, reject) => {
    wx.request({
      url: requstUrl.GetAllCurrency,
      data: {},
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(res) {
        let currencys = res.data.data
        // resolve(currencys)
        that.setData({
          currencys
        })
      },
      // catch(err) {
      //   reject(err)
      // }
    })
    // })
    // return p
  },
  getCurrencyName(id) {
    let that = this
    let value = ''
    let currencys = that.data.currencys
    let actCurrency = currencys.filter(item => { return item.id == id; })
    if (actCurrency.length != 0) {
      value = actCurrency[0].currency_name
    }
    return value
  },
  goHome(e) {
    app.router.navigateTo({
      url: '/pages/index/index',
    })
  },
})