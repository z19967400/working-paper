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
  // data
  data: SettingsData['processList'] = {
    loading: false,
    totalize: 0,
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '流程名称',
        prop: 'flow_name'
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
        value: 'flow_name',
        label: '流程名称'
      }
    ]
  }
  getCase: SettingsOptions['getCase'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    flow_name: ''
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

  // 初始化函数
  init() {
    this.getList()
  }
  //获取数据
  getList() {
    let self: any = this
    Api.getCaseList(this.getCase).then((res: any) => {
      self.data.totalize = res.count
      self.data.list = res.data
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/settings/processEdit',
      query: { id: data.row.id }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.caseDelete(data.row.id).then((res: any) => {
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
    this.$router.push({
      path: '/settings/processEdit',
      query: { id: '0' }
    })
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    self.getCase.page = 1
    let params: any = Object.assign({}, self.getCase)
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
      JSON.stringify(self.data.select) == '{}' ? self.getCase : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.data.loading = true
    this.init()
  }
}
