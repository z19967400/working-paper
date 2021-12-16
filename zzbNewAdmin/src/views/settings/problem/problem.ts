import { Component, Vue } from 'vue-property-decorator'
import { SettingsData, SettingsOptions } from '@/types'
import * as Api from '@/api/settings'
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
  data: SettingsData['fromList'] = {
    loading: false,
    totalize: 0,
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '标题',
        prop: 'title',
        width: '120px'
      },
      {
        label: '内容',
        prop: 'n_content',
        width: '120px'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ],
    list: [],
    select: {},
    options: [
      {
        value: 'title',
        label: '标题'
      }
    ]
  }
  getData: SettingsOptions['getProble'] = {
    page: 1,
    limit: this.$store.state.layout.limit,
    title: ''
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
  getList(data: any) {
    let self: any = this
    self.data.loading = true
    Api.getProblem(data).then((res: any) => {
      self.data.loading = false
      self.data.list = res.data
      self.data.totalize = res.data.length
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/settings/problemEdit',
      query: {
        data: JSON.stringify(data.row)
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.problemDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //添加
  add() {
    this.$router.push({
      path: '/settings/problemEdit',
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
