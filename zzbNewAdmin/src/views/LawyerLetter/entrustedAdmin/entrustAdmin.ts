import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../api/business'
import { verifyPhone, verifyEmall } from '../../../utils/common'
import table1 from './components/table1.vue'
import table2 from './components/table2.vue'
import table3 from './components/table3.vue'
import table4 from './components/table4.vue'
import comInfo from './components/comInfo.vue'
import comEdit from './components/obligorEdit.vue'
import { api } from '../../../../../zzbPc/src/assets/js/api'
import creditor from './components/creditor/creditor.vue'
import { baseURL } from '../../../utils/request'
import * as Api2 from '../../../api/user'
@Component({
  components: {
    table1,
    table2,
    table3,
    table4,
    comInfo,
    comEdit,
    creditor
  }
})
export default class About extends Vue {
  //手机号码验证
  validatePhone = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyPhone(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  //邮箱验证
  validateEmall = (rule: any, value: any, callback: any) => {
    let vtf: any = verifyEmall(value)
    if (!vtf.done) {
      callback(new Error(vtf.errMsg))
    } else {
      callback()
    }
  }
  // data
  data: any = {
    executing_states: '', //订单状态
    actIndex: 0,
    actName: 'first',
    infoTitle: '债务人详情',
    visible: false,
    loading: true,
    sendstates: [],
    editShow: false,
    detailedShow: false,
    member_id: 0,
    m_type: '',
    labers: [
      { name: '委托概况' },
      { name: '执行进度' },
      { name: '债务人' },
      { name: '债务明细' },
      { name: '债务反馈' },
      { name: '律师函署名' },
      { name: '债权人' },
      { name: '支付信息' },
      { name: '审核/反馈' },
      { name: '后台备注' }
    ],
    BasicInfo: [
      //基础信息
      [
        { name: '委托批次号', value: '', prop: 'batch_no' },
        { name: '发函方式', value: '', prop: 'send_type' }
      ],
      [
        { name: '债务类别', value: '', prop: 'debt_type' },
        { name: '创建人', value: '', prop: 'create_name' }
      ],
      [
        { name: '法催主体', value: '', prop: 'logo_type' },
        { name: '创建时间', value: '', prop: 'create_time' }
      ]
    ],
    payment: [
      //支付信息
      [{ name: '支付状态', value: '', prop: 'pay_status' }]
      // [{ name: '支付方式', value: '' }],
      // [{ name: '收支详情', value: '' }],
    ],
    //执行进度
    implementList: [],
    implementOption: [
      { prop: 'send_sort', label: '进程' },
      { prop: 'task_type_name', label: '项目' },
      { prop: 'task_execution_status', label: '执行进度' },
      { prop: 'send_time', label: '计划执行时间' },
      { prop: 'effect', label: '效果（总数/已完成）' }
    ],
    //债权人
    creditorList: [],
    creditorOption: [
      { prop: 'id', label: 'ID', width: '80px' },
      { prop: 'creditor_name', label: '债权人名称' },
      { prop: 'phone_number', label: '公司电话', width: '130px' },
      { prop: 'email', label: '电子邮箱' },
      { prop: 'audit_status', label: '审核状态', width: '120px' },
      { prop: 'create_time', label: '创建时间', width: '180px' }
    ],
    //债权人管理员
    creditor_admin: [],
    //债务人
    obligorEditOption: [], //债务人修改信息
    lawyer_letter_file: '',
    obligorList: [],
    obligorOption: [
      { prop: 'debtor_number', label: '委托编号', width: '180px' },
      { prop: 'debtor_name', label: '债务人名称', width: '330px' },
      { prop: 'receiving_name', label: '收件人', width: '180px' },
      { prop: 'phone_number', label: '收件人电话', width: '220px' },
      { prop: 'email', label: '电子邮箱', width: '220px' },
      { prop: 'address_txt', label: '详细地址', width: '500px' },
      { prop: 'address_selected', label: '地区', width: '220px' },
      { prop: 'arrears_principal', label: '欠款本金', width: '180px' },
      { prop: 'arrears_interest', label: '欠款利息', width: '180px' },
      { prop: 'execution_progress', label: '执行进度' },
      { prop: 'sms_01_status', label: '首次短信' },
      { prop: 'call_01_status', label: '首次电话', ishow: false },
      { prop: 'email_01_status', label: '邮件催款函', width: '120px' },
      { prop: 'email_02_status', label: '电子律师函', width: '120px' },
      { prop: 'logistics_status', label: 'EMS律师函', width: '120px' },
      { prop: 'sms_02_status', label: '末次短信' },
      { prop: 'call_02_status', label: '末次电话' }
    ],
    //债务明细
    debtDetailsList: [],
    debtDetailsOption: [{ prop: 'debtor_no', label: '债务人编号' }],
    feedbackList: [],
    feedbackOption: [
      { prop: 'debtor_number', label: '委托编号', width: '150' },
      { prop: 'debtor_name', label: '债务人名称', width: '150' },
      { prop: 'is_dissent', label: '是否有异议', width: '150' },
      { prop: 'dissent_content', label: '异议内容' },
      { prop: 'member_remarks', label: '用户备注' },
      { prop: 'feedback_source', label: '反馈来源', width: '150' },
      { prop: 'create_time', label: '反馈时间', width: '160' },
      { prop: 'back_remarks', label: '后台备注' }
    ],
    shenhe: {
      //审核反馈
      desc: '', //反馈
      audit_status: '' //审核状态
    },
    back_remarks: '', //后台备注
    state: 0, //是否支付 0：未支付，1:已支付
    listLoad1Type: true,
    listLoad2Type: true,
    listLoad3Type: true,
    //获取债务人分页参数
    getDebtorParmas: {
      page: 1,
      limit: 100,
      batch_no: this.$route.params.id,
      debtor_number: '',
      debtor_name: '',
      phone_number: ''
    },
    //获取债务明细分页参数
    debtDetailsParmas: {
      page: 1,
      limit: 100,
      batch_no: this.$route.params.id,
      debtor_number: ''
    },
    //获取债务反馈分页参数
    getObligorListParmas: {
      page: 1,
      limit: 100,
      batch_no: this.$route.params.id,
      debtor_number: '',
      debtor_name: '',
      phone_number: ''
    }
  }
  height: number = 0
  sectionDom: any = {}
  infoData: any = {
    SmsInfo: {},
    SmsInfo1: {},
    PhoneInfo: {},
    PhoneInfo1: {},
    LawyerInfo: {},
    Email: {}
  }
  editData: any = {
    list: [],
    data: {},
    Collection: '',
    lawyerLetter: ''
  }
  option: any = {} //获取短信等参数
  info: any = {} //子组件数据
  detailed: string = '' //债务明细编辑内容
  detailedId: any = '' //债务明细ID

  infoData2: any = {
    phone: '',
    email: ''
  }
  tongzhiTost: boolean = false
  tzData: any = {
    debtor_name: '',
    phone_number: '',
    debtor_number: ''
  }
  Signature: any = {
    data: { name: '', phone1: '', phone2: '' },
    data2: { lawyer_name: '', phone_number_01: '', phone_number_02: '' },
    lawyers: [
      { label: '周任轩', value: '周任轩' },
      { label: '张丽', value: '张丽' },
      { label: '李慧', value: '李慧' },
      { label: '缪文瑾', value: '缪文瑾' },
      { label: '刘斌', value: '刘斌' }
    ],
    phones: [
      { label: '周任轩', value: '15921000227' },
      { label: '张丽', value: '13162901732' },
      { label: '李慧', value: '18721461794' },
      { label: '缪文瑾', value: '18217187753' },
      { label: '刘斌', value: '18602198832' }
    ]
  }
  burl: string = ''
  table2Loading: boolean = false
  table3Loading: boolean = false
  table4Loading: boolean = false
  created() {
    this.burl = baseURL
  }

  activated() {
    // let self: any = this
    // this.init(1)
    // self.height = document.body.offsetHeight - 188
  }

  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
    let self: any = this
    this.init(1)
    self.height = document.body.offsetHeight - 188
    if (JSON.stringify(this.$route.query) != '{}') {
      this.data.getDebtorParmas.debtor_number = this.$route.query.debtor_number
      this.data.getDebtorParmas.debtor_name = this.$route.query.debtor_name
      this.data.debtDetailsParmas.debtor_number = this.$route.query.debtor_number
      this.data.getObligorListParmas.debtor_number = this.$route.query.debtor_number
      this.data.getObligorListParmas.debtor_name = this.$route.query.debtor_name
      this.laberClick(2)
    }
    this.GetDebtors()
    this.debtDetails()
    this.getObligorList()
  }
  // handleScroll(e: any) {
  //   // eslint-disable-next-line no-console
  //   console.log(e)
  // }
  beforeDestroy() {
    //
  }
  init(num?: number) {
    let self: any = this
    self.data.executing_states = self.$route.params.executing_states
    if (self.$route.params.id != 0 && self.$route.params.id != null) {
      this.getInfo(self.$route.params.id)
      if (!num) {
        this.GetDebtors(1)
        this.debtDetails(1)
        this.getObligorList(1)
      }
      // this.GetType()
    }
    let top: number = self.$refs.right.offsetTop //初始位置
    for (let index = 0; index <= 8; index++) {
      const domTop = self.$refs['section' + index].offsetTop - top
      self.sectionDom['section' + index] = domTop
    }
  }
  //子组件监听
  nameWatch(name: string) {
    this.data.actName = name
    this.info = {}
    if (name == 'first') {
      //首次短信
      if (this.option.sms_01_id != 0) {
        this.data.loading = true
        this.getinfo2(this.option.sms_01_id, 'AI_Task_Code_1')
      }
    }
    if (name == 'second') {
      //首次电话
      if (this.option.call_01_id != 0) {
        this.data.loading = true
        this.getinfo2(this.option.call_01_id, 'AI_Task_Code_2')
      }
    }
    if (name == 'third') {
      //邮件催款函
      if (this.option.email_01_id != 0) {
        this.data.loading = true
        this.getinfo2(this.option.email_01_id, 'AI_Task_Code_3')
      }
    }
    if (name == 'fourth') {
      //电子律师函
      if (this.option.email_02_id != 0) {
        this.data.loading = true
        this.getinfo2(this.option.email_02_id, 'AI_Task_Code_4')
      }
    }
    if (name == 'Five') {
      //ems律师函
      if (this.option.log_logistics_id != 0) {
        this.data.loading = true
        this.getinfo2(this.option.log_logistics_id, 'AI_Task_Code_5')
      }
    }
    if (name == 'six') {
      //末次短信
      if (this.option.sms_02_id != 0) {
        this.data.loading = true
        this.getinfo2(this.option.sms_02_id, 'AI_Task_Code_6')
      }
    }
    if (name == 'seven') {
      //末次电话
      if (this.option.call_02_id != 0) {
        this.data.loading = true
        this.getinfo2(this.option.call_02_id, 'AI_Task_Code_7')
      }
    }
  }
  //修改律师函发送时间
  editSandTime(row: any) {
    let pamras: any = {
      id: row.id,
      execution_time: row.send_time
    }
    Api.UpdateTaskExecutionTime(pamras).then((res: any) => {
      if (res.state) {
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  getinfo2(id: any, code: any) {
    let self: any = this
    let parmas: any = {
      batch_no: self.$route.params.id,
      task_id: id,
      ai_task_code: code,
      debtor_number: self.option.debtor_number
    }
    Api.getPhoneInfo(parmas).then((res: any) => {
      if (id != 0) {
        this.info = res.data
      }
      this.data.loading = false
    })
  }
  //获取管理详情
  getInfo(id: number) {
    Api.getAiLawyerAdmin(id).then((res: any) => {
      //执行进度
      if (res.data.tasks_list.length != 0) {
        res.data.tasks_list.forEach((item: any) => {
          item.send_sort = item.send_sort + 1
          item.task_execution_status =
            item.task_execution_status == 0
              ? '未执行'
              : item.task_execution_status == 1
              ? '执行中'
              : item.task_execution_status == 2
              ? '已结束'
              : item.task_execution_status == 3
              ? '已撤销'
              : item.task_execution_status == 4
              ? '已终止'
              : item.task_execution_status == 5
              ? '执行中'
              : '已终止'
          item.send_time = item.send_time.replace('T', ' ')
          item.send_time = item.send_time.substring(
            0,
            item.send_time.lastIndexOf(':')
          )
          item['effect'] = item.task_total + '/' + item.task_success_total
        })
      }
      this.data.implementList = res.data.tasks_list
      //债权人
      if (res.data.creditor != null) {
        res.data.creditor.audit_status =
          res.data.creditor.audit_status == 'Audit_states_0'
            ? '待审核'
            : res.data.creditor.audit_status == 'Audit_states_1'
            ? '未通过'
            : '已通过'
        res.data.creditor.create_time = res.data.creditor.create_time.replace(
          'T',
          ' '
        )
        res.data.creditor.create_time = res.data.creditor.create_time.substring(
          0,
          res.data.creditor.create_time.lastIndexOf(':')
        )
        let arr: any = []
        arr.push(res.data.creditor)
        this.data.creditorList = arr
        this.data.creditorList[0]['admin_list'] = res.data.creditor_admin
        this.data.creditor_admin = res.data.creditor_admin
      }
      this.data.payment[0][0].value =
        res.data.overview.pay_status == 'Pay_Status_0' ? '待支付' : '已支付'
      // this.data.payment[1][0].value = res.data.pay_method_name
      this.data.shenhe.audit_status = res.data.overview.audit_status
      this.data.shenhe.desc = res.data.overview.audit_feedback
      this.data.back_remarks = res.data.overview.back_remarks
      this.data.state = res.data.overview.pay_status
      this.data.member_id = res.data.overview.member_id
      this.data.m_type = res.data.overview.m_type
      this.Signature.data2.lawyer_name = res.data.overview.lawyer_name
      this.data.lawyer_letter_file = res.data.overview.lawyer_letter_file
      this.Signature.data2.phone_number_01 =
        res.data.overview.lawyer_phone_number_01
      this.Signature.data2.phone_number_02 =
        res.data.overview.lawyer_phone_number_02

      //基础信息
      this.data.BasicInfo.forEach((item: any) => {
        item.forEach((item2: any) => {
          if (res.data.overview[item2.prop] != undefined) {
            item2.value = res.data.overview[item2.prop]
            if (item2.prop == 'logo_type') {
              item2.value = item2.value == 'Logo_type_0' ? '诚收法催' : '债主帮'
            }
            if (item2.name == '发函方式') {
              item2.value = item2.value == '1' ? 'EMS快递' : '电子律师函'
            }
            if (item2.name == '创建时间') {
              item2.value = item2.value
                .replace('T', ' ')
                .substring(0, item2.value.replace('T', ' ').lastIndexOf(':'))
            }
            if (item2.name == '债务类别') {
              item2.value =
                item2.value == 'Debt_type_0'
                  ? '民间借贷'
                  : item2.value == 'Debt_type_4'
                  ? '企业应收款'
                  : item2.value == 'Debt_type_5'
                  ? '逾期贷款'
                  : item2.value == 'Debt_type_6'
                  ? '信用卡逾期'
                  : item2.value == 'Debt_type_7'
                  ? '保险追偿'
                  : item2.value == 'Debt_type_8'
                  ? '物业/采暖欠费'
                  : '不当得利'
            }
          }
        })
      })
    })
  }
  //债务人列表滚动加载
  listLoad1() {
    if (this.data.listLoad1Type) {
      this.data.getDebtorParmas.page++
      this.GetDebtors()
    }
  }
  //债务人条件重置
  table2Reset() {
    this.data.getDebtorParmas = {
      page: 1,
      limit: 100,
      batch_no: this.$route.params.id,
      debtor_number: '',
      debtor_name: '',
      phone_number: ''
    }
    this.GetDebtors(1)
  }
  //获取债务人列表
  GetDebtors(num?: number) {
    this.table2Loading = true
    if (num) {
      this.data.getDebtorParmas.page = num
    }
    Api.GetDebtorPagingData(this.data.getDebtorParmas).then((res: any) => {
      let arr: any = res.data
      if (arr.length < 100) {
        this.data.listLoad1Type = false
      } else {
        this.data.listLoad1Type = true
      }
      arr.forEach((item: any) => {
        item['isAddress'] = false
        item.arrears_principal = item.arrears_principal.toLocaleString()
        item.arrears_interest = item.arrears_interest.toLocaleString()
        item.sms_01_status =
          item.sms_01_id == 0
            ? '未委托'
            : item.sms_01_status == -1
            ? '待执行'
            : item.sms_01_status == 0
            ? '执行成功'
            : item.sms_01_status == 1
            ? '执行失败'
            : '未委托'
        item.call_01_status =
          item.call_01_id == 0
            ? '未委托'
            : item.call_01_status == -1
            ? '待执行'
            : item.call_01_status == 0
            ? '执行中'
            : item.call_01_status == 1
            ? '执行成功'
            : item.call_01_status == 5
            ? '执行中'
            : '执行失败'
        item.email_01_status =
          item.email_01_id == 0
            ? '未委托'
            : item.email_01_status == -1
            ? '待执行'
            : item.email_01_status == 0
            ? '执行成功'
            : '执行失败'
        item.email_02_status =
          item.email_02_id == 0
            ? '未委托'
            : item.email_02_status == -1
            ? '待执行'
            : item.email_02_status == 0
            ? '执行成功'
            : '执行失败'
        item.logistics_status =
          item.log_logistics_id == 0
            ? '未委托'
            : item.logistics_status == 0
            ? '待执行'
            : item.logistics_status == 1
            ? '执行中'
            : item.logistics_status == 3
            ? '执行成功'
            : '执行失败'
        item.sms_02_status =
          item.sms_02_id == 0
            ? '未委托'
            : item.sms_02_status == -1
            ? '待执行'
            : item.sms_02_status == 0
            ? '执行成功'
            : '执行失败'
        item.call_02_status =
          item.call_02_id == 0
            ? '未委托'
            : item.call_02_status == -1
            ? '待执行'
            : item.call_02_status == 0
            ? '执行中'
            : item.call_02_status == 1
            ? '执行成功'
            : item.call_01_status == 5
            ? '执行中'
            : '执行失败'
      })
      arr.forEach((item: any) => {
        if (
          item.execution_progress == '已终止' ||
          item.execution_progress == '已撤销'
        ) {
          if (
            item.sms_01_status != '执行成功' &&
            item.sms_01_status != '执行失败' &&
            item.sms_01_status != '未委托'
          ) {
            item.sms_01_status = item.execution_progress
          }
          if (
            item.call_01_status != '执行成功' &&
            item.call_01_status != '执行失败' &&
            item.call_01_status != '未委托'
          ) {
            item.call_01_status = item.execution_progress
          }
          if (
            item.email_01_status != '执行成功' &&
            item.email_01_status != '执行失败' &&
            item.email_01_status != '未委托'
          ) {
            item.email_01_status = item.execution_progress
          }
          if (
            item.email_02_status != '执行成功' &&
            item.email_02_status != '执行失败' &&
            item.email_02_status != '未委托'
          ) {
            item.email_02_status = item.execution_progress
          }
          if (
            item.logistics_status != '执行成功' &&
            item.logistics_status != '执行失败' &&
            item.logistics_status != '未委托'
          ) {
            item.logistics_status = item.execution_progress
          }
          if (
            item.sms_02_status != '执行成功' &&
            item.sms_02_status != '执行失败' &&
            item.sms_02_status != '未委托'
          ) {
            item.sms_02_status = item.execution_progress
          }
          if (
            item.call_02_status != '执行成功' &&
            item.call_02_status != '执行失败' &&
            item.call_02_status != '未委托'
          ) {
            item.call_02_status = item.execution_progress
          }
        }
      })
      if (num) {
        this.data.obligorList = arr
      } else {
        this.data.obligorList = this.data.obligorList.concat(arr)
      }
      this.table2Loading = false
    })
  }
  //债务明细滚动加载
  listLoad2() {
    if (this.data.listLoad2Type) {
      this.data.debtDetailsParmas.page++
      this.debtDetails()
    }
  }
  //债务明细条件重置
  table3Reset() {
    this.data.debtDetailsParmas = {
      page: 1,
      limit: 100,
      batch_no: this.$route.params.id,
      debtor_number: ''
    }
    this.debtDetails(1)
  }
  //获取债务明细分页数据
  debtDetails(num?: number) {
    this.table3Loading = true
    if (num) {
      this.data.debtDetailsParmas.page = num
    }
    Api.GetDebtorDetailsPagingData(this.data.debtDetailsParmas).then(
      (res: any) => {
        this.table3Loading = false
        if (res.data.length <= 0) {
          this.data.listLoad2Type = false
        } else {
          this.data.listLoad2Type = true
        }
        if (this.data.debtDetailsOption.length == 1) {
          let debtDetailsOption: any = [
            // { prop: 'id', label: 'ID', width: '80px' },
            { prop: 'debtor_no', label: '债务人编号', width: '200px' }
          ]
          let ctt: any = res.data.filter((item: any) => {
            return item.is_headers == 1
          })
          let content: any = ctt[0].debt_content.split('╫')
          content.forEach((item: any, index: number) => {
            if (index == 0) {
              let dd: any = {
                prop: 'prop' + index,
                label: item.split('&')[1]
                // width: item.length * 20 + "px"
              }
              debtDetailsOption.push(dd)
            } else {
              let dd: any = {
                prop: 'prop' + index,
                label: item
                // width: item.length * 20 + "px"
              }
              debtDetailsOption.push(dd)
            }
          })
          this.data.debtDetailsOption = debtDetailsOption
        }
        if (res.data.length > 1) {
          let debtDetailsList: any = []
          let ctt2: any = res.data.filter((item: any) => {
            return item.is_headers != 1
          })
          ctt2.forEach((item: any, index: number) => {
            let list: any = item.debt_content.split('╫')
            let obj: any = {}
            // obj['debtor_number'] = item.debtor_number
            // obj['debtor_name'] = item.debtor_name
            list.forEach((item2: any, index2: number) => {
              if (index2 == 0) {
                obj['debtor_no'] = item.batch_no + '_' + item.debtor_no
                obj['prop' + index2] = item2.split('&')[1]
                obj['id'] = item2.split('&')[0]
              } else {
                // obj['prop' + index2] =
                //   parseInt(item2).toLocaleString() == 'NaN'
                //     ? item2
                //     : parseInt(item2).toLocaleString()
                obj['prop' + index2] = item2
              }
            })
            debtDetailsList.push(obj)
          })
          if (num) {
            this.data.debtDetailsList = debtDetailsList
          } else {
            this.data.debtDetailsList = this.data.debtDetailsList.concat(
              debtDetailsList
            )
          }
        }
      }
    )
  }
  //债务反馈加载
  listLoad3() {
    if (this.data.listLoad3Type) {
      this.data.getObligorListParmas.page++
      this.getObligorList()
    }
  }
  //重置债务反馈参数
  table4Reset() {
    this.data.getObligorListParmas = {
      page: 1,
      limit: 100,
      batch_no: this.$route.params.id,
      debtor_number: '',
      debtor_name: '',
      phone_number: ''
    }
    this.getObligorList(1)
  }
  //获取债务反馈分页数据
  getObligorList(num?: number) {
    this.table4Loading = true
    if (num) {
      this.data.getObligorListParmas.page = num
    }
    Api.GetDebtorFeedbackPagingData(this.data.getObligorListParmas).then(
      (res: any) => {
        let arr: any = res.data
        if (arr.length < 0) {
          this.data.listLoad3Type = false
        } else {
          this.data.listLoad3Type = true
        }
        arr.forEach((item: any) => {
          item.create_time = item.create_time
            .substring(0, item.create_time.lastIndexOf(':'))
            .replace('T', ' ')
          item.is_dissent =
            item.is_dissent == 1
              ? '有'
              : item.is_dissent == -1
              ? '未选择'
              : '无'
          item.feedback_source =
            item.feedback_source == 1 ? '债务人提交' : '客服添加'
        })
        if (num) {
          this.data.feedbackList = arr
        } else {
          this.data.feedbackList = this.data.feedbackList.concat(arr)
        }
        this.table4Loading = false
      }
    )
  }
  //债务人分类
  setObligorOption(res: any) {
    let obligorType: string = res.debtor_type //债务人类别
    let debtorType: string = this.data.BasicInfo[1][0].value //债务类别
    let variable: any = []
    let constant: any = [
      // { prop: 'debtor_number', label: '债务人编号', width: '120px' },
      { prop: 'currency', label: '欠款币种', width: '80px' },
      { prop: 'arrears_principal', label: '欠款本金', width: '200px' },
      { prop: 'arrears_interest', label: '违约金/利息', width: '200px' },
      { prop: 'creditor_name', label: '债权人联系人', width: '200px' },
      { prop: 'creditor_telphone', label: '联系人电话', width: '200px' },
      { prop: 'creditor_email', label: '联系人邮箱', width: '200px' }
      // {
      //   prop: 'lawyer_letter_execution_status',
      //   label: '律师函',
      //   width: '80px',
      // },
      // { prop: 'email_execution_status', label: '邮件', width: '80px' },
      // {
      //   prop: 'first_sms_execution_status',
      //   label: '第一次短信',
      //   width: '100px',
      // },
      // {
      //   prop: 'first_phone_execution_status',
      //   label: '第一次电话',
      //   width: '100px',
      // },
      // {
      //   prop: 'last_sms_execution_status',
      //   label: '第二次短信',
      //   width: '100px',
      // },
      // {
      //   prop: 'last_phone_execution_status',
      //   label: '第二次电话',
      //   width: '100px',
      // },
      // { prop: 'member_remarks', label: '用户端备注', width: '200px' },
    ]
    // 个人
    if (obligorType == 'Creditor_states_1') {
      let currency: any = [
        { prop: 'debtor_name', label: '债务人', width: '120px' },
        { prop: 'phone_number', label: '债务人手机', width: '200px' },
        { prop: 'email', label: '债务人邮箱', width: '200px' },
        // { prop: 'city_name', label: '债务人地区', width: '250px' },
        { prop: 'address_txt', label: '债务人地址', width: '400px' }
      ]
      if (debtorType == '保险追偿') {
        let item: any = {
          prop: 'insurer_name',
          label: '被保险人名称',
          width: '120px'
        }
        currency.push(item)
      } else if (debtorType == '欠费欠租') {
        let item: any = {
          prop: 'arrearage_type',
          label: '欠费类型',
          width: '120px'
        }
        currency.push(item)
      } else if (debtorType == '信用卡逾期') {
        let item: any = {
          prop: 'settlement_date',
          label: '结算日期',
          width: '200px'
        }
        currency.push(item)
      }
      variable = currency
      //企业
    } else if (obligorType == 'Creditor_states_0') {
      let currency: any = [
        { prop: 'debtor_name', label: '债务人', width: '250px' },
        {
          prop: 'contact_person',
          label: '企业负责人',
          width: '120px'
        },
        {
          prop: 'phone_number',
          label: '债务人手机',
          width: '200px'
        },
        { prop: 'email', label: '债务人邮箱', width: '200px' },
        // { prop: 'city_name', label: '债务人地区', width: '250px' },
        {
          prop: 'address_txt',
          label: '债务人地址',
          width: '400px'
        }
      ]
      if (debtorType == '保险追偿') {
        let item: any = {
          prop: 'insurer_name',
          label: '被保险人名称',
          width: '120px'
        }
        currency.push(item)
      } else if (debtorType == '欠费欠租') {
        let item: any = {
          prop: 'arrearage_type',
          label: '欠费类型',
          width: '120px'
        }
        currency.push(item)
      }
      variable = currency
    }
    this.data.obligorEditOption = variable.concat(constant)
  }
  //点击左侧菜单事件
  laberClick(index: number) {
    let self: any = this
    self.data.actIndex = index
    let top: number = self.$refs.right.offsetTop //初始位置
    let dom: any = 'section' + index //点击元素的位置
    let actTop: number = self.$refs[dom].offsetTop
    self.$refs.right.scrollTop = actTop - top
  }
  //滚动监听
  scrollGet(e: any) {
    if (e.target.scrollTop <= this.sectionDom.section0) {
      this.data.actIndex = 0
    } else if (e.target.scrollTop <= this.sectionDom.section1) {
      this.data.actIndex = 1
    } else if (e.target.scrollTop <= this.sectionDom.section2) {
      this.data.actIndex = 2
    } else if (e.target.scrollTop <= this.sectionDom.section3) {
      this.data.actIndex = 3
    } else if (e.target.scrollTop <= this.sectionDom.section4) {
      this.data.actIndex = 4
    } else if (e.target.scrollTop <= this.sectionDom.section5) {
      this.data.actIndex = 5
    } else if (e.target.scrollTop <= this.sectionDom.section6) {
      this.data.actIndex = 6
    }
  }
  //审核
  beizhu() {
    let self: any = this
    let parmas: any = {
      audit_status: self.data.shenhe.audit_status,
      audit_feedback: self.data.shenhe.desc,
      batch_no: self.$route.params.id
    }
    if (parmas.audit_status == 'Audit_states_2' && self.data.state == 0) {
      self.$message.warning('该订单未完成支付')
      return false
    }
    self
      .$confirm('此笔审核中有反馈内容至用户，您确定保存审核吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.examiningAILawyer(parmas).then((res: any) => {
          if (res.data != 0) {
            self.$message.success(res.msg)
            self.init()
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  //后台备注
  back_remarksSave() {
    let self: any = this
    Api.breakSave(self.data.BasicInfo[0][0].value, self.data.back_remarks).then(
      (res: any) => {
        if (res.state) {
          self.$message.success(res.msg)
          self.init()
        } else {
          self.$message.warning(res.msg)
        }
      }
    )
  }
  //查看收支信息
  paymentInfo(id: number) {
    let self: any = this
    self.$router.push({
      path: '/business/inandout',
      params: {
        id
      }
    })
  }
  //撤销
  entrustRevoke() {
    let self: any = this
    self
      .$confirm('您确定撤销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.entrustRevoke(self.data.BasicInfo[0][0].value).then((res: any) => {
          if (res.data != 0) {
            self.$message.success(res.msg)
            self.$router.push({
              path: '/LawyerLetter/entrustList'
            })
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消撤销'
        })
      })
  }
  //删除
  entrustDelet() {
    let self: any = this
    self
      .$confirm('您确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.entrustDelete(self.data.BasicInfo[0][0].value).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg)
            self.$router.push({
              path: '/LawyerLetter/entrustList'
            })
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //返回
  revoke() {
    let self: any = this
    self.$router.go(-1)
  }
  //关闭弹窗
  close() {
    this.data.visible = false
  }
  //打开详情弹窗
  openInfo(data: any) {
    this.data.actName = 'first'
    this.data.infoTitle = data.name
    this.data.visible = true
    this.option = data
    this.infoData2.phone = data.phone_number
    this.infoData2.email = data.email
    this.infoData2['isStop'] = data.executing_status
    //首次短信
    this.getinfo2(this.option.sms_01_id, 'AI_Task_Code_1')
  }
  //打开编辑弹窗
  openEdit(data: any) {
    this.data.editShow = true
    this.setObligorOption(data)
    this.editData.list = this.data.obligorEditOption
    this.editData.data = data
    Api.getCollection(data.debtor_number).then((res: any) => {
      this.editData.Collection = res.data.csh_content
      this.editData.lawyerLetter = res.data.lsh_content
    })
  }
  //任务终止
  taskStop(data: any) {
    let self: any = this
    self
      .$confirm('您确定终止任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.taskStop(data.debtor_number).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg)
            self.init()
          } else {
            self.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消终止'
        })
      })
  }
  //编辑提交
  editSubmit(data: any) {
    let self: any = this
    let parmas1: any = data.data
    let parmas2: any = {
      debtor_number: data.data.debtor_number,
      content: data.Collection
    }
    let parmas3: any = {
      debtor_number: data.data.debtor_number,
      content: data.lawyerLetter
    }
    Api.UpdateDebtor(data.data).then((res1: any) => {
      Api.UpdateCollectionLetterContent(parmas2).then((res2: any) => {
        Api.UpdateLawyersLetterContent(parmas3).then((res3: any) => {
          if (res3.state) {
            this.data.editShow = false
            this.$message.success(res3.msg)
            self.init()
          } else {
            this.$message.warning(res3.msg)
          }
        })
      })
    })
  }
  //编辑弹窗关闭
  editClose() {
    this.data.editShow = false
  }
  //修改债务人地区
  addressEdit(data: any) {
    let parmas: any = {
      debtor_number: data['id'],
      country: data['country'],
      province: data['province'],
      city: data['city'],
      county: data['county']
    }
    Api.debtorAddressEdit(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //获取执行状态字典
  GetType() {
    Api.GetType('Executing_states_send').then((res: any) => {
      this.data.sendstates = res.data
    })
  }
  //打开债务明细
  debtDetailsEdit(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)

    this.data.detailedShow = true
    let val: string = ''
    Object.keys(data).forEach((key: string, index: number) => {
      if (key == 'id') {
        this.detailedId = data[key]
      } else if (key == 'debtor_no') {
        //
      } else {
        val += data[key] + '╫'
      }
    })
    this.detailed = val.substring(0, val.length - 1)
  }
  //债务明细编辑保存
  detailedSave() {
    let self: any = this
    let parmas: any = {
      id: self.detailedId,
      // batch_no: self.$route.params.id,
      debt_content: self.detailed
      // is_headers: 0
    }
    Api.debtDetailsEdit(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.detailedShow = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //快递信息下载
  DownLoadEMS() {
    const baseURL: string = 'http://api1.debteehelper.com/api'
    let downloadFil = `${baseURL}/LawyerLetterExpress/DownLoadEMS?batch_no=${
      this.$route.params.id
    }&debtor_number=&receiving_name=&receiving_phone=&send_time=&ai_status=all&express_status=${'-1'}&courier_receipt=${'-1'}&courier_receipt_img=${'-1'}`
    window.open(downloadFil)
  }
  //通知
  tongzhi(data: any) {
    this.tongzhiTost = true
    Object.keys(this.tzData).forEach((key: string) => {
      if (key == 'phone_number') {
        this.tzData[key] = data['creditor_telphone_2']
      } else {
        this.tzData[key] = data[key]
      }
    })
  }
  //通知quxiao
  tzqx() {
    this.tzData = {
      debtor_name: '',
      phone_number: '',
      debtor_number: ''
    }
    this.tongzhiTost = false
  }
  //通知确定
  tzRelease() {
    this.$confirm('确定发送短信通知吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.smsTongzhi(this.tzData).then((res: any) => {
          if (res.state) {
            this.tongzhiTost = false
            this.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        })
      })
  }
  //律师署名选择确定
  lawyerSelect() {
    let data: any = Object.assign(
      JSON.parse(JSON.stringify(this.Signature.data))
    )
    if (data.name != '') {
      this.Signature.data2.lawyer_name = data.name
    }
    if (data.phone1 != '') {
      this.Signature.data2.phone_number_01 = data.phone1
    }
    if (data.phone2 != '') {
      this.Signature.data2.phone_number_02 = data.phone2
    }
  }
  //律师函署名重置
  lawyerReset() {
    this.Signature.data = {
      name: '',
      phone1: '',
      phone2: ''
    }
  }
  //律师署名保存
  lawyerSignaSave() {
    let self: any = this
    self
      .$confirm('您确定保存该署名吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        let parmas: any = self.Signature.data2
        parmas['batch_no'] = self.$route.params.id
        Api.lawyerUpdateSigned(parmas).then((res: any) => {
          if (res.state) {
            self.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            self.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
  }
  // 删除授权管理员
  deleteSqAdmin(row: any) {
    Api2.deletCreditorAdmin(row.creditor_admin_id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //跳转用户详情
  toInfo() {
    const mType: string = this.data.m_type
    const member_id: any = this.data.member_id
    if (mType === '律师') {
      this.$router.push({
        path: `/ordinary/lawterAdmin/${member_id}`
      })
    } else if (mType === '普通用户') {
      this.$router.push({
        path: `/ordinary/ordinaryAdmin/${member_id}`
      })
    } else {
      this.$router.push({
        path: `/ordinary/VipAdmin/${member_id}`
      })
    }
  }
}
