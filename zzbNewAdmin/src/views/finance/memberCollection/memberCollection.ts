import { Component, Vue } from 'vue-property-decorator'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import { AdminOptions, finance } from '@/types/index'
import * as Api from '@/api/finance'
import selectLayer from '../componets/selectLayer/selectLayer.vue'

@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging,
    selectLayer
  }
})
export default class memberCollection extends Vue {
  // Getter

  // Action

  // data
  data: any = {
    loading: false,
    list: [],
    totalize: 0,
    height: 0,
    invoiceEditType: false,
    actvie: 0,
    dataType: [
      {
        label: '收款ID',
        prop: 'id',
        width: '80'
      },
      {
        label: '发票类型',
        prop: 'invoice_type',
        width: '180'
      },
      {
        label: '发票税率',
        prop: 'invoice_tax_rate',
        width: '180'
      },
      {
        label: '收款户名',
        prop: 'account_name ',
        width: '250'
      },
      {
        label: '收款账号',
        prop: 'account_number',
        width: '150'
      },
      {
        label: '收款银行全称',
        prop: 'bank_full_name',
        width: '280'
      },
      {
        label: '收款银行行号',
        prop: 'bank_no',
        width: '200'
      },
      {
        label: '联系人电话',
        prop: 'telephone',
        width: '280'
      },
      {
        label: '创建人',
        prop: 'create_name',
        width: '150'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '150'
      }
    ]
  }
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    collection_id: '',
    create_name: ''
  }
  editData: any = {
    id: 0,
    member_id: 0,
    member_vip_admin_id: 0,
    bill_number: '',
    invoice_type: '',
    invoice_tax_rate: '',
    account_name: '',
    account_number: '',
    bank_full_name: '',
    bank_no: '',
    telephone: ''
  }
  adminData: any = {
    name: '',
    type: '',
    admin_list: []
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
    parmas2.collection_id = params.collection_id || 0
    Api.GetMemberCollectionPagingData(parmas2)
      .then((res: any) => {
        data.loading = false
        res.data.forEach((item: any) => {
          // item.invoice_type = this.getTypeName(item.invoice_type)
          item.create_time = this.tiemStr(item.create_time)
        })
        data.list = res.data
        data.totalize = res.total
      })
      .catch(() => {
        data.loading = false
        this.$message.error('网络异常')
      })
  }
  //编辑
  handleEdit(data: any) {
    Object.keys(this.editData).forEach((key: string) => {
      this.editData[key] = data[key]
    })
    this.data.actvie = 1
    this.data.invoiceEditType = true
  }
  //删除
  handleDelete(data: any) {
    this.$confirm('您确认删除该发票吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.DeleteMemberCollectionById(data.id).then((res: any) => {
          this.options.page = 1
          this.init()
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.options.page = 1
    this.init()
  }
  //重置搜索
  reset() {
    this.options.page = 1
    this.options.collection_id = ''
    this.options.create_name = ''
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
  //获取发票类型
  getTypeName(type: string) {
    let val: string = ''
    switch (type) {
      case 'Invoice_Type_2':
        val = '增值税专用发票（纸质）'
        break
      case 'Invoice_Type_1':
        val = '增值税普通发票（纸质）'
        break
      case 'Invoice_Type_0':
        val = '增值税普通发票（电子）'
        break
      default:
        break
    }
    return val
  }
  tiemStr(str: string) {
    let time: string = ''
    time = str.replace('T', ' ')
    time = time.substring(0, time.lastIndexOf(':'))
    return time
  }
  //关闭
  close() {
    this.data.actvie = 0
    this.editData = {
      id: 0,
      member_id: 0,
      member_vip_admin_id: 0,
      bill_number: '',
      invoice_type: '',
      invoice_tax_rate: '',
      account_name: '',
      account_number: '',
      bank_full_name: '',
      bank_no: '',
      telephone: ''
    }
  }
  //新增/编辑提交
  onSubmit() {
    Api.AddCollectionInfoV2(this.editData).then((res: any) => {
      if (res.state) {
        this.data.invoiceEditType = false
        this.reset()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //返回用户ID
  setUserId(val: any) {
    this.editData.member_id = val.member_id
  }
  //确定选择的用户
  selectUser() {
    this.data.actvie = 1
  }
  //跳转律师
  goAdmin(row: any) {
    this.$router.push(`/ordinary/lawterAdmin/${row.member_id}`)
  }
}
