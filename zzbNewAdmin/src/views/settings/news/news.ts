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
  data: any = {
    loading: false,
    dialogVisible: false,
    totalize: 0,
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '类别',
        prop: 'notice_category',
        width: '80px'
      },
      {
        label: '主题',
        prop: 'notice_title',
        width: '180px'
      },
      {
        label: '内容',
        prop: 'notice_content',
        width: ''
      },
      {
        label: '开始时间',
        prop: 'start_time',
        width: '150px'
      },
      {
        label: '结束时间',
        prop: 'end_time',
        width: '150px'
      }
    ],
    list: [],
    select: {},
    options: [
      {
        value: 'notice_category',
        label: '类别'
      }
    ],
    addData: {
      notice_category: '0',
      notice_title: '',
      notice_content: '',
      start_time: '',
      end_time: ''
    }
  }
  getData: any = {
    // page: 1,
    // limit: this.$store.state.layout.limit,
    notice_category: '' || '-1'
  }
  handleClose(done: any) {
    this.data.addData = {
      notice_category: '0',
      notice_title: '',
      notice_content: '',
      start_time: '',
      end_time: ''
    }
    done()
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
    Api.getNews(data).then((res: any) => {
      self.data.loading = false
      self.data.list = res.data
      self.data.list.forEach((item: any) => {
        item.notice_category = item.notice_category == 1 ? 'H5' : 'PC'
        item.start_time = item.start_time.replace('T', ' ')
        item.start_time = item.start_time.substr(
          0,
          item.start_time.lastIndexOf(':')
        )
        item.end_time = item.end_time.replace('T', ' ')
        item.end_time = item.end_time.substr(0, item.end_time.lastIndexOf(':'))
      })
      self.data.totalize = res.data.length
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/settings/newEdit',
      query: {
        data: JSON.stringify(data.row)
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.newDelete(data.row.id).then((res: any) => {
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
    // this.$router.push({
    //   path: '/settings/newEdit',
    //   query: {
    //     data: null
    //   }
    // })
    this.data.dialogVisible = true
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    // self.getData.page = 1
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
  //新增通知
  submit() {
    Api.AddNotice(this.data.addData).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.dialogVisible = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
