import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { UserData, UserOptions } from '@/types/index'
import * as Api from '@/api/business'
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
        value: 'lawyer_name',
        label: '律师姓名'
      },
      {
        value: 'lawyer_phone_number',
        label: '律师手机号码'
      },
      {
        value: 'address',
        label: '律所地址'
      }
    ],
    dataType: [
      {
        label: 'ID',
        prop: 'id',
        width: '90'
      },
      // {
      //   label: '头像',
      //   prop: 'photo',
      //   width: '90'
      // },
      {
        label: '律师姓名',
        prop: 'name',
        width: '120'
      },
      {
        label: '律所名称',
        prop: 'law_firm_name',
        width: '280'
      },
      {
        label: '手机号',
        prop: 'phone_number',
        width: '180'
      },
      {
        label: '律所地址',
        prop: 'address'
      },
      {
        label: '执业年限',
        prop: 'career_years',
        width: '90'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    lawyer_name: '',
    lawyer_phone_number: '',
    address: '',
    id: 0
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
    Api.GetOtherLawyerPagingData(params).then((res: any) => {
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
  // handleDelete(data: any) {
  //   Api.adminDelet(data.row.id).then((res: any) => {
  //     if (res.data != 0) {
  //       this.$message.success(res.msg);
  //       this.init();
  //     } else {
  //       this.$message.warning(res.msg);
  //     }
  //   });
  // }
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
