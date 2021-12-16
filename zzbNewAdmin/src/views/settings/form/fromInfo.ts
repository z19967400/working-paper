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
        prop: 'name'
      },
      {
        label: '类别',
        prop: 'form_name'
      },
      {
        label: '提示内容',
        prop: 'tips_content'
      },
      {
        label: '选项内容',
        prop: 'option_content'
      },
      {
        label: '默认选项',
        prop: 'default_value'
      },
      {
        label: '是否必填',
        prop: 'is_required'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '250px'
      }
    ],
    list: [],
    select: {},
    options: [
      {
        value: 'api_domain',
        label: '接口域名'
      },
      {
        value: 'api_type',
        label: '接口类别'
      },
      {
        value: 'api_name',
        label: '接口名称'
      },
      {
        value: 'api_path',
        label: '接口地址'
      },
      {
        value: 'request_way',
        label: '请求方式'
      }
    ]
  }
  getInfo: any = {
    page: 1,
    limit: this.$store.state.layout.limit,
    form_id: ''
  }
  editData: SettingsOptions['fromInfoEdit'] = {
    name: '',
    id: 0,
    form_id: 0,
    control_type: '',
    tips_content: '',
    option_content: '',
    default_value: '',
    is_required: 0
  }
  rules: any = {
    name: [{ required: true, message: '请输入选项内容', trigger: 'change' }],
    control_type: [
      { required: true, message: '请选择控件类别', trigger: 'change' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    tips_content: [
      { required: true, message: '请输入提示内容', trigger: 'blur' },
      { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
    ],
    option_content: [
      { required: true, message: '请输入选项内容', trigger: 'change' }
    ],
    default_value: [
      { required: true, message: '请输入默认值', trigger: 'change' }
    ]
  }
  visible: boolean = false
  control_types: any = []
  btnLoad: boolean = false
  created() {
    //
  }

  activated() {
    let self: any = this
    let editData: any = self.editData
    editData.form_id = self.$route.query.id
    self.getInfo.form_id = self.$route.query.id
    self.init()
  }

  mounted() {
    this.getDicInfo()
  }
  init() {
    let self: any = this
    self.getList()
  }
  //获取数据
  getList() {
    let self: any = this
    self.data.loading = true
    Api.getFromInfo(self.getInfo).then((res: any) => {
      self.data.loading = false
      res.data.forEach((item: any) => {
        item.form_name = item.dic_content
        item.is_required = item.is_required == 0 ? '否' : '是'
      })
      self.data.list = res.data
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)

    let editData: any = this.editData
    editData.id = data.row.id
    editData.name = data.row.name
    editData.form_id = data.row.form_id
    editData.tips_content = data.row.tips_content
    editData.is_required = data.row.is_required == '否' ? false : true
    editData.default_value = data.row.default_value
    editData.option_content = data.row.option_content
    let type = this.control_types.filter((item: any) => {
      return item.dic_content == data.row.dic_content
    })
    editData.control_type = type[0].dic_code
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    Api.fromInfoDelete(data.row.id).then((res: any) => {
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
  //详情
  handleInfo(data: any) {
    //
  }
  //搜索
  search(data: any) {
    //
  }
  //清除搜索
  clearSelection() {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //翻页
  watchChange(index: number) {
    this.getInfo.page = index
    this.init()
  }
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      if (valid) {
        self.btnLoad = true
        self.editData.is_required = self.editData.is_required == false ? 0 : 1
        Api.fromInfoEdit(self.editData).then((res: any) => {
          if (res.data != 0) {
            self.visible = false
            self.resetForm('form')
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
  //获取字典内容详情
  getDicInfo() {
    let parmas: any = {
      page: 1,
      limit: 50,
      category_code: 'Control_type',
      dic_content: ''
    }
    Api.getDicInfoList(parmas).then((res: any) => {
      this.control_types = res.data
    })
  }
  //取消，重置
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    from.resetFields()
    this.visible = false
  }
}
