import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as Api from '../../../../../api/user'
@Component({
  components: {}
})
export default class creditor extends Vue {
  @Prop() Creditors!: any
  @Prop() adminList!: any
  @Prop() burl!: string
  @Watch('Creditors', { deep: true })
  CreditorsChange(newVal: any, oldVal: any) {
    this.data.srcList = []
    this.data.list = [...newVal]
    if (newVal) {
      newVal.forEach((item: any) => {
        if (item.license_img_url) {
          this.data.srcList.push(item.license_img_url)
        } else {
          this.data.srcList.push(item.id_card_img_01)
          this.data.srcList.push(item.id_card_img_02)
        }
      })
    }
    // this.data.list.forEach((item: any) => {
    //   item.create_time = item.create_time.replace("T", " ");
    //   if (item.admin_list.length != 0) {
    //     item.admin_list.forEach((item2: any) => {
    //       item2["license_img_url"] = item.license_img_url;
    //       item2.audit_status =
    //         item2.audit_status == "Audit_states_0"
    //           ? "待审核"
    //           : item2.audit_status == "Audit_states_1"
    //           ? "未通过"
    //           : "已通过";
    //     });
    //   }
    // });
  }
  @Watch('adminList', { deep: true })
  adminListChange(newVal: any, oldVal: any) {
    this.data.adminList = [...newVal]
  }
  data: any = {
    list: [],
    adminList: [],
    srcList: [], //图片预览数组
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
    },
    show: false,
    row: {
      id: 0,
      audit_status: '',
      audit_feedback: '',
      back_remarks: ''
    }
  }
  adminAddType: boolean = false
  fileList: any = []
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
  handleEdit(row: any, creditor_name: string) {
    let data: any = {
      row,
      creditor_name
    }
    this.$emit('openAdminSh', data)
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
    let path: string =
      'https://file.debteehelper.com' +
      url.response.data.FileUrl +
      url.response.data.FileExtension
    window.open(path)
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
      self.data.setAdmin[prop] = item[0].url
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
  //债权人审核
  examine(row: any) {
    Object.keys(this.data.row).forEach((key: string) => {
      if (key == 'id') {
        this.data.row[key] = row['creditor_id']
      } else {
        this.data.row[key] = row[key] || ''
      }
    })
    this.data.show = true
  }
  examine3() {
    Api.CreditorAudit(this.data.row).then((res: any) => {
      if (res.state) {
        // this.$message.success(res.msg)
        this.data.show = false
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //时间转码
  timeStr(time: string) {
    let time1: string = time.replace('T', ' ')
    let time2: string = time1.substring(0, time1.lastIndexOf(':'))
    return time2
  }
}
