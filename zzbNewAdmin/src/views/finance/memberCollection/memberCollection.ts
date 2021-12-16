import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index.ts'
import * as Api from '@/api/business.ts'
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
        value: 'm_type',
        label: '会员类别'
      },
      {
        value: 'member_name',
        label: '会员名称'
      },
      {
        value: 'account_name',
        label: 'VIP会员账户名称'
      },
      {
        value: 'contacts_email',
        label: '邮箱'
      },
      {
        value: 'contacts_name',
        label: '联系人'
      },
      {
        value: 'bank_name',
        label: '收款银行'
      }
    ],
    dataType: [
      { label: 'ID', prop: 'id' },
      { label: '会员名称', prop: 'name' },
      { label: '会员类别', prop: 'm_type' },
      { label: 'vip账户名称', prop: 'account_name' },
      { label: 'vip管理员名称', prop: 'admin_name' },
      { label: '收款通道名称', prop: 'payment_channel_name' },
      { label: '收款账号', prop: 'bank_account' },
      { label: '联系人', prop: 'contacts_name' },
      { label: '收款银行', prop: 'bank_name' },
      { label: '联系电话', prop: 'contacts_phone' },
      { label: '企业支付宝', prop: 'alipay_account' },
      { label: '电子邮箱', prop: 'contacts_email' },
      { label: '账户名称', prop: 'payee_name' },
      { label: '付款备注', prop: 'pay_remarks' },
      { label: '创建时间', prop: 'time' }
    ]
  }
  getData: businessOptions['getMemberCollectMoney'] = {
    page: 1,
    limit: this.$store.getters.limit,
    name: '', //会员名称
    m_type: '', //会员类别
    account_name: '', //VIP会员账户名称
    admin_name: '', //VIP会员管理员名称
    payment_channel_name: '', //收款通道名称
    contacts_name: '', //联系人
    contacts_email: '', //电子邮件
    contacts_phone: '', //联系电话
    alipay_account: '', //企业支付宝
    payee_name: '', //账户名称
    bank_name: '', //收款银行
    bank_account: '' //收款账号
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
  getList(params: businessOptions['getMemberCollectMoney']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.getMemberCollectList(params).then((res: any) => {
      data.loading = false
      data.list = res.list
      data.totalize = res.Count
    })
  }
  //跳转管理页面
  handDdit(data: any) {
    this.$router.push({
      path: '/business/memberCollectionEdit',
      query: {
        id: data.row.id
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.memberCollectDelet(data.row.id).then((res: any) => {
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
    this.$router.push({
      path: '/business/memberCollectionEdit',
      query: {
        id: '0'
      }
    })
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
