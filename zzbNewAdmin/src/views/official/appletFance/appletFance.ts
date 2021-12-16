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
        label: '粉丝ID',
        prop: 'id'
      },
      {
        label: '头像',
        prop: 'avatarUrl'
      },
      {
        label: '粉丝来源',
        prop: 'fans_source'
      },
      {
        label: '粉丝昵称',
        prop: 'nickName'
      },
      {
        label: '性别',
        prop: 'gender'
      },
      {
        label: '地区',
        prop: 'region'
      },
      {
        label: '注册时间',
        prop: 'create_date'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    nickname: '',
    openid: '',
    unionid: ''
  }
  list: any = []
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
      res.data.forEach((item: any) => {
        item['region'] = item.country + '/' + item.province + '/' + item.city
        item.fans_source =
          item.fans_source == 1
            ? '普通会员'
            : item.fans_source == 2
            ? '大客户'
            : '律师'
        item.gender = item.gender == 1 ? '男' : '女'
      })
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
