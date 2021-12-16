import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
@Component({
  components: {}
})
export default class billList extends Vue {
  @Prop({ default: [] }) ai_pay: any
  @Prop({ default: [] }) case_pay: any
  @Prop() billType: string | undefined
  @Prop() bill_id!: number
  @Prop() settingTime!: string
  tableData1: any = []
  tableData2: any = []
  time: any = ''
  data: any = {
    billType: '',
    settingType: false,
    settingTime: ''
  }
  @Watch('settingTime')
  settingTimeChange(newVal: string, oldVal: string) {
    this.data.settingTime = newVal
    if (newVal) {
      this.time = newVal.split(' - ')
    }
  }
  @Watch('billType')
  billTypeChangeVal(newVal: string, oldVal: string) {
    this.billType = newVal
    if (this.case_pay != []) {
      if (this.billType == 'Bill_Type_0') {
        this.tableData1 = this.case_pay.filter((item: any) => {
          item.fixed_service_fee = `${item.fixed_service_fee.toLocaleString()}${
            item.currency_2
          }`
          item.collection_amount = `${item.collection_amount.toLocaleString()}${
            item.currency_1
          }`
          item.float_service_fee = `${item.float_service_fee.toLocaleString()}${
            item.currency_3
          }`
          return item.business_type != 'Entrust_type_7'
        })
        this.tableData2 = this.case_pay.filter((item: any) => {
          return item.business_type == 'Entrust_type_7'
        })
      } else if (this.billType == 'Bill_Type_1') {
        this.tableData1 = this.case_pay.filter((item: any) => {
          item.collection_amount = `${item.collection_amount.toLocaleString()}${
            item.currency_1
          }`
          item.fixed_service_fee = `${item.fixed_service_fee.toLocaleString()}${
            item.currency_2
          }`
          item.float_service_fee = `${item.float_service_fee.toLocaleString()}${
            item.currency_3
          }`
          item.management_fee = `${item.management_fee.toLocaleString()}${
            item.currency_4
          }`
          item.lawyer_fee = `${item.lawyer_fee.toLocaleString()}${
            item.currency_5
          }`
          return item.business_type == 'Entrust_type_6'
        })
        this.tableData2 = this.case_pay.filter((item: any) => {
          return item.business_type == 'Entrust_type_7'
        })
      } else {
        this.tableData1 = this.case_pay.filter((item: any) => {
          item.collection_amount = `${item.collection_amount.toLocaleString()}${
            item.currency_1
          }`
          item.fixed_service_fee = `${item.fixed_service_fee.toLocaleString()}${
            item.currency_2
          }`
          item.float_service_fee = `${item.float_service_fee.toLocaleString()}${
            item.currency_3
          }`
          item.management_fee = `${item.management_fee.toLocaleString()}${
            item.currency_4
          }`
          return item.business_type == 'Entrust_type_8'
        })
        this.tableData2 = this.case_pay.filter((item: any) => {
          return item.business_type == 'Entrust_type_9'
        })
      }
    }
  }
  created() {
    //
  }

  activated() {
    // this.init()
  }

  mounted() {
    this.init()
  }

  // 初始化函数
  init() {
    // eslint-disable-next-line no-console
  }
  //结算转化
  jeisuan(val: string) {
    let status: string = ''
    if (val) {
      status = '已结算'
    } else {
      status = '未结算'
    }
    return status
  }
  //时间转化
  timeStr(time: string) {
    let val: string = time.replace('T', ' ')
    return val.substring(0, val.lastIndexOf(':'))
  }
  //删除数据
  delected(num: number, id: number) {
    let parmas: any = {
      bill_id: this.bill_id,
      type: num,
      id
    }
    this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$emit('delected', parmas)
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //时间段查询
  query() {
    // if (!this.time) {
    //   this.$message.warning('时间不能为空')
    //   return false
    // }
    const parmas: any = {
      bill_id: this.bill_id,
      start_time: this.time[0],
      end_time: this.time[1]
    }
    Api.SetSettlementPeriod(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.settingType = false
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
}
