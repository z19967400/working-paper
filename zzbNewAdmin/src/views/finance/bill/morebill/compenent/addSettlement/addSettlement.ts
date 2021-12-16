import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
@Component({
  components: {}
})
export default class addSettlement extends Vue {
  @Prop() billType!: string
  @Prop() billId!: number
  data: any = {
    ai_pay: [],
    fixed_service_fee: [],
    float_service_fee: [],
    form: {
      bill_id: 0,
      ai_pay: [],
      fixed_service_fee: [],
      float_service_fee: [],
      settlement_record: {
        settlement_number: '',
        settlement_amount: 0,
        settlement_method: '',
        settlement_time: '',
        serial_number: '',
        back_remarks: ''
      }
    }
  }
  mounted() {
    this.getList()
  }
  //获取未结算列表
  getList() {
    this.data.form.bill_id = this.billId
    Api.GetUnsettledServices(this.billId).then((res: any) => {
      if (res.state) {
        res.data.ai_pay.forEach((item: any) => {
          item.create_time = item.create_time.replace('T', ' ')
          item.create_time = item.create_time.substring(
            0,
            item.create_time.lastIndexOf(':')
          )
        })
        this.data.ai_pay = res.data.ai_pay
        const fixed_service_fee: any = res.data.case_pay.filter((item: any) => {
          return (
            item.business_type == 'Entrust_type_5' ||
            item.business_type == 'Entrust_type_6' ||
            item.business_type == 'Entrust_type_8'
          )
        })
        const float_service_fee: any = res.data.case_pay.filter((item: any) => {
          return (
            item.business_type == 'Entrust_type_7' ||
            item.business_type == 'Entrust_type_9'
          )
        })
        this.data.fixed_service_fee = fixed_service_fee
        this.data.float_service_fee = float_service_fee
        // if (res.data.ai_pay.length == 0 && res.data.case_pay.length == 0) {
        //   this.$message.warning('暂无可结算的记录')
        // }
      } else {
        this.$message.warning(res.msg)
      }
    })
  }

  //返回ID
  handleSelectionChange1(val: any) {
    val.forEach((item: any) => {
      this.data.form.settlement_record.settlement_amount += item.paid_amount
      this.data.form.ai_pay.push(item.id)
    })
  }
  //返回ID
  handleSelectionChange2(val: any) {
    val.forEach((item: any) => {
      this.data.form.settlement_record.settlement_amount +=
        item.fixed_service_fee
      this.data.form.fixed_service_fee.push(item.id)
    })
  }
  //返回ID
  handleSelectionChange3(val: any) {
    val.forEach((item: any) => {
      this.data.form.settlement_record.settlement_amount +=
        item.float_service_fee
      this.data.form.float_service_fee.push(item.id)
    })
  }
  //创建
  onSubmit() {
    Api.AddSettlementRecord(this.data.form).then((res: any) => {
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
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
}
