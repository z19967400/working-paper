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
        label: '业务类别',
        prop: 'dic_content'
      },
      {
        label: '业务名称',
        prop: 'url_name'
      },
      {
        label: '域名',
        prop: 'url_domain'
      },
      {
        label: '地址',
        prop: 'url_path'
      },
      {
        label: '参数',
        prop: 'url_parameter'
      },
      {
        label: '管理员',
        prop: 'real_name'
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
        value: 'url_type',
        label: '业务类别'
      },
      {
        value: 'real_name',
        label: '员工姓名'
      },
      {
        value: 'url_name',
        label: '业务名称'
      },
      {
        value: 'start_time',
        label: '开始时间'
      },
      {
        value: 'end_time',
        label: '结束时间'
      }
    ]
  }
  getData: monitorOptions['getStaffLog'] = {
    page: 1,
    limit: this.$store.getters.limit,
    url_type: '', //类别
    real_name: '', //员工姓名
    url_name: '', //业务名称
    start_time: '',
    end_time: ''
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
  getList(params: monitorOptions['getStaffLog']) {
    let self: any = this
    self.data.loading = true
    Api.getStaffLogs(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    //
  }
  //删除
  handleDelete(data: any) {
    //
  }
  //添加
  add() {
    //
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
