import { Component, Vue } from 'vue-property-decorator'
import { SettingsData } from '@/types'
import * as Api from '@/api/settings'
import { comtable, comOperation } from '@/components' // 组件
import axios from 'axios'
import { baseURL } from '@/utils/request'
@Component({
  components: {
    comtable,
    comOperation
  }
})
export default class About extends Vue {
  // data
  data: SettingsData['roleList'] = {
    loading: false,
    totalize: 0,
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80px'
      },
      {
        label: '角色名称',
        prop: 'role_name'
      }
    ],
    list: []
  }

  created() {
    //
  }

  activated() {
    this.init()
  }

  mounted() {
    //
  }

  // 初始化函数
  init() {
    this.getList()
  }
  //获取数据
  getList() {
    let data: any = this.data
    data.loading = true
    // axios
    //   .get(baseURL + "/adminrole/GetAll", {
    //     headers: {
    //       admintoken: "DBD2282908B31726"
    //     }
    //   })
    //   .then((res: any) => {
    //     data.loading = false;
    //     data.list = res.data;
    //     data.totalize = res.data.length;
    //   });
    Api.getRoles().then((res: any) => {
      data.loading = false
      data.list = res.data
      data.totalize = res.data.length
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/settings/rouleEdit',
      query: { id: data.row.id }
    })
  }
  //删除
  handleDelete(data: any) {
    let self: any = this
    Api.RoleDelet(data.row.id).then((res: any) => {
      if (res.data != 0) {
        self.$message.success(res.msg)
        self.data.list = self.data.list.filter((item: any) => {
          return item.id != data.row.id
        })
      } else {
        self.$message.warning(res.msg)
      }
    })
  }
  //添加
  add() {
    this.$router.push({
      path: '/settings/rouleEdit',
      query: { id: '0' }
    })
  }
}
