import { Component, Vue } from 'vue-property-decorator'
import { monitorData, monitorOptions } from '@/types'
import * as Api from '@/api/monitor'
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
  data: monitorData['data'] = {
    loading: false,
    totalize: 0,
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '服务任务名称',
        prop: 'task_name'
      },
      {
        label: '上次执行时间',
        prop: 'lasttime',
        width: '200px'
      },
      {
        label: '上次运行时间',
        prop: 'last_run_time',
        width: '200px'
      },
      {
        label: '运行次数',
        prop: 'run_count'
      },
      {
        label: '日志创建时间',
        prop: 'create_time',
        width: '200px'
      }
    ],
    list: [],
    select: {},
    options: [
      {
        value: 'task_name',
        label: '请输入服务器任务名称'
      },
      {
        value: 'task_code',
        label: '请输入服务器任务编码'
      }
    ]
  }
  options: monitorOptions['getSever'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    task_code: '',
    task_name: ''
  }
  visible: boolean = false
  editData: monitorOptions['severEdit'] = {
    id: 0,
    task_name: '',
    task_code: ''
  }
  rules: any = {
    task_name: [
      {
        required: true,
        message: '请输入服务器任务名称',
        trigger: 'blur'
      },
      { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
    ],
    task_code: [
      {
        required: true,
        message: '请输入服务器任务编码',
        trigger: 'blur'
      },
      { max: 50, message: '长度不能超过50个字符', trigger: 'blur' }
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
    this.getList(this.options)
  }
  //获取数据
  getList(params: monitorOptions['getSever']) {
    let self: any = this
    self.data.loading = true
    Api.getSeverList(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    let editData: any = this.editData
    // eslint-disable-next-line no-console
    console.log(data)

    editData.id = data.row.id
    editData.task_name = data.row.task_name
    editData.task_code = data.row.task_code
    this.visible = true
  }
  //删除
  handleDelete(data: any) {
    let self: any = this
    Api.severDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        self.$message.success(res.msg)
        self.init()
      } else {
        self.$message.warning(res.msg)
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
    self.options.page = 1
    let params: any = Object.assign({}, self.options)
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
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.data.loading = true
    self.init()
  }
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      self.btnLoad = true
      if (valid) {
        Api.severEdit(self.editData).then((res: any) => {
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
