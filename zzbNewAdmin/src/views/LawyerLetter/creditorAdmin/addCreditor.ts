import { Component, Vue, Watch } from 'vue-property-decorator'
import { baseURL } from '@/utils/request'
import * as Api from '@/api/business.ts'
import { comAddress, selectAdmin } from '../../../components/index'
import { verifyPhone, verifyEmall } from '@/utils/common'
// import { delete } from 'vue/types/umd';
@Component({
  components: {
    comAddress,
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
  @Watch('ruleForm.creditor_type')
  creditorTypeChage(newVal: any, old: any) {
    let self: any = this
    if (newVal == 'Creditor_states_1') {
      self.ruleForm.id_type = 5
    } else {
      self.ruleForm.id_type = 1
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
    sunTable2: [],
    address: []
  }
  ruleForm: any = {
    id: 0,
    creditor_type: 'Creditor_states_0',
    agent_name: '', //代理人姓名
    agent_id_number: '', //代理人身份证账号
    agent_authorization: '', //代理人授权书
    creditor_name: '',
    id_type: 1, //证件类型 1：身份证 2：士官证 3：护照 4:港澳台通行证  5：营业执照
    license_no: '', //证照编号
    license_img_url: '', //证照图片地址
    id_card_img_01: '', //身份证正面
    id_card_img_02: '', //身份证反面
    phone_number: '',
    email: '',
    country: '',
    city: '',
    county: '',
    province: '',
    detailed_address: '',
    audit_status: '待审核',
    back_remarks: '', //后台备注
    member_vip_admin_id: '',
    member_vip_account_id: '',
    member_id: '',
    name: '',
    admin_name: ''
  }
  rules: any = {
    license_img_url: [
      { required: true, message: '请上传证照图片', trigger: 'blur' }
    ],
    creditor_name: [
      { required: true, message: '请输入债权人名称', trigger: 'blur' }
    ],
    license_no: [{ required: true, message: '请上传证照', trigger: 'blur' }],
    phone_number: [
      { required: true, validator: this.validatePhone, trigger: 'blur' }
    ],
    email: [{ required: true, validator: this.validateEmall, trigger: 'blur' }],
    country: [{ required: true, message: '请选择地区', trigger: 'change' }],
    detailed_address: [
      { required: true, message: '请输入详细地址', trigger: 'blur' }
    ]
  }
  burl: string = ''
  mailingAddress: any = [{ label: 'xxx', value: 'wadaw' }]
  SendingAddress: string = ''
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
    if (self.$route.query.id == 0) {
      this.data.address = []
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
    Api.getCreditorListInfo(id).then((res: any) => {
      this.data.address = [
        res.data.country,
        res.data.province,
        res.data.city,
        res.data.county
      ]
      Object.keys(this.ruleForm).forEach((key: string) => {
        if (res.data[key] != undefined) {
          this.ruleForm[key] = res.data[key]
        }
      })
      if (this.ruleForm.creditor_type == 'Creditor_states_1') {
        this.ruleForm.id_type = 5
      }
      if (this.ruleForm.id_type == 0) {
        this.ruleForm.id_type = 1
      }
    })
  }
  // getSandEmail(id: number) {
  //   let parmas: any = {
  //     id: id,
  //     type: this.ruleForm.member_vip_admin_id == null ? 0 : 1
  //   };
  //   Api.getSendEmail(parmas).then((res: any) => {
  //     this.mailingAddress = res.data;
  //     this.mailingAddress.forEach((item: any) => {
  //       item["value"] = item.email;
  //       item["label"] = item.name;
  //     });
  //   });
  // }
  //提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    from.validate((valid: boolean) => {
      if (valid) {
        let params: any = Object.assign({}, this.ruleForm)
        delete params.audit_status
        this.data.submitType = true
        setTimeout(() => {
          Api.creditorEdit(params).then((res: any) => {
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
        }, 500)
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
  //获取地址栏子组件选择值
  getAddress(data: any) {
    Object.keys(this.ruleForm).forEach((key: string) => {
      if (data[key] != undefined) {
        this.ruleForm[key] = data[key]
      }
    })
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
  //取消选择
  selectQuxiao() {
    this.data.selectAdminTp = false
  }
  //发送通知邮件
  sendEmail() {
    let parmas: any = {
      email: this.SendingAddress,
      content: this.$route.query.id
    }
    Api.sendEmail(parmas).then((res: any) => {
      if (res.data == 0) {
        this.$message.warning(res.msg)
      } else {
        this.$message.success(res.msg)
      }
    })
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      this.$message.success(res.data.Msg)
      self.ruleForm[prop] =
        'http://file.debteehelper.com' +
        res.data.FileUrl +
        res.data.FileExtension
    } else {
      this.$message.warning(res.data.Msg)
    }
  }
  beforeAvatarUpload(file: any) {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isLt2M
  }
}
