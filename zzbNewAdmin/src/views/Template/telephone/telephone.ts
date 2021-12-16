import { Component, Vue } from 'vue-property-decorator'
import { TemplateData, TemplateOptions } from '@/types'
import * as Api from '@/api/template'
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
  data: TemplateData['data'] = {
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
        prop: 'name',
        width: '120px'
      },
      {
        label: '调用码',
        prop: 'use_code',
        width: '120px'
      },
      {
        label: '参数',
        prop: 'parameter',
        width: '120px'
      },
      {
        label: '内容',
        prop: 'template_content'
      },
      {
        label: '展示内容',
        prop: 'display_content'
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
        value: 'name',
        label: '名称'
      },
      {
        value: 'use_code',
        label: '调用码'
      }
    ]
  }
  getData: TemplateOptions['getWechat'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    use_code: '',
    name: ''
  }
  editData: TemplateOptions['wechatEdit'] = {
    id: 0,
    name: '',
    use_code: '',
    template_content: '',
    display_content: '',
    parameter: ''
  }
  rules: any = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    use_code: [
      { required: true, message: '请输入使用码', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    template_content: [
      { required: true, message: '请输入内容', trigger: 'blur' },
      { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
    ],
    display_content: [
      { required: true, message: '请输入展示内容', trigger: 'blur' },
      { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
    ],
    parameter: [{ required: true, message: '请输入参数', trigger: 'blur' }]
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
  getList(params: TemplateOptions['getWechat']) {
    let self: any = this
    self.data.loading = true
    Api.getphoneModel(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.editData
    editData.id = data.row.id
    editData.display_content = data.row.display_content
    editData.name = data.row.name
    editData.parameter = data.row.parameter
    editData.template_content = data.row.template_content
    editData.use_code = data.row.use_code
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    Api.phoneModelDelet(data.row.id).then((res: any) => {
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
        this.btnLoad = true
        Api.phoneModelEdit(self.editData).then((res: any) => {
          if (res.data == 1) {
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
