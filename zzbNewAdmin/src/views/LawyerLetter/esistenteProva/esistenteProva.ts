import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import * as Api from '@/api/business'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class esistenteProva extends Vue {
  data: any = {
    loading: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'evidence_number',
        label: '存证编号'
      }
    ],
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80'
      },
      {
        label: '存证编号',
        prop: 'evidence_number'
      },
      {
        label: '文件数量',
        prop: 'file_count',
        width: '180'
      },
      {
        label: '文件大小',
        prop: 'file_size',
        width: '180'
      },
      {
        label: '创建时间',
        prop: 'create_time',
        width: '180'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    evidence_number: '' //存证编号
  }
  height: any = ''
  created() {
    this.$nextTick(() => {
      let Wheight: number | null = document.body.offsetHeight
      let select: any = document.getElementById('select')
      let operation: any = document.getElementById('operation')
      let paging: any = document.getElementById('paging')
      let selectH: number = select != null ? select.offsetHeight : 0
      let operationH: number = operation != null ? operation.offsetHeight : 0
      let pagingH: number = paging != null ? paging.offsetHeight : 0
      this.height = Wheight - (pagingH + operationH + selectH + 220)
    })
  }
  mounted() {
    this.init()
  }
  // 初始化函数
  init() {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data
    data.loading = true
    Api.GetEvidencePagingData(params).then((res: any) => {
      data.loading = false
      data.list = res.data
      data.totalize = res.total
      data.list.forEach((item: any) => {
        item.file_size = `${Math.round(item.file_size / 1024 / 1024)}MB`
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substr(
          0,
          item.create_time.lastIndexOf(':')
        )
      })
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
