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
        width: '80px'
      },
      {
        label: '名称',
        prop: 'name',
        width: '120px'
      },
      {
        label: '调用码',
        prop: 'use_code',
        width: '120px'
      },
      {
        label: '参数',
        prop: 'parameter',
        width: '120px'
      },
      // {
      //   label: "pdf类别",
      //   prop: "pdf_type"
      // },
      {
        label: '邮件标题',
        prop: 'email_title'
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
        value: 'name',
        label: '名称'
      },
      {
        value: 'use_code',
        label: '调用码'
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
    Api.getPdfModel(params).then((res: any) => {
      self.data.list = res.data
      self.data.loading = false
      self.data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/Template/pdfEdit',
      query: {
        data: JSON.stringify(data.row)
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.PdfModelDelet(data.row.id).then((res: any) => {
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
      path: '/Template/pdfEdit',
      query: {
        data: null
      }
    })
    return false
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
  //编辑，新增提交
  submitForm(formName: string) {
    let from: any = this.$refs[formName]
    let self: any = this
    from.validate((valid: boolean) => {
      if (valid) {
        Api.PdfModelEdit(self.editData).then((res: any) => {
          if (res.data == 1) {
            self.visible = false
            self.resetForm('form')
            self.$message.success(res.msg)
            self.init()
          } else {
            self.$message.warning(res.msg)
          }
        })
      } else {
        // eslint-disable-next-line no-console
        this.$message.warning('请上传模板')
        return false
      }
    })
  }
  //取消，重置
  resetForm(formName: string) {
    let from: any = this.$refs[formName]
    from.resetFields()
  }
}
