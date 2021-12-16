import { Component, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
import selectUser from '../../componets/selectUser/selectUser.vue'
import selectBill from '../../componets/selectBill/selectBill.vue'
import selectAdmin from '../../componets/selectAdmin/selectAdmin.vue'
import selectLayer from '../../componets/selectLayer/selectLayer.vue'
@Component({
  components: {
    selectUser,
    selectBill,
    selectAdmin,
    selectLayer
  }
})
export default class About extends Vue {
  data: any = {
    active: 0, //进度条步骤
    billType: 0, //账单类别
    debtor_number: '' //账单编号
  }
  getUser: any = {
    member_id: '',
    member_name: ''
  }
  height: number = 0
  createData: any = {
    member_id: 0, //用户ID
    lawyer_id: 0, //律师ID
    bill_type: '', //账单类别
    bill_title: '', //账单名称
    currency_id: 1, //币种
    ai_pay: [], //AI律师函数组
    fixed_service_fee: [], //律师办案_固定 数组
    float_service_fee: [], //律师办案_风险 数组
    vip_admin: [] //账单推送对象 ID数组
  }
  created() {
    this.$nextTick(() => {
      let Wheight: number | null = document.body.offsetHeight
      let select: any = document.getElementById('select')
      let operation: any = document.getElementById('operation')
      let paging: any = document.getElementById('paging')
      let selectH: number = select != null ? select.offsetHeight : 0
      let operationH: number = operation != null ? operation.offsetHeight : 0
      let pagingH: number = paging != null ? paging.offsetHeight : 0
      this.height = Wheight - (pagingH + operationH + selectH + 278)
    })
  }

  @Watch('data.active')
  activeChangeVal(newVal: number, oldVal: number) {
    switch (newVal) {
      case 0:
        //
        break
      case 1:
        //
        break
      default:
        break
    }
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
    console.log(0)

    if (JSON.stringify(this.$route.query) != '{}') {
      this.data.debtor_number = this.$route.query.debtor_number
      this.data.active = 2
      this.data.billType = Number(this.$route.query.type)
      if (this.$route.query.type == '0') {
        this.createData.member_id = this.$route.query.member_id
      } else {
        this.createData.member_id = this.$route.query.member_id
        this.createData.lawyer_id = this.$route.query.lawyer_id
      }
    }
  }

  //返回用户ID
  setUserId(val: number) {
    this.createData.member_id = val
  }
  setLayerId(val: any) {
    this.createData.lawyer_id = val.lawyer_id
    this.createData.member_id = val.member_id
  }
  //子组件返回IDs
  setId(val: any) {
    let ids: any = []
    val.forEach((item: any) => {
      ids.push(item.id)
    })
    this.createData.ai_pay = ids
  }
  setId1(val: any) {
    let ids: any = []
    val.forEach((item: any) => {
      ids.push(item.id)
    })
    this.createData.fixed_service_fee = ids
  }
  setId2(val: any) {
    let ids: any = []
    val.forEach((item: any) => {
      ids.push(item.id)
    })
    this.createData.float_service_fee = ids
  }
  setId3(val: any) {
    let ids: any = []
    val.forEach((item: any) => {
      ids.push(item.id)
    })
    this.createData.vip_admin = ids
  }
  getCurrencyId(val: any) {
    this.createData.currency_id = val
  }
  //下一步
  next() {
    if (this.data.active < 3) {
      if (
        this.data.active == 1 &&
        this.createData.member_id == '' &&
        this.data.billType == 0
      ) {
        this.$message.warning('请选择用户')
        return false
      }
      if (
        this.data.active == 1 &&
        this.createData.lawyer_id == '' &&
        this.data.billType != 0
      ) {
        this.$message.warning('请选择律师')
        return false
      }
      if (
        this.data.active == 2 &&
        this.createData.ai_pay.length == 0 &&
        this.createData.fixed_service_fee.length == 0 &&
        this.createData.float_service_fee.length == 0
      ) {
        this.$message.warning('请选择账单')
        return false
      }
      // if (
      //   this.data.active == 2 &&
      //   this.data.billType == 0 &&
      //   this.createData.vip_admin.length == 0
      // ) {
      //   this.$message.warning('请选择推送对象')
      //   return false
      // }
      this.data.active++
    } else {
      this.createData.bill_type =
        this.data.billType == 0
          ? 'Bill_Type_0'
          : this.data.billType == 1
          ? 'Bill_Type_1'
          : 'Bill_Type_2'
      Api.CreateBill(this.createData).then((res: any) => {
        if (res.state) {
          this.$router.push(`/business/listbill/getadmindata/${res.data}`)
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
  //上一步
  goBaack() {
    if (this.data.active > 0) {
      this.data.active--
      // if (this.data.active == 1) {
      //   this.createData.member_id = ''
      //   this.createData.lawyer_id = ''
      // }
      // if (this.data.active == 2) {
      //   this.createData.ai_pay = []
      //   this.createData.fixed_service_fee = []
      //   this.createData.float_service_fee = []
      // }
    }
  }
  //取消
  cancel() {
    this.$router.push('/business/listbill')
  }
}
