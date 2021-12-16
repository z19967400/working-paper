import { Component, Vue } from 'vue-property-decorator'
import { TemplateData, TemplateOptions } from '@/types'
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
  data: TemplateData['data'] = {
    loading: false,
    totalize: 0,
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '文档名称',
        prop: 'record_name'
      },
      {
        label: '版本号',
        prop: 'version_number',
        width: '120px'
      },
      {
        label: '管理员',
        prop: 'real_name',
        width: '120px'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '150px'
      }
    ],
    list: [],
    select: {},
    options: [
      {
        value: 'record_name',
        label: '文档名称'
      }
      // {
      //   value: 'record_domain',
      //   label: '文档域名'
      // },
      // {
      //   value: 'record_path',
      //   label: '文档路径'
      // }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.state.layout.limit,
    record_name: '',
    record_domain: '',
    record_path: ''
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
    this.getList(this.getData)
  }
  //获取数据
  getList(params: TemplateOptions['getWechat']) {
    let self: any = this
    self.data.loading = true
    Api.getFileList(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/file/fileEdit',
      query: {
        id: JSON.stringify(data.row.id)
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.fileDelete(data.row.id).then((res: any) => {
      if (res.data == 0) {
        this.$message.warning(res.msg)
      } else {
        this.$message.success(res.msg)
        this.init()
      }
    })
  }
  //添加
  add() {
    this.$router.push({
      path: '/file/fileEdit',
      query: {
        data: null
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
    self.getList(params)
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
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.data.loading = true
    this.init()
  }
}
