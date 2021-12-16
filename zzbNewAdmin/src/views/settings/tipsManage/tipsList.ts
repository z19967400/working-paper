import { Component, Vue } from 'vue-property-decorator'
import { SettingsData, SettingsOptions } from '@/types'
import * as Api from '@/api/settings'
import { comtable, comselect, comOperation, comPaging } from '@/components' // 组件
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  data: SettingsData['fromList'] = {
    loading: false,
    totalize: 0,
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '提示名称',
        prop: 'tips_name',
        width: '200px'
      },
      {
        label: '提示内容',
        prop: 'tips_content',
        width: '200px'
      },
      {
        label: '调用码',
        prop: 'tips_code',
        width: '120px'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ],
    list: [],
    select: {},
    options: [
      {
        value: 'tips_name',
        label: '提示名称'
      },
      {
        value: 'tips_code',
        label: '调用码'
      }
    ]
  }
  visible: boolean = false
  getTips: SettingsOptions['getTips'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    tips_name: '',
    tips_code: ''
  }
  editData: SettingsOptions['tipsEdit'] = {
    id: 0,
    tips_code: '',
    tips_name: '',
    tips_content: ''
  }
  rules: any = {
    tips_code: [
      { required: true, message: '请输入调用码', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    tips_name: [
      { required: true, message: '请输入提示名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    tips_content: [
      { required: true, message: '请输入提示内容', trigger: 'blur' },
      { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
    ]
  }
  btnLoad: boolean = false
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
    self.data.loading = true
    self.getList(self.getTips)
  }
  //获取数据
  getList(data: any) {
    let self: any = this
    Api.getTips(data).then((res: any) => {
      self.data.loading = false
      self.data.totalize = res.count
      self.data.list = res.data
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.editData
    editData.id = data.row.id
    editData.tips_code = data.row.tips_code
    editData.tips_name = data.row.tips_name
    editData.tips_content = data.row.tips_content
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    Api.tipsDelet(data.row.id).then((res: any) => {
      if (res.data == 0) {
        this.$message.warning(res.msg)
      } else {
        this.$message.success(res.msg)
        this.init()
      }
    })
  }
  //添加
  add() {
    let editData: any = this.editData
    editData.id = 0
    this.visible = true
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.getTips.page = 1
    let params: any = Object.assign({}, self.getTips)
    data.forEach((item: any) => {
      let name: string = item.label
      params[name] = item.value
    })
    self.data.select = params
    self.getList(params)
  }
  //清除搜索
  clearSelection() {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getTips : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.data.loading = true
    self.init()
  }
  //编辑添加提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      this.btnLoad = true
      if (valid) {
        Api.tipsEdit(self.editData).then((res: any) => {
          if (res.data != 0) {
            self.visible = false
            self.$message.success(res.msg)
            from.resetFields()
            this.btnLoad = false
            self.init()
          } else {
            self.$message.warning(res.msg)
            this.btnLoad = false
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        this.btnLoad = false
        return false
      }
    })
  }
  //取消，重置
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    from.resetFields()
    this.visible = false
  }
}
