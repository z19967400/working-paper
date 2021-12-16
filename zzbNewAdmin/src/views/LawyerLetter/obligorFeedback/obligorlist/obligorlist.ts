import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index.ts'
import * as Api from '@/api/business.ts'
import obligorInfo from '../compments/obligorInfo.vue'
import addObligor from '../compments/addObligor.vue'
import { baseURL } from '@/utils/request'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging,
    obligorInfo,
    addObligor
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
        value: 'debtor_name',
        label: '债务人'
      },
      {
        value: 'feedback_source',
        label: '反馈来源'
      },
      {
        value: 'real_name',
        label: '对接客服名称'
      },
      {
        value: 'member_ip',
        label: '用户IP'
      },
      {
        value: 'member_phone',
        label: '用户手机号'
      }
    ],
    dataType: [
      {
        label: 'ID',
        prop: 'id'
      },
      {
        label: '债务人名称',
        prop: 'debtor_name'
      },
      {
        label: '反馈来源',
        prop: 'feedback_source'
      },
      {
        label: '对接客服名称',
        prop: 'real_name'
      },
      {
        label: '用户备注',
        prop: 'member_remarks'
      },
      {
        label: '用户IP',
        prop: 'member_ip'
      },
      {
        label: '用户手机号码',
        prop: 'member_phone'
      },
      {
        label: '后台备注',
        prop: 'back_remarks'
      },
      {
        label: '创建时间',
        prop: 'time'
      }
    ]
  }
  getData: businessOptions['getFeedback'] = {
    page: 1,
    limit: this.$store.getters.limit,
    debtor_name: '',
    feedback_source: '',
    real_name: '',
    member_ip: '',
    member_phone: ''
  }
  list: any = []
  visible: boolean = false
  visible2: boolean = false
  editData: businessOptions['addFeedback'] = {
    id: 0,
    debtor_id: 0,
    feedback_source: '',
    customer_service_admin_id: 0,
    member_remarks: '',
    member_ip: '',
    member_phone: '',
    back_remarks: '',
    data: []
  }
  uloadsrc: any = ''
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
  getList(params: businessOptions['getFeedback']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.getFeedbackList(params).then((res: any) => {
      data.loading = false
      res.data.forEach((item: any) => {
        item.audit_status =
          item.audit_status == 0
            ? '待审核'
            : item.audit_status == 1
            ? '未通过'
            : '已通过'
      })
      data.list = res.data
      data.totalize = res.count
    })
  }
  //跳转详情
  goInfo(data: any) {
    Api.getFeedbackInfo(data.row.id).then((res: any) => {
      this.editData = res.data
    })
    this.visible = true
  }
  //下载
  xiazai(data: any) {
    let parmas: any = {
      id: data.row.id,
      type: 1,
      name: '债务人反馈下载'
    }
    this.uloadsrc =
      'http://api1.zhaizhubang.net/api' +
      '/tools/Download?id=' +
      data.row.id +
      '&type=1' +
      '&name=债务人反馈下载'
  }
  //删除
  handleDelete(data: any) {
    Api.feedbackDelet(data.row.id).then((res: any) => {
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
  //打开添加弹窗
  add() {
    this.visible2 = true
  }
  //添加/编辑 确定
  addFeedback(data: any) {
    Api.addFeedback(data).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
      setTimeout(() => {
        this.visible = false
        this.visible2 = false
        if (res.data != 0) {
          this.init()
        }
      }, 500)
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
