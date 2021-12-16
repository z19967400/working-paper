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
        width: '120px'
      },
      {
        label: '名称',
        prop: 'dic_content'
      },
      {
        label: '调用码',
        prop: 'dic_code'
      },
      {
        label: '可用状态',
        prop: 'state'
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
  getInfo: SettingsOptions['getInfo'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    category_code: '',
    dic_content: ''
  }
  visible: boolean = false
  editData: any = {
    id: 0,
    dic_category_code: '', //字典类别码
    dic_content: '', //字典内容
    dic_code: '' // 字典编码
  }
  rules: any = {
    dic_content: [
      { required: true, message: '请输入内容', trigger: 'blur' },
      { max: 5000, message: '长度不能超过15个字符', trigger: 'blur' }
    ],
    dic_code: [
      { required: true, message: '请输入字典编码', trigger: 'blur' },
      { max: 15, message: '长度不能超过15个字符', trigger: 'blur' }
    ]
  }
  btnLoad: boolean = false
  created() {
    //
  }

  activated() {
    this.editData.dic_category_code = this.$route.query.category_code
    this.init()
  }

  mounted() {
    //
  }
  init() {
    let self: any = this
    self.getInfo.category_code = self.$route.query.category_code
    self.editData.dic_code = ''
    this.getList(this.getInfo)
  }
  //获取数据
  getList(data: any) {
    let self: any = this
    self.data.loading = true
    Api.getDicInfoList(data).then((res: any) => {
      self.data.loading = false
      self.data.list = res.data
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.editData
    editData.id = data.row.id
    editData.dic_content = data.row.dic_content
    editData.dic_code = data.row.dic_code.replace(
      editData.dic_category_code,
      ''
    )
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    Api.dicInfoDelete(data.row.id).then((res: any) => {
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
    editData.dic_content = ''
    editData.dic_code = ''
    this.visible = true
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
  //分页
  watchChange(index: number) {
    //
  }
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      if (valid) {
        this.btnLoad = true
        self.editData.dic_code =
          self.$route.query.category_code + self.editData.dic_code
        Api.dicInfoEdit(self.editData).then((res: any) => {
          if (res.data != 0) {
            self.visible = false
            self.$message.success(res.msg)
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
    let editData: any = this.editData
    editData.id = 0
    editData.dic_content = ''
    this.visible = false
  }
  //可用状态变更
  onChangeVal(val: any) {
    val.state = val.state == true ? 0 : -1
    Api.dicInfoDetails(val).then((res: any) => {
      if (res.data == 0) {
        this.$message.warning(res.msg)
      } else {
        this.$message.success('操作成功')
      }
    })
  }
}
