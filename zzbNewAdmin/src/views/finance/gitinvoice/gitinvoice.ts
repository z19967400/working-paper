import { Component, Vue } from 'vue-property-decorator'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import { AdminOptions, finance } from '@/types/index'
import * as Api from '@/api/finance'
import router from '@/router'
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
    dialogType: false,
    actvie: 0,
    list: [],
    select: {},
    height: 0,
    totalize: 0,
    dataType: [
      {
        label: '收票ID',
        prop: 'id',
        width: '80'
      },
      {
        label: '收票人姓名',
        prop: 'member_id',
        width: '120'
      },
      {
        label: '收票人手机',
        prop: 'phone',
        width: '150'
      },
      {
        label: '收票人地址',
        prop: 'detailed_address'
      },
      {
        label: '收票人电子邮箱',
        prop: 'email',
        width: '220'
      },
      {
        label: '创建人',
        prop: 'create_name'
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
    ticket_address_id: '',
    name: '',
    phone_number: '',
    create_name: ''
  }
  createData: any = {
    id: 0,
    member_id: 0,
    member_vip_admin_id: 0,
    name: '',
    phone: '',
    email: '',
    country: 0,
    province: 0,
    city: 0,
    county: 0,
    detailed_address: ''
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
    parmas2.ticket_address_id = params.ticket_address_id || 0
    Api.getpaginggitinvoice(parmas2)
      .then((res: any) => {
        data.loading = false
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
    Object.keys(this.createData).forEach((key: string) => {
      this.createData[key] = data[key]
    })
    this.data.actvie = 2
    this.data.dialogType = true
  }
  //收票地址删除
  handleDelete(data: any) {
    this.$confirm('您确认删除该发票吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let id: number = data.id
        Api.deleteinvaeditaddress(id).then((res: any) => {
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
  search() {
    this.options.page = 1
    this.init()
  }
  //清除搜索项
  clearSelection() {
    this.options.page = 1
    this.options.ticket_address_id = ''
    this.options.name = ''
    this.options.phone_number = ''
    this.options.create_name = ''
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
    this.options.page = index
    this.init()
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
  close() {
    this.data.actvie = 0
    this.createData = {
      id: 0,
      member_id: 0,
      member_vip_admin_id: 0,
      name: '',
      phone: '',
      email: '',
      country: 0,
      province: 0,
      city: 0,
      county: 0,
      detailed_address: ''
    }
  }
  //新增/编辑提交
  onSubmit() {
    Api.AddTicketAddress(this.createData).then((res: any) => {
      if (res.state) {
        this.data.dialogType = false
        this.clearSelection()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //返回用户ID
  setUserId(val: number) {
    this.createData.member_id = val
  }
  //返回管理员ID
  selectAdmin(val: number) {
    this.createData.member_vip_admin_id = val
    if (val) {
      this.data.actvie = 2
    }
  }
  //确定选择的用户
  selectUser() {
    Api.GetMemberVipAdminsByMmeberIdV2(this.createData.member_id).then(
      (res: any) => {
        if (res.state) {
          // eslint-disable-next-line no-console
          console.log(res.data.member)

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
