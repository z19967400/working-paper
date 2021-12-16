import { Component, Vue } from 'vue-property-decorator'
import { TemplateOptions } from '@/types'
import * as Api from '@/api/template'
import { verifyPhone, verifyEmall } from '@/utils/common'
@Component({})
export default class About extends Vue {
  ruleForm: any = {
    template: '', //模板类型
    templateName: '', //模板名称
    needParameter: '', //所需参数
    parameter: '', //发送参数
    phone: '', //发送号码
    getExcelPath: '', //下载excel模板的路径
    postExcelPath: '' //上传excel模版的路径
  }

  options: any = [
    {
      label: '短信模板',
      value: '0'
    },
    {
      label: '电话模板',
      value: '1'
    },
    {
      label: '邮件模板',
      value: '2'
    },
    {
      label: 'excel模板',
      value: '3'
    },
    {
      label: '微信模板',
      value: '4'
    }
  ]
  options2: any = []
  rules: any = {
    template: [{ required: true, message: '请选择模板', trigger: 'change' }]
  }

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
    //
  }
  //模板测试类型选择
  change(value: number | string) {
    this.rules = {
      template: [{ required: true, message: '请选择模板', trigger: 'change' }]
    }
    this.options2 = []
    if (value == 0) {
      //如果选择短信模版
      this.getSmsTep()
    } else if (value == 1) {
      //电话模板
      this.getPhoneTep()
    } else if (value == 2) {
      //邮件模板
      this.getEmailTep()
    } else if (value == 3) {
      //excel模版
      this.getExcel()
    }
    if (value != '' && value < 3) {
      if (value == 2) {
        this.rules = {
          template: [
            {
              required: true,
              message: '请选择模板类型',
              trigger: 'change'
            }
          ],
          templateName: [
            {
              required: true,
              message: '请选择模板',
              trigger: 'change'
            }
          ],
          parameter: [
            {
              required: true,
              validator: this.validParameter,
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              validator: this.validEmall,
              trigger: 'blur'
            }
          ]
        }
      } else {
        this.rules = {
          template: [
            {
              required: true,
              message: '请选择模板类型',
              trigger: 'change'
            }
          ],
          templateName: [
            {
              required: true,
              message: '请选择模板',
              trigger: 'change'
            }
          ],
          parameter: [
            {
              required: true,
              validator: this.validParameter,
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              validator: this.validPhone,
              trigger: 'blur'
            }
          ]
        }
      }
    }
    if (value == 3) {
      this.rules = {
        template: [
          {
            required: true,
            message: '请选择模板类型',
            trigger: 'change'
          }
        ],
        templateName: [
          { required: true, message: '请选择模板', trigger: 'change' }
        ]
      }
    }
  }
  //参数验证方式
  validParameter = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error('请输入发送参数'))
    } else {
      if (this.ruleForm.parameter !== '') {
        let parameter: any = this.ruleForm.parameter.split(',') //填入参数
        let needParameter: any = this.ruleForm.needParameter.split(',') //所需参数
        if (parameter.length != needParameter.length) {
          callback(new Error('参数不正确'))
          return false
        }
        callback()
      }
      callback()
    }
  }
  //手机号码验证方式
  validPhone = (rule: any, value: string, callback: any) => {
    let vtr: any = verifyPhone(value)
    if (!vtr.done) {
      callback(new Error(vtr.errMsg))
    } else {
      callback()
    }
  }
  //邮箱验证方式
  validEmall = (rule: any, value: string, callback: any) => {
    let vtr: any = verifyEmall(value)
    if (!vtr.done) {
      callback(new Error(vtr.errMsg))
    } else {
      callback()
    }
  }
  //选择模板
  change2(value: string) {
    this.options2.forEach((item: any) => {
      if (item.value == value) {
        this.ruleForm.needParameter = item.parameter
      }
    })
  }
  //获取数据
  getList(params: TemplateOptions['getWechat']) {
    let self: any = this
    self.data.loading = true
    Api.getphoneModel(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //获取短信模板分类
  getSmsTep() {
    Api.getSmsCode().then((res: any) => {
      res.data.forEach((item: any) => {
        let options: any = {
          label: item.name,
          value: item.use_code,
          parameter: item.parameter
        }
        this.options2.push(options)
      })
    })
  }
  //获取电话模板分类
  getPhoneTep() {
    Api.getPhoneCode().then((res: any) => {
      res.data.forEach((item: any) => {
        let options: any = {
          label: item.name,
          value: item.use_code,
          parameter: item.parameter
        }
        this.options2.push(options)
      })
    })
  }
  //获取邮件模板分类
  getEmailTep() {
    Api.getEmailCode().then((res: any) => {
      res.data.forEach((item: any) => {
        let options: any = {
          label: item.name,
          value: item.use_code,
          parameter: item.parameter
        }
        this.options2.push(options)
      })
    })
  }
  //获取excel模板
  getExcel() {
    Api.getExcel().then((res: any) => {
      res.data.forEach((item: any) => {
        let options: any = {
          label: item.name,
          value: item.id
        }
        this.options2.push(options)
      })
    })
  }
  //点击下载模版
  download() {
    if (this.ruleForm.templateName == '') {
      this.$message.warning('请先选择模板')
      return false
    }
    Api.getExcellInfo(this.ruleForm.templateName).then((res: any) => {
      window.location.href = res.data.data.template_path
    })
  }
  //测试短信模版
  testSms() {
    let params: TemplateOptions['testOne'] = {
      parameter_name: this.ruleForm.needParameter,
      parameter_value: this.ruleForm.parameter,
      send_number: this.ruleForm.phone,
      template_use_code: this.ruleForm.templateName
    }
    Api.testSms(params).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.resetForm('ruleForm')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //电话模板测试
  testPhone() {
    let params: TemplateOptions['testOne'] = {
      parameter_name: this.ruleForm.needParameter,
      parameter_value: this.ruleForm.parameter,
      send_number: this.ruleForm.phone,
      template_use_code: this.ruleForm.templateName
    }
    Api.testPhone(params).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.resetForm('ruleForm')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //邮件模板测试
  testEmail() {
    let params: TemplateOptions['testOne'] = {
      parameter_name: this.ruleForm.needParameter,
      parameter_value: this.ruleForm.parameter,
      send_number: this.ruleForm.phone,
      template_use_code: this.ruleForm.templateName
    }
    Api.testEmail(params).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.resetForm('ruleForm')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //excel模板测试
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    from.validate((valid: boolean) => {
      if (valid) {
        if (this.ruleForm.template == 0) {
          this.testSms()
        } else if (this.ruleForm.template == 1) {
          this.testPhone()
        } else if (this.ruleForm.template == 2) {
          this.testEmail()
        }
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  //取消，重置
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    from.resetFields()
  }
  handleExceed(files: string | any[], fileList: string | any[]) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  handleAvatarSuccess(res: any, file: any) {
    let self: any = this
    if (file.status == 'success') {
      this.$message.success('上传成功')
    } else {
      this.$message.warning('上传失败')
    }
    self.ruleForm.template_path = URL.createObjectURL(file.raw).substr(5)
  }
  beforeUpload(file: any) {
    var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    const extension = testmsg === 'xls'
    const extension2 = testmsg === 'xlsx'
    if (!extension && !extension2) {
      this.$message({
        message: '上传文件只能是 xls/xlsx 格式!',
        type: 'warning'
      })
    }
    return extension || extension2
  }
}
