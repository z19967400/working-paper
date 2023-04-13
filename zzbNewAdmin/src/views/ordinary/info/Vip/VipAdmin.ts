import { Component, Vue } from 'vue-property-decorator'
import * as Api from '../../../../api/user'
import { verifyPhone, verifyEmall } from '../../../../utils/common'
import { enterpriseCreditor } from '../../../../components/index'
import remark from '../../../../components/remark/remark.vue'
import { baseURL } from '../../../../utils/request'
import creditor from './creditor/creditor.vue'
import * as Api2 from '@/api/finance'
@Component({
  components: {
    enterpriseCreditor,
    creditor,
    remark
  }
})
export default class VipAdmin extends Vue {
  //手机号码验证
  validatePhone = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyPhone(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  //邮箱验证
  validateEmall = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyEmall(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  // data
  data: any = {
    rightH: 0,
    tabPosition: 'left',
    isVip: true,
    BasicInfoType: false,
    BasicInfo: [
      //基础信息
      [
        { name: '用户头像', value: '', prop: 'head_img' },
        { name: '用户名称', value: '', prop: 'name' },
        { name: '注册时间', value: '', prop: 'create_time' }
      ],
      [
        { name: '会员类别', value: '', prop: 'm_type' },
        { name: '手机号码', value: '', prop: 'phone_number' }
      ],
      [
        { name: '用户ID', value: '', prop: 'id' },
        { name: '注册来源', value: '', prop: 'register_source' },
        { name: '电子邮箱', value: '', prop: 'email' }
      ]
    ],
    customer_service_admin_id: '', //专属客服
    last_payment_time: '', //最后付款时间
    //基础信息修改
    BasicInfoEdit: {
      membe_id: 0,
      name: '',
      head_img: '',
      phone_number: '',
      email: ''
    },
    //支付信息
    pay_set: {
      is_postpaid: 0,
      standard_ai_price: '',
      electron_ai_price: ''
    },
    activeName: '基础信息',
    //Vip账号管理员
    admin_list: [],
    //债权人
    creditorList: [],
    //后台备注
    back_remarks: '',
    admin_list2: [],
    adminSelectData: {}
  }
  shenhe: any = {
    id: 0,
    audit_status: '',
    audit_feedback: '',
    back_remarks: '',
    authorization_file: '',
    license_img_url: ''
  }
  shenheCreditor: any = {
    creditor_name: '',
    admin_name: '',
    history: []
  }
  user: any = {}
  loading: boolean = false
  burl: string = ''
  fileList: any = []
  paySetTypeEdit: boolean = false
  edit: any = {
    pay_set: {
      is_postpaid: 0,
      standard_ai_price: '',
      electron_ai_price: ''
    }
  }
  adminEditType: boolean = false
  sandPassWordShow: boolean = false
  creditorEditShow: boolean = false
  creditorshenhShow: boolean = false
  adminEditData: any = {}
  sandType: string = '用户'
  toAddress: string = ''
  sandPassWordData: any = {
    admin_id: 0,
    toAddress: '',
    admin_account: '',
    admin_name: ''
  }
  creditorEdit: any = {}
  customers: any = []
  zengson: boolean = false
  present: any = {}
  total_quantity: string = ''
  created() {
    this.burl = baseURL
  }

  mounted() {
    this.getKefu()
    this.getAdminList2()
    let self: any = this
    // let height: number = document.body.offsetHeight - 110
    // self.data.rightH = height
    self.$nextTick(() => {
      self.init()
    })
  }
  init() {
    let self: any = this
    let id: any = self.$route.params.id
    // self.data.activeName = '基础信息'
    // this.getUserAdmin(id)
    self.getBasicInfo(id)
  }
  activated() {
    // let self: any = this
    // let id: any = self.$route.params.id
    // self.$nextTick(() => {
    //   let height: number = document.body.offsetHeight - 110
    //   self.data.rightH = height
    //   self.data.activeName = '基础信息'
    //   // this.getUserAdmin(id)
    //   self.getBasicInfo(id)
    // })
  }
  beforeDestroy() {
    //
  }
  //获取客服下拉
  getKefu() {
    Api2.getKefu().then((res: any) => {
      this.customers = res.data.filter((item: any, index: number) => {
        return index > 2 && index < 7
      })
    })
  }
  //设置客服
  setCustomer() {
    let parmas: any = {
      member_id: this.$route.params.id,
      admin_id: this.data.customer_service_admin_id
    }
    Api2.SetCustomerService(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //设置最后付款日期
  setPaymentTime() {
    let parmas: any = {
      member_id: this.$route.params.id,
      last_payment_time: this.data.last_payment_time
    }
    Api2.SetLastPaymentTime(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //打开发送密码弹窗
  openSandpass(row: any) {
    this.sandPassWordData.admin_id = row.admin_id
    this.sandPassWordData.toAddress = row.admin_email
    this.sandPassWordData.admin_name = row.admin_name
    this.sandPassWordData.admin_account = row.admin_account
    this.sandPassWordShow = true
  }
  //发送密码
  sandPassWord() {
    this.$confirm('您确认发送密码给该邮箱吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let parmas: any = Object.assign({}, this.sandPassWordData)
        if (this.sandType == '客服') {
          parmas['toAddress'] = this.toAddress
        }
        Api.sandAdminPassword(parmas).then((res: any) => {
          if (res.state) {
            this.sandPassWordShow = false
            this.$message.success(res.msg)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        })
      })
  }
  //重置密码
  resetPassword() {
    //
  }
  //删除账号管理员
  deleteAdmin(id: any) {
    this.$confirm('您确认删除该管理员吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.DeleteVipAdmin(id).then((res: any) => {
          if (res.state) {
            let id: any = this.$route.params.id
            this.getBasicInfo(id)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //保存备注
  SaveNotes() {
    let self: any = this
    let params = {
      id: self.$route.params.id,
      back_remarks: self.data.back_remarks
    }
    Api.userSaveNotes(params).then((res: any) => {
      if (res.state) {
        self.$message.success(res.msg)
      } else {
        self.$message.warning(res.msg)
      }
    })
  }

  //获取普通会员基础信息
  getBasicInfo(id: number) {
    return new Promise((resovle: any, reject: any) => {
      let BasicInfo: any = this.data.BasicInfo
      Api.getDinaryBasicInfo(id).then((res: any) => {
        if (res.state) {
          this.$message.success(res.msg)
          this.data.back_remarks = res.data.basic_info.back_remarks
          res.data.basic_info.create_time = res.data.basic_info.create_time.replace(
            'T',
            ' '
          )
          res.data.basic_info.create_time = res.data.basic_info.create_time.substring(
            0,
            res.data.basic_info.create_time.lastIndexOf(':')
          )
          this.data.customer_service_admin_id =
            res.data.basic_info.customer_service_admin_id
          this.data.last_payment_time = res.data.basic_info.last_payment_time
          BasicInfo.forEach((item: any) => {
            item.forEach((item2: any) => {
              item2['value'] = res.data.basic_info[item2.prop]
            })
          })
          this.data.pay_set = Object.assign({}, res.data.pay_set)
          this.edit.pay_set = Object.assign({}, res.data.pay_set)
          this.data.admin_list = [...res.data.admin_list]
          this.present = res.data.present
          this.total_quantity = res.data.present.ai_lawyer_letter_total_quantity
          this.data.admin_list.forEach((item: any) => {
            item.is_super = item.is_super == 0 ? '普通管理员' : '超级管理员'
            item.create_time = item.create_time.replace('T', ' ')
            item.create_time = item.create_time.substring(
              0,
              item.create_time.lastIndexOf(':')
            )
          })
          this.data.creditorList = res.data.creditor_v2
          this.data.creditorList.forEach((item: any) => {
            item.create_time = item.create_time.replace('T', ' ')
            item.create_time = item.create_time.substring(
              0,
              item.create_time.lastIndexOf(':')
            )
            if (item.admin_list.length != 0) {
              item.admin_list.forEach((item2: any) => {
                item2['license_img_url'] = item.license_img_url
                item2.audit_status =
                  item2.audit_status == 'Audit_states_0'
                    ? '待审核'
                    : item2.audit_status == 'Audit_states_1'
                    ? '未通过'
                    : '已通过'
              })
            }
          })
          resovle()
        } else {
          this.$message.warning(res.msg)
        }
      })
    })
  }
  //基础信息编辑取消
  editBasicInfo() {
    let self: any = this
    self.data.BasicInfoType = !self.data.BasicInfoType
  }
  //保存基础信息修改
  saveBasicInfo() {
    let self: any = this
    let BasicInfoEdit: any = self.data.BasicInfoEdit
    let BasicInfo: any = self.data.BasicInfo
    BasicInfo.forEach((item: any) => {
      item.forEach((item2: any) => {
        if (BasicInfoEdit[item2.prop] != undefined) {
          BasicInfoEdit[item2.prop] = item2.value
        }
      })
    })
    BasicInfoEdit.member_id = parseInt(self.$route.params.id)
    Api.dinaryBaseicInfoEdit(BasicInfoEdit).then((res: any) => {
      if (res.state) {
        self.$message.success(res.msg)
        self.data.BasicInfoType = !self.data.BasicInfoType
      } else {
        self.$message.warning(res.msg)
      }
    })
  }
  //修改支付设置
  paySetEdit() {
    Api.UpdatePaySet(this.edit.pay_set).then((res: any) => {
      if (res.state) {
        this.paySetTypeEdit = false
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //Vip管理员编辑
  VipAdminEdit(row: any) {
    this.adminEditType = true
    if (row === 'add') {
      let obj: any = {
        admin_id: 0,
        admin_name: '',
        admin_phone_number: '',
        admin_email: '',
        admin_account: '',
        id_number: '',
        is_super: 0,
        member_id: parseInt(this.$route.params.id)
      }
      this.adminEditData = obj
      return false
    }
    this.adminEditData = Object.assign({}, row)
    this.adminEditData.is_super =
      this.adminEditData.is_super == '普通管理员' ? 0 : 1
  }
  //Vip管理员编辑保存
  onSubmit() {
    Api.vipAddAdmin(this.adminEditData).then((res: any) => {
      if (res.state) {
        this.adminEditType = false
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //打开编辑债权人
  creditorEditFc(row: any) {
    this.creditorEditShow = true
    this.data.adminSelectData = {}
    if (row === 'add') {
      let obj: any = {
        id: 0,
        audit_feedback: '',
        audit_status: '',
        create_name: '',
        creditor_id: 0,
        creditor_name: '',
        detailed_address: '',
        license_img_url: '',
        license_no: '',
        old_agent_authorization: ''
      }
      this.creditorEdit = obj
      return false
    }
    this.creditorEdit = Object.assign({}, row)
  }
  //债权人编辑提交
  creditorSubmit() {
    let parmas: any = {
      id: this.creditorEdit.creditor_id || 0,
      creditor_name: this.creditorEdit.creditor_name || '',
      agent_name: this.creditorEdit.agent_name || '',
      agent_id_number: this.creditorEdit.agent_id_number || '',
      agent_authorization:
        this.creditorEdit.agent_authorization ||
        this.creditorEdit.old_agent_authorization ||
        '',
      phone_number: this.creditorEdit.phone_number || '',
      email: this.creditorEdit.email || '',
      id_card_img_01: this.creditorEdit.id_card_img_01 || '',
      id_card_img_02: this.creditorEdit.id_card_img_02 || '',
      license_no: this.creditorEdit.license_no || '',
      license_img_url: this.creditorEdit.license_img_url || '',
      detailed_address: this.creditorEdit.detailed_address || '',
      member_id: this.data.adminSelectData.member_id || 0,
      member_vip_account_id:
        this.data.adminSelectData.member_vip_account_id || 0,
      member_vip_admin_id: this.data.adminSelectData.id || 0
    }
    Api.UpdateCreditor(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.creditorEditShow = false
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //删除债权人
  DeleteCreditor(row: any) {
    Api.DeleteCreditor(row.creditor_id).then((res: any) => {
      if (res.state) {
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //打开授权管理员审核弹窗
  openAdminSh(row: any) {
    this.fileList = []
    this.shenhe.id = row.row.creditor_admin_id
    this.shenhe.audit_status =
      row.row.audit_status == '待审核'
        ? 'Audit_states_0'
        : row.row.audit_status == '未通过'
        ? 'Audit_states_1'
        : 'Audit_states_2'
    this.shenhe.audit_feedback = row.row.audit_feedback
    this.shenhe.back_remarks = row.row.back_remarks
    this.shenhe.authorization_file = row.row.authorization_file
    this.shenhe.license_img_url = row.row.license_img_url
    this.shenheCreditor.creditor_name = row.creditor_name
    this.shenheCreditor.admin_name = row.row.admin_name
    this.creditorshenhShow = true
    this.shenhe['creditor_admin_id'] = row.row.creditor_admin_id
    this.GetAllAuthorizationFileRecord(row.row.creditor_admin_id)
  }
  //获取所有授权书记录
  GetAllAuthorizationFileRecord(creditor_admin_id: number) {
    Api.GetAllAuthorizationFileRecord(creditor_admin_id).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
      })
      this.shenheCreditor.history = res.data
    })
  }
  //设置管理员
  setAdmin() {
    let id: any = this.$route.params.id
    this.getBasicInfo(id)
  }
  //审核确定
  shenheSubmit() {
    Api.CreditorAdminAudit(this.shenhe).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.creditorshenhShow = false
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  // 删除授权管理员
  deleteSqAdmin(row: any) {
    Api.deletCreditorAdmin(row.creditor_admin_id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //返回
  goBaack() {
    let self: any = this
    self.$router.push({
      path: '/ordinary/ordinary'
    })
  }
  //图片预览
  preview(url: any) {
    if (url.name != undefined) {
      let path: string =
        'https://file.debteehelper.com' +
        url.response.data.FileUrl +
        url.response.data.FileExtension
      window.open(path)
    } else {
      window.open(url)
    }
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    this.loading = true
    const isLt2M = file.size / 1024 / 1024 <= 50
    if (!isLt2M) {
      this.loading = false
      this.$message.error('上传大小不能超过 50MB!')
    }
    return isLt2M
  }
  //证照识别
  myRecognition(img_path: string) {
    let self: any = this
    Api.Recognition(2, img_path).then((res2: any) => {
      if (res2.state) {
        self.creditorEdit['creditor_name'] = res2.data.name
        self.creditorEdit['license_no'] = res2.data.reg_num
        self.$message.success(
          '上传成功，请确认债权人名称和统一社会信用代码识别正确。'
        )
      } else {
        self.$message.warning('图片识别失败')
      }
      this.loading = false
    })
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.state) {
      if (prop == 'authorization_file') {
        let item: any = [
          {
            name: file.name,
            url:
              'https://file.debteehelper.com' +
              file.response.data.FileUrl +
              file.response.data.FileExtension
          }
        ]
        self.fileList = item
        self.shenhe[prop] = item[0].url
      } else {
        self.creditorEdit[prop] =
          'http://file.debteehelper.com' +
          res.data.FileUrl +
          res.data.FileExtension
        self.myRecognition(self.creditorEdit[prop])
      }
    } else {
      this.$message.warning(res.msg)
    }
  }
  //截取小数点后字符
  substr(val: string) {
    if (val == null || val == '') {
      return null
    }
    let result: string = val.substring(val.lastIndexOf('.'))
    return result
  }
  //字符截取
  sblicet(val: string) {
    let var1: string = val.substring(val.lastIndexOf('/') + 1)
    let var2: any = var1.substring(0, var1.indexOf('_'))
    return var2
  }
  exceed(files: any, fileList: any) {
    this.$message.warning('请先删除已上传文件')
  }
  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3)
  }
  //下载授权书
  upSq() {
    window.open(
      'https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx'
    )
  }
  //更新赠送数据
  zengsonBtn() {
    const parmas: any = {
      member_id: this.present.member_id,
      ai_lawyer_letter_total_quantity: this.total_quantity
    }
    Api2.UpdatePresent(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.zengson = false
        // this.total_quantity = ''
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //获取管理员列表
  getAdminList2() {
    Api2.GetMemberVipAdminsByMmeberId(this.$route.params.id).then(
      (res: any) => {
        this.data.admin_list2 = res.data
      }
    )
  }
  //管理员选择
  adminSelect(event: any) {
    this.data.adminSelectData.member_id = event.member_id
    this.data.adminSelectData.member_vip_account_id =
      event.member_vip_account_id
    this.data.adminSelectData.member_vip_admin_id = event.id
  }
}
