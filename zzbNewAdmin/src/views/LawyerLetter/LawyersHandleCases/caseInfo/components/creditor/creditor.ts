import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as Api from '../../../../../../api/user'
@Component({
  components: {}
})
export default class creditor extends Vue {
  @Prop() Creditors!: any
  @Prop() adminList!: any
  @Prop() burl!: string
  @Watch('Creditors', { deep: true })
  CreditorsChange(newVal: any, oldVal: any) {
    this.data.list = [...newVal]
  }
  @Watch('adminList', { deep: true })
  adminListChange(newVal: any, oldVal: any) {
    this.data.adminList = [...newVal]
  }
  data: any = {
    show: false,
    row: {
      id: 0,
      audit_status: '',
      audit_feedback: '',
      back_remarks: ''
    },
    list: [],
    adminList: [],
    adminList2: [],
    setAdmin: {
      admin_id: '',
      creditor_id: 0,
      authorization_file: ''
    },
    rules: {
      admin_id: [
        { required: true, message: '请选择管理员', trigger: 'change' }
      ],
      authorization_file: [
        { required: true, message: '请上传授权书', trigger: 'change' }
      ]
    }
  }
  adminAddType: boolean = false
  creditorType: boolean = false
  fileList: any = []
  shenhe: any = {}
  shenhe2: any = {}
  created() {}
  activated() {}

  mounted() {
    //
  }
  //查看授权书
  check(url: string) {
    window.open(url)
  }
  //授权管理员审核
  handleEdit(row: any) {
    this.shenhe = Object.assign({}, row)
    this.adminAddType = true
  }
  //授权管理员删除
  handleClick(row: any) {
    this.$confirm('您确定删除该授权管理员', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$emit('deleteSqAdmin', row)
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //编辑债权人
  edit(row: any) {
    this.$emit('creditorEditFc', row)
  }
  //删除债权人
  delect(row: any) {
    this.$confirm('您确定删除该债权人', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$emit('DeleteCreditor', row)
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //打开新增授权管理员弹窗
  addAdmin(row: any) {
    this.data.setAdmin.creditor_id = row.creditor_id
    this.data.setAdmin.admin_id = ''
    this.data.setAdmin.authorization_file = ''
    this.fileList = []
    let arr3: any = this.data.adminList.filter(
      (obj: any) =>
        !row.admin_list.some((obj1: any) => obj1.admin_id == obj.admin_id)
    )
    this.data.adminList2 = arr3
    this.adminAddType = true
  }
  //确定新增
  addConfirm() {
    const form: any = this.$refs['setAdminForm']
    form.validate((valid: any) => {
      if (valid) {
        Api.setCreditorAdmin(this.data.setAdmin).then((res: any) => {
          if (res.state) {
            this.adminAddType = false
            this.$emit('setAdmin')
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
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    let self: any = this
    if (res.state) {
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
      this.$message.warning(res.msg)
    }
  }
  //上传之前
  beforeAvatarUpload(file: any) {
    const isLt2M = file.size / 1024 / 1024 <= 50
    if (!isLt2M) {
      this.$message.error('上传大小不能超过 50MB!')
    }
    return isLt2M
  }
  //查看旧版授权书
  preview2(path: string) {
    window.open(path)
  }
  //打开债权人审核
  openExamine(row: any) {
    this.creditorType = true
    this.shenhe2 = Object.assign({}, row)
  }
  //债权人审核
  examine(row: any) {
    Object.keys(this.data.row).forEach((key: string) => {
      if (key == 'id') {
        this.data.row[key] = row[key]
      } else {
        this.data.row[key] = row[key] || ''
      }
    })
    this.data.show = true
  }
  //管理员审核
  examine2() {
    let parmas: any = {
      id: this.shenhe.creditor_admin_id,
      audit_status: this.shenhe.audit_status,
      audit_feedback: this.shenhe.audit_feedback,
      back_remarks: this.shenhe.back_remarks,
      authorization_file: this.shenhe.authorization_file,
      license_img_url: this.data.list[0].license_img_url
    }
    Api.CreditorAdminAudit(parmas).then((res: any) => {
      if (res.state) {
        this.adminAddType = false
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  examine3() {
    Api.CreditorAudit(this.data.row).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.show = false
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //字符截取
  sblicet(val: string) {
    let var1: string = val.substring(val.lastIndexOf('/') + 1)
    let var2: any = var1.substring(0, var1.indexOf('_'))
    return var2
  }
  //截取小数点后字符
  substr(val: string) {
    if (val == null || val == '') {
      return null
    }
    let result: string = val.substring(val.lastIndexOf('.'))
    return result
  }
  //状态转文本
  strSub(val: string) {
    let text: string = ''
    switch (val) {
      case 'Audit_states_0':
        text = '待审核'
        break
      case 'Audit_states_1':
        text = '未通过'
        break
      case 'Audit_states_2':
        text = '已通过'
        break
      default:
        break
    }
    return text
  }
}
