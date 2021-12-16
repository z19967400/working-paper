import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comtable,
  comOperation,
  comPaging
} from '@/components/index'
import { AdminData, AdminOptions } from '@/types/index'
import * as Api from '@/api/admin'
import { baseURL } from '@/utils/request'
import { verifyPhone, verifyEmall } from '@/utils/common'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  // Getter

  // Action

  //规则验证
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
  // data
  data: AdminData['AdminList'] = {
    loading: false,
    visible: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'job_number',
        label: '工号'
      },
      {
        value: 'real_name',
        label: '姓名'
      },
      {
        value: 'phone_no',
        label: '手机号'
      }
    ],
    dataType: [
      {
        label: '工号',
        prop: 'job_number',
        width: '100px'
      },
      {
        label: '头像',
        prop: 'head_img',
        width: '100px'
      },
      {
        label: '姓名',
        prop: 'real_name',
        width: '100px'
      },
      {
        label: '手机号码',
        prop: 'phone_no',
        width: '200px'
      },
      {
        label: '电子邮箱',
        prop: 'email',
        width: '200px'
      },
      {
        label: '角色权限',
        prop: 'role_id',
        width: '100px'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ]
  }
  options: AdminOptions['AdminList'] = {
    page: 1,
    limit: this.$store.getters.limit,
    real_name: '',
    phone_no: '',
    job_number: ''
  }
  editData: AdminOptions['adminEdit'] = {
    id: 0,
    real_name: '',
    phone_no: '',
    job_number: '',
    role_id: '3',
    head_img: '',
    email: ''
  }
  rules: AdminData['rules'] = {
    real_name: [
      { required: true, message: '请输入员工名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    role_id: [{ required: true, message: '请选择角色权限', trigger: 'change' }],
    job_number: [
      { required: true, message: '请输入工号', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    email: [{ required: true, validator: this.validateEmall, trigger: 'blur' }],
    phone_no: [
      { required: true, validator: this.validatePhone, trigger: 'blur' }
    ]
  }
  roles: any = []
  burl: string = ''
  btnLoad: boolean = false
  created() {
    //
  }

  activated() {
    this.getRoles()
    this.init()
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let self: any = this
    self.burl = baseURL
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    self.getList(params)
  }
  //获取数据
  getList(params: AdminOptions['AdminList']) {
    let data: any = this.data
    data.loading = true
    Api.getAdmin(params).then((res: any) => {
      data.loading = false
      data.list = res.data
      data.totalize = res.count
      data.list.forEach((item: any) => {
        this.roles.forEach((item2: any) => {
          if (item2.value == item.role_id) {
            item.role_id = item2.label
          }
        })
      })
    })
  }
  //编辑
  handleEdit(data: any) {
    let self: any = this
    self.data.visible = true
    Api.getAdminInfo(data.row.id).then((res: any) => {
      if (res.code == 0) {
        res.data.role_id = res.data.role_id.toString()
        self.editData = res.data
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //获取所有角色列表
  getRoles() {
    this.roles = []
    Api.getRoles().then((res: any) => {
      res.data.forEach((item: any) => {
        let roleItem: any = {
          label: item.role_name,
          value: item.id + ''
        }
        this.roles.push(roleItem)
      })
    })
  }
  //删除
  handleDelete(data: any) {
    Api.adminDelet(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    self.options.page = 1
    let params: any = Object.assign({}, self.options)
    data.forEach((item: any) => {
      let name: string = item.label
      params[name] = item.value
    })
    self.data.select = params
    this.getList(params)
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //添加
  add() {
    let self: any = this
    self.data.visible = true
    self.editData.phone_no = ''
    self.editData.head_img = ''
    self.editData.id = 0
    self.editData.role_id = ''
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.init()
  }
  //提交
  submitForm(fromName: string) {
    let self: any = this
    let from: any = this.$refs[fromName]
    from.validate((valid: boolean) => {
      if (valid) {
        this.btnLoad = true
        Api.adminEdit(self.editData).then((res: any) => {
          if (res.data != 0) {
            this.$message.success(res.msg)
            self.data.validate = false
            this.resetForm('form')
            this.btnLoad = false
            self.init()
          } else {
            this.$message.warning(res.msg)
            this.btnLoad = false
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        return false
      }
    })
  }
  //头像上传
  handleAvatarSuccess(res: any, file: any) {
    let self: any = this
    if (res.data.State == true) {
      this.$message.success(res.data.Msg)
      self.editData.head_img =
        'http://file.debteehelper.com/' +
        res.data.FileUrl +
        res.data.FileExtension
    } else {
      this.$message.warning(res.data.Msg)
    }
  }
  beforeAvatarUpload(file: any) {
    // const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2

    // if (!isJPG) {
    //   this.$message.error("上传头像图片只能是 JPG 格式!");
    // }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isLt2M
  }
  //取消新增,修改
  resetForm(formName: string) {
    let self: any = this
    let from: any = this.$refs[formName]
    self.data.visible = false
    from.resetFields()
  }
}
