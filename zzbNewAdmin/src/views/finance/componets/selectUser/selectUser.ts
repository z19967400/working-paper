import { Component, Vue, Watch } from 'vue-property-decorator'
import * as Api from '@/api/finance'
@Component({
  components: {}
})
export default class selectUser extends Vue {
  data: any = {
    UserId: 0
  }
  getUser: any = {
    //获取用户
    member_id: '',
    member_name: ''
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
    const parmas: any = {
      member_id: this.getUser.member_id || 0,
      member_name: this.getUser.member_name
    }
    Api.GetMemberListByIdOrName(parmas).then((res: any) => {
      if (res.state) {
        this.tableData = res.data
        if (res.data.length > 0) {
          this.data.UserId = res.data[0].id
          this.$emit('setUserId', res.data[0].id)
        }
      } else {
        this.$message.warning(res.mg)
      }
    })
  }
  //选择用户ID
  radioChange(val: any) {
    this.$emit('setUserId', val)
  }
}
