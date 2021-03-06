// pages/caseProgress/caseProgress.js
import { requstUrl } from "../../utils/requestUrl"
const http = require("../../utils/httputils")
import Toast from '../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    debtor_number: "", //债务编号
    show: false, //遮罩层状态
    active: 8, //当前第几步
    payment_request_object: '1', // 1律师费 2平台管理费
    List: [
      {
        id: "",
        matters_id: "a58a24b752dc4bf4ba6197faf3ced4be",
        from_name: "委托确认",
        f_sort: 0,
        estimated_time: "",
        interval_days: 3,
        completion_time: "",
        execution_status: 1,
        status: 0,
        create_time: "2020-11-03T14:53:54.67",
        time: null,
        type: 0
      },
      {
        id: "",
        matters_id: "",
        from_name: "分配律师",
        f_sort: 0,
        estimated_time: "",
        interval_days: 3,
        completion_time: "",
        execution_status: 1,
        status: 0,
        create_time: "2020-11-03T14:53:54.67",
        time: null,
        type: 1
      },
      {
        id: "",
        matters_id: "a58a24b752dc4bf4ba6197faf3ced4be",
        from_name: "签订律师代理合同",
        f_sort: 0,
        estimated_time: "",
        interval_days: 3,
        completion_time: "",
        execution_status: 1,
        status: 0,
        create_time: "2020-11-03T14:53:54.67",
        time: null,
        type: 2
      }
    ],
    CaseCourtData: {}, //法官信息
    caseTabs: ["债权人", "客服", "法官"],
    height: 0, //滚动区域高度
    img: "data:image/png;base64,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",
    img2: "data:image/png;base64,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",
    overlayTitle: '', //遮罩标题
    infoType: 0,
    info: { //弹窗信息
      court: [], //法院法官信息
      creditor: [], //债权人
      customer: [] //客服
    },
    isIPhoneX: false,
    contract: {}, //合同信息
    sign_status: false, //合同签署状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let height = wx.getSystemInfoSync().windowHeight - 115
    let debtor_number = options.debtor_number
    this.setData({
      height: height,
      debtor_number: debtor_number,
      isIPhoneX: app.globalData.isIPhoneX
    })
    this.getCaseMatters()
  },
  onShow() {

    this.getCaseCourt()
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
  //分类点击打开遮罩
  tab(e) {
    let index = e.currentTarget.dataset['index']
    if (index == 0) { //联系人
      this.setData({
        overlayTitle: "债权人联系方式",
        infoType: index,
        show: true,
      })
    }
    if (index == 1) { //客服
      this.setData({
        overlayTitle: "客服联系方式",
        infoType: index,
        show: true,
      })
    }
    if (index == 2) { //法庭信息
      let that = this
      that.getCaseCourt().then(res => {
        let Court = []
        let courtItem = {}
        if (res.length == 0) {
          courtItem = {
            entrust_case_matters_id: 0,
            children: [
              { name: "法院名称", prop: "court_name", value: "" },
              { name: "法庭名称", prop: "tribunal_name", value: "" },
              { name: "法官姓名", prop: "judge_name", value: "" },
              { name: "电话", prop: "telephone", value: "" },
            ]
          }
        } else {
          courtItem = {
            entrust_case_matters_id: 0,
            children: [
              { name: "法院名称", prop: "court_name", value: res[0].court_name },
              { name: "法庭名称", prop: "tribunal_name", value: res[0].tribunal_name },
              { name: "法官姓名", prop: "judge_name", value: res[0].judge_name },
              { name: "电话", prop: "telephone", value: res[0].telephone },
            ]
          }
        }
        Court.push(courtItem)
        that.setData({
          overlayTitle: "法官联系方式",
          "info.court": Court,
          show: true,
          infoType: index
        })
      })
    }
    if (index == 3) {
      let debtor_number = this.data.debtor_number
      let payment_request_object = this.data.payment_request_object
      wx.navigateTo({
        url: '/pages/requestFunds/requestFunds?debtor_number=' + debtor_number + '&type=' + payment_request_object
      })
    }
  },
  //关闭遮罩层
  onClickHide() {
    this.setData({ show: false });
  },
  //获取案件 WTB0000022_2
  getCaseMatters() {
    let that = this
    let debtor_number = that.data.debtor_number
    let array = that.data.List
    let array2 = []
    wx.request({
      url: requstUrl.getCaseMatters,
      data: { debtor_number, contract_type: 1 },
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let caseTabs = that.data.caseTabs
        let res = ress.data
        let matters = res.data.matters
        let matters_from = res.data.matters_from
        let contract = res.data.contract
        let sign_status = false
        let creditor = [
          { name: "姓名", prop: "court_name", value: res.data.creditor.creditor_name },
          { name: "邮箱", prop: "tribunal_name", value: res.data.creditor.creditor_email },
          { name: "电话", prop: "telephone", value: res.data.creditor.creditor_telphone },
        ]
        let customer_service = [
          { name: "姓名", prop: "court_name", value: res.data.customer_service.cs_name },
          { name: "邮箱", prop: "tribunal_name", value: res.data.customer_service.cs_email },
          { name: "电话", prop: "telephone", value: res.data.customer_service.cs_telphone },
        ]
        matters.forEach(item => {
          let arr = matters_from.filter(item2 => { return item2.matters_id == item.id })
          arr.forEach(item3 => { item3['matters_name'] = item.matters_name })
          array.forEach(item3 => { item3['matters_name'] = item.matters_name })
          array[0].completion_time = res.data.case_time || ''
          array[1].completion_time = res.data.lawyer.allocated_date || ''
          if (res.data.contract) {
            array[2].completion_time = res.data.contract.sign_time || ''
          }

          array2.push.apply(array2, arr)
        })
        let array3 = array.concat(array2)
        array3[1].execution_status = res.data.lawyer.lawyer_id == 0 ? -1 : 1
        array3[2].execution_status = res.data.contract == null ? -1 : res.data.contract.sign_status
        if (res.data.contract != null && res.data.contract.sign_status == 1) {
          sign_status = true
        }
        if (res.data.payment_request_object == '1') {
          caseTabs.push('律师费')
        } else {
          caseTabs.push('平台管理费')
        }
        that.setData({
          List: array3,
          'info.creditor': creditor,
          'info.customer': customer_service,
          contract: contract,
          payment_request_object: res.data.payment_request_object,
          caseTabs,
          sign_status
        })
      }
    })
  },
  //获取案件法官信息
  getCaseCourt() {
    let that = this
    return new Promise((resolve, reject) => {
      let debtor_number = that.data.debtor_number
      wx.request({
        url: requstUrl.getCaseCourt,
        data: { debtor_number },
        header: {
          'content-type': 'application/json',
          usertokey: app.globalData.token
        },
        success(ress) {
          let res = ress.data
          let data = res.data
          resolve(data)
        }
      })
    })
  },
  //法院信息更新提交 
  courtSubmit() {
    let that = this
    let data = that.data.info.court
    let parmas = {
      id: data[0].entrust_case_matters_id,
      debtor_number: that.data.debtor_number
    }
    data.forEach(item => {
      item.children.forEach(item2 => {
        parmas[item2.prop] = item2.value
      })
    })
    http.postRequest(requstUrl.updataCourt, parmas, function (res) {
      if (res.state) {
        that.setData({
          show: false,
        })
        setTimeout(() => {
          Toast.success(res.msg);
        }, 500);
      } else {
        that.setData({
          show: false,
        })
        setTimeout(() => {
          Toast.fail(res.msg);
        }, 500);

      }
    })
  },
  //法院信息输入绑定
  courtInput(e) {
    let value = e.detail.value
    let index = e.target.dataset.index
    let name = e.target.dataset.name
    let court = this.data.info.court
    court.forEach((item, idx) => {
      if (idx == index) {
        item.children.forEach(item2 => {
          if (item2.prop == name) {
            item2.value = value
          }
        })
      }
    })
    this.setData({
      'info.court': court
    })
  },
  //跳转事项详情
  goInfo(e) {
    let index = e.currentTarget.dataset.index
    let status2 = e.currentTarget.dataset.status
    let status = this.data.List[index == 0 ? index : index - 1].execution_status
    let type = e.currentTarget.dataset.type
    let debtor_number = this.data.debtor_number
    let contract_number = this.data.contract_number
    if (type == 0) {
      wx.navigateTo({
        url: '/pages/caseInfo/caseInfo?debtor_number=' + debtor_number
      })
      return false
    }
    if (type == 1) {
      return false
    }
    if (type == 2) {
      if (status2 == 1) {
        return false
      }
      if (status2 == -1) {
        Toast.fail('合同生成中');
        return false
      }
      let contract_id = this.data.contract.id
      http.getRequest(requstUrl.ContractNotice, { contract_id }, function (res) {
        if (res.state) {
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      })
      return false
    }
    if (status <= 0) {
      Toast.fail('请按顺序办案');
      return false
    }
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/caseProgressInfo/caseProgressInfo?id=' + id + "&name=" + name + "&debtor_number=" + debtor_number
    })
  },
  //返回首页
  goHome(e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  //律师费请款
  QKBtn() {
    let debtor_number = this.data.debtor_number
    let payment_request_object = this.data.payment_request_object
    wx.navigateTo({
      url: '/pages/requestFunds/requestFunds?debtor_number=' + debtor_number + '&type=' + payment_request_object
    })
  }
})