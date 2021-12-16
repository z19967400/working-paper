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
        label: '任务名称',
        prop: 'task_name'
      },
      {
        label: '运行次数',
        prop: 'run_count'
      },
      {
        label: '上次执行时间',
        prop: 'lasttime'
      },
      {
        label: '上次运行时间',
        prop: 'last_run_time'
      },
      {
        label: '下次执行时间',
        prop: 'nexttime'
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
        value: 'task_name',
        label: '任务名称'
      }
    ]
  }
  getData: monitorOptions['getSever'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    task_code: '',
    task_name: ''
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
  getList(params: monitorOptions['getSever']) {
    let self: any = this
    self.data.loading = true
    Api.getQueueList(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/monitor/queueInfo',
      query: {
        id: data.row.id
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.QueueDelete(data.row.id)
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
      path: '/monitor/queueInfo',
      query: {
        id: '0'
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
