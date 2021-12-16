import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index'
import * as Api from '@/api/services'
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
        value: 'entrust_no',
        label: '委托编号'
      },
      {
        value: 'name',
        label: '当事人名称'
      }
    ],
    dataType: [
      {
        label: '委托编号',
        prop: 'entrust_no',
        width: '180px'
      },
      {
        label: '当事人名称',
        prop: 'name'
      },
      {
        label: '查档地域',
        prop: 'area',
        width: '220px'
      },
      {
        label: '查档类型',
        prop: 'a_type'
      },
      {
        label: '执行进度',
        prop: 'execution_progress',
        width: '80px'
      },
      {
        label: '创建人',
        prop: 'create_name'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '180px'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    entrust_no: '',
    name: ''
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
  getList(params: businessOptions['getEntrusted']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.GetQueryQrchivesPagingData(params).then((res: any) => {
      data.loading = false
      res.data.forEach((item: any) => {})
      data.list = res.data
      data.totalize = res.total
    })
  }
  //跳转管理页面
  goAdmin(data: any) {
    let id: string = data.entrust_no
    this.$router.push({
      path: `/services/servicesAdmin/info/${id}`
    })
  }
  //删除
  handleDelete(data: any) {
    let self: any = this
    let pamras: any = {
      type: 0,
      id: data.row.id
    }
    Api.DeleteService(pamras).then((res: any) => {
      if (res.state) {
        self.$message.success(res.msg)
        self.data.list.splice(data.index, 1)
      } else {
        self.$message.warning(res.msg)
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
    // this.$router.push({
    //   path: "/VIP/addVip"
    // });
    this.visible = true
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
