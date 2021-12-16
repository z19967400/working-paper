import { Component, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
@Component({
  components: {}
})
export default class selectLayer extends Vue {
  data: any = {
    UserId: 0
  }
  getUser: any = {
    //获取用户
    lawyer_id: '',
    lawyer_name: ''
  }
  tableData: any = []
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
  init() {}

  //获取用户信息
  getUserData() {
    this.getUser.lawyer_id = this.getUser.lawyer_id || 0
    Api.GetLawyerListByIdOrName(this.getUser).then((res: any) => {
      if (res.state) {
        this.tableData = res.data
      } else {
        this.$message.warning(res.mg)
      }
    })
  }
  //选择用户ID
  radioChange(val: any) {
    let row: any = this.tableData.filter((item: any) => {
      return item.id == val
    })
    let parmas: any = {
      lawyer_id: row[0].id,
      member_id: row[0].member_id
    }
    this.$emit('setUserId', parmas)
  }
}
