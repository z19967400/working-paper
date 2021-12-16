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
        label: '类型',
        prop: 'url_type',
        width: '120px'
      },
      {
        label: '业务名称',
        prop: 'url_name',
        width: '120px'
      },
      {
        label: '地址',
        prop: 'url_path',
        width: '120px'
      },
      {
        label: '管理员id',
        prop: 'member_id',
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
  getData: any = {
    page: 1,
    limit: this.$store.state.layout.limit
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
    this.getList()
  }
  //获取数据
  getList() {
    let self: any = this
    self.data.loading = true
    Api.getEmailLogs(this.getData).then((res: any) => {
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
}
