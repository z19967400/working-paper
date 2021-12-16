import { Component, Vue } from 'vue-property-decorator'
import { ApiData, ApiOptions } from '@/types/views/api.interface'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import * as Api from '@/api/api'

@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  //展示的数据
  data: ApiData['webData'] = {
    webList: [],
    loading: false,
    totalize: 0,
    select: {},
    tableType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '页面名称',
        prop: 'view_name'
      },
      {
        label: '页面类别',
        prop: 'view_type'
      },
      {
        label: '页面域名',
        prop: 'view_domain',
        width: '250px'
      },
      {
        label: '页面地址',
        prop: 'view_path'
      },
      {
        label: '版本号',
        prop: 'version_number'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ],
    options: [
      {
        value: 'id',
        label: '页面ID'
      },
      {
        value: 'view_name',
        label: '页面名称'
      },
      {
        value: 'view_path',
        label: '页面地址'
      }
    ]
  }
  //提交的数据
  params: ApiOptions['webParams'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    view_type: '',
    view_name: '',
    view_domain: '',
    view_path: ''
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
  init() {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.params : self.data.select
    this.getWebList(params)
  }
  //编辑
  handleEdit(row: any) {
    this.$router.push({
      path: '/api/edit',
      query: { id: row.row.id, type: '1' }
    })
  }
  //删除
  handleDelete(row: any) {
    let self: any = this
    this.$confirm('确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        self.data.loading = true
        Api.webDelete(row.row.id).then((res: any) => {
          if (res.data == 1) {
            self.data.webList = self.data.webList.filter((item: any) => {
              return item.id != row.row.id
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            self.data.loading = false
          } else {
            this.$message.error(res.msg)
            self.data.loading = false
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //获取页面列表
  getWebList(params: any) {
    let self: any = this
    self.data.loading = true
    Api.getWebList(params).then((res: any) => {
      self.data.loading = false
      self.data.webList = res.data
      self.data.totalize = res.count
      res.data.forEach((item: any) => {
        item.view_type = item.view_type == 2 ? '用户端' : '平台管理'
        item.create_time = item.create_time.replace('T', ' ')
      })
    })
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.params.page = 1
    let params: any = Object.assign({}, self.params)
    data.forEach((item: any) => {
      let name: string = item.label
      params[name] = item.value
    })
    self.data.select = params
    this.getWebList(params)
  }
  //清除搜索
  clearSelection() {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.params : self.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.data.loading = true
    this.init()
  }
  //新增
  addApi() {
    this.$router.push({
      path: '/api/edit',
      query: { id: '0', type: '1' }
    })
  }
}
