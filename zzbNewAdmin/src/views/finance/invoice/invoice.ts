import { Component, Vue } from 'vue-property-decorator'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import { AdminOptions, finance } from '@/types/index'
import * as Api from '@/api/finance'
import { api } from '../../../../../zzbPc/src/assets/js/api'
import selectUser from '../componets/selectUser/selectUser.vue'
import selectAdmin from '../componets/selectAdmin2/selectAdmin.vue'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging,
    selectUser,
    selectAdmin
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
    invoiceEditType: false,
    actvie: 0,
    dataType: [
      {
        label: '发票ID',
        prop: 'id',
        width: '80'
      },
      {
        label: '名称',
        prop: 'invoice_name',
        width: '350'
      },
      {
        label: '发票类型',
        prop: 'invoice_type',
        width: '180'
      },
      {
        label: '税号',
        prop: 'duty_paragraph',
        width: '180'
      },
      {
        label: '地址',
        prop: 'bank_of_deposit ',
        width: '250'
      },
      {
        label: '电话',
        prop: 'telephone',
        width: '150'
      },
      {
        label: '开户行',
        prop: 'bank_of_deposit',
        width: '280'
      },
      {
        label: '银行账号',
        prop: 'bank_account',
        width: '200'
      },
      {
        label: '创建人',
        prop: 'create_name',
        width: '280'
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
    invoice_id: '',
    invoice_name: '',
    create_name: ''
  }
  editData: any = {
    id: 0,
    member_id: 0,
    member_vip_admin_id: 0,
    invoice_type: '',
    invoice_name: '',
    duty_paragraph: '',
    country: 0,
    province: 0,
    city: 0,
    county: 0,
    detailed_address: '',
    telephone: '',
    bank_of_deposit: '',
    bank_account: ''
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
    parmas2.invoice_id = params.invoice_id || 0
    Api.getpaginginvoice(parmas2)
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
    this.data.actvie = 2
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
        Api.deleteinvaice(data.id).then((res: any) => {
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
    this.options.invoice_id = ''
    this.options.invoice_name = ''
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
      invoice_type: '',
      invoice_name: '',
      duty_paragraph: '',
      country: 0,
      province: 0,
      city: 0,
      county: 0,
      detailed_address: '',
      telephone: '',
      bank_of_deposit: '',
      bank_account: ''
    }
  }
  //新增/编辑提交
  onSubmit() {
    Api.AddInvoice(this.editData).then((res: any) => {
      if (res.state) {
        this.data.invoiceEditType = false
        this.reset()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //返回用户ID
  setUserId(val: number) {
    this.editData.member_id = val
  }
  //返回管理员ID
  selectAdmin(val: number) {
    this.editData.member_vip_admin_id = val
    if (val) {
      this.data.actvie = 2
    }
  }
  //确定选择的用户
  selectUser() {
    Api.GetMemberVipAdminsByMmeberIdV2(this.editData.member_id).then(
      (res: any) => {
        if (res.state) {
          this.adminData.name = res.data.member.name
          this.adminData.type = res.data.member.m_type
          this.adminData.admin_list = res.data.admin_list
          if (this.adminData.type == 'VIP') {
            this.data.actvie = 1
          } else {
            this.data.actvie = 2
          }
        } else {
          this.$message.warning(res.msg)
        }
      }
    )
  }
}
