import { Component, Vue } from 'vue-property-decorator'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import { AdminData, AdminOptions } from '@/types/index'
import * as Api from '@/api/admin'
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
  data: AdminData['AdminList'] = {
    loading: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'job_number',
        label: '工号'
      },
      {
        value: 'real_name',
        label: '姓名'
      },
      {
        value: 'phone_no',
        label: '手机号'
      }
    ],
    dataType: [
      {
        label: '工号',
        prop: 'job_number'
      },
      {
        label: '头像',
        prop: 'head_img'
      },
      {
        label: '姓名',
        prop: 'real_name'
      },
      {
        label: '手机号',
        prop: 'phone_no',
        width: '250px'
      },
      {
        label: '邮箱',
        prop: 'email'
      },
      {
        label: '角色',
        prop: 'name'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ]
  }
  options: AdminOptions['AdminList'] = {
    page: 1,
    limit: 12,
    real_name: '',
    phone_no: '',
    job_number: ''
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
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: AdminOptions['AdminList']) {
    let data: any = this.data
    data.loading = true
    Api.getAdmin(params)
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
    //
  }
  //删除
  handleDelete(data: any) {
    //
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    self.options.page = 1
    let params: any = Object.assign({}, self.options)
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
  //添加编辑
  add() {
    //
  }
  //分页
  watchChange(index: number) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    params.page = index
    self.init()
  }
}
