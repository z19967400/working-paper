import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
import { baseURL } from '@/utils/request'
@Component({
  components: {}
})
export default class selectUser extends Vue {
  @Prop() editData?: any
  @Prop() bill_number!: string
  @Prop() totalAmount!: string | number
  @Prop() invoice_types!: string
  data: any = {
    baseURL: '',
    fileList: [],
    form: {
      id: 0,
      bill_number: '',
      invoice_type: '',
      invoice_tax_rate: '' /*6*/,
      invoice_amount: '' /*this.totalAmount*/,
      invoice_remarks: `账单编号：${this.bill_number}`,
      billing_date: '',
      invoice_number: '',
      courier_services_company: '',
      courier_number: '',
      express_fee: '',
      invoicing_status: '' /*待开票*/,
      invoice_img: '',
      Invoicing_requirements: ''
    }
  }
  @Watch('editData', { immediate: true, deep: true })
  editDataVal(newVal: any, oldVal: any) {
    this.data.form.invoice_type =
      this.invoice_types == '增值税普通发票（电子）'
        ? 'Invoice_Type_0'
        : this.invoice_types == '增值税专用发票（纸质）'
        ? 'Invoice_Type_2'
        : ''
    Object.keys(this.data.form).forEach((key: string) => {
      if (newVal[key]) {
        if (key == 'invoice_img') {
          this.data.fileList.push({
            name: '发票底单',
            url: newVal[key]
          })
        }
        if (key === 'express_fee') {
          if (this.data.form[key] == -2) {
            this.data.form[key] = ''
          }
        }
        if (key == 'invoice_type') {
          this.data.form[key] = this.returnInvoice_type(newVal[key])
        } else {
          this.data.form[key] = newVal[key]
        }
      }
    })
  }
  mounted() {
    this.data.baseURL = baseURL
    this.data.form.bill_number = this.bill_number
  }
  handleRemove(file: any, fileList: any) {
    this.data.form.invoice_img = ''
  }
  handlePreview(file: any) {
    if (file.name === '发票底单') {
      window.open(file.url)
      return false
    }
    let path: string =
      'https://file.debteehelper.com' +
      file.response.data.FileUrl +
      file.response.data.FileExtension
    window.open(path)
  }
  handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }
  //上传成功回调
  handleSuccess(res: any) {
    let path: string =
      'https://file.debteehelper.com' +
      res.data.FileUrl +
      res.data.FileExtension
    this.data.form.invoice_img = path
  }
  //创建
  onSubmit() {
    let parmas: any = Object.assign({}, this.data.form)
    parmas['express_fee'] =
      parmas['express_fee'] == '' ? -2 : parmas['express_fee']
    Api.AddOpenInvoices(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
        this.quxiao()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //发票选择监听
  invoiceWatch(val: any) {
    if (val == 'Invoice_Type_0') {
      this.data.form.invoice_tax_rate = 1
    } else {
      this.data.form.invoice_tax_rate = 6
    }
  }
  //返回发票类型的状态文本
  returnInvoice_type(num: string) {
    let val: string =
      num == '增值税专用发票（纸质）' ? 'Invoice_Type_2' : 'Invoice_Type_0'
    return val
  }
  //取消
  quxiao() {
    this.data.form = {
      id: 0,
      bill_number: this.bill_number,
      invoice_type: '',
      invoice_tax_rate: 0,
      invoice_amount: '',
      invoice_remarks: '',
      billing_date: '',
      invoice_number: '',
      courier_services_company: '',
      courier_number: '',
      express_fee: '',
      invoicing_status: '',
      invoice_img: ''
    }
    this.data.fileList = []
    this.$emit('close')
  }
}
