//index.js
//获取应用实例
const app = getApp()
import areaList from "../../utils/area"
import Toast from '../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
import { checkPhone, checkEmail, checkIdCard } from "../../utils/util"
import { requstUrl } from "../../utils/requestUrl"
import Dialog from '../../miniprogram/miniprogram_npm/vant-weapp/dialog/dialog';
const http = require("../../utils/httputils")
Page({
  data: {
    height: 0,
    show3: false, //专长选择弹出层
    agreement: {//协议内容
      show: false,
      title: '',
      content: ''
    },
    genders: ["男", "女"], //性别选项数据
    checked1: false, //平台服务协议
    checked2: false, //隐私政策
    regions: areaList, //地区选择数据
    expertiseTypes: ["专长1", "专长2", "专长3"], //专长类型选择数据
    expertiseYsTypes: [], //专长原始数据
    autosize: { maxHeight: 100, minHeight: 50 },
    multiIndex: [0, 0, 0], //地区默认选择值
    multiIndex: [0, 0, 0],//律所地区默认选择值
    multiArray: [[], [], []], //地区默认数据
    multiArray2: [[], [], []], //律所地区默认数据
    authenticationData: { //认证信息
      name: "", //真实姓名
      IdCard: "", //身份证号码
      phoneNumber: "", //手机号码
      region: "", //地区
      // address: "",//详细地址
      LawFregion: "", //律所地区
      LawAddress: "", //律所详细地址
      email: "",//邮箱
      fileList: [], //执业证内页图片文件列表
      fileList2: [], //年检页照
      expertiseType: "", //专长类型
      LawFirm: "", //律所
      PracticeId: "", //执业证号
      introduce: "", //简介
      law_firm_address_city: "",
      law_firm_address_country: "",
      law_firm_address_county: "",
      law_firm_address_province: ""
    },
    authenticationCheck: { //认证信息校验提示
      nameMsg: "",
      IdCardMsg: "",
      phoneNumberMsg: "",
      emailMsg: "",
      expertiseTypeMsg: "",
      LawFirmMsg: "",
      PracticeIdMsg: "",
      // addressMsg: "",
      LawAddressMsg: ""
    },
    lawRegions: [], //律师地区id集合
    lawFirmRegions: [], //律所地区id集合
    practice_license: '',//律师证照地址
    annual_inspection: "", //年检页照
    expertise: [], //专长编码集合
    mainActiveIndex: 0,
    activeId: [],
    max: 5,
    tempFilePaths: "", //图片展示
    isIPhoneX: false,
    authenticationType: 0, // 认证状态
    authenticationTypeNmaes: ['未认证', '待审核', '审核未通过', '已认证'],
    editType: true //编辑状态
  },
  onLoad: function () {
    var that = this
    that.setData({
      height: wx.getSystemInfoSync().windowHeight - 135,
      isIPhoneX: app.globalData.isIPhoneX
    })
    that.getLawInfo()
    that.getRegion(1, 3752).then(res => {
      that.setData({
        'multiArray[0]': res,
        'multiArray2[0]': res
      })
    })
    that.getRegion(2, 2).then(res => {
      that.setData({
        'multiArray[1]': res,
        'multiArray2[1]': res
      })
    })
    that.getRegion(3, 3).then(res => {
      that.setData({
        'multiArray[2]': res,
        'multiArray2[2]': res
      })
    })
    that.getType()
    this.getLawInfo()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // onTabItemTap(item) {
  //   console.log(item.index)
  //   console.log(item.pagePath)
  //   console.log(item.text)
  // },
  //小程序显示
  onShow() {
    //
  },
  //获取律师认证详情
  getLawInfo: function (e) {
    let that = this
    wx.request({
      url: requstUrl.getlawInfo,
      data: {},
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let res = ress.data
        that.setData({
          editType: res.code == -1 || res.code == 1
        })
        if (res.data == null) {
          return false
        }
        let practice_license = that.strIntercept(res.data.practice_license) == 'https:' || that.strIntercept(res.data.practice_license) == 'http:' ? res.data.practice_license : 'http://file.debteehelper.com/' + res.data.practice_license
        let annual_inspection = that.strIntercept(res.data.annual_inspection) == 'https:' || that.strIntercept(res.data.annual_inspection) == 'http:' ? res.data.annual_inspection : 'http://file.debteehelper.com/' + res.data.annual_inspection
        if (res.data != null) {
          let pamras = { //认证信息
            name: res.data.lawyer_name, //真实姓名
            IdCard: res.data.lawyer_IDCard, //身份证号码
            phoneNumber: res.data.lawyer_phone_number, //手机号码
            region: res.data.lawyer_detailed, //地区
            // address: res.data.lawyer_detailed,//详细地址
            LawFregion: res.data.law_firm_address_selected, //律所地区
            LawAddress: res.data.law_firm_address_detailed, //律所详细地址
            email: res.data.lawyer_email,//邮箱
            fileList: [], //执业证内页图片文件列表
            fileList2: [], //年检页照
            expertiseType: res.data.expertise, //专长类型
            LawFirm: res.data.law_firm_name, //律所
            PracticeId: res.data.license_number, //执业证号
            introduce: res.data.brief_introduction, //简介
            law_firm_address_city: res.data.law_firm_address_city,
            law_firm_address_country: res.data.law_firm_address_country,
            law_firm_address_county: res.data.law_firm_address_county,
            law_firm_address_province: res.data.law_firm_address_province
          }
          let obj = {
            url: practice_license,
            status: 'done',
            message: '加载中',
          }
          let obj2 = {
            url: annual_inspection,
            status: 'done',
            message: '加载中',
          }
          pamras.fileList.push(obj)
          pamras.fileList2.push(obj2)

          that.setData({
            authenticationData: pamras,
            authenticationType: res.code + 1,
          })
        }
      }
    })
  },
  //获取地区数据
  getRegion(type, id) { //type:区域类别 0：国家 1：省 2：市 3：区县 , id://父级id 国家 0 
    return new Promise(function (resolve, reject) {
      let prams = {
        type,
        parent_id: id
      }
      wx.request({
        url: requstUrl.getRegs,
        data: prams,
        header: {
          'content-type': 'application/json',
          usertokey: app.globalData.token
        },
        success(ress) {
          let res = ress.data
          resolve(res.data)
        }
      })
    })
  },
  //获取专长字典
  getType() {
    let that = this
    wx.request({
      url: requstUrl.getType,
      data: { category_code: 'Lawyer_expertise' },
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let res = ress.data
        let ysData = res.data
        res.data.forEach(item => { item['text'] = item['dic_content'] })
        let civil = res.data.filter((item) => { return item.dic_category_code == 'Lawyer_expertise_0' }) //民事纠纷
        let finance = res.data.filter((item) => { return item.dic_category_code == 'Lawyer_expertise_1' }) //经济金融
        let enterprise = res.data.filter((item) => { return item.dic_category_code == 'Lawyer_expertise_2' }) //公司企业
        let criminal = res.data.filter((item) => { return item.dic_category_code == 'Lawyer_expertise_3' }) //刑事行政
        let dispute = res.data.filter((item) => { return item.dic_category_code == 'Lawyer_expertise_4' }) //涉外纠纷
        let other = res.data.filter((item) => { return item.dic_category_code == 'Lawyer_expertise_5' })//其他类别
        let arr = [
          { text: '民事纠纷', children: civil },
          { text: '经济金融', children: finance },
          { text: '公司企业', children: enterprise },
          { text: '刑事行政', children: criminal },
          { text: '涉外纠纷', children: dispute },
          { text: '其他类别', children: other }
        ]
        that.setData({
          expertiseTypes: arr,
          expertiseYsTypes: ysData
        })
      }
    })
  },
  //律师认证信息保存
  save() {
    let prams = {
      lawyer_name: this.data.authenticationData.name,
      lawyer_IDCard: this.data.authenticationData.IdCard,
      lawyer_phone_number: this.data.authenticationData.phoneNumber,
      lawyer_email: this.data.authenticationData.email,
      // lawyer_country: 3752,
      // lawyer_province: this.data.lawRegions[0],
      // lawyer_city: this.data.lawRegions[1],
      // lawyer_county: this.data.lawRegions[2],
      // lawyer_detailed: this.data.authenticationData.address,
      law_firm_name: this.data.authenticationData.LawFirm,
      law_firm_address_country: 3752,
      law_firm_address_province: this.data.lawFirmRegions[0] || this.data.authenticationData.law_firm_address_province,
      law_firm_address_city: this.data.lawFirmRegions[1] || this.data.authenticationData.law_firm_address_city,
      law_firm_address_county: this.data.lawFirmRegions[2] || this.data.authenticationData.law_firm_address_county,
      law_firm_address_detailed: this.data.authenticationData.LawAddress,
      license_number: this.data.authenticationData.PracticeId,
      practice_license: this.data.practice_license || this.data.authenticationData.fileList[0].url,
      annual_inspection: this.data.annual_inspection || this.data.authenticationData.fileList2[0].url,
      expertise: this.data.authenticationData.expertiseType,
      brief_introduction: this.data.authenticationData.introduce
    }
    wx.request({
      url: requstUrl.saveLawData,
      data: prams,
      method: "POST",
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let res = ress.data
        if (res.state) {
          Toast.success(res.msg);
          setTimeout(() => {
            app.router.navigateTo({
              url: '/pages/examine/examine?type=0'
            })
          }, 500);
        } else {
          Toast.fail(res.msg);
        }
      }
    })
  },
  //返回上一页
  goBack() {
    app.router.navigateBack({ changed: true });//返回上一页
  },
  //输入框绑定值
  onChange(e) {
    let name = e.currentTarget.dataset.value
    let setData = "authenticationData." + name
    this.setData({
      [setData]: e.detail.value
    })
    let data = this.data.authenticationData
    let tips = this.data.authenticationCheck
    if (data[name] == "") {
      tips[name + "Msg"] = "请完善信息"
      this.setData({
        authenticationCheck: tips
      })
      return false
    }
    if (name == "phoneNumber") {
      if (!checkPhone(data[name])) {
        tips[name + "Msg"] = "填写内容有误"
      } else {
        tips[name + "Msg"] = ""
      }
    } else if (name == "email") {
      if (!checkEmail(data[name])) {
        tips[name + "Msg"] = "填写内容有误"
      } else {
        tips[name + "Msg"] = ""
      }
    } else if (name == "IdCard") {
      if (!checkIdCard(data[name])) {
        tips[name + "Msg"] = "填写内容有误"
      } else {
        tips[name + "Msg"] = ""
      }
    } else {
      if (data[name].length == 0) {
        tips[name + "Msg"] = "请完善信息"
      } else {
        tips[name + "Msg"] = ""
      }
    }
    this.setData({
      authenticationCheck: tips
    })
  },
  //执业证号上传事件
  afterRead(event) {
    let that = this
    let arr = that.data.authenticationData.fileList
    console.log(requstUrl.upLoadFile);
    let arr2 = {
      url: event.detail.file.path,
      status: 'uploading',
      message: '上传中',
    }
    arr.push(arr2)
    that.setData({
      "authenticationData.fileList": arr
    })
    wx.uploadFile({
      url: requstUrl.upLoadFile + '?type=4',
      filePath: event.detail.file.path,
      name: 'uploadFile',
      success: function (res) {
        if (res.errMsg == "uploadFile:ok") {
          let resData = JSON.parse(res.data)
          that.setData({
            'authenticationData.fileList[0].status': 'done',
            practice_license: resData.data.FileUrl + resData.data.FileExtension
          })
        } else {
          that.setData({
            'authenticationData.fileList[0].status': 'failed'
          })
        }
      }
    })
  },
  //年检页照上传事件
  afterRead2(event) {
    let that = this
    let arr = that.data.authenticationData.fileList2
    let arr2 = {
      url: event.detail.file.path,
      status: 'uploading',
      message: '上传中',
    }
    arr.push(arr2)
    that.setData({
      "authenticationData.fileList2": arr
    })
    wx.uploadFile({
      url: requstUrl.upLoadFile + '?type=4',
      filePath: event.detail.file.path,
      name: 'uploadFile',
      success: function (res) {
        if (res.errMsg == "uploadFile:ok") {
          let resData = JSON.parse(res.data)
          that.setData({
            'authenticationData.fileList2[0].status': 'done',
            annual_inspection: resData.data.FileUrl + resData.data.FileExtension
          })
        }
        else {
          that.setData({
            'authenticationData.fileList2[0].status': 'failed'
          })
        }
      },
    })
  },
  //上传文件预览
  peview(event) {
    console.log(event);
  },
  //上传文件删除
  updataDelet(event) {
    let arr = this.data.authenticationData.fileList
    let arr2 = arr.splice(event.detail.index + 1, 1)
    this.setData({
      "authenticationData.fileList": arr2
    })
  },
  //上传文件删除
  updataDelet2(event) {
    let arr = this.data.authenticationData.fileList2
    let arr2 = arr.splice(event.detail.index + 1, 1)
    this.setData({
      "authenticationData.fileList2": arr2
    })
  },
  //打开律所地区选择弹出层
  lawRegionSelect() {
    this.setData({
      show1: true
    })
  },
  //打开专长选择弹出层
  expertiseTypeSelect() {
    this.setData({
      show3: true
    })
  },
  //认证信息提交
  Submit() {
    let data = this.data.authenticationData
    let tips = this.data.authenticationCheck
    let errStatus = true //是否通过校验
    let inputStatus = true //输入校验
    Object.keys(data).forEach(key => {
      if (key == "phoneNumber") {
        if (data[key] == "") {
          tips[key + "Msg"] = "请完善信息"
          inputStatus = false
        } else if (!checkPhone(data[key]) && data[key] != "") {
          tips[key + "Msg"] = "填写内容有误"
          inputStatus = false
        } else {
          tips[key + "Msg"] = ""
          inputStatus = true
        }
      }
      if (key == "email") {
        if (data[key] == "") {
          tips[key + "Msg"] = "请完善信息"
          inputStatus = false
        } else if (!checkEmail(data[key]) && data[key] != "") {
          tips[key + "Msg"] = "填写内容有误"
          inputStatus = false
        } else {
          tips[key + "Msg"] = ""
          inputStatus = true
        }
      }
      if (key == "IdCard") {
        if (data[key] == "") {
          tips[key + "Msg"] = "请完善信息"
          inputStatus = false
        } else if (!checkIdCard(data[key]) && data[key] != "") {
          tips[key + "Msg"] = "填写内容有误"
          inputStatus = false
        } else {
          tips[key + "Msg"] = ""
          inputStatus = true
        }
      }
      if (key != "email" && key != "phoneNumber" && key != "region" && key != "LawFregion" && key != "expertiseType" && key != "fileList" && key != "IdCard" && key != "introduce" && key != 'law_firm_address_city'
        && key != 'law_firm_address_country' && key != 'law_firm_address_county' && key != 'law_firm_address_province') {
        if (data[key] == "") {
          tips[key + "Msg"] = "请完善信息"
          inputStatus = false
          console.log(key, 9)
        } else {
          tips[key + "Msg"] = ""
          inputStatus = true
        }
      }
    })
    console.log(data);
    this.setData({
      authenticationCheck: tips
    })
    if (inputStatus) {
      // if (data["region"] == "") {
      //   errStatus = false
      //   Toast.fail('请选择地区');
      //   return false
      // }
      if (data["LawFregion"] == "") {
        errStatus = false
        Toast.fail('请选律所地区');
        return false
      }

      if (data["fileList"].length == 0) {
        errStatus = false
        Toast.fail('请上传执业证');
        return false
      }
      if (data["fileList2"].length == 0) {
        errStatus = false
        Toast.fail('请上传年检页');
        return false
      }
      if (data["expertiseType"] == "") {
        errStatus = false
        Toast.fail('请选择专长');
        return false
      }
      if (!this.data.checked1 && this.data.authenticationType == 0) {
        Toast('请阅读并同意<<平台服务协议>>');
        return false
      }
      if (!this.data.checked2 && this.data.authenticationType == 0) {
        Toast('请阅读并同意<<隐私声明>>');
        return false
      }
      if (errStatus) {
        Dialog.confirm({
          title: '提示',
          message: '您确认提交信息吗',
        })
          .then(() => {
            this.save()
          })
          .catch(() => {
            // on cancel
          });

      } else {
        Dialog.confirm({
          title: '提示',
          message: '请检查填写信息',
        })
          .then(() => {
            // this.save()
          })
          .catch(() => {
            // on cancel
          });
      }

    } else {
      Dialog.confirm({
        title: '提示',
        message: '请检查填写信息',
      })
        .then(() => {
          // this.save()
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  //关闭专长选择弹出层
  expertiseTypeClose() {
    this.setData({
      show3: false,
      activeId: []
    })
  },
  //专长类型选择确定
  expertiseTypeConfirm() {
    let that = this
    if (that.data.activeId.length == 0) {
      Toast.fail("未选择专长")
      return false
    }
    let data = []
    let expertiseType = ""
    let expertise = []
    that.data.activeId.forEach(item => {
      let data2 = that.data.expertiseYsTypes.filter(item2 => { return item2.id == item })
      expertiseType += data2[0].dic_content + ','
      data.push(data2[0])
      expertise.push(data2[0].dic_content)
    })
    this.setData({
      "authenticationData.expertiseType": expertiseType.substr(0, expertiseType.length - 1),
      show3: false,
      expertise: expertise
    })
  },
  //多项选择变更方法
  bindMultiPickerColumnChange: function (e) {
    var that = this
    var data = {
      multiArray: that.data.multiArray,
    };
    let column = e.detail.column //当前修改的列
    let row = e.detail.value //当前修改的行
    // 改变省,同时改变市和区的数据
    if (column == 0) {
      var shi = [] //市
      var qu = [] //区
      that.getRegion(2, data.multiArray[column][row].id).then(res => {
        shi = res
      }).then(() => {
        that.getRegion(3, shi[0].id).then(res => {
          qu = res
          that.setData({
            'multiArray[1]': shi,
            'multiArray[2]': qu
          })
        })
      })
    }
    // 改变市，同时改变区的数据
    if (column == 1) {
      var qu = [] //区
      that.getRegion(3, data.multiArray[column][row].id).then(res => {
        qu = res
        that.setData({
          'multiArray[2]': qu
        })
      })
    }
  },
  //律师地区数据变更
  bindMultiPickerColumnChange: function (e) {
    var that = this
    var data = {
      multiArray: that.data.multiArray,
    };
    let column = e.detail.column //当前修改的列
    let row = e.detail.value //当前修改的行
    // 改变省,同时改变市和区的数据
    if (column == 0) {
      var shi = [] //市
      var qu = [] //区
      that.getRegion(2, data.multiArray[column][row].id).then(res => {
        shi = res
      }).then(() => {
        that.getRegion(3, shi[0].id).then(res => {
          qu = res
          that.setData({
            'multiArray[1]': shi,
            'multiArray[2]': qu
          })
        })
      })
    }
    // 改变市，同时改变区的数据
    if (column == 1) {
      var qu = [] //区
      that.getRegion(3, data.multiArray[column][row].id).then(res => {
        qu = res
        that.setData({
          'multiArray[2]': qu
        })
      })
    }
  },
  //律所地区数据变更
  bindMultiPickerColumnChange2: function (e) {
    console.log(e);
    var that = this
    var data = {
      multiArray: that.data.multiArray2,
    };
    let column = e.detail.column //当前修改的列
    let row = e.detail.value //当前修改的行
    // 改变省,同时改变市和区的数据
    if (column == 0) {
      var shi = [] //市
      var qu = [] //区
      that.getRegion(2, data.multiArray[column][row].id).then(res => {
        shi = res
      }).then(() => {
        that.getRegion(3, shi[0].id).then(res => {
          qu = res
          that.setData({
            'multiArray2[1]': shi,
            'multiArray2[2]': qu
          })
        })
      })
    }
    // 改变市，同时改变区的数据
    if (column == 1) {
      var qu = [] //区
      that.getRegion(3, data.multiArray[column][row].id).then(res => {
        qu = res
        that.setData({
          'multiArray2[2]': qu
        })
      })
    }
  },
  //地区选择确定方法
  bindMultiPickerChange: function (e) {
    let data = this.data.multiArray
    let indexs = e.detail.value
    let value = data[0][indexs[0]].name + '/' + data[1][indexs[1]].name + '/' + data[2][indexs[2]].name //显示值
    let ids = [data[0][indexs[0]].id, data[1][indexs[1]].id, data[2][indexs[2]].id]
    this.setData({
      lawRegions: ids,
      "authenticationData.region": value
    })
  },
  //律所地区选择确定
  bindMultiPickerChange2: function (e) {
    let data = this.data.multiArray2
    let indexs = e.detail.value
    let value = data[0][indexs[0]].name + '/' + data[1][indexs[1]].name + '/' + data[2][indexs[2]].name //显示值
    let ids = [data[0][indexs[0]].id, data[1][indexs[1]].id, data[2][indexs[2]].id]
    this.setData({
      lawFirmRegions: ids,
      "authenticationData.LawFregion": value
    })
  },
  //专长大类切换
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  //专长小类选中
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId;
    if (activeId.length >= this.data.max) {
      Toast.fail("最多选择" + this.data.max + "个")
      return false
    }
    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id);
    }
    this.setData({ activeId });
  },
  //返回首页
  goHome(e) {
    app.router.navigateTo({
      url: '/pages/index/index',
    })
  },
  //编辑
  edit() {
    let type = !this.data.editType
    this.setData({
      editType: type
    })
  },
  //字符串截取
  strIntercept(str) {
    let arr = str.split('/')
    let val = arr[0]
    return val
  },
  onChange1(event) {
    this.setData({
      checked1: event.detail,
    });
  },
  onChange2(event) {
    this.setData({
      checked2: event.detail,
    });
  },
  //用户服务协议
  Agreement(event) {
    let that = this
    let agreement = that.data.agreement
    agreement.show = true
    agreement.title = event.target.dataset.title
    wx.request({
      url: requstUrl.getDocument,
      data: { id: event.target.dataset.id },
      method: "GET",
      header: {
        'content-type': 'application/json',
        usertokey: app.globalData.token
      },
      success(ress) {
        let res = ress.data
        if (res.state) {
          agreement.content = res.data
          console.log(agreement);
          that.setData({
            agreement
          })
        } else {
          Toast.fail(res.msg);
        }
      }
    })
  },
  //弹窗接受
  dialogConfirm(event) {
    let that = this
    if (event.target.dataset.title == "平台服务协议") {
      that.setData({
        checked1: true
      })
    } else {
      that.setData({
        checked2: true
      })
    }
  }
})
