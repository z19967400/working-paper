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
        label: '名称',
        prop: 'category_name',
        width: '200px'
      },
      {
        label: '字典编码',
        prop: 'category_code',
        width: '200px'
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
        value: 'dic_code',
        label: '字典编码'
      },
      {
        value: 'dic_content',
        label: '字典内容'
      }
    ]
  }
  visible: boolean = false
  tabInfo: boolean = true
  editData: SettingsOptions['dictionaryEdit'] = {
    id: 0,
    category_code: '',
    category_name: ''
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    dic_code: '',
    dic_content: ''
  }
  rules: any = {
    category_code: [
      { required: true, message: '请输入字典编码', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    category_name: [
      { required: true, message: '请输入字典名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
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
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(pamras: any) {
    let self: any = this
    self.data.loading = true
    Api.getAllDictionary(pamras).then((res: any) => {
      self.data.loading = false
      self.data.list = res.data
      self.data.totalize = res.data.length
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.editData
    editData.id = data.row.id
    editData.category_name = data.row.category_name
    editData.category_code = data.row.category_code
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    Api.dictionaryDelete(data.row.id).then((res: any) => {
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
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.init()
  }

  //查看详情
  handleInfo(data: any) {
    this.$router.push({
      path: '/settings/dictionariesInfo',
      query: {
        category_code: data.row.category_code
      }
    })
  }
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      if (valid) {
        self.btnLoad = true
        Api.dictionaryInsert(self.editData).then((res: any) => {
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
