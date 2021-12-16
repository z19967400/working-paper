import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index'
import * as Api from '@/api/business'
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
    visibl: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'creditor_name',
        label: '债权人名称'
      },
      {
        value: 'phone_number',
        label: '手机号码'
      },
      {
        value: 'agent_name',
        label: '联系人名称'
      }
    ],
    dataType: [
      {
        label: 'ID',
        prop: 'id'
      },
      {
        label: '会员名称',
        prop: 'member_name'
      },
      {
        label: '债权人名称',
        prop: 'creditor_name'
      },
      {
        label: '类型',
        prop: 'creditor_type'
      },
      {
        label: '手机号码',
        prop: 'phone_number'
      },
      {
        label: '电子邮箱',
        prop: 'email'
      },
      {
        label: '地址',
        prop: 'creditor_address'
      },
      {
        label: '审核状态',
        prop: 'audit_status'
      },
      {
        label: '申请时间',
        prop: 'create_time'
      }
    ]
  }
  getData: businessOptions['getCreditor'] = {
    page: 1,
    limit: this.$store.getters.limit,
    creditor_name: '', //债权人名称
    phone_number: '', //手机号码
    agent_name: '' //联系人名称
  }
  list: any = []
  visible: boolean = false
  examine: any = {
    id: '',
    audit_status: '',
    audit_feedback: ''
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
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: businessOptions['getCreditor']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.getCreditorList(params).then((res: any) => {
      res.data.forEach((item: any) => {
        item.creditor_type =
          item.creditor_type == 'Creditor_states_0' ? '个人' : '企业'
        item.audit_status =
          item.audit_status == 'Audit_states_0 '
            ? '待审核'
            : item.audit_status == 'Audit_states_1'
            ? '未通过'
            : '已通过'
      })
      data.loading = false
      data.list = res.data
      data.totalize = res.count
    })
  }
  //跳转管理页面
  goAdmin(data: any) {
    this.$router.push({
      path: '/creditor/addCreditor',
      query: {
        id: data.id
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.creditorListDelet(data.row.id).then((res: any) => {
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
      path: '/creditor/addCreditor',
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
  //审核
  examines(data: any) {
    this.data.visible = true
    this.examine.id = data.id
    this.examine.audit_status =
      data.audit_status == '待审核'
        ? 'Audit_states_0'
        : data.audit_status == '未通过'
        ? 'Audit_states_1'
        : 'Audit_states_2'
    this.examine.audit_feedback = data.audit_feedback
  }
  //确认审核
  confirmExamine() {
    Api.confirmExamine(this.examine).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.visible = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
