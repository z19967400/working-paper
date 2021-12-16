import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { UserData, UserOptions } from '@/types/index'
import * as Api from '@/api/business'
import * as Api2 from '@/api/user'
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
  data: UserData = {
    loading: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'id',
        label: '律师ID'
      },
      {
        value: 'lawyer_name',
        label: '律师名称'
      },
      {
        value: 'lawyer_phone_number',
        label: '律师手机号'
      },
      {
        value: 'address',
        label: '律所地址'
      },
      {
        value: 'audit_status',
        label: '审核状态'
      }
    ],
    dataType: [
      {
        label: '律师ID',
        prop: 'id',
        width: '120'
      },
      {
        label: '律师名称',
        prop: 'lawyer_name',
        width: '120'
      },
      {
        label: '律所名称',
        prop: 'law_firm_name',
        width: '220'
      },
      {
        label: '手机号码',
        prop: 'lawyer_phone_number',
        width: '120'
      },
      {
        label: '律所地址',
        prop: 'law_firm_address_detailed'
      },
      {
        label: '审核状态',
        prop: 'audit_status',
        width: '120'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    id: 0,
    lawyer_name: '',
    lawyer_phone_number: '',
    address: '',
    audit_status: ''
  }
  list: any = []
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
  getList(params: UserOptions['getOrdinary']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.GetRegisterLawyerPagingData(params).then((res: any) => {
      data.loading = false
      data.list = res.data
      data.list.forEach((item: any) => {
        item.audit_status =
          item.member_id === 0 ? '未注册' : this.statusTostr(item.audit_status)
      })
      data.totalize = res.count
    })
  }
  //认证状态转文本
  statusTostr(val: string) {
    let value: string = ''
    switch (val) {
      case 'Audit_states_0':
        value = '待审核'
        break
      case 'Audit_states_1':
        value = '未通过'
        break
      case 'Audit_states_2':
        value = '已通过'
        break
      default:
        break
    }
    return value
  }
  //管理
  handleAdmin(data: any) {
    if (data.member_id === 0) {
      this.$message.warning('该会员为旧平台转移数据,尚未在新平台注册')
      return false
    }
    this.$router.push({
      path: `/ordinary/lawterAdmin/${data.member_id}`
    })
  }
  //删除
  handleDelete(data: any) {
    if (data.row.member_id === 0) {
      this.$message.warning('该会员为旧平台转移数据,尚未在新平台注册')
      return false
    }
    Api2.ordinaryDelete(data.row.member_id).then((res: any) => {
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
      path: '/ordinary/ordinaryInfo',
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
}
