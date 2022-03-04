import { Component, Vue } from 'vue-property-decorator'
import * as Api2 from '@/api/finance'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import * as Api from '@/api/user'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class adminList extends Vue {
  // Getter

  // Action

  // data
  data: any = {
    loading: false,
    loading2: false,
    list: [],
    totalize: 0,
    height: 0,
    creditorData: []
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    member_name: '',
    admin_name: '',
    admin_phone_number: '',
    admin_account: ''
  }
  sandType: string = '用户'
  toAddress: string = ''
  sandPassWordData: any = {
    admin_id: 0,
    toAddress: '',
    admin_account: '',
    admin_name: ''
  }
  adminEditType: boolean = false
  parentId: number = 0
  sandPassWordShow: boolean = false
  customers: any = []
  adminEditData: any = {}
  creditorAdminType: boolean = false
  created() {
    let Wheight: number | null = document.body.offsetHeight
    this.data.height = Wheight - 230
  }

  activated() {
    this.init()
  }

  mounted() {
    this.getKefu()
  }
  // 初始化函数
  init() {
    this.getList(this.getData)
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data
    data.loading = true
    Api.GetVIPAdminPagingData(params).then((res: any) => {
      data.loading = false
      data.list = res.data
      data.totalize = res.count
    })
  }
  //编辑
  handleEdit(row: any) {
    this.adminEditType = true
    this.adminEditData = Object.assign({}, row)
    this.adminEditData.is_super =
      this.adminEditData.is_super == '普通管理员' ? 0 : 1
  }
  //删除
  handleDelete(data: any) {
    Api.ordinaryDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //弹窗确定
  determine() {
    this.init()
  }
  //取消
  cancel() {
    this.adminEditType = false
  }
  //搜索
  search() {
    let self: any = this
    self.getData.page = 1
    self.init()
  }
  //重置
  reset() {
    this.getData.page = 1
    this.getData.member_name = ''
    this.getData.admin_name = ''
    this.getData.admin_phone_number = ''
    this.getData.admin_account = ''
    this.init()
  }
  //添加
  add() {
    this.adminEditType = true
    this.parentId = 0
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    self.getData.page = index
    self.getData.limit = limit == null ? self.getData.limit : limit
    self.init()
  }
  tiemStr(str: string) {
    let time: string = ''
    time = str.replace('T', ' ')
    time = time.substring(0, time.lastIndexOf(':'))
    return time
  }
  //获取客服下拉
  getKefu() {
    Api2.getKefu().then((res: any) => {
      this.customers = res.data
    })
  }
  openSandpass(row: any) {
    this.sandPassWordData.admin_id = row.id
    this.sandPassWordData.toAddress = row.admin_email
    this.sandPassWordData.admin_name = row.admin_name
    this.sandPassWordData.admin_account = row.admin_account
    this.sandPassWordShow = true
  }
  //发送密码
  sandPassWord() {
    this.$confirm('您确认发送密码给该邮箱吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let parmas: any = Object.assign({}, this.sandPassWordData)
        if (this.sandType == '客服') {
          parmas['toAddress'] = this.toAddress
        }
        Api.sandAdminPassword(parmas).then((res: any) => {
          if (res.state) {
            this.sandPassWordShow = false
            this.$message.success(res.msg)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        })
      })
  }
  //Vip管理员编辑保存
  onSubmit() {
    Api.vipAddAdmin(this.adminEditData).then((res: any) => {
      if (res.state) {
        this.adminEditType = false
        let id: any = this.$route.params.id
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //债权人管理
  creditorAdmin(row: any) {
    this.creditorAdminType = true
    this.data.loading2 = true
    Api.GetCreditorByAdminId(row.id).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
        item.audit_status =
          item.audit_status === 'Audit_states_0'
            ? '待审核'
            : item.audit_status === 'Audit_states_1'
            ? '未通过'
            : '已通过'
      })
      this.data.creditorData = res.data
      this.data.loading2 = false
    })
  }
  //打开授权书
  open(url: string) {
    window.open(url)
  }
}
