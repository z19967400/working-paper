import { Component, Vue } from 'vue-property-decorator'
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from '@/components/index'
import * as Api from '@/api/finance'
import * as Api2 from '@/api/business'
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
  dialogVisible: boolean = false
  data: any = {
    loading: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: 'member_name',
        label: '创建人'
      },
      {
        value: 'pay_number',
        label: '支付编号'
      },
      {
        value: 'bill_number',
        label: '账单编号'
      },
      {
        value: 'pay_status',
        label: '支付状态'
      }
    ],
    dataType: [
      { label: '支付编号', prop: 'pay_number' },
      { label: '委托类别', prop: 'business_type' },
      { label: '委托批次号', prop: 'relation_number' },
      { label: '应付金额', prop: 'paid_amount', width: '80' },
      { label: '支付方式', prop: 'pay_method' },
      { label: '支付状态', prop: 'pay_status' },
      { label: '账单编号', prop: 'bill_number' },
      { label: '创建人', prop: 'create_name' },
      { label: '创建时间', prop: 'create_time' },
      { label: '备注', prop: 'bill_remarks' }
    ]
  }
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    member_id: 0,
    member_name: '',
    pay_number: '',
    bill_number: '',
    pay_status: ''
  }
  info: any = [
    { label: '支付编号', value: '', prop: 'pay_number' },
    { label: '收支类别', value: '', prop: 'business_type' },
    { label: '委托编号', value: '', prop: 'relation_number' },
    { label: '币种', value: '', prop: 'currency_id' },
    { label: '账单编号', value: '', prop: 'bill_number', span: 2 },
    { label: '创建时间', value: '', prop: 'create_time' },
    { label: '创建人', value: '', prop: 'create_name', span: 2 },
    { label: '单价', value: '', prop: 'total_amount' },
    { label: '应付金额', value: '', prop: 'paid_amount', span: 2 },
    { label: '支付状态', value: '', prop: 'pay_status' },
    { label: '支付方式', value: '', prop: 'pay_method', span: 2 },
    {
      label: '流水号',
      value: '',
      prop: 'pay_platform_number',
      span: 3
    },
    {
      label: '账单备注',
      value: '',
      prop: 'bill_remarks',
      span: 3,
      type: 'textarea',
      edit: true
    },
    {
      label: '后台备注',
      value: '',
      prop: 'back_remarks',
      span: 3,
      type: 'textarea',
      edit: true
    }
  ]
  edit: any = [
    { label: '支付编号', value: '', prop: 'pay_number' },
    { label: '收支类别', value: '', prop: 'business_type' },
    { label: '委托编号', value: '', prop: 'relation_number' },
    {
      label: '币种',
      value: '',
      prop: 'currency_id',
      type: 'select',
      edit: true
    },
    { label: '账单编号', value: '', prop: 'bill_number', span: 2 },
    { label: '创建时间', value: '', prop: 'create_time' },
    { label: '创建人', value: '', prop: 'create_name', span: 2 },
    { label: '单价', value: '', prop: 'total_amount' },
    {
      label: '应付金额',
      value: '',
      prop: 'paid_amount',
      span: 2,
      type: 'input',
      edit: true
    },
    {
      label: '支付状态',
      value: '',
      prop: 'pay_status',
      type: 'select',
      edit: true
    },
    {
      label: '支付方式',
      value: '',
      prop: 'pay_method',
      span: 2,
      type: 'select',
      edit: true
    },
    {
      label: '流水号',
      value: '',
      prop: 'pay_platform_number',
      span: 3,
      type: 'input',
      edit: true
    },
    {
      label: '账单备注',
      value: '',
      prop: 'bill_remarks',
      span: 3,
      type: 'textarea',
      edit: true
    },
    {
      label: '后台备注',
      value: '',
      prop: 'back_remarks',
      span: 3,
      type: 'textarea',
      edit: true
    }
  ]
  payStatus: string = '' //是否支付
  payType: string = '' //支付方式
  member_id: any = '' //用户ID
  currency_id: any = '' //币种
  pay_platform_number: string = '' //流水号
  pay_methods: any = [
    //支付方式列表
    { name: '先催后付', type: 'Pay_Manner_0' },
    { name: '银行转账', type: 'Pay_Manner_1' },
    { name: '微信线上', type: 'Pay_Manner_2' },
    { name: '支付宝线上', type: 'Pay_Manner_3' },
    { name: '微信线下', type: 'Pay_Manner_4' },
    { name: '支付宝线下', type: 'Pay_Manner_5' },
    { name: '现金', type: 'Pay_Manner_6' },
    { name: '支票', type: 'Pay_Manner_7' },
    { name: '组合', type: 'Pay_Manner_8' },
    { name: '其他', type: 'Pay_Manner_9' },
    { name: '赠送', type: 'Pay_Manner_10' },
    { name: '免费-非诉', type: 'Pay_Manner_11' },
    { name: '免费-诉讼', type: 'Pay_Manner_12' }
  ]
  pay_types: any = [
    //支付状态列表
    { name: '已支付', type: 'Pay_Status_1' },
    { name: '待支付', type: 'Pay_Status_0' }
  ]
  currency: any = [] //币种
  pay_id: any = ''
  created() {
    //
  }

  activated() {
    this.init()
  }

  mounted() {
    this.getCurrency()
  }

  // 初始化函数
  init() {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data
    data.loading = true
    Api.getinandout(params)
      .then((res: any) => {
        data.loading = false
        data.list = res.data
        data.totalize = res.total
        if (data.list.length > 0) {
          data.list.forEach((item: any) => {
            item.business_type =
              item.business_type === 'Entrust_type_0' ? 'AI律师函' : '律师办案'
            item.pay_method = this.getPayStatusName(item.pay_method)
            item.pay_status =
              item.pay_status === 'Pay_Status_1' ? '已支付' : '待支付'
            item.bill_number = item.bill_number || '未生成'
            item.paid_amount = item.paid_amount.toLocaleString() + '.00'
          })
        }
      })
      .catch(() => {
        data.loading = false
        this.$message.error('网络异常')
      })
  }

  // 查看详情
  handleInfo(...data: any) {
    let id: any = data[0].row.id
    this.pay_id = id
    Api.getdetails(id)
      .then((res: any) => {
        this.payStatus = res.data.pay_status
        this.payType = res.data.pay_method
        this.member_id = res.data.member_id
        this.currency_id = res.data.currency_id
        this.pay_platform_number = res.data.pay_platform_number
        if (
          this.payStatus == 'Pay_Status_1' &&
          this.payType != 'Pay_Manner_0'
        ) {
          //该订单已支付，渲染已支付数据
          this.info.forEach((item: any) => {
            if (item.prop === 'create_time') {
              let val: string = res.data[item.prop].replace('T', ' ')
              item.value = val.substring(0, val.lastIndexOf(':'))
            } else if (item.prop === 'pay_method') {
              // if (res.data.pay_platform_number) {
              //   item.value = `${this.getPayStatusName(res.data[item.prop])}(${
              //     res.data.pay_platform_number
              //   })`
              // } else {
              item.value = `${this.getPayStatusName(res.data[item.prop])}`
              // }
            } else if (item.prop === 'business_type') {
              item.value =
                res.data[item.prop] === 'Entrust_type_0'
                  ? 'AI律师函'
                  : '律师办案'
            } else if (item.prop === 'pay_status') {
              item.value =
                res.data[item.prop] === 'Pay_Status_1' ? '已支付' : '待支付'
            } else if (item.prop == 'create_name') {
              item.value = `${res.data[item.prop]}(ID:${res.data.member_id})`
            } else if (item.prop == 'bill_number') {
              item.value = res.data[item.prop] || '未生成'
            } else if (item.prop == 'currency_id') {
              item.value = res.data['currency_name']
            } else {
              item.value = res.data[item.prop]
            }
          })
        } else {
          this.edit.forEach((item: any) => {
            if (item.prop === 'create_time') {
              let val: string = res.data[item.prop].replace('T', ' ')
              item.value = val.substring(0, val.lastIndexOf(':'))
            } else if (item.prop == 'bill_number') {
              item.value = res.data[item.prop] || '未生成'
            } else if (item.prop === 'business_type') {
              item.value =
                res.data[item.prop] === 'Entrust_type_0'
                  ? 'AI律师函'
                  : '律师办案'
            } else if (item.prop == 'create_name') {
              item.value = `${res.data[item.prop]}(ID:${res.data.member_id})`
            } else if (item.prop === 'pay_method') {
              if (res.data.pay_platform_number) {
                item.value = `${this.getPayStatusName(res.data[item.prop])}(${
                  res.data.pay_platform_number
                })`
              } else {
                item.value = `${this.getPayStatusName(res.data[item.prop])}`
              }
            } else {
              item.value = res.data[item.prop]
            }
          })
        }
        this.dialogVisible = true
      })
      .catch(() => {
        this.$message.error('网络异常')
      })
  }
  //订单修改
  editOrder() {
    if (this.payStatus == 'Pay_Status_1') {
      if (this.payType == 'Pay_Manner_0') {
        //先催后付
        this.noPay()
      } else {
        //该订单已支付
        let parmas: any = {
          pay_id: this.pay_id,
          bill_remarks: this.info[12].value,
          back_remarks: this.info[13].value
        }
        Api.editBillReamak(parmas).then((res: any) => {
          if (res.state) {
            this.dialogVisible = false
            this.init()
          } else {
            this.$message.warning(res.msg)
          }
        })
      }
    } else {
      //待支付
      this.noPay()
    }
  }
  noPay() {
    //待支付
    let parmas = {
      pay_id: this.pay_id,
      paid_amount: parseInt(this.edit[8].value), //金额
      pay_method: this.edit[10].value, //支付方式
      currency_id: parseInt(this.edit[3].value), //币种
      pay_status: this.edit[9].value, //支付状态
      pay_platform_number: this.edit[11].value, //流水号
      bill_remarks: this.edit[12].value, //备注
      back_remarks: this.edit[13].value
    }
    if (parmas.paid_amount === null) {
      this.$message.warning('必要内容为空')
      return false
    }
    Api.editOrder(parmas).then((res: any) => {
      if (res.state) {
        this.dialogVisible = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }

  //编辑
  handleEdit(data: any) {
    //
  }
  //删除
  handleDelete(data: any) {
    //
  }
  //获取支付方式文本
  getPayStatusName(status: string) {
    if (status) {
      const types: any = this.pay_methods
      let val = types.filter((item: any) => {
        return item.type === status
      })
      return val[0].name
    } else {
      return '暂无'
    }
  }
  //获取支付状态文本
  getPayTypeName(status: string) {
    if (status) {
      const types: any = this.pay_types
      let val = types.filter((item: any) => {
        return item.type === status
      })
      return val[0].name
    } else {
      return '暂无'
    }
  }
  //获取币种下拉
  getCurrency() {
    Api2.getCurrency().then((res: any) => {
      res.data.forEach((item: any) => {
        let cell: any = {
          name: item.currency_name,
          type: item.id
        }
        this.currency.push(cell)
      })
    })
  }
  //搜索
  search(data: any) {
    let self: any = this
    self.data.loading = true
    self.options.page = 1
    let params: any = Object.assign({}, self.options)
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
  //添加编辑
  add() {
    //
  }
  //分页
  watchChange(index: number) {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.options : self.data.select
    params.page = index
    self.init()
  }
  //跳转分流
  tiaozhuan(prop: string, value: string) {
    if (prop === 'create_name') {
      this.openUser()
    } else {
      this.openBill(value)
    }
  }
  //跳转订单详情
  openBill(val: string) {
    if (val == '未生成') {
      return false
    }
    let bill_number: string = val.substring(0, val.indexOf('（'))
    this.$router.push({
      path: `/business/listbill/getadmindata/${bill_number}`
    })
  }
  //跳转VIP用户
  openUser() {
    this.dialogVisible = false
    this.$router.push({
      path: `/ordinary/VipAdmin/${this.member_id}`
    })
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
}
