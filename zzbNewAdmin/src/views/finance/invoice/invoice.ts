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
    totalize: 0,
    height: 0,
    dataType: [
      {
        label: '发票ID',
        prop: 'id',
        width: '80'
      },
      {
        label: '名称',
        prop: 'invoice_name'
      },
      {
        label: '发票类型',
        prop: 'invoice_type',
        width: '80'
      },
      {
        label: '税号',
        prop: 'duty_paragraph'
      },
      {
        label: '地址',
        prop: 'bank_of_deposit '
      },
      {
        label: '电话',
        prop: 'telephone'
      },
      {
        label: '开户行',
        prop: 'bank_of_deposit'
      },
      {
        label: '银行账号',
        prop: 'bank_account'
      },
      {
        label: '创建人',
        prop: 'create_name'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ]
  }
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    invoice_id: '',
    invoice_name: '',
    create_name: ''
  }

  created() {
    let Wheight: number | null = document.body.offsetHeight
    this.data.height = Wheight - 230
  }

  activated() {
    this.init()
  }

  mounted() {
    //
  }

  // 初始化函数
  init() {
    this.getList(this.options)
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data
    data.loading = true
    let parmas2: any = JSON.parse(JSON.stringify(params))
    parmas2.invoice_id = params.invoice_id || 0
    Api.getpaginginvoice(parmas2)
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
    self.options.page = 1
    this.init()
  }
  //添加编辑
  add() {
    //
  }
  //分页
  watchChange(index: number) {
    let self: any = this
    self.options.page = index
    self.init()
  }
}
