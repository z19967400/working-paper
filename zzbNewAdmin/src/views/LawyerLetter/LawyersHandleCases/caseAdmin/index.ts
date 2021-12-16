import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index'
import * as Api from '@/api/business'
import comTab from './tab.vue'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging,
    comTab
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
        value: 'debtor_number',
        label: '委托编号'
      },
      {
        value: 'creditor_name',
        label: '债权人名称'
      },
      {
        value: 'debtor_name',
        label: '债务人名称'
      },
      {
        value: 'member_name',
        label: '创建人'
      },
      {
        value: 'create_time',
        label: '创建时间'
      },
      {
        value: 'case_status',
        label: '办案进度'
      }
    ],
    dataType: [
      // {
      //   label: 'ID',
      //   prop: 'id',
      //   width: '80px'
      // },
      {
        label: '委托编号',
        prop: 'debtor_number',
        width: '150px'
      },
      // {
      //   label: '会员名称',
      //   prop: 'member_name',
      //   width: '380px'
      // },
      {
        label: '债务人名称',
        prop: 'debtor_name'
      },

      {
        label: '债务类别',
        prop: 'collection_scene',
        width: '120px'
      },

      // {
      //   label: '办案地区',
      //   prop: 'case_handling_area',
      //   width: '180px'
      // },
      {
        label: '办案进度',
        prop: 'case_progress',
        width: '120px'
      },
      {
        label: '欠款本金(元)',
        prop: 'arrears_principal',
        width: '180px'
      },
      {
        label: '债权人名称',
        prop: 'creditor_name'
      },
      {
        label: '创建人',
        prop: 'member_name'
      },
      {
        label: '创建时间',
        prop: 'entrust_time',
        width: '180px'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    case_status: '',
    debtor_number: '',
    creditor_name: '',
    debtor_name: '',
    create_time: '',
    create_name: ''
  }
  list: any = []
  visible: boolean = false
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
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: businessOptions['getDebtor']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.getOfflineCaseList(params).then((res: any) => {
      data.loading = false
      // res.data.forEach((item: any) => {
      //   item.audit_status =
      //     item.audit_status == 0
      //       ? "待审核"
      //       : item.audit_status == 1
      //       ? "未通过"
      //       : "已通过";
      // });
      data.list = res.data
      data.list.forEach((item: any) => {
        item.entrust_time = item.entrust_time.substring(
          0,
          item.entrust_time.lastIndexOf(':')
        )
      })
      data.totalize = res.total
    })
  }
  //跳转管理页面
  goAdmin(data: any) {
    let number: string = data.debtor_number
    this.$router.push({
      path: `/LawyersHandleCases/caseInfo/${number}`
    })
  }
  //删除
  handleDelete(data: any) {
    Api.lawHandleCaseDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
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
