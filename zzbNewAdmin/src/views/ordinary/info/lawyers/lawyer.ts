import { Component, Vue } from 'vue-property-decorator'
import * as Api from '../../../../api/user'
import { verifyPhone, verifyEmall } from '../../../../utils/common'
import { baseURL } from '../../../../utils/request'
import { comAddress } from '../../../../components/index'
import * as Api2 from '@/api/finance'
import remark from '@/components/remark/remark.vue'
@Component({
  components: {
    comAddress,
    remark
  }
})
export default class lawyer extends Vue {
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
    srcList: [],
    rightH: 0,
    tabPosition: 'left',
    isVip: true,
    BasicInfoType: false,
    authenticationType: true,
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
        { name: '注册来源', value: '', prop: 'register_source' },
        { name: '电子邮箱', value: '', prop: 'email' }
      ]
    ],
    lawyer: {},
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
    //后台备注
    back_remarks: '',
    address: []
  }
  shenhe: any = {
    id: 0,
    audit_status: '',
    audit_feedback: ''
  }
  user: any = {}
  loading: boolean = false
  burl: string = ''
  fileList: any = []
  lawyerEdit: any = {}
  customers: any = []
  created() {
    this.burl = baseURL
  }

  mounted() {
    this.getKefu()
    // let self: any = this;
    // let id: any = self.$route.params.id;
    // self.$nextTick(() => {
    //   let height: number = document.body.offsetHeight - 110;
    //   self.data.rightH = height;
    //   self.data.activeName = "基础信息";
    //   // this.getUserAdmin(id)
    //   self.getBasicInfo(id);
    // });
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
  beforeDestroy() {
    //
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
    const self: any = this
    return new Promise((resovle: any, reject: any) => {
      let BasicInfo: any = self.data.BasicInfo
      Api.getDinaryBasicInfo(id).then((res: any) => {
        if (res.state) {
          this.$message.success(res.msg)
          self.data.back_remarks = res.data.basic_info.back_remarks
          res.data.basic_info.create_time = res.data.basic_info.create_time.replace(
            'T',
            ' '
          )
          res.data.basic_info.create_time = res.data.basic_info.create_time.substring(
            0,
            res.data.basic_info.create_time.lastIndexOf(':')
          )
          self.data.customer_service_admin_id =
            res.data.basic_info.customer_service_admin_id
          self.data.last_payment_time = res.data.basic_info.last_payment_time
          BasicInfo.forEach((item: any) => {
            item.forEach((item2: any) => {
              item2['value'] = res.data.basic_info[item2.prop]
            })
          })

          if (res.data.lawyer != null) {
            self.data.lawyer = Object.assign({}, res.data.lawyer)
            self.lawyerEdit = Object.assign({}, res.data.lawyer)
            this.data.srcList = [
              `${this.serchStr(res.data.lawyer.practice_license)
                ? ''
                : 'https://file.debteehelper.com'
              }${res.data.lawyer.practice_license}`,
              `${this.serchStr(res.data.lawyer.annual_inspection)
                ? ''
                : 'https://file.debteehelper.com'
              }${res.data.lawyer.annual_inspection}`
            ]

            self.shenhe.id = res.data.lawyer.id
            self.shenhe.audit_status = res.data.lawyer.audit_status
            let lawyer: any = res.data.lawyer
            self.data.address = [
              lawyer.law_firm_address_country,
              lawyer.law_firm_address_province,
              lawyer.law_firm_address_city,
              lawyer.law_firm_address_county
            ]
            // eslint-disable-next-line no-console
            console.log(self.data.address)
          } else {
            self.data.lawyer = null
          }

          resovle()
        } else {
          self.$message.warning(res.msg)
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
  //认证信息编辑
  editAuthentication() {
    Api.saveLawInfo(this.lawyerEdit).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.authenticationType = !this.data.authenticationType
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //图片预览
  preview(url: string) {
    window.open(url)
  }
  //审核
  SaveShenhe() {
    let self: any = this
    self
      .$confirm('您确认保存该信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.LawyerAudit(this.shenhe).then((res: any) => {
          if (res.state) {
            // let id: any = self.$route.params.id
            // self.getBasicInfo(id)
            self.$message.success(res.msg)
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  //地区选择组件返回
  addressEdit(val: any) {
    // eslint-disable-next-line no-console
    console.log(val)
  }
  //返回
  goBaack() {
    let self: any = this
    self.$router.go(-1)
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      self.lawyerEdit[prop] =
        'https://file.debteehelper.com' +
        res.data.FileUrl +
        res.data.FileExtension
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
  //判断字符串中是否含有com字符
  serchStr(path: string) {
    if (path != undefined) {
      return path.search('com') != -1
    }
  }
}
