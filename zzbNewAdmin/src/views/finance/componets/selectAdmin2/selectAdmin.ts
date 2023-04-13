import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
@Component({
  components: {}
})
export default class selectAdmin extends Vue {
  @Prop({}) list!: any
  @Prop({}) name!: string
  data: any = {
    list: [],
    adminID: ''
  }
  getUser: any = {
    //获取用户
    id: '',
    name: ''
  }
  @Watch('list', { deep: true, immediate: true })
  selectListVal(newVal: any, oldVal: any) {
    this.data.list = newVal
  }
  created() {
    //
  }

  activated() {
    // this.init()
  }

  mounted() {
    //
  }
  cancel() {
    this.$emit('close')
  }
  query() {
    let row: any = this.data.list.filter((item: any) => {
      return this.data.adminID == item.id
    })
    this.$emit('selectAdmin', this.data.adminID, row)
  }
}
