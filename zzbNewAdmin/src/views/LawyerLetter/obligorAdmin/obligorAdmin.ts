import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index'
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
  data: any = {
    loading: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'member_id',
        label: '用户ID'
      },
      {
        value: 'debtor_number',
        label: '委托编号'
      },
      {
        value: 'entrust_type',
        label: '委托类型'
      },
      {
        value: 'debtor_name',
        label: '债务人名称'
      },
      {
        value: 'phone_number',
        label: '手机号码'
      },
      {
        value: 'email',
        label: '电子邮箱'
      },
      // {
      //   value: 'corporate_name',
      //   label: '创建人'
      // },
      {
        value: 'collations',
        label: '排序规则'
      }
    ],
    dataType: [
      {
        label: '委托编号',
        prop: 'debtor_number'
      },
      {
        label: '委托类型',
        prop: 'entrust_type'
      },
      {
        label: '债务人名称',
        prop: 'debtor_name'
      },
      {
        label: '手机号码',
        prop: 'phone_number'
      },
      {
        label: '电子邮箱',
        prop: 'email'
      },
      {
        label: '联系地址',
        prop: 'address_txt'
      },
      {
        label: '欠款币种',
        prop: 'currency_name'
      },
      {
        label: '欠款本金',
        prop: 'arrears_principal'
      },
      {
        label: '违约金/利息/滞纳金',
        prop: 'arrears_interest'
      },
      {
        label: '执行进度',
        prop: 'progress_name'
      },
      {
        label: '创建人',
        prop: 'create_name'
      },
      {
        label: '创建时间',
        prop: 'create_time'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: this.$store.getters.limit,
    member_id: 0,
    member_name: '',
    debtor_number: '',
    entrust_type: '',
    debtor_name: '',
    phone_number: '',
    email: '',
    collations: 0
  }
  list: any = []
  visible: boolean = false
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
  getList(params: businessOptions['getDebtor']) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    Api.getDebtorList(params).then((res: any) => {
      data.loading = false
      res.data.forEach((item: any) => {
        if (JSON.stringify(item.arrears_principal).indexOf('.') != -1) {
          let str: string = JSON.stringify(item.arrears_principal)
          let str2: string = str.substring(str.indexOf('.'), str.length)
          if (str2.length == 3) {
            item.arrears_principal = item.arrears_principal.toLocaleString()
          } else {
            let str3: string = str.substring(0, str.indexOf('.'))
            let num: number = Number(str3)
            item.arrears_principal = num.toLocaleString() + str2 + '0'
          }
        } else {
          item.arrears_principal =
            item.arrears_principal.toLocaleString() + '.00'
        }
        if (JSON.stringify(item.arrears_interest).indexOf('.') != -1) {
          let str: string = JSON.stringify(item.arrears_interest)
          let str2: string = str.substring(str.indexOf('.'), str.length)
          if (str2.length == 3) {
            item.arrears_interest = item.arrears_interest.toLocaleString()
          } else {
            let str3: string = str.substring(0, str.indexOf('.'))
            let num: number = Number(str3)
            item.arrears_interest = num.toLocaleString() + str2 + '0'
          }
        } else {
          item.arrears_interest = item.arrears_interest.toLocaleString() + '.00'
        }
      })
      data.list = res.data
      data.totalize = res.total
    })
  }
  //跳转管理页面
  goAdmin(data: any) {
    if (data.row.entrust_type == 'AI律师函') {
      this.$router.push({
        path: `/LawyerLetter/entrustAdmin/${data.row.batch_no}/${data.row.executing_states}`,
        query: {
          debtor_number: data.row.debtor_number,
          debtor_name: data.row.debtor_name
        }
      })
    } else {
      this.$router.push({
        path: `/LawyersHandleCases/caseInfo/${data.row.debtor_number}`
      })
    }
  }
  //删除
  handleDelete(data: any) {
    // Api.vipUserDelet(data.row.id).then((res: any) => {
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
    // this.$router.push({
    //   path: "/VIP/addVip"
    // });
    this.visible = true
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
  //弹窗确定
  determine() {
    this.init()
  }
  //取消
  cancel() {
    this.visible = false
  }
}
