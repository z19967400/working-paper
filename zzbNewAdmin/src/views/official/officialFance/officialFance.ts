import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { UserData, UserOptions } from '@/types/index.ts'
import * as Api from '@/api/user.ts'
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  // Getter

  // Action

  // data
  data: UserData = {
    loading: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'ID',
        label: '会员ID'
      },
      {
        value: 'name',
        label: '会员名称'
      },
      {
        value: 'phone_no',
        label: '手机号'
      },
      {
        value: 'email',
        label: '邮箱'
      },
      {
        value: 'renzhen',
        label: '债权人认证'
      }
    ],
    dataType: [
      {
        label: '会员ID',
        prop: 'ID'
      },
      {
        label: '头像',
        prop: 'headeImg'
      },
      {
        label: '会员名称',
        prop: 'name'
      },
      {
        label: '手机号',
        prop: 'phone'
      },
      {
        label: '邮箱',
        prop: 'email'
      },
      {
        label: '债权人认证',
        prop: 'renzhen'
      },
      {
        label: '可用状态',
        prop: 'state'
      },
      {
        label: '注册时间',
        prop: 'created_time'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit
  }
  list: any = [
    {
      ID: 1,
      headeImg:
        'http://file.zhaizhubang.net/Img/20200618/90bc9e7a-b951-47fd-9df7-4704e9ea5e7e.jpg',
      name: '会员xxx',
      phone: '18897924015',
      email: '1269674774@qq.com',
      leibie: '律师',
      renzhen: '个人',
      state: 0,
      created_time: '2020-02-02'
    }
  ]
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
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: UserOptions['getOrdinary']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.getFansList(params).then((res: any) => {
      data.loading = false
      data.list = res.data
      data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    this.$router.push({
      path: '/ordinary/ordinaryInfo',
      query: {
        id: data.row.id
      }
    })
  }
  //删除
  handleDelete(data: any) {
    // Api.adminDelet(data.row.id).then((res: any) => {
    //   if (res.data != 0) {
    //     this.$message.success(res.msg);
    //     this.init();
    //   } else {
    //     this.$message.warning(res.msg);
    //   }
    // });
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    self.getData.page = 1
    let params: any = Object.assign({}, self.getData)
    data.forEach((item: any) => {
      let name: string = item.label
      params[name] = item.value
    })
    self.data.select = params
    this.getList(params)
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this
    self.data.select = {}
    this.init()
  }
  //添加
  add() {
    this.$router.push({
      path: '/ordinary/ordinaryInfo',
      query: {
        id: '0'
      }
    })
  }
  //分页
  watchChange(index: number, limit: number | null) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    params.page = index
    params.limit = limit == null ? params.limit : limit
    self.init()
  }
}
