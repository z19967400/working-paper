import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { UserData, UserOptions } from '@/types/index'
import * as Api from '@/api/user'
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
        value: 'name',
        label: '用户名称'
      },
      {
        value: 'phone_number',
        label: '手机号码'
      },
      {
        value: 'm_type',
        label: '用户类别'
      },
      {
        value: 'email',
        label: '电子邮箱'
      }
    ],
    dataType: [
      {
        label: '用户ID',
        prop: 'id',
        width: '80'
      },

      {
        label: '用户类别',
        prop: 'm_type',
        width: '100'
      },
      {
        label: '用户名称',
        prop: 'name',
        width: '300'
      },
      {
        label: '手机号码',
        prop: 'phone_number',
        width: '120'
      },
      {
        label: '电子邮箱',
        prop: 'email',
        width: '220'
      },
      {
        label: '后台备注',
        prop: 'back_remarks'
      },
      {
        label: '注册时间',
        prop: 'create_time',
        width: '150'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    id: 0,
    m_type: '',
    name: '',
    phone_number: '',
    email: ''
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
  visible: boolean = false
  parentId: number = 0
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
    Api.getOrdinary(params).then((res: any) => {
      res.data.forEach((item: any) => {
        item.sex = item.sex == 0 ? '女' : item.sex == 1 ? '男' : '未知'
        if (item.head_img != null) {
          item.head_img = item.head_img.replace('https', 'http') + '.png'
        }
        item.register_source =
          item.register_source == 0
            ? 'PC'
            : item.register_source == 1
            ? '小程序'
            : '第三方'
      })
      data.loading = false
      data.list = res.data
      res.data.forEach((item: any) => {
        item.up_state = item.up_state == 0 ? true : false
      })
      data.totalize = res.count
    })
  }
  //编辑
  handleEdit(data: any) {
    this.visible = true
    this.parentId = data.row.id
  }
  //删除
  handleDelete(data: any) {
    Api.ordinaryDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //弹窗确定
  determine() {
    this.init()
  }
  //取消
  cancel() {
    this.visible = false
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
    this.visible = true
    this.parentId = 0
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
  //跳转会员管理
  goAdmin(data: any) {
    if (data.m_type === '律师') {
      this.$router.push({
        path: `/ordinary/lawterAdmin/${data.id}`
      })
    } else if (data.m_type === '普通用户') {
      this.$router.push({
        path: `/ordinary/ordinaryAdmin/${data.id}`
      })
    } else {
      this.$router.push({
        path: `/ordinary/VipAdmin/${data.id}`
      })
    }
  }
}
