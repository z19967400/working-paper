//index.js
//获取应用实例
const app = getApp()
const http = require("../../utils/httputils")
import { requstUrl } from "../../utils/requestUrl"
import Toast from '../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    firstLoad: true,
    isIPhoneX: false,
    debtor_number: "",
    motto: 'Hello World',
    userInfo: {},
    show: false, //侧边弹出层状态
    activeKey: 0,// 侧边导航栏当前下标
    caseTabs: ['新案件', '进行中', '已完成'], //案件分类
    caseTabIndex: 0, //案件列表当前分类下标
    list: [], //案件列表数据
    page: 1, //当前页数
    limit: 12, //每页多少条,
    type: 0,  //订单类型 0 ： 新单 1：进行中 2：已完成
    total: 0, //当前页订单数
    navLeft: [
      { name: "案件列表", path: "/pages/cases/cases" },
      { name: "律师管理", path: "/pages/authentication/authentication" }
    ],
    lawInfo: {},//律师认证信息
    swiperData: [ //轮播图数据
      { title: "优质案源", imgSrc: "http://file.debteehelper.com/weapp-img/img1.png", text: "来自世界五百强企业、上市公司、银行、金融机构、保险公司、中小企业的海量真实优质案源，实时推送给各地的平台律师" },
      { title: "共享收益", imgSrc: "http://file.debteehelper.com/weapp-img/img2.png", text: "大数据案件智能评系统，筛除劣质委托案件。用户、平台、律师各方利益绑定，风险共担，收益共享" },
      { title: "平台赋能", imgSrc: "http://file.debteehelper.com/weapp-img/img3.png", text: "律师办公自动化系统，提高律师办案效率；标准化法催案件管理系统，确保办案质量及用户满意度" },
      { title: "合作共赢", imgSrc: "http://file.debteehelper.com/weapp-img/img4.png", text: "打破壁垒 自由组合 跨所联手 异地合作" },
      { title: "与众不同", imgSrc: "http://file.debteehelper.com/weapp-img/img5.png", text: "大数据智能优选律师系统，优选案件当地平台律师。不卖排名、不卖广告、无需恶性竞价、无需关系应酬" }
    ],
    listData: [
      { src: "http://www.debteehelper.com/assets/imgs/index/Icon33@2x.png", text1: "160 +", text2: "全球服务国家160+" },
      { src: "http://www.debteehelper.com/assets/imgs/index/Icon20@2x.png", text1: "10万 +", text2: "处理案件累计10万+" },
      { src: "http://www.debteehelper.com/assets/imgs/index/Icon23@2x.png", text1: "1万 +", text2: "服务用户累计1万+" },
      { src: "http://www.debteehelper.com/assets/imgs/index/Icon1@2x.png", text1: "600 +", text2: "中国服务城市600+" },
      { src: "http://www.debteehelper.com/assets/imgs/index/Icon99@2x.png", text1: "50亿 +", text2: "回款金额累计50亿+" },
      { src: "http://www.debteehelper.com/assets/imgs/index/Icon62@2x.png", text1: "2万 +", text2: "平台律师累计2万+" },
    ],
    imgs: [
      "/assets/imgs/index/logo/cooperation1.png",
      "/assets/imgs/index/logo/cooperation2.png",
      "/assets/imgs/index/logo/cooperation3.png",
      "/assets/imgs/index/logo/cooperation4.png",
      "/assets/imgs/index/logo/cooperation5.png",
      "/assets/imgs/index/logo/cooperation6.png",
      "/assets/imgs/index/logo/cooperation7.png",
      "/assets/imgs/index/logo/cooperation8.png",
      "/assets/imgs/index/logo/cooperation9.png",
      "/assets/imgs/index/logo/cooperation10.png",
      "/assets/imgs/index/logo/cooperation11.png",
      "/assets/imgs/index/logo/cooperation12.png",
      "/assets/imgs/index/logo/cooperation13.png",
      "/assets/imgs/index/logo/cooperation14.png",
      "/assets/imgs/index/logo/cooperation15.png",
      "/assets/imgs/index/logo/cooperation16.png",
      "/assets/imgs/index/logo/cooperation17.png",
      "/assets/imgs/index/logo/cooperation18.png",
      "/assets/imgs/index/logo/cooperation19.png",
      "/assets/imgs/index/logo/cooperation20.png",
      "/assets/imgs/index/logo/cooperation21.png",
      "/assets/imgs/index/logo/cooperation22.png",
      "/assets/imgs/index/logo/cooperation23.png",
      "/assets/imgs/index/logo/cooperation24.png",
      "/assets/imgs/index/logo/cooperation25.png",
      "/assets/imgs/index/logo/cooperation26.png",
      "/assets/imgs/index/logo/cooperation27.png",
      "/assets/imgs/index/logo/cooperation28.png",
      "/assets/imgs/index/logo/cooperation29.png",
      "/assets/imgs/index/logo/cooperation30.png",
      "/assets/imgs/index/logo/cooperation31.png",
      "/assets/imgs/index/logo/cooperation32.png"
    ],
    height: 0
  },
  onLoad: function () {
    this.getCaseList()
    this.setData({
      height: wx.getSystemInfoSync().windowHeight - 175,
      isIPhoneX: app.globalData.isIPhoneX,
      lawInfo: app.globalData.lawInfo,
    })

  },
  onShow() {
    if (this.data.firstLoad) {
      this.setData({
        firstLoad: false
      })
    } else {
      this.setData({
        page: 1,
        list: []
      })
      this.getCaseList()
    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //跳转认证或案件列表
  authentication() {
    let code = this.data.lawInfo.code
    if (code == -1) { //未认证
      wx.navigateTo({
        url: '/pages/authentication/authentication'
      })
    } else if (code == 2) { //认证通过
      wx.navigateTo({
        url: '/pages/cases/cases'
      })
    } else { //待审核 或 未通过
      wx.navigateTo({
        url: '/pages/examine/examine?type=' + code
      })
    }

  },
  //获取律师认证详情
  getLawInfo() {
    let that = this
    return new Promise((resolve, reject) => {
      http.getRequest(requstUrl.getlawInfo, {}, function (res) {
        that.setData({
          lawInfo: res
        })
        resolve(res)
      })
    })
  },
  //导航菜单打开侧边弹出层
  showPopup() {
    this.setData({
      show: true
    })
  },
  //侧边弹出层关闭
  onClose() {
    this.setData({
      show: false
    })
  },
  //侧边栏跳转
  navTo(e) {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  },
  //获取案件列表
  getCaseList() {
    let that = this
    let parmas = {
      page: that.data.page,
      limit: that.data.limit,
      type: that.data.type
    }
    wx.request({
      url: requstUrl.getCaseList,
      data: parmas,
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(res) {
        let total = res.data.total
        let arr = that.data.list
        let arr2 = arr.concat(res.data.list)
        arr2.forEach(item => {
          item.exhibition_lawyer_fee = (item.exhibition_lawyer_fee / 10000).toFixed(2)
        })
        that.setData({
          list: arr2,
          total: total
        })
      }
    })
  },
  //分类点击事件
  tab(e) {
    this.setData({
      caseTabIndex: e.currentTarget.dataset['index'],
      type: e.currentTarget.dataset['index'],
      page: 1,
      list: []
    })
    this.getCaseList()
  },
  //跳转订单详情
  caseInfo(e) {
    let debtor_number = e.currentTarget.dataset.debtor_number
    wx.navigateTo({
      url: '/pages/caseInfo/caseInfo?debtor_number=' + debtor_number,
    })
  },
  //返回首页
  goHome(e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  // //预计律师费处理
  // fee(num) {
  //   let val = num / 10000
  //   return val.toFixed(2)
  // },
  //返回上一页
  goBack() {
    wx.navigateBack({ changed: true });//返回上一页
  },
})
