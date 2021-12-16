import { Component, Vue } from 'vue-property-decorator'
import { baseURL } from '@/utils/request'
import * as Api from '@/api/finance'
import { comAddress, selectAdmin } from '@/components/index'
import { verifyPhone, verifyEmall } from '@/utils/common'
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
    id: 0,
    //会员名称
    name: '',
    // 管理员名称
    admin_name: '',
    // 会员id
    member_id: '',
    // vip会员账户id
    member_vip_account_id: '',
    //vip用户管理员id
    member_vip_admin_id: '',
    // 发票类型
    invoice_type: '',
    // 发票抬头类型
    invoice_title_type: '',
    // 发票抬头
    invoice_title: '',
    // 纳税人识别号
    tax_number: '',
    // 发票税率
    invoice_tax_rate: '',
    // 开户银行
    bank_name: '',
    // 银行账号
    bank_account: '',
    // 银行电话
    bank_telephone: '',
    // 国家
    country: '',
    // 省份
    province: '',
    // 城市
    city: '',
    // 区/县
    county: '',
    // 详细地址
    detailed_address: '',
    // 后台备注
    back_remarks: ''
  }
  rules: any = {
    invoice_title: [
      { required: true, message: '请输入发票抬头', trigger: 'blur' }
    ],
    license_img_url: [
      { required: true, message: '请上传证照', trigger: 'blur' }
    ],
    creditor_name: [
      { required: true, message: '请输入债权人名称', trigger: 'blur' }
    ],
    license_no: [
      { required: true, message: '请输入债权人名称', trigger: 'blur' }
    ],
    phone_number: [
      { required: true, validator: this.validatePhone, trigger: 'blur' }
    ],
    email: [{ required: true, validator: this.validateEmall, trigger: 'blur' }],
    detailed_address: [
      { required: true, message: '请输入地址详情', trigger: 'blur' }
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
    Api.geteditinvaicebyid(id).then((res: any) => {
      Object.keys(this.ruleForm).forEach((key: string) => {
        this.ruleForm[key] = res.data[key]
        if (key == 'creditor_type' || key == 'audit_status') {
          let name: string =
            key == 'audit_status' ? 'Creditor_audit_status' : 'Creditor_states'
          if (this.ruleForm[key] != '') {
            // Api.GetType(name).then((res: any) => {
            //   let value: any = res.data.filter((item: any) => {
            //     return item.dic_code == this.ruleForm[key];
            //   });
            //   if (value[0] != null) {
            //     this.ruleForm[key] = value[0].dic_content.replace(
            //       /[\r\n]/g,
            //       ""
            //     );
            //   }
            // });
          }
        }
      })
    })
  }
  getSandEmail(id: number) {
    let parmas: any = {
      id: id,
      type: this.ruleForm.member_vip_admin_id == null ? 0 : 1
    }
    // Api.getSendEmail(parmas).then((res: any) => {
    //   this.mailingAddress = res.data;
    //   this.mailingAddress.forEach((item: any) => {
    //     item["value"] = item.email;
    //     item["label"] = item.name;
    //   });
    // });
  }
  //提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    from.validate((valid: boolean) => {
      if (valid) {
        let params: any = Object.assign({}, this.ruleForm)
        Object.keys(params).forEach((key: string) => {
          if (key == 'creditor_type' || key == 'audit_status') {
            let name: string =
              key == 'audit_status'
                ? 'Creditor_audit_status'
                : 'Creditor_states'
            // Api.GetType(name).then((res: any) => {
            //   let value: any = res.data.filter((item: any) => {
            //     return item.dic_content.replace(/[\r\n]/g, "") == params[key];
            //   });
            //   params[key] = value[0].dic_code;
            // });
          }
        })
        this.data.submitType = true
        setTimeout(() => {
          Api.posteditinvoice(params).then((res: any) => {
            if (res.data != 0) {
              this.$message.success(res.msg)
              setTimeout(() => {
                let self: any = this
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
      if (this.ruleForm[key] != undefined) {
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
    this.ruleForm.member_id = data.id
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
  // //发送通知邮件
  // sendEmail() {
  //   let parmas: any = {
  //     email: this.SendingAddress,
  //     content: this.$route.query.id
  //   };
  //   Api.sendEmail(parmas).then((res: any) => {
  //     if (res.data == 0) {
  //       this.$message.warning(res.msg);
  //     } else {
  //       this.$message.success(res.msg);
  //     }
  //   });
}
// //图片上传
// handleAvatarSuccess(res: any, file: any) {
//   let self: any = this;
//   if (res.data.State == true) {
//     this.$message.success(res.data.Msg);
//     self.ruleForm.license_img_url =
//       "http://file.zhaizhubang.net" +
//       res.data.FileUrl +
//       res.data.FileExtension;
//   } else {
//     this.$message.warning(res.data.Msg);
//   }
// }
//   beforeAvatarUpload(file: any) {
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       this.$message.error("上传头像图片大小不能超过 2MB!");
//     }
//     return isLt2M;
//   }
// }
