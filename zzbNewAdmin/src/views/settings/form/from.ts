import { Component, Vue } from 'vue-property-decorator'
import { SettingsData, SettingsOptions } from '@/types'
import * as Api from '@/api/settings'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
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
        label: '表单名称',
        prop: 'form_name'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '250px'
      }
    ],
    tabInfo: true,
    list: [],
    select: {},
    options: [
      {
        value: 'form_name',
        label: '表单名称'
      }
    ]
  }
  getData: SettingsOptions['getFrom'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    form_name: ''
  }
  editData: SettingsOptions['fromEdit'] = {
    id: 0,
    form_name: ''
  }
  rules: any = {
    form_name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }]
  }
  visible: boolean = false
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
    this.getList(this.getData)
  }
  //获取数据
  getList(parmas: any) {
    let self: any = this
    self.data.loading = true
    Api.getFrom(parmas).then((res: any) => {
      self.data.loading = false
      self.data.list = res.data
      self.data.totalize = res.data.length
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.editData
    editData.id = data.row.id
    editData.form_name = data.row.form_name
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    Api.fromDelet(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //添加
  add() {
    let editData: any = this.editData
    editData.id = 0
    editData.form_name = ''
    this.visible = true
  }
  //详情
  handleInfo(data: any) {
    this.$router.push({
      path: '/settings/fromInfo',
      query: {
        id: data.row.id,
        form_name: data.row.form_name
      }
    })
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    self.getData.page = 1
    let params: any = Object.assign({}, self.getData)
    data.forEach((item: any) => {
      let name: string = item.label
      params[name] = item.value
    })
    self.data.select = params
    this.getList(params)
  }
  //清除搜索
  clearSelection() {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //翻页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.init()
  }
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      if (valid) {
        self.btnLoad = true
        Api.fromEdit(self.editData).then((res: any) => {
          if (res.data != 0) {
            self.visible = false
            self.$message.success(res.msg)
            self.btnLoad = false
            self.init()
          } else {
            self.$message.warning(res.msg)
            self.btnLoad = false
          }
        })
      } else {
        // eslint-disable-next-line no-console
        console.log('error submit!!')
        self.btnLoad = false
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
