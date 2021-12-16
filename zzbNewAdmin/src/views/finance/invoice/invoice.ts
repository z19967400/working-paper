import { Component, Vue } from 'vue-property-decorator'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
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
        value: '暂无',
        label: '###'
      }
    ],
    dataType: [
      {
        label: '会员',
        prop: 'member_id'
      },
      {
        label: '会员类别',
        prop: 'm_type'
      },
      {
        label: 'vip会员账户',
        prop: 'account_name'
      },
      {
        label: 'vip用户管理员',
        prop: 'admin_name'
      },
      {
        label: '发票抬头类型',
        prop: 'invoice_title_type_name '
      },
      {
        label: 'vip账户id',
        prop: 'member_vip_account_id'
      },
      {
        label: '税率',
        prop: 'invoice_tax_rate'
      },
      {
        label: '纳税人识别号',
        prop: 'tax_number'
      },
      {
        label: '开户银行',
        prop: 'bank_name'
      },
      {
        label: '银行电话',
        prop: 'bank_telephone'
      },
      {
        label: '详细地址 ',
        prop: 'detailed_address'
      },
      {
        label: '创建时间',
        prop: 'time'
      }
    ]
  }
  options: finance['getinandout'] = {
    page: 1,
    limit: this.$store.getters.limit
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
  //获取数据
  getList(params: AdminOptions['AdminList']) {
    let data: any = this.data
    data.loading = true
    Api.getpaginginvoice(params)
      .then((res: any) => {
        data.loading = false
        data.list = res.data
        data.totalize = res.count
      })
      .catch(() => {
        data.loading = false
        this.$message.error('网络异常')
      })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/business/listbill/gitbillailist',
      query: { id: data.row.id }
    })
    // Api.gitinvaedit(data.row.id).then((res: any) => {
    //   window.console.log(res);
    // });
  }
  //删除
  handleDelete(data: any) {
    Api.deleteinvaice(data.row.id).then((res: any) => {
      let self: any = this
      this.$message.success('删除成功')
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
    this.$router.push({
      path: '/business/listbill/gitbillailist'
    })
  }
  //分页
  watchChange(index: number) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    params.page = index
    self.init()
  }
}
