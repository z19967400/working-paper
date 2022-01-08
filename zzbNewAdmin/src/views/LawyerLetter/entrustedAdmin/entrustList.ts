import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index'
import * as Api from '@/api/business'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  // Getter

  // Action

  // data
  data: any = {
    loading: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'creditor_name',
        label: '债权人名称'
      },
      {
        value: 'debtor_name',
        label: '债务人名称'
      },
      {
        value: 'debtor_phone_number',
        label: '收件人电话'
      },
      {
        value: 'create_time',
        label: '创建时间'
      },
      {
        value: 'create_name',
        label: '创建人'
      },
      {
        value: 'executing_states',
        label: '执行状态'
      },
      {
        value: 'batch_no',
        label: '批次号'
      }
    ],
    dataType: [
      {
        label: '批次号',
        prop: 'batch_no',
        width: '120px'
      },
      {
        label: '债务类别',
        prop: 'debt_type',
        width: '120px'
      },
      {
        label: '债权人',
        prop: 'creditor_name',
        width: '480px'
      },
      {
        label: '委托数',
        prop: 'e_total',
        width: '80px'
      },
      {
        label: '执行进度',
        prop: 'execution_progress',
        width: '120px'
      },
      {
        label: '创建人',
        prop: 'create_name',
        width: '480px'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '180px'
      },
      {
        label: '后台备注',
        prop: 'back_remarks',
        width: '220px'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    batch_no: '',
    create_name: '',
    creditor_name: '',
    executing_states: '',
    create_time: '',
    debtor_name: '',
    debtor_phone_number: ''
  }
  list: any = []
  visible: boolean = false
  created() {
    setTimeout(() => {
      this.init()
    }, 100)
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: businessOptions['getEntrusted']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.getEntrusted(params).then((res: any) => {
      data.loading = false
      res.data.forEach((item: any) => {})
      data.list = res.data
      data.totalize = res.total
    })
  }
  //跳转管理页面
  goAdmin(data: any) {
    let id: string = data.batch_no
    let executing_states: string = data.executing_states
    this.$router.push({
      path: `/LawyerLetter/entrustAdmin/${id}/${executing_states}`
    })
  }
  //删除
  handleDelete(data: any) {
    let isok: boolean =
      data.row.execution_progress == '待支付' ||
      data.row.execution_progress == '待审核' ||
      data.row.execution_progress == '已撤销' ||
      data.row.execution_progress == '审核未通过'
    if (!isok) {
      this.$message.warning('该律师函不可删除')
      return false
    }
    let self: any = this
    Api.entrustDelete(data.row.batch_no).then((res: any) => {
      if (res.state) {
        self.$message.success(res.msg)
        self.data.list.splice(data.index, 1)
      } else {
        self.$message.warning(res.msg)
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
    this.getList(params)
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //添加
  add() {
    // this.$router.push({
    //   path: "/VIP/addVip"
    // });
    this.visible = true
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.init()
  }
  //弹窗确定
  determine() {
    this.init()
  }
  //取消
  cancel() {
    this.visible = false
  }
}
