import { Component, Vue } from 'vue-property-decorator'
import { baseURL } from '@/utils/request'
import * as Api from '@/api/business.ts'
import { selectAdmin } from '../../../components/index'
import { verifyPhone, verifyEmall } from '@/utils/common'
@Component({
  components: {
    selectAdmin
  }
})
export default class About extends Vue {
  //邮箱规则验证
  validateEmall = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyEmall(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  //手机号码验证
  validatePhone = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyPhone(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  //data
  data: any = {
    selectAdminTp: false,
    height: 0,
    submitType: false,
    adminOption: [
      {
        value: 'member_name',
        label: '会员名称搜索'
      },
      {
        value: 'member_id',
        label: '会员ID搜索'
      }
    ],
    sunTable: [],
    sunTable2: []
  }
  ruleForm: any = {
    id: '',
    member_id: '',
    member_vip_account_id: '',
    member_vip_admin_id: '',
    payment_channel_name: '',
    contacts_name: '',
    contacts_phone: '',
    contacts_email: '',
    alipay_account: '',
    payee_name: '',
    bank_name: '',
    bank_account: '',
    admin_name: '',
    name: ''
  }
  rules: any = {
    payment_channel_name: [
      { required: true, message: '请输入收款通道名称', trigger: 'blur' }
    ],
    bank_account: [
      { required: true, message: '请输入收款账号', trigger: 'blur' }
    ],
    contacts_name: [
      { required: true, message: '请输入联系人', trigger: 'blur' }
    ],
    bank_name: [{ required: true, message: '请输入收款银行', trigger: 'blur' }],
    contacts_phone: [
      { required: true, message: '请输入联系电话', trigger: 'blur' }
    ],
    alipay_account: [
      { required: true, message: '请输入企业支付宝', trigger: 'blur' }
    ],
    contacts_email: [
      { required: true, message: '请输入电子邮箱', trigger: 'blur' }
    ],
    pay_remarks: [
      { required: true, message: '请输入付款备注', trigger: 'blur' }
    ],
    payee_name: [
      { required: true, message: '请输入账户名称', trigger: 'blur' }
    ],
    back_remarks: [
      { required: true, message: '请输入后台备注', trigger: 'blur' }
    ]
  }
  burl: string = ''
  created() {
    //
  }
  activated() {
    this.init()
  }
  mounted() {
    //
  }
  init() {
    let self: any = this
    self.data.height = document.body.offsetHeight - 180
    self.burl = baseURL
    self.data.sunTable = []
    self.data.sunTable2 = []
    if (self.$route.query.id == 0 || self.$route.query.id == null) {
      Object.keys(this.ruleForm).forEach((key: string) => {
        this.ruleForm[key] = ''
        this.data.selectAdminTp = false
      })
      if (this.ruleForm.admin_name == '' && this.ruleForm.name == '') {
        this.data.selectAdminTp = true
      } else {
        this.data.selectAdminTp = false
      }
    } else {
      self.getInfo(self.$route.query.id)
    }
  }
  //获取详情信息 GetType
  getInfo(id: number) {
    Api.getMemberCollectInfo(id).then((res: any) => {
      if (res.data != '') {
        Object.keys(this.ruleForm).forEach((key: string) => {
          this.ruleForm[key] = res.data[key]
        })
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    from.validate((valid: boolean) => {
      if (valid) {
        let params: any = Object.assign({}, this.ruleForm)
        this.data.submitType = true
        Api.MemberCollectMoneyEdit(params).then((res: any) => {
          if (res.data != 0) {
            this.$message.success(res.msg)
            setTimeout(() => {
              this.data.submitType = false
              this.$router.go(-1)
            }, 1000)
          } else {
            this.$message.warning(res.msg)
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  //取消
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    from.resetFields()
    this.$router.go(-1)
  }
  //获取债权人的会员列表
  getCreditorUser(parmas: any) {
    Api.getCreditorUser(parmas).then((res: any) => {
      this.data.sunTable = res.data
    })
  }
  //会员搜索
  searchUser(data: any) {
    let params: any = {
      type: data.label == 'member_id' ? 0 : 1,
      content: data.value
    }
    this.data.sunTable2 = []
    this.getCreditorUser(params)
  }
  //会员选择
  selectUser(data: any) {
    this.ruleForm.member_id = data.vip_id
    this.getCreditorAdmin(data.vip_id)
  }
  //获取债权人的管理员列表
  getCreditorAdmin(id: number) {
    Api.getCreditorAdmin(id).then((res: any) => {
      if (res.data.length == 0) {
        this.$message.warning('该会员暂无管理员')
      } else {
        this.data.sunTable2 = res.data
      }
    })
  }
  //管理员选择
  selectAdmin(data: any) {
    this.ruleForm.member_vip_admin_id = data.id
    this.ruleForm.member_vip_account_id = data.mvaccount_id
    this.$message.success('选择成功')
  }
  selectQuxiao() {
    this.data.selectAdminTp = !this.data.selectAdminTp
  }
}
