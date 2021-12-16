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
        label: '货币名称',
        prop: 'currency_name',
        width: '120px'
      },
      {
        label: '货币单位',
        prop: 'currency_unit',
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
        value: 'currency_name',
        label: '货币名称'
      },
      {
        value: 'currency_unit',
        label: '货币单位'
      }
    ]
  }
  getData: SettingsOptions['getCurrency'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    currency_name: '',
    currency_unit: ''
  }
  visible: boolean = false
  edit: SettingsOptions['currencyDelet'] = {
    id: 0,
    currency_name: '',
    currency_unit: ''
  }
  rules: any = {
    currency_name: [
      { required: true, message: '请输入货币名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    currency_unit: [
      { required: true, message: '请输入货币单位', trigger: 'blur' },
      { max: 5, message: '长度不能超过5个字符', trigger: 'blur' }
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
    this.getList(this.getData)
  }
  //获取数据
  getList(data: any) {
    let self: any = this
    self.data.loading = true
    Api.getCurrency(data).then((res: any) => {
      self.data.loading = false
      self.data.list = res.data
      self.data.totalize = res.data.length
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.edit
    editData.id = data.row.id
    editData.currency_name = data.row.currency_name
    editData.currency_unit = data.row.currency_unit
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    Api.currencyDelete(data.row.id).then((res: any) => {
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
    let editData: any = this.edit
    editData.id = 0
    this.visible = true
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
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
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
        self.btnLoad = true
        Api.currencyEdit(self.edit).then((res: any) => {
          if (res.data != 0) {
            self.visible = false
            self.$message.success(res.msg)
            self.init()
          } else {
            self.$message.warning(res.msg)
          }
          self.btnLoad = false
        })
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
    this.visible = false
  }
}
