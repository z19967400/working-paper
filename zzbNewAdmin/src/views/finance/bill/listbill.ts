import { Component, Vue } from 'vue-property-decorator'
import {
  // comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import comtable from '@/components/table/comtable.vue'
import { AdminOptions, finance } from '@/types/index'
import * as Api from '@/api/finance'
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
        value: 'bill_number',
        label: '账单编号'
      },
      {
        value: 'member_id',
        label: '用户ID'
      },
      {
        value: 'member_name',
        label: '用户名称'
      },
      {
        value: 'bill_type',
        label: '账单类别'
      },
      {
        value: 'settlement_status',
        label: '结算状态'
      }
    ],
    dataType: [
      {
        label: '账单编号',
        prop: 'bill_number',
        width: '180px'
      },
      {
        label: '账单名称',
        prop: 'bill_title',
        width: '480px'
      },
      {
        label: '用户名称',
        prop: 'create_name',
        width: '350px'
      },
      {
        label: '账单类别',
        prop: 'bill_type',
        width: '180px'
      },
      {
        label: '币种',
        prop: 'currency_name',
        width: '100px'
      },
      {
        label: '账单总金额',
        prop: 'bill_total_amount',
        width: '120px'
      },
      {
        label: '已结算金额',
        prop: 'bill_settled_amount',
        width: '120px'
      },
      {
        label: '结算状态',
        prop: 'settlement_status',
        width: '100px'
      },
      {
        label: '后台备注',
        prop: 'back_remarks',
        width: '220px'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '160px'
      }
    ]
  }
  settlement_status: any = [
    { name: '审核中', prop: 'Settlement_Status_0' },
    { name: '用户确认', prop: 'Settlement_Status_1' },
    { name: '客服确认', prop: 'Settlement_Status_2' },
    { name: '开票中', prop: 'Settlement_Status_3' },
    { name: '结算中', prop: 'Settlement_Status_4' },
    { name: '已结算', prop: 'Settlement_Status_5' },
    { name: '已退款', prop: 'Settlement_Status_6' }
  ]
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    bill_number: '',
    member_id: 0,
    member_name: '',
    bill_type: '',
    settlement_status: ''
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
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    this.getList(params)
  }
  //生成AI律师函
  addailist() {
    this.$router.push({
      path: '/business/listbill/ailist'
    })
  }
  //结算状态转字符
  toStr(str: string) {
    let row: any = this.settlement_status.filter((item: any) => {
      return item.prop == str
    })
    return row[0].name
  }
  //账单类别转字符串
  tostr2(str: string) {
    let val: string =
      str == 'Bill_Type_0'
        ? '法律服务费请款单'
        : str == 'Bill_Type_1'
        ? '律师费请款单'
        : '平台管理费请款单'
    return val
  }
  //获取数据
  getList(params: AdminOptions['AdminList']) {
    let data: any = this.data
    data.loading = true
    Api.GetBillPagingData(params)
      .then((res: any) => {
        data.loading = false
        data.list = res.data
        data.totalize = res.total
        data.list.forEach((item: any) => {
          item.settlement_status = this.toStr(item.settlement_status)
          item.bill_type = this.tostr2(item.bill_type)
          item.bill_settled_amount =
            item.bill_settled_amount.toLocaleString() + '.00'
          item.bill_total_amount =
            item.bill_total_amount.toLocaleString() + '.00'
        })
      })
      .catch(() => {
        data.loading = false
        this.$message.error('网络异常')
      })
  }
  //账单详情
  handleInfo(data: any) {
    let self: any = this
    self.$router.push({
      path: `/business/listbill/getadmindata/${data.row.bill_number}`
    })
  }
  //编辑
  handleEdit(data: any) {
    //
  }
  //删除
  handleDelete(data: any) {
    Api.deletBill(data.row.id).then((res: any) => {
      if (res.data == 0) {
        this.$message.warning(res.msg)
      } else {
        this.$message.success(res.msg)
        this.init()
      }
    })
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
    this.getList(params)
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //添加编辑
  add() {
    //
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.init()
  }
}
