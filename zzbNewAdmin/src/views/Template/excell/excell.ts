import { Component, Vue } from 'vue-property-decorator'
import { TemplateData, TemplateOptions } from '@/types'
import * as Api from '@/api/template'
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
        width: '120px'
      },
      {
        label: '名称',
        prop: 'name'
      },
      {
        label: '调用码',
        prop: 'use_code',
        width: '150px'
      },
      {
        label: '模板文件路径',
        prop: 'template_path'
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
        value: '调用码',
        label: '接口域名'
      },
      {
        value: 'name',
        label: '名称'
      }
    ]
  }
  getData: TemplateOptions['getWechat'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    use_code: '',
    name: ''
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
    Api.getExcellModel(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/Template/excellInfo',
      query: {
        id: data.row.id
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.ExcellModelDelet(data.row.id).then((res: any) => {
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
      path: '/Template/excellInfo',
      query: {
        id: '0'
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
    self.init()
  }
}
