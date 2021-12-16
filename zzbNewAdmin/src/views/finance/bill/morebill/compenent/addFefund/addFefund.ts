import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
import { baseURL } from '@/utils/request'
@Component({
  components: {}
})
export default class addFefund extends Vue {
  @Prop() bill_number!: string
  data: any = {
    List: [],
    baseURL: '',
    fileList: [],
    form: {
      settlement_record_ids: [],
      refund_record: {
        bill_number: '',
        invoice_type: '',
        invoice_tax_rate: '',
        invoice_amount: 0,
        invoice_remarks: '',
        billing_date: '',
        invoice_number: '',
        courier_services_company: '',
        courier_number: '',
        express_fee: '',
        invoicing_status: '',
        invoice_img: '',
        refund_amount: 0,
        refund_method: '',
        refund_time: '',
        serial_number: '',
        back_remarks: ''
      }
    }
  }
  mounted() {
    this.data.form.refund_record.bill_number = this.bill_number
    this.data.baseURL = baseURL
    this.getList()
  }
  //获取未结算列表
  getList() {
    Api.GetUnsettledRefundRecord(this.bill_number).then((res: any) => {
      if (res.state) {
        this.data.List = res.data
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  handleRemove(file: any, fileList: any) {
    this.data.form.refund_record.invoice_img = ''
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
    this.data.form.refund_record.invoice_img = path
  }
  //返回ID
  handleSelectionChange1(val: any) {
    val.forEach((item: any) => {
      this.data.form.refund_record.refund_amount += item.settlement_amount
      this.data.form.settlement_record_ids.push(item.id)
    })
  }
  //发票选择监听
  invoiceWatch(val: any) {
    if (val == 'Invoice_Type_0') {
      this.data.form.refund_record.invoice_tax_rate = 1
    } else {
      this.data.form.refund_record.invoice_tax_rate = 6
    }
  }
  //创建
  onSubmit() {
    let amount1: any = this.data.form.refund_record.invoice_amount
    let amount2: any = this.data.form.refund_record.refund_amount
    if (typeof amount1 == 'string') {
      this.data.form.refund_record.invoice_amount = parseFloat(amount1)
    }
    if (typeof amount2 == 'string') {
      this.data.form.refund_record.refund_amount = parseFloat(amount2)
    }
    this.data.form.refund_record.invoice_tax_rate = parseFloat(
      this.data.form.refund_record.invoice_tax_rate
    )
    Api.AddRefundRecord(this.data.form).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
        this.quxiao()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //取消
  quxiao() {
    this.$emit('close')
  }
  //时间格式转码
  getTimeStr(str: string) {
    if (str) {
      let time: string = str.replace('T', ' ')
      let item2: string = time.substring(0, time.lastIndexOf(':'))
      return item2
    } else {
      return str
    }
  }
}
function typeOf(amount1: any): any {
  throw new Error('Function not implemented.')
}
