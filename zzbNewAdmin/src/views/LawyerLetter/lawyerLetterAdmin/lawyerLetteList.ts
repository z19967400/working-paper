import { Component, Vue } from 'vue-property-decorator'
import {
  comselect,
  comOperation,
  comPaging,
  comtable
} from '@/components/index'
import { businessOptions } from '@/types/index'
import * as Api from '@/api/business'
import { getDate } from '../../../utils/common'
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
        value: 'debtor_number',
        label: '委托编号'
      },
      {
        value: 'receiving_name',
        label: '收件人名称'
      },
      {
        value: 'receiving_phone',
        label: '收件人手机号'
      },
      {
        value: 'send_time',
        label: '寄送日期'
      },
      {
        value: 'ai_status',
        label: '委托执行进度'
      },
      {
        value: 'express_status',
        label: '快递状态'
      },
      {
        value: 'courier_receipt',
        label: '底单状态'
      },
      {
        value: 'courier_receipt_img',
        label: '底单图片状态'
      }
    ],
    dataType: [
      {
        label: '委托编号',
        prop: 'debtor_number',
        width: '150px'
      },
      {
        label: '债权人名称',
        prop: 'creditor_name',
        width: '220px'
      },
      {
        label: '债务人名称',
        prop: 'debtor_name',
        width: '220px'
      },
      {
        label: '收件人名称',
        prop: 'receiving_name',
        width: '150px'
      },
      {
        label: '收件人手机号',
        prop: 'receiving_phone',
        width: '120px'
      },
      {
        label: '收件人地址',
        prop: 'receiving_address',
        width: '330px'
      },
      {
        label: '委托执行进度',
        prop: 'execution_progress',
        width: '120px'
      },
      {
        label: '快递状态',
        prop: 'execution_status',
        width: '120px'
      },
      {
        label: '快递底单状态',
        prop: 'courier_receipt',
        width: '120px'
      },
      {
        label: '寄送日期',
        prop: 'send_time',
        width: '150px'
      }
    ]
  }
  getData: any = {
    page: 1,
    limit: 200,
    debtor_number: '', //委托编号
    receiving_name: '', //收件人名称
    receiving_phone: '', //收件人手机号
    send_time: `${getDate('yyyy')}-${getDate('MM')}-${getDate('dd')}`, //寄送日期
    ai_status: 'AI_State_2', //委托状态
    express_status: '0', //快递状态 -1:全部 0:待执行  1：执行中  3：执行成功 4：执行失败
    courier_receipt: '-1', //快递底单状态 -1:全部 0：未收到 1：已收到
    courier_receipt_img: '-1' //快递底单状态 -1:全部 0：未收到 1：已收到
  }
  list: any = []
  currentRow: any = null
  visible: boolean = false
  height: any = 0
  dialogFormVisible: boolean = false
  dialogFormVisible2: boolean = false
  dialogFormVisible3: boolean = false
  slectList: any = []
  radio: any = 0
  radio2: any = 0
  shibai: string = ''
  allCourierCompany: any = '' //全局快递公司
  selectTypes: any = [
    {
      label: '委托编号',
      prop: 'debtor_number',
      width: '140px'
    },
    {
      label: '债务人名称',
      prop: 'debtor_name'
    },
    {
      label: '收件人名称',
      prop: 'receiving_name'
    },
    {
      label: '收件人手机号码',
      prop: 'receiving_phone',
      width: '120px'
    },
    {
      label: 'EMS底单状态',
      prop: 'courier_receipt',
      width: '120px'
    }
  ]
  selectTypes2: any = [
    {
      label: '委托编号',
      prop: 'debtor_number',
      width: '140px'
    },
    {
      label: '债务人名称',
      prop: 'debtor_name'
    },
    {
      label: '收件人名称',
      prop: 'receiving_name'
    },
    {
      label: '收件人手机号码',
      prop: 'receiving_phone',
      width: '120px'
    },
    {
      label: '快递公司',
      prop: 'courier_company',
      width: '150px'
    },
    {
      label: '快递单号',
      prop: 'courier_number',
      width: '180px'
    }
  ]
  //委托执行状态
  executing_states: any = [
    { value: '', label: '委托进度_全部' },
    // { value: "AI_State_0", label: "委托进度_待支付" },
    // { value: "AI_State_1", label: "委托进度_待审核" },
    { value: 'AI_State_2', label: '委托进度_执行中' },
    { value: 'AI_State_3', label: '委托进度_已完成' },
    { value: 'AI_State_4', label: '委托进度_已终止' },
    { value: 'AI_State_5', label: '委托进度_已撤销' }
    // { value: "AI_State_6", label: "委托进度_审核未通过" },
    // { value: "AI_State_7", label: "委托进度_已删除" }
  ]
  //快递状态
  expressOption: any = [
    { value: '-1', label: '快递状态_全部' },
    { value: '0', label: '快递状态_待投递' },
    { value: '1', label: '快递状态_快递中' },
    { value: '3', label: '快递状态_投递成功' },
    { value: '4', label: '快递状态_投递失败' }
  ]
  //快递底单状态
  courierOption: any = [
    { value: '-1', label: '底单状态_全部' },
    { value: '0', label: '底单状态_未收到' },
    { value: '1', label: '底单状态_已收到' },
    { value: '2', label: '底单状态_无需' }
  ]
  //底单图片状态
  courierImg: any = [
    { value: '-1', label: '底单图片状态_全部' },
    { value: '0', label: '底单图片状态_未上传' },
    { value: '1', label: '底单图片状态_已上传' }
    // { value: "2", label: "底单状态_无需" }
  ]
  created() {
    this.$nextTick(() => {
      let Wheight: number | null = document.body.offsetHeight
      let select: any = document.getElementById('select')
      let operation: any = document.getElementById('operation')
      let paging: any = document.getElementById('paging')
      let selectH: number = select != null ? select.offsetHeight : 0
      let operationH: number = operation != null ? operation.offsetHeight : 0
      let pagingH: number = paging != null ? paging.offsetHeight : 0
      this.height = Wheight - (pagingH + operationH + selectH + 220)
    })
  }

  activated() {
    this.init()
  }

  mounted() {
    // this.init()
  }
  // 初始化函数
  init() {
    let self: any = this
    let params: any =
      JSON.stringify(self.data.select) == '{}' ? self.getData : self.data.select
    this.getList(params)
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data
    data.loading = true
    data.list = this.list
    params.send_time = params.send_time || ''
    Api.getlawyerAdminList(params).then((res: any) => {
      data.loading = false
      res.data.forEach((item: any) => {
        let label: any = this.expressOption.filter((item2: any) => {
          return item2.value == item.execution_status
        })
        let label2: any = this.executing_states.filter((item2: any) => {
          return item2.value == item.executing_status
        })
        // let label3:any = this.courierImg.filter((item2: any) => {
        //   return item2.value == item.courier_receipt_img;
        // });
        item.courier_receipt =
          item.courier_receipt == 0
            ? '未收到'
            : item.courier_receipt == 1
            ? '已收到'
            : '无需'
        item.execution_status =
          item.error_prompt === '已终止' || item.error_prompt === '已撤销'
            ? item.error_prompt
            : label[0].label.replace('快递状态_', '')
        item.execution_progress = label2[0].label.replace('委托进度_', '')
        item.send_time = item.send_time.replace('T', ' ')
        item.send_time = item.send_time.substr(
          0,
          item.send_time.lastIndexOf(':')
        )
      })
      data.list = res.data
      data.totalize = res.total
    })
  }
  //跳转详情页面
  goInfo(row: any) {
    this.$router.push({
      path: '/LawyerLetter/lawyerLetteInfo',
      query: {
        id: row.id
      }
    })
  }
  //删除
  handleDelete(data: any) {
    Api.entrustDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
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
  //打开快递底单更新弹窗
  openReceipt() {
    const multipleTable: any = this.$refs.multipleTable
    const selection: any = multipleTable.selection
    if (selection.length > 0) {
      this.slectList = selection.sort(function(a: any, b: any) {
        return a.row_number - b.row_number
      })
      this.dialogFormVisible = true
    } else {
      this.$message.warning('请至少选中一列')
    }
  }
  openReceipt2() {
    const multipleTable: any = this.$refs.multipleTable
    const selection: any = multipleTable.selection
    if (selection.length > 0) {
      this.slectList = selection.sort(function(a: any, b: any) {
        return a.row_number - b.row_number
      })
      this.dialogFormVisible2 = true
    } else {
      this.$message.warning('请至少选中一列')
    }
  }
  //快递状态更新
  openReceipt3() {
    const multipleTable: any = this.$refs.multipleTable
    const selection: any = multipleTable.selection
    if (selection.length > 0) {
      this.slectList = selection.sort(function(a: any, b: any) {
        return a.row_number - b.row_number
      })
      this.dialogFormVisible3 = true
    } else {
      this.$message.warning('请至少选中一列')
    }
  }
  //移除选中的列表
  delect(index: number) {
    this.slectList.splice(index, 1)
  }
  //更新EMS底单状态
  upDataCourier() {
    let ids: any = []
    this.slectList.forEach((item: any) => {
      ids.push(item.id)
    })
    let parmas: any = {
      logistics_id_list: ids,
      courier_receipt: this.radio
    }
    Api.UpdateCourierReceiptStatus(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.dialogFormVisible = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //更新快递单号
  upDataCourier2() {
    let parmas: any = {
      courier_number_list: []
    }
    let list: any = this.slectList
    if (list.length === 0) {
      this.$message.warning('核验区至少应有1条数据')
      return false
    }
    list.forEach((item: any) => {
      let row: any = {
        id: item.id,
        courier_company: item.courier_company,
        courier_number: item.courier_number
      }
      parmas.courier_number_list.push(row)
    })
    Api.SaveCourierNumber(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.dialogFormVisible2 = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //快递状态更新
  upDataCourier3() {
    let ids: any = []
    this.slectList.forEach((item: any) => {
      ids.push(item.id)
    })
    let parmas: any = {
      logistics_id_list: ids,
      courier_receipt: this.radio,
      express_return_reason: this.shibai,
      execution_status: this.radio2
    }
    Api.UpdateEMSStatus(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.dialogFormVisible3 = false
        this.shibai = ''
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //快递底单上传
  goExpress() {
    this.$router.push('/LawyerLetter/express')
  }
  //下载
  download() {
    const baseURL: string = 'http://api1.debteehelper.com/api'
    let parmas: any = {
      batch_no: '',
      debtor_number: this.getData.debtor_number, //委托编号
      receiving_name: this.getData.receiving_name, //收件人名称
      receiving_phone: this.getData.receiving_phone, //收件人手机号
      send_time: this.getData.send_time, //寄送日期
      ai_status: this.getData.ai_status, //委托状态
      express_status: this.getData.express_status, //快递状态 -1:全部 0:待执行  1：执行中  3：执行成功 4：执行失败
      courier_receipt: this.getData.courier_receipt, //快递底单状态 -1:全部 0：未收到 1：已收到
      courier_receipt_img: this.getData.courier_receipt_img
    }
    if (
      parmas.debtor_number === '' &&
      parmas.receiving_name === '' &&
      parmas.receiving_phone === '' &&
      parmas.ai_status === '' &&
      parmas.send_time === '' &&
      parmas.express_status === '-1' &&
      parmas.courier_receipt === '-1' &&
      parmas.courier_receipt_img === '-1'
    ) {
      this.$message.warning('请至少选择一个条件')
      return false
    }
    let downloadFil = `${baseURL}/LawyerLetterExpress/DownLoadEMS?batch_no=${parmas.batch_no}&debtor_number=${parmas.debtor_number}&receiving_name=${parmas.receiving_name}&receiving_phone=${parmas.receiving_phone}&send_time=${parmas.send_time}&ai_status=${parmas.ai_status}&express_status=${parmas.express_status}&courier_receipt=${parmas.courier_receipt}&courier_receipt_img=${parmas.courier_receipt_img}`
    window.open(downloadFil)
  }
  //单项下载
  goDownload(row: any) {
    window.open(row.lawyer_file)
  }
  //扫码枪扫码回调
  saomaQ(index: number) {
    let length: any = this.slectList.length
    if (index < length - 1) {
      let input: any = this.$refs[`smInput${index + 1}`]
      input[0].$el.children[0].focus()
      this.setCurrent(this.slectList[index + 1])
    }
  }
  //判断是否为当前输入栏,增加颜色标识
  setCurrent(row?: any) {
    let slef: any = this
    slef.$refs.singleTable.setCurrentRow(row)
  }
  handleCurrentChange(val: any) {
    this.currentRow = val
  }
  dialogFormVisible2Close() {
    this.setCurrent()
  }
  //全局设置快递公司
  allCourierCompanyChange(val: any) {
    let list: any = this.slectList
    list.forEach((item: any) => {
      item.courier_company = val
    })
  }
  //重置搜索条件
  Reset() {
    this.getData = {
      page: 1,
      limit: 200,
      debtor_number: '', //委托编号
      receiving_name: '', //收件人名称
      receiving_phone: '', //收件人手机号
      send_time: '', //寄送日期
      ai_status: '', //委托状态
      express_status: '-1', //快递状态 -1:全部 0:待执行  1：执行中  3：执行成功 4：执行失败
      courier_receipt: '-1', //快递底单状态 -1:全部 0：未收到 1：已收到
      courier_receipt_img: '-1'
    }
    this.init()
  }
}
