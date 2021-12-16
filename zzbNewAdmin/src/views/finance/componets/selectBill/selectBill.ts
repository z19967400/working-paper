import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
@Component({
  components: {}
})
export default class selectBill extends Vue {
  @Prop() public billType: any
  @Prop() public member_id: any
  @Prop() public lawyer_id: any
  @Prop() public debtor_number!: string
  getData: any = {
    bill_type: '',
    debtor_number: '',
    member_id: '',
    lawyer_id: '',
    currency_id: 1,
    sort_type: 0
  }
  selects: any = {
    id: 0,
    id1: 0,
    id2: 0,
    id3: 0
  }
  currencys: any = []
  ai_pay: any = []
  fixed_service_fee: any = []
  float_service_fee: any = []
  vip_admin: any = []
  name: string = ''
  Amount: any = {
    AmountPayable1: 0,
    AmountPayable2: 0,
    AmountPayable3: 0
  }
  created() {
    //
  }

  mounted() {
    this.init()
  }

  // 初始化函数
  init() {
    this.getData.bill_type =
      this.billType == 0
        ? 'Bill_Type_0'
        : this.billType == 1
        ? 'Bill_Type_1'
        : 'Bill_Type_2'
    this.getData.member_id = this.member_id
    this.getData.lawyer_id = this.lawyer_id || 0
    Api.getCurrency().then((res: any) => {
      this.currencys = res.data
    })
    this.getBillInfo()
  }
  //获取账单信息
  getBillInfo() {
    this.getData.debtor_number = this.debtor_number
    Api.getBillInfo(this.getData).then((res: any) => {
      if (res.state) {
        this.ai_pay = res.data.ai_pay
        if (this.ai_pay.length > 0) {
          this.ai_pay.forEach((item: any) => {
            item.create_time = item.create_time.replace('T', ' ')
            item.create_time = item.create_time.substring(
              0,
              item.create_time.lastIndexOf(':')
            )
          })
        }
        this.fixed_service_fee = res.data.fixed_service_fee
        this.float_service_fee = res.data.float_service_fee
        this.vip_admin = res.data.vip_admin
        this.name = res.data.name
        if (this.vip_admin) {
          let row: any = this.vip_admin.filter((item: any) => {
            return item.is_selected == 1
          })
          this.toggleSelection(row)
        }
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //返回ID
  handleSelectionChange1(val: any) {
    let num: any = 0
    this.ai_pay.forEach((item: any) => {
      item['cheeked'] = val.some((item2: any) => item.id === item2.id)
      if (item['cheeked']) {
        num += item.paid_amount
      }
    })

    this.Amount.AmountPayable1 = num
    this.$emit('setId', val)
  }
  //返回ID
  handleSelectionChange2(val: any) {
    let num: number = 0
    this.fixed_service_fee.forEach((item: any) => {
      item['cheeked'] = val.some((item2: any) => item.id === item2.id)
      if (item['cheeked']) {
        if (this.billType == 0) {
          //法律服务费
          num += item.fixed_service_fee
        } else if (this.billType == 1) {
          //律师费请款
          num += item.lawyer_fee
        } else {
          //平台管理费
          num += item.management_fee
        }
      }
    })

    this.Amount.AmountPayable2 = num
    this.$emit('setId1', val)
  }
  //返回ID
  handleSelectionChange3(val: any) {
    let num: any = 0
    this.float_service_fee.forEach((item: any) => {
      item['cheeked'] = val.some((item2: any) => item.id === item2.id)
      if (item['cheeked']) {
        if (this.billType == 0) {
          //法律服务费
          num += item.fixed_service_fee
        } else if (this.billType == 1) {
          //律师费请款
          num += item.lawyer_fee
        } else {
          //平台管理费
          num += item.management_fee
        }
      }
    })

    this.Amount.AmountPayable3 = num
    this.$emit('setId2', val)
  }
  //返回ID
  handleSelectionChange4(val: any) {
    this.$emit('setId3', val)
  }
  //币种返回
  currencyIdChange(val: any) {
    this.$emit('getCurrencyId', val)
  }
  //默认选中
  toggleSelection(rows: any) {
    const self: any = this
    let ids: any = []
    if (rows) {
      rows.forEach((row: any) => {
        this.$nextTick(() => {
          self.$refs.multipleTable.toggleRowSelection(row, true)
          ids.push(row.id)
        })
      })
      self.$emit('setId3', ids)
    } else {
      self.$refs.multipleTable.clearSelection()
    }
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
  //表格选中列状态
  tableRowClassName({ row, rowIndex }: any) {
    if (row.cheeked === true) {
      return 'active-row'
    } else {
      return ''
    }
  }
}
