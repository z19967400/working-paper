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
        label: '标题',
        prop: 'title'
      },
      {
        label: '业务类别',
        prop: 'business_type'
      },
      {
        label: '关联编号',
        prop: 'relation_number'
      },
      {
        label: '发送号码',
        prop: 'send_number'
      },
      // {
      //   label: "发送内容",
      //   prop: "send_content"
      // },
      {
        label: '执行状态',
        prop: 'execution_status'
      },
      {
        label: '异常提示',
        prop: 'error_prompt'
      },
      {
        label: '发送时间',
        prop: 'send_time'
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
        value: 'member_type',
        label: '标题'
      },
      {
        value: 'dic_content',
        label: '类别'
      },
      {
        value: 'relation_number',
        label: '关联编号'
      },
      {
        value: 'send_number',
        label: '发送号码'
      },
      {
        value: 'execution_status',
        label: '状态'
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
  getData: monitorOptions['getLogs'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    name: '', //标题
    business_type: '', // 类别
    relation_number: '', //关联编号
    send_number: '', // 发送号码
    execution_status: 0, //状态
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
  getList(pamars: monitorOptions['getLogs']) {
    let self: any = this
    self.data.loading = true
    Api.getEmailLogs(pamars).then((res: any) => {
      self.data.list = res.data.list
      self.data.list.forEach((item: any) => {
        // item.business_type = item.business_type == 1 ? "AI律师函" : "其他";
        item.execution_status =
          item.execution_status == 0
            ? '未执行'
            : item.execution_status == 1
            ? '排队中'
            : item.execution_status == 2
            ? '执行结束'
            : item.execution_status == 5
            ? '错误'
            : '撤销'
      })
      self.data.loading = false
      self.data.totalize = res.data.count
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
