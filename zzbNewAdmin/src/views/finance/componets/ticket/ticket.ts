import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
import comAddress from '@/components/address/address.vue'
@Component({
  components: {
    comAddress
  }
})
export default class selectUser extends Vue {
  @Prop() List!: any
  @Prop() titleName!: string
  @Prop() adminList!: any
  @Prop() dialogVisible!: boolean
  @Prop() mId!: string
  @Prop() billID!: number
  @Prop() selectId!: number
  @Prop() selectTicket!: any
  @Watch('selectId', { immediate: true })
  selectIdVal(newVal: number, oldVal: number) {
    this.data.selectId = newVal
  }
  @Watch('selectTicket', { immediate: true, deep: true })
  selectTicketChangeVal(newVal: any, oldVal: any) {
    // const difference: any = this.List.filter((item: any) =>
    //   newVal.some((item2: any) => item2.id !== item.id)
    // )
    // this.data.ticketList = difference
    if (newVal.length > 0) {
      this.data.UserId = newVal[0].id
    } else {
      this.data.UserId = 0
    }
  }
  data: any = {
    selectId: 0,
    UserId: 0,
    type: false,
    address: [],
    ticketList: [],
    form: {
      id: 0,
      member_id: this.mId,
      member_vip_admin_id: this.adminList.length > 0 ? this.adminList[0].id : 0,
      name: '',
      phone: '',
      country: '',
      province: '',
      city: '',
      county: '',
      detailed_address: ''
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
  @Watch('dialogVisible', { immediate: true })
  dialogVisibleVal(newVal: boolean, oldVal: boolean) {
    if (this.data.selectId != 0) {
      this.data.type = true
      this.data.UserId = 0
      let row: any = this.List.filter((item: any) => {
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
  // ???????????????
  init() {
    // this.data.UserId = 0
    this.data.address = []
    this.data.form = {
      id: 0,
      member_id: this.mId,
      member_vip_admin_id: this.adminList.length > 0 ? this.adminList[0].id : 0,
      name: '',
      phone: '',
      email: '',
      country: '',
      province: '',
      city: '',
      county: '',
      detailed_address: ''
    }
    if (this.titleName == '??????????????????') {
      this.data.type = true
    }
  }
  //??????????????????
  emitAddress(row: any) {
    Object.keys(row).forEach((key: string) => {
      if (row[key]) {
        this.data.form[key] = row[key]
      }
    })
  }
  //????????????ID
  radioChange(val: any) {
    // this.$emit('setUserId', val)
  }
  //????????????
  addInvoice() {
    this.data.type = !this.data.type
    this.data.form = {
      id: 0,
      member_id: this.mId,
      member_vip_admin_id: this.adminList.length > 0 ? this.adminList[0].id : 0,
      name: '',
      phone: '',
      country: '',
      province: '',
      city: '',
      county: '',
      detailed_address: ''
    }
  }
  //??????????????????
  onSubmit(str: string) {
    if (str === '??????') {
      Api.AddTicketAddress(this.data.form).then((res: any) => {
        if (res.state) {
          this.$emit('init')
          this.data.type = false
        } else {
          this.$message.warning(res.msg)
        }
      })
    } else {
      let parmas: any = {
        bill_id: this.billID,
        ticket_address_id: this.data.UserId
      }
      Api.SelectTicketAddress(parmas).then((res: any) => {
        if (res.state) {
          this.$emit('init')
          this.$emit('close')
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
  //??????
  quxiao() {
    this.$emit('close')
  }
}
