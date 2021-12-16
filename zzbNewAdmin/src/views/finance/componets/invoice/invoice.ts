import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
import comAddress from '@/components/address/address.vue'
@Component({
  components: {
    comAddress
  }
})
export default class selectUser extends Vue {
  @Prop() invoiceList!: any
  @Prop() selectInvoices!: any
  @Prop() titleName!: string
  @Prop() adminList!: any
  @Prop() dialogVisible!: boolean
  @Prop() mId!: string
  @Prop() billID!: number
  @Prop() selectId!: number

  @Watch('selectId', { immediate: true })
  selectIdVal(newVal: number, oldVal: number) {
    this.data.selectId = newVal
  }
  @Watch('selectInvoices', { immediate: true, deep: true }) //监听已选择的发票列表
  selectInvoicesChangeVal(newVal: any, oldVal: any) {
    // const difference: any = this.invoiceList.filter((item: any) =>
    //   newVal.every((item2: any) => item2.id !== item.id)
    // )
    // this.data.invoiceList = difference
    if (newVal.length > 0) {
      this.data.UserId = newVal[0].id
    }
  }
  @Watch('dialogVisible', { immediate: true })
  dialogVisibleVal(newVal: boolean, oldVal: boolean) {
    if (this.data.selectId != 0) {
      this.data.type = true
      this.data.UserId = 0
      let row: any = this.invoiceList.filter((item: any) => {
        return item.id == this.data.selectId
      })
      this.data.address = [
        row[0].country,
        row[0].province,
        row[0].city,
        row[0].county
      ]
      Object.keys(this.data.form).forEach((key: string) => {
        if (row[0][key]) {
          this.data.form[key] = row[0][key]
        }
      })
    } else {
      this.data.type = false
      this.init()
    }
  }
  data: any = {
    selectId: 0,
    invoiceList: [],
    UserId: 0,
    type: false,
    address: [],
    form: {
      id: 0,
      member_id: 0,
      member_vip_admin_id: 0,
      invoice_type: '',
      invoice_name: '',
      duty_paragraph: '',
      country: 0,
      province: 0,
      city: 0,
      county: 0,
      detailed_address: '',
      telephone: '',
      bank_of_deposit: '',
      bank_account: '',
      invoice_remarks: ''
    }
  }
  tableData: any = []
  created() {
    //
  }

  activated() {
    // this.init()
  }

  mounted() {
    // this.init()
  }

  // 初始化函数
  init() {
    // this.data.UserId = 0
    this.data.address = []
    this.data.form = {
      id: 0,
      member_id: this.mId,
      member_vip_admin_id: this.adminList.length > 0 ? this.adminList[0].id : 0,
      invoice_type: '',
      invoice_name: '',
      duty_paragraph: '',
      country: 0,
      province: 0,
      city: 0,
      county: 0,
      detailed_address: '',
      telephone: '',
      bank_of_deposit: '',
      bank_account: '',
      invoice_remarks: ''
    }
  }
  //地区选择反馈
  emitAddress(row: any) {
    Object.keys(row).forEach((key: string) => {
      if (row[key]) {
        this.data.form[key] = row[key]
      }
    })
  }
  //选择用户ID
  radioChange(val: any) {
    // eslint-disable-next-line no-console
    console.log(this.data.UserId)
  }
  //新增发票
  addInvoice() {
    this.data.type = !this.data.type
  }
  //发票确认新增
  onSubmit(str: string) {
    if (str === '新增') {
      Api.AddInvoice(this.data.form).then((res: any) => {
        if (res.state) {
          this.$message.success(res.msg)
          // this.$emit('close')
          this.$emit('init')
          this.data.type = false
        } else {
          this.$message.warning(res.msg)
        }
      })
    } else {
      let parmas: any = {
        bill_id: this.billID,
        invoice_id: this.data.UserId
      }
      Api.SelectInvoice(parmas).then((res: any) => {
        if (res.state) {
          this.$emit('init')
          this.$emit('close')
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
  //取消
  quxiao() {
    this.$emit('close')
    this.init()
  }
}
