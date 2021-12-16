import { Component, Vue } from 'vue-property-decorator'
import { ApiData } from '@/types/views/api.interface'
import * as Api from '@/api/api'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  // data
  data: ApiData = {
    params: {
      page: 1,
      limit: this.$store.state.layout.limit,
      api_domain: '',
      api_name: '',
      api_path: '',
      api_type: '',
      request_way: ''
    },
    select: {}, //子组件返回的筛选值
    apiList: [], //数据列表
    options: [
      //表格的格式
      {
        value: 'api_domain',
        label: '接口域名'
      },
      {
        value: 'api_type',
        label: '接口类别'
      },
      {
        value: 'api_name',
        label: '接口名称'
      },
      {
        value: 'api_path',
        label: '接口地址'
      },
      {
        value: 'request_way',
        label: '请求方式'
      }
    ],
    loading: false, //加载状态
    totalize: 0, //总条数
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '100px'
      },
      {
        label: '接口名称',
        prop: 'api_name',
        width: '200px'
      },
      {
        label: '接口类别',
        prop: 'dic_content',
        width: '100px'
      },
      {
        label: '接口域名',
        prop: 'api_domain',
        width: '200px'
      },
      {
        label: '接口地址',
        prop: 'api_path',
        width: '250px'
      },
      {
        label: '请求方式',
        prop: 'request_way',
        width: '100px'
      },
      {
        label: '版本号',
        prop: 'version_number',
        width: '100px'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ]
    //
  }
  initialization: any = ''
  created() {
    //
  }

  activated() {
    this.init()
  }
  deactivated() {
    //
  }
  mounted() {
    //
  }
  // 初始化函数
  init() {
    let params: object =
      JSON.stringify(this.data.select) == '{}'
        ? this.data.params
        : this.data.select
    this.getApiList(params)
  }
  //打开编辑
  handleEdit(value: any) {
    this.$router.push({
      path: '/api/edit',
      query: { id: value.row.id, type: '0' }
    })
  }
  //删除
  handleDelete(value: any) {
    this.$confirm('确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.data.loading = true
        Api.apiDelete(value.row.id).then((res: any) => {
          if (res.data == 1) {
            this.data.apiList = this.data.apiList.filter((item: any) => {
              return item.id != value.row.id
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.data.loading = false
          } else {
            this.$message.error(res.msg)
            this.data.loading = false
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
  //搜索
  search(data: Array<any>) {
    this.data.loading = true
    this.data.params.page = 1
    let params: any = Object.assign({}, this.data.params)
    data.forEach((item: any) => {
      let name: string = item.label
      params[name] = item.value
    })
    this.data.select = params
    this.getApiList(params)
  }
  //清除搜索条件
  clearSelection() {
    this.data.select = {}
    this.init()
  }
  //打开新增
  addApi() {
    this.$router.push({
      path: '/api/edit',
      query: { id: '0', type: '0' }
    })
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let params: any =
      JSON.stringify(this.data.select) == '{}'
        ? this.data.params
        : this.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    this.data.loading = true
    this.init()
  }
  //新增/编辑提交
  childSubmit(data: any) {
    Api.addApi(data).then((res: any) => {
      if (res.data == 1) {
        //操作成功
        this.$message.success(res.msg)
        this.init()
      } else {
        //操作失败
        this.$message.error(res.msg)
      }
    })
  }
  getApiList(params: any) {
    this.data.loading = true
    Api.getApi(params).then((res: Array<any>) => {
      this.data.loading = false
      let data: any = res
      this.data.totalize = data.count
      data.data.forEach((item: any) => {
        item.api_type = item.api_type == 2 ? '用户端' : '平台管理'
        item.request_way = item.request_way == 0 ? 'GET' : 'POST'
        item.create_time = item.create_time.replace('T', ' ')
      })
      this.data.apiList = data.data
    })
  }
}
