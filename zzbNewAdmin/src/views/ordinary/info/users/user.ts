import { Component, Vue } from 'vue-property-decorator'
import * as Api from '../../../../api/user'
import { verifyPhone, verifyEmall } from '../../../../utils/common'
import { enterpriseCreditor } from '../../../../components/index'
import { baseURL } from '../../../../utils/request'
import * as Api2 from '@/api/finance'
@Component({
  components: {
    enterpriseCreditor
  }
})
export default class user extends Vue {
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
        { name: '手机号码', value: '', prop: 'phone_number' },
        { name: '电子邮箱', value: '', prop: 'email' }
      ],
      [
        { name: '注册来源', value: '', prop: 'register_source' },
        { name: '用户ID', value: '', prop: 'id' }
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
    activeName: '基础信息',
    //债权人
    creditorData: [],
    //后台备注
    back_remarks: ''
  }
  shenhe: any = {
    id: 0,
    audit_status: '',
    audit_feedback: '',
    back_remarks: ''
  }
  user: any = {}
  userData: any = {} //债权人数据
  creditorEditShow1: boolean = false
  creditorEditShow2: boolean = false
  creditorshenhShow: boolean = false
  loading: boolean = false
  burl: string = ''
  fileList: any = []
  customers: any = []
  created() {
    this.burl = baseURL
  }

  mounted() {
    this.getKefu()
  }
  activated() {
    let self: any = this
    let id: any = self.$route.params.id
    self.$nextTick(() => {
      let height: number = document.body.offsetHeight - 110
      self.data.rightH = height
      self.data.activeName = '基础信息'
      // this.getUserAdmin(id)
      self.getBasicInfo(id)
    })
  }
  //获取客服下拉
  getKefu() {
    Api2.getKefu().then((res: any) => {
      this.customers = res.data
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
  beforeDestroy() {
    //
  }

  //发送密码
  sendPassword() {
    //
  }
  //重置密码
  resetPassword() {
    //
  }
  //获取债权人信息
  getCreditorInfoByid(id: any) {
    let self: any = this
    return new Promise((resovle: any, reject: any) => {
      Api.getCreditorInfoByid(id).then((res: any) => {
        if (res.state) {
          self.userData = res.data
          resovle(res.data)
        } else {
          reject()
        }
      })
    })
  }
  //打开债权人编辑弹窗
  creditorEdit(index: number, row: any) {
    this.getCreditorInfoByid(row.id).then((res: any) => {
      if (res.creditor_type === 'Creditor_states_1') {
        //个人债权人
        this.creditorEditShow2 = true
      } else {
        // 企业债权人
        this.creditorEditShow1 = true
        if (
          res.agent_authorization !== null &&
          res.agent_authorization !== undefined
        ) {
          let item: any = [
            {
              name: '上传的文件',
              url: res.agent_authorization
            }
          ]
          this.fileList = item
        }
      }
    })
  }
  //债权人编辑
  creditorEditClick() {
    let parmas: any = {
      id: this.userData.id,
      creditor_name: this.userData.creditor_name,
      agent_name: this.userData.agent_name,
      agent_id_number: this.userData.agent_id_number,
      agent_authorization: this.userData.agent_authorization,
      phone_number: this.userData.phone_number,
      email: this.userData.email,
      id_card_img_01: this.userData.id_card_img_01,
      id_card_img_02: this.userData.id_card_img_02,
      license_no: this.userData.license_no,
      license_img_url: this.userData.license_img_url
    }
    Api.UpdateCreditor(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.creditorEditShow1 = false
        this.creditorEditShow2 = false
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //打开债权人审核弹窗
  creditorShenhe(index: number, row: any) {
    this.getCreditorInfoByid(row.id).then((res: any) => {
      this.creditorshenhShow = true
      this.shenhe.id = res.id
      this.shenhe.audit_status = res.audit_status
      this.shenhe.audit_feedback = res.audit_feedback
      this.shenhe.back_remarks = res.back_remarks
    })
  }
  //审核
  onSubmit() {
    Api.CreditorAudit(this.shenhe).then((res: any) => {
      if (res.state) {
        this.creditorshenhShow = false
        let id: any = this.$route.params.id
        this.getBasicInfo(id)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //债券人删除
  creditorDelete(index: number, row: any) {
    let self: any = this
    let id = row.id
    self
      .$confirm('您确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.DeleteCreditor(id).then((res: any) => {
          if (res.state) {
            let id: any = this.$route.params.id
            this.getBasicInfo(id)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
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
          res.data.creditor_v1.forEach((item: any) => {
            item.audit_status =
              item.audit_status == 'Audit_states_0'
                ? '待审核'
                : item.audit_status == 'Audit_states_1'
                ? '未通过'
                : '已通过'
            item.creditor_type =
              item.creditor_type == 'Creditor_states_0' ? '企业' : '个人'
            item.create_time = item.create_time.replace('T', ' ')
            item.create_time = item.create_time.substring(
              0,
              item.create_time.lastIndexOf(':')
            )
          })
          this.data.creditorData = res.data.creditor_v1
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
  //返回
  goBaack() {
    let self: any = this
    self.$router.push({
      path: '/ordinary/ordinary'
    })
  }
  exceed(files: any, fileList: any) {
    this.$message.warning('请先删除已上传文件')
  }
  //图片预览
  preview(url: any) {
    if (url.name != undefined) {
      if (url.name !== '上传的文件') {
        let path: string =
          'https://file.debteehelper.com' +
          url.response.data.FileUrl +
          url.response.data.FileExtension
        window.open(path)
      } else {
        window.open(url.url)
      }
    } else {
      window.open(url)
    }
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
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      self.userData[prop] =
        'https://file.debteehelper.com' +
        res.data.FileUrl +
        res.data.FileExtension
      if (prop === 'agent_authorization') {
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
        this.loading = false
      } else if (prop === 'license_img_url' || prop === 'id_card_img_01') {
        self.myRecognition(self.userData[prop], prop)
      } else {
        this.loading = false
      }
    } else {
      this.$message.warning(res.data.Msg)
      this.loading = false
    }
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    this.loading = true
    const isLt2M = file.size / 1024 / 1024 <= 50
    if (!isLt2M) {
      this.loading = false
      this.$message.error('上传图片大小不能超过 50MB!')
    }
    return isLt2M
  }
  //证照识别
  myRecognition(img_path: string, prop: string) {
    let self: any = this
    if (prop === 'license_img_url') {
      Api.Recognition(2, img_path).then((res2: any) => {
        if (res2.state) {
          self.userData.creditor_name = res2.data.name
          self.userData.license_no = res2.data.reg_num
          self.$message.success(
            '上传成功，请确认债权人名称和统一社会信用代码识别正确。'
          )
          self.loading = false
        } else {
          self.$message.warning('图片识别失败')
          self.loading = false
        }
      })
    } else {
      Api.Recognition(0, img_path).then((res2: any) => {
        if (res2.state) {
          self.userData.creditor_name = res2.data.name
          self.userData.agent_id_number = res2.data.num
          self.$message.success(
            '上传成功，请确认债权人名称和身份证号码识别正确。'
          )
          self.loading = false
        } else {
          self.$message.warning('图片识别失败')
          self.loading = false
        }
      })
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
}
