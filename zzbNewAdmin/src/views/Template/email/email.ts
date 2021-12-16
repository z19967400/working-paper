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
        label: '标题',
        prop: 'title',
        width: '120px'
      },
      {
        label: '调用码',
        prop: 'use_code',
        width: '120px'
      },
      {
        label: '参数',
        prop: 'parameter'
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
    title: ''
  }
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
    Api.getemailModel(params)
      .then((res: any) => {
        self.data.list = res.data
        self.data.loading = false
        self.data.totalize = res.count
      })
      .catch(() => {
        this.$message.error('网络错误')
        self.data.loading = false
      })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/Template/emailEdit',
      query: {
        data: JSON.stringify(data.row)
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.emailModelDelet(data.row.id)
      .then((res: any) => {
        if (res.data == 0) {
          this.$message.warning(res.msg)
        } else {
          this.$message.success(res.msg)
          this.init()
        }
      })
      .catch(() => {
        this.$message.error('网络错误')
      })
  }
  //添加
  add() {
    this.$router.push({
      path: '/Template/emailEdit',
      query: {
        data: null
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
}
