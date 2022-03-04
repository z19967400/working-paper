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
export default class apply extends Vue {
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
        value: 'contacts_name',
        label: '联系人'
      },
      {
        value: 'phone_number',
        label: '联系人电话'
      },
      {
        value: 'corporate_name',
        label: '公司名称'
      }
    ],
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '80'
      },
      {
        label: '公司企业名称',
        prop: 'corporate_name'
      },
      {
        label: '联系人',
        prop: 'contacts_name',
        width: '80'
      },
      {
        label: '联系人电话',
        prop: 'phone_number',
        width: '150'
      },
      {
        label: '邮箱',
        prop: 'email'
      },
      {
        label: '所属行业',
        prop: 'industry',
        width: '120'
      },
      {
        label: '需求描述',
        prop: 'requirement_desc'
      },
      {
        label: '申请时间',
        prop: 'create_time',
        width: '150'
      },
      {
        label: '后台备注',
        prop: 'back_remarks'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    id: 0,
    contacts_name: '',
    phone_number: '',
    corporate_name: ''
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
  Remarks: any = {
    id: 0,
    back_remarks: ''
  }
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
    Api.getVipUser(params).then((res: any) => {
      res.data.forEach((item: any) => {
        if (item.head_img != null) {
          item.head_img = item.head_img.replace('https', 'http') + '.png'
        }
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
    this.Remarks.id = data.row.id
    this.Remarks.back_remarks = data.row.back_remarks
  }
  //删除
  handleDelete(data: any) {
    Api.vipUserDelet(data.row.id).then((res: any) => {
      if (res.state) {
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
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
  //保存备注
  saveRemarks() {
    Api.editVip(this.Remarks).then((res: any) => {
      if (res.state) {
        this.visible = false
        this.init()
      } else {
        this.$message.warning(res.msg)
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
  //可用状态变化
  onChangeVal(val: any) {
    val.up_state = val.state == true ? 0 : -1
    Api.dinaryUpState(val).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
