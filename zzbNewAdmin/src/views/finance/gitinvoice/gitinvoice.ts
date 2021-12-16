import { Component, Vue } from 'vue-property-decorator'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import { AdminOptions, finance } from '@/types/index.ts'
import * as Api from '@/api/finance.ts'
import router from '@/router'
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
        label: '收票地址ID',
        prop: 'id'
      },
      {
        label: '会员名称',
        prop: 'name'
      },
      {
        label: '会员类别',
        prop: 'm_type'
      },
      {
        label: 'vip会员账户名称',
        prop: 'account_name'
      },
      {
        label: 'vip用户管理员名称',
        prop: 'admin_name'
      },
      {
        label: '收票人姓名',
        prop: 'consignee_name'
      },
      {
        label: '收票人电话',
        prop: 'consignee_telephone'
      },
      {
        label: '收票人邮箱',
        prop: 'consignee_email'
      },
      {
        label: '创建时间',
        prop: 'string time'
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
    Api.getpaginggitinvoice(params)
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
      path: '/business/editadditerss',
      query: { id: data.row.id }
    })
  }
  //收票地址删除
  handleDelete(data: any) {
    let id: number = data.row.id
    Api.getpagingdeleteinvoice(id).then((res: any) => {
      window.console.log(res)
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
      path: '/business/editadditerss',
      query: { id: '0' }
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
