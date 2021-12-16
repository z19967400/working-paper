import { Component, Vue, Watch } from 'vue-property-decorator'
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
  @Watch('getRegData', { immediate: true, deep: true })
  DataChangeValue(newVal: any, oldVal: any) {
    if (newVal.a_type == 3) {
      this.tabInfo = false
    } else {
      this.tabInfo = true
    }
  }
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
        label: '名称',
        prop: 'name'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '200px'
      }
    ],
    list: [],
    select: {},
    options: [
      {
        value: 'name',
        label: '名称'
      }
    ]
  }
  getRegData: SettingsOptions['getRegion'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    name: '',
    a_type: 0,
    parent_id: 0
  }
  editData: SettingsOptions['regEdit'] = {
    id: 0,
    name: '',
    a_type: 0,
    parent_id: 0
  }
  rules: any = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ]
  }
  visible: boolean = false
  tabInfo: boolean = true
  btnLoad: boolean = false
  history: Array<any> = [
    {
      name: '全球',
      a_type: 0,
      parent_id: 0
    }
  ]
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
    this.getList(this.getRegData)
  }
  //获取数据
  getList(params: any) {
    let self: any = this
    self.data.loading = true
    Api.getRegion(params).then((res: any) => {
      self.data.loading = false
      self.data.list = res.data
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.editData
    editData.id = data.row.id
    editData.name = data.row.name
    editData.parent_id = data.row.parent_id
    editData.a_type = data.row.a_type
    this.visible = true
  }
  //详情
  handleInfo(data: any) {
    let self: any = this
    if (self.getRegData.a_type < 3) {
      self.getRegData.a_type++
      self.editData.a_type = self.getRegData.a_type
      self.getRegData.parent_id = data.row.id
      self.editData.parent_id = data.row.id
      let historyItem = {
        name: data.row.name,
        a_type: self.getRegData.a_type,
        parent_id: self.getRegData.parent_id
      }
      self.history.push(historyItem)
    }
    self.getRegData.page = 1
    self.init()
  }
  //删除
  handleDelete(data: any) {
    Api.regionDelete(data.row.id).then((res: any) => {
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
    this.visible = true
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    self.getRegData.page = 1
    let params: any = Object.assign({}, self.getRegData)
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
      JSON.stringify(self.data.select) == '{}'
        ? self.getRegData
        : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.data.loading = true
    this.init()
  }
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      if (valid) {
        this.btnLoad = true
        Api.regionEdit(self.editData).then((res: any) => {
          if (res.data != 0) {
            self.visible = false
            self.resetForm('form')
            self.$message.success(res.msg)
            self.init()
          } else {
            self.$message.warning(res.msg)
          }
          this.btnLoad = false
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
  //点击历史记录
  goHistory(index: number) {
    if (index == this.history.length - 1) {
      return false
    }
    let self: any = this
    self.getRegData.parent_id = self.history[index].parent_id
    self.getRegData.a_type = self.history[index].a_type
    self.editData.parent_id = self.history[index].parent_id
    self.editData.a_type = self.history[index].a_type
    self.history.splice(index + 1, this.history.length - (index + 1))
    self.getRegData.page = 1
    self.init()
  }
}
