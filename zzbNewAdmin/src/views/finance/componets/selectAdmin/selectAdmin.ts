import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
@Component({
  components: {}
})
export default class selectAdmin extends Vue {
  @Prop({}) list!: any
  @Prop({}) bill_number!: string
  @Prop({}) member_id!: string
  @Prop({}) selectList!: any
  @Prop({}) name?: string
  data: any = {
    UserId: [],
    list: []
  }
  getUser: any = {
    //获取用户
    id: '',
    name: ''
  }
  @Watch('selectList', { deep: true, immediate: true })
  selectListVal(newVal: any, oldVal: any) {
    let arr: any = []
    this.list.forEach((item: any) => {
      let sx: boolean = false
      newVal.forEach((item2: any) => {
        if (item2.member_vip_admin_id == item.id) {
          sx = true
        }
      })
      if (!sx) {
        arr.push(item)
      }
    })
    this.data.list = arr
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
  cancel() {
    this.$emit('close')
  }
  query() {
    let parmas: any = {
      bill_number: this.bill_number,
      admin_list: this.data.UserId
    }
    Api.AddBillPushObject(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
        this.$emit('close')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  handleSelectionChange(val: any) {
    val.forEach((item: any) => {
      let row: any = {
        member_id: this.member_id,
        member_vip_admin_id: item.id
      }
      this.data.UserId.push(row)
    })
  }
  // 初始化函数
  init() {}
}
