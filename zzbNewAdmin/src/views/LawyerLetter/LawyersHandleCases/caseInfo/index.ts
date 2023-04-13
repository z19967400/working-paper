import { Component, Vue } from 'vue-property-decorator'
import * as Api from '@/api/business'
import caseoverview from './components/caseoverview.vue'
import distributionLawyer from './components/distributionLawyer.vue'
import contract from './components/contract.vue'
import settlement from './components/settlement.vue'
import handCase from './components/handCase.vue'
import assessment from './components/assessment.vue'
@Component({
  components: {
    caseoverview,
    distributionLawyer,
    contract,
    settlement,
    handCase,
    assessment
  }
})
export default class About extends Vue {
  // Getter

  // Action

  // data
  data: any = {
    tabPosition: 'left', //侧边栏方位
    height: 500, //侧边栏高度
    case_creditorId: 0, //债权人id
    activeName: 'first',
    debtor_number: '',
    case_status_code: '', //案件状态
    member_id: 0,
    m_type: '',
    caseoverview: {
      //案件概览
      information: [
        //委托信息
        [
          {
            name: '委托编号',
            value: '',
            prop: 'debtor_number'
          },
          { name: '案件状态', value: '', prop: 'case_status' }
        ],
        [
          { name: '创建人', value: '', prop: 'member_name' },
          { name: '创建时间', value: '', prop: 'entrust_time' }
        ],
        [
          {
            name: '债务类别',
            value: '企业应收账款',
            prop: 'collection_scene'
          }
          // { name: "发布时间", value: "2020-01-02 11:11", prop: "" }
        ]
      ],
      matter: [], //办案事项
      customer: [], //专案客服
      creditor: [],
      creditor_admin: [],
      caseInformation: [
        //案件信息
      ],
      //案件辖区
      Jurisdiction: {
        jurisdiction_01_txt: '',
        jurisdiction_02_txt: '',
        jurisdiction_03_txt: '',
        jurisdiction_04_txt: '',
        jurisdiction_01_select: '',
        jurisdiction_02_select: '',
        jurisdiction_03_select: '',
        jurisdiction_04_select: ''
      },
      caseData: [
        //案件数据
        [
          { name: '案件评级', value: 'C', prop: '' },
          { name: '服务费模式', value: '风险代理', prop: '' },
          { name: '风险服务费率', value: '20%', prop: '' }
        ],
        [
          { name: '预计胜诉率', value: '80 %', prop: '' },
          {
            name: '固定服务费报价（人民币元）',
            value: '998',
            prop: ''
          },
          { name: '风险佣金平台管理费率', value: '20%', prop: '' }
        ],
        [
          { name: '预计回款率', value: '50 %', prop: '' },
          { name: '固定佣金平台管理费', value: '20%', prop: '' },
          { name: '展示律师费（人民币元）', value: '1000', prop: '' }
        ]
      ],
      tabData: [
        //回款记录
        {
          id: '0',
          matter: '一审',
          lawyer: '王律师',
          Collection_currency: '人民币（元）',
          Collection_Amount: '998',
          Collection_method: '转账',
          Collection_time: '2020-02-02 08:54:62',
          ConfirmStatus: '已确认',
          notes: '111'
        }
      ],
      tabOption: [
        //回款记录表格参数
        { label: '回款ID', prop: 'id' },
        { label: '办案事项', prop: 'matter' },
        { label: '办案事项', prop: 'lawyer' },
        { label: '回款币种', prop: 'Collection_currency' },
        { label: '回款金额', prop: 'Collection_Amount' },
        { label: '回款方式', prop: 'Collection_method' },
        { label: '回款日期', prop: 'Collection_time' },
        { label: '确认状态', prop: 'ConfirmStatus' },
        { label: '后台备注', prop: 'notes' }
      ],
      //后台备注
      textarea: '',
      //结案备注
      close_case_remarks: ''
    },
    //分配律师
    distributionLawyer: {
      tabData: [],
      tabOption: [
        //回款记录表格参数
        { label: 'ID', prop: 'id' },
        { label: '律师名称', prop: 'lawyer_name' },
        { label: '律师年龄', prop: 'lawyer_age' },
        { label: '律师性别', prop: 'lawyer_sex' },
        { label: '联系电话', prop: 'lawyer_phone_number' },
        { label: '审核状态', prop: 'audit_status' },
        { label: '抢单理由', prop: 'order_grabbing_reasons' },
        { label: '抢单时间', prop: 'order_grabbing_time' },
        { label: '是否分配', prop: 'is_allocated' }
      ]
    },
    //案件评估
    assessmentData: {
      businessStatus: '存续', //经营状态
      agreedDate: '', //约定付款日期
      dispute: '', //欠款是否有争议
      availableEvidence: '', //现有证据
      otherEvidence: '', //其他证据
      property_clues: '', //债务人财产线索
      property_clues_bc: '', //债务人财产线索补充说明
      third_assessment_report: '',
      //基础信息
      informationId: 0,
      information: [
        [
          {
            name: '资产信息数量',
            value: '',
            prop: 'asset_information_quantity'
          },
          {
            name: '限制高消费数量',
            value: '',
            prop: 'limit_high_consumption_quantity'
          },
          {
            name: '股权冻结数量',
            value: '',
            prop: 'equity_freeze_quantity'
          }
        ],
        [
          {
            name: '失信被执行人数量',
            value: '',
            prop: 'dishonesty_executed_person_quantity'
          },
          {
            name: '被执行人数量',
            value: '',
            prop: 'executed_person_quantity'
          },
          {
            name: '动产抵押数量',
            value: '',
            prop: 'chattel_mortgage_quantity'
          }
        ],
        [
          {
            name: '司法案件数量',
            value: '',
            prop: 'justizsache_quantity'
          },
          {
            name: '终本案件数量',
            value: '',
            prop: 'final_case_quantity'
          }
        ]
      ],
      // 胜诉率预估
      case_winrateId: 0,
      case_winrate: [
        {
          factor: '合同/协议/订单',
          weight: '4',
          score: '0',
          prop: 'contract_agreement_order'
        },
        { factor: '发票', weight: '1', score: '0', prop: 'invoice' },
        {
          factor: '发货及物流凭证（运单等）、收货凭证',
          weight: '4',
          score: '0',
          prop: 'receipt_delivery_voucher'
        },
        {
          factor: '对账凭证、付款计划书、付款承诺书',
          weight: '8',
          score: '0',
          prop: 'evidence_payment'
        },
        {
          factor: '付款记录、催款通知记录',
          weight: '2',
          score: '0',
          prop: 'payment_notice_record'
        },
        {
          factor: '电子证据（邮件、微信、录音录像等）',
          weight: '3',
          score: '0',
          prop: 'electronic_evidence'
        },
        {
          factor: '判决、仲裁、公证等司法文书',
          weight: '3',
          score: '0',
          prop: 'judicial_document'
        },
        {
          factor: '欠款是否有争议',
          weight: '是-2/否0',
          score: '0',
          prop: 'is_debt_dispute'
        },
        {
          factor: '是否过诉讼时效',
          weight: '是-5/否0',
          score: '0',
          prop: 'is_limitation_action'
        },
        {
          factor: '其他证据',
          weight: '人工评估调整',
          score: '0',
          prop: 'other_evidence'
        }
      ],
      case_winrateData: {
        evaluation_score: 0, //评估得分
        win_rate: 0, //胜诉率
        //评估说明
        assessment_notes:
          '现有的证据仅能够证明小部分欠款事实，案件的胜诉率较低，非常需要补充额外的证据，否则无法确保案'
      },
      //回款率预估
      case_collectionrate: [
        {
          factor: '债务人状态',
          weight: '10',
          value: '',
          score: 0,
          prop: 'business_status',
          prop2: 'debtor_status'
        },
        {
          factor: '司法案件（被告）≥3起',
          weight: '10',
          value: '',
          score: 0,
          prop: 'dishonesty_executed_person',
          prop2: 'justizsache_quantity'
        },
        {
          factor: '被执行人',
          weight: '10',
          value: '',
          score: 0,
          prop: 'height_limit',
          prop2: 'executed_person_quantity'
        },
        {
          factor: '终本案件',
          weight: '10',
          value: '',
          score: 0,
          prop: 'final_case',
          prop2: 'final_case_quantity'
        },
        {
          factor: '限制高消费',
          weight: 2,
          value: '',
          score: '0',
          prop: 'judicial_cases',
          prop2: 'limit_high_consumption_quantity'
        },
        {
          factor: '失信被执行人',
          weight: '3',
          value: '',
          score: 0,
          prop: 'executed_person',
          prop2: 'dishonesty_executed_person_quantity'
        },
        {
          factor: '股权冻结',
          weight: '1',
          value: '',
          score: 0,
          prop: 'equity_freeze',
          prop2: 'equity_freeze_quantity'
        },
        {
          factor: '动产抵押',
          weight: '2',
          value: '',
          score: 0,
          prop: 'chattel_mortgage',
          prop2: 'chattel_mortgage_quantity'
        },
        {
          factor: '账龄',
          weight:
            '账龄＜180天 0<br/>账龄180-365天 1<br/>账龄366-730天 2<br/>账龄＞730天 3',
          value: '100',
          score: 0,
          prop: 'account_age'
        },
        {
          factor: '可供保全/执行的车辆/机器/设备/货物',
          weight: '人工评估调整',
          value: '-',
          score: 0,
          prop: 'bq_fixed_assets'
        },
        {
          factor: '可供保全/执行的应收账款',
          weight: '人工评估调整',
          value: '-',
          score: 0,
          prop: 'bq_accounts_receivable'
        },
        {
          factor: '可供保全/执行的其他财产',
          weight: '人工评估调整',
          value: '-',
          score: 0,
          prop: 'bq_other_property'
        }
      ],
      // 回款率信息
      case_collectData: {
        id: 0,
        case_rating: 'c', //案件评级
        evaluation_score: 0, //评估得分
        collection_rate: 0, //回款率
        assessment_notes:
          '现有的证据仅能够证明小部分欠款事实，案件的胜诉率较低，非常需要补充额外的证据，否则无法确保案'
      },
      // 律师费信息
      lawyers_fees: {},
      //费用
      estimate: [
        { factor: '诉讼/仲裁费', weight: '' },
        { factor: '财产保全费', weight: '' },
        { factor: '财产保全保险费', weight: '' }
      ],
      //报价
      offer: {
        offerId: 0,
        service_fee_mode: '',
        offerInfo: {}
      }
    },
    //财务结算
    finance: '',
    // 签署合约
    contracts: [],
    contracts2: [],
    //案件进展
    caseProgress: {
      court: [], //法院信息
      matters: {} //事项信息
    }
  }
  endTypeOpen: boolean = false
  endType: string = '0'
  closeCaseRemarks: string = ''
  created() {
    this.data.height = document.body.offsetHeight - 200
  }
  activated() {
    //
  }
  mounted() {
    this.init()
  }
  // 初始化函数
  init() {
    let self = this
    self.data.debtor_number = self.$route.params.number
    Api.getOfflineCaseInfo(self.data.debtor_number).then((res: any) => {
      self.data.m_type = res.data.case_daetails.m_type
      self.data.member_id = res.data.case_daetails.member_id
      self.data.case_status_code = res.data.case_daetails.case_status_code
      self.data.caseoverview.Jurisdiction = res.data.case_jurisdiction
      self.data.caseoverview['member_id'] = self.data.member_id
      self.data.caseoverview['m_type'] = self.data.m_type
      let addressInfo = res.data.case_debtor
      self.data.caseoverview.Jurisdiction.jurisdiction_01_txt = [
        addressInfo.jurisdiction_01_country,
        addressInfo.jurisdiction_01_province,
        addressInfo.jurisdiction_01_city,
        addressInfo.jurisdiction_01_area
      ]
      self.data.caseoverview.Jurisdiction.jurisdiction_02_txt = [
        addressInfo.jurisdiction_02_country,
        addressInfo.jurisdiction_02_province,
        addressInfo.jurisdiction_02_city,
        addressInfo.jurisdiction_02_area
      ]
      self.data.caseoverview.Jurisdiction.jurisdiction_03_txt = [
        addressInfo.jurisdiction_03_country,
        addressInfo.jurisdiction_03_province,
        addressInfo.jurisdiction_03_city,
        addressInfo.jurisdiction_03_area
      ]
      self.data.caseoverview.Jurisdiction.jurisdiction_04_txt = [
        addressInfo.jurisdiction_04_country,
        addressInfo.jurisdiction_04_province,
        addressInfo.jurisdiction_04_city,
        addressInfo.jurisdiction_04_area
      ]
      let reg: any = new RegExp(',', 'g')
      self.data.assessmentData.availableEvidence = res.data.case_debtor.available_evidence.replace(
        reg,
        '；'
      )

      self.data.assessmentData.otherEvidence =
        res.data.case_debtor.other_evidence
      self.data.assessmentData.dispute = res.data.case_debtor.is_dispute
      self.data.assessmentData.agreedDate =
        res.data.case_debtor.agreed_payment_date
      self.data.assessmentData.property_clues = res.data.case_debtor.property_clues.replace(
        reg,
        '；'
      )
      self.data.assessmentData.property_clues_bc =
        res.data.case_debtor.property_clues_bc
      let caseType: any = {
        creditor_type_name: res.data.case_creditor.creditor_type_name,
        collection_scene: res.data.case_daetails.collection_scene
      }
      self.data.assessmentData.creditor_type_name =
        res.data.case_creditor.creditor_type_name
      self.caseTypeEdit(caseType)

      //委托信息
      if (res.data.case_daetails != null) {
        self.data.caseoverview.textarea = res.data.case_daetails.back_remarks
        self.data.caseoverview.close_case_remarks =
          res.data.case_daetails.close_case_remarks
        self.data.caseoverview.information.forEach((item: any) => {
          item.forEach((item2: any) => {
            if (item2.prop == 'entrust_time') {
              let isPc: string = this.data.m_type == 'VIP' ? 'PC' : '移动端'
              item2.value =
                res.data.case_daetails[item2.prop] + ' (' + isPc + ')'
            } else {
              item2.value = res.data.case_daetails[item2.prop]
            }
          })
        })
      }
      //办案事项
      if (res.data.case_matters_name.length > 0) {
        self.data.caseoverview.matter = res.data.case_matters_name
      }
      //专属客服
      if (res.data.case_customer_service.length > 0) {
        self.data.caseoverview.customer = res.data.case_customer_service
      }
      //债权人
      if (res.data.case_creditor != null) {
        self.data.case_creditorId = res.data.case_creditor.id
        self.data.caseoverview.creditor = [res.data.case_creditor]
        self.data.caseoverview.creditor[0].admin_list = res.data.creditor_admin
        self.data.caseoverview.creditor_admin = res.data.creditor_admin
      }
      //案件信息
      if (res.data.case_debtor != null) {
        self.data.caseoverview.caseInformation = res.data.case_debtor
      }
    })
  }
  //标签页切换
  tableSwitch(tab: any, event: any) {
    let self: any = this
    if (tab.name == 'second') {
      self.getCaseAssment()
    }
    if (tab.name == 'Three' || tab.name == 'Three2') {
      self.getContracts(tab.name)
    }
    if (tab.name == 'Four') {
      self.getCaseLawyer()
    }
    if (tab.name == 'five') {
      this.getCaseProcess()
    }
    if (tab.name == 'six') {
      this.getFinance()
    }
  }
  //获取案件可分配律师
  getCaseLawyer() {
    let parmas: any = {
      page: 1,
      limit: 20,
      debtor_number: this.$route.params.number
    }
    Api.getCaseLawyer(parmas).then((res: any) => {
      res.list.forEach((item: any) => {
        item.is_allocated =
          item.is_allocated == 0
            ? '待分配'
            : item.is_allocated == 1
            ? '已分配'
            : '未分配'
      })
      this.data.distributionLawyer.tabData = res.list
    })
  }

  //获取案件评估
  getCaseAssment() {
    let number: string = this.$route.params.number
    let upData: any = this.data.assessmentData
    Api.getCaseAssment(number).then((res: any) => {
      upData.lawyers_fees = res.data.lawyers_fees
      upData.case_credit_id = res.data.case_credit.id
      if (res.data.case_collectionrate != null) {
        upData.businessStatus = res.data.case_collectionrate.business_status
      }
      //评估基本信用信息
      if (res.data.case_credit != null) {
        upData.informationId = res.data.case_credit.id
        upData.third_assessment_report = res.data.case_detail.case_report_file
        upData.estimate[0].weight =
          res.data.case_credit.litigation_arbitration_fee
        upData.estimate[1].weight =
          res.data.case_credit.property_preservation_fee
        upData.estimate[2].weight =
          res.data.case_credit.property_preservation_insurance
        upData.information.forEach((item: any) => {
          item.forEach((item2: any) => {
            item2.value = res.data.case_credit[item2.prop]
          })
        })
      }
      //胜诉率预估
      if (res.data.case_winrate != null) {
        upData.case_winrateId = res.data.case_winrate.id
        upData.case_winrateData.win_rate = res.data.case_winrate.win_rate
        upData.case_winrateData.assessment_notes =
          res.data.case_winrate.assessment_notes
        upData.case_winrateData.evaluation_score =
          res.data.case_winrate.evaluation_score
        upData.case_winrate.forEach((item: any) => {
          item.score = res.data.case_winrate[item.prop]
        })
      }
      //回款率预估
      if (res.data.case_collectionrate != null) {
        upData.case_collectData.id = res.data.case_collectionrate.id
        upData.case_collectData.case_rating =
          res.data.case_collectionrate.case_rating
        upData.case_collectData.evaluation_score =
          res.data.case_collectionrate.evaluation_score
        upData.case_collectData.collection_rate =
          res.data.case_collectionrate.collection_rate
        upData.case_collectData.assessment_notes =
          res.data.case_collectionrate.assessment_notes
        upData.case_collectionrate.forEach((item: any) => {
          if (item.weight === '人工评估调整') {
            item.score = res.data.case_collectionrate[item.prop] * -1
          } else {
            item.score = res.data.case_collectionrate[item.prop]
          }
        })
        upData.case_collectionrate.forEach((item: any) => {
          if (item.prop2) {
            item.value = res.data.case_credit[item.prop2]
          }
          if (item.prop == 'account_age') {
            item.value = res.data.arrears_days
          }
        })
      }
      //报价 offer
      if (res.data.case_detail != null) {
        upData.offer.service_fee_mode = res.data.case_detail.service_fee_mode
        upData.offer.offerId = res.data.case_detail.id
        upData.offer.offerInfo = res.data.case_detail
      }
    })
  }
  //案件发布
  caseRelease() {
    let self: any = this
    self
      .$confirm('您确定发布案件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.caseRelease(self.data.debtor_number).then((res: any) => {
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
          message: '已取消发布'
        })
      })
  }
  //案件撤销
  caseRevoke() {
    let parmas: any = {
      debtor_number: this.data.debtor_number,
      case_status: 3
    }
    let self: any = this
    self
      .$confirm('您确定撤销案件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.updataCaseStatus(parmas).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.init()
          } else {
            this.$message.warning(res.msg)
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
  //无律师接案
  noLawyerRelease() {
    let parmas: any = {
      debtor_number: this.data.debtor_number,
      case_status: 1
    }
    let self: any = this
    self
      .$confirm('您确定无律师接案吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.updataCaseStatus(parmas).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.init()
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消无律师接案'
        })
      })
  }
  //结案
  Release() {
    let parmas: any = {
      debtor_number: this.data.debtor_number,
      case_status: this.endType
    }
    Api.updataCaseStatus(parmas).then((res: any) => {
      if (res.state) {
        let parmas: any = {
          debtor_number: this.data.debtor_number,
          close_case_remarks: this.closeCaseRemarks
        }
        Api.CloseCase(parmas).then((res2: any) => {
          this.endTypeOpen = !this.endTypeOpen
          this.$message.success(res.msg)
          this.init()
        })
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //获取合同列表
  getContracts(name: string) {
    if (name == 'Three') {
      Api.getContracts(this.data.debtor_number).then((res: any) => {
        this.data.contracts = res.data.filter((item: any) => {
          return item.contract_type == 0
        })
        this.data.contracts['matter'] = this.data.caseoverview.matter
        this.data.contracts['customer'] = this.data.caseoverview.customer
        this.data.contracts.forEach((item: any) => {
          item.contract_type =
            item.contract_type == 0
              ? '法律服务合同'
              : item.contract_type == 1
              ? '委托律师代理合同'
              : '律师解约合同'
          item.contract_sign_method =
            item.contract_sign_method == 0 ? '线上签署' : '线下签署'
          item.sign_status =
            item.sign_status == 0
              ? '待签署'
              : item.sign_status == -1
              ? '合同准备中'
              : '已签署'
        })
      })
    } else {
      Api.getContracts(this.data.debtor_number).then((res: any) => {
        this.data.contracts2 = res.data.filter((item: any) => {
          return item.contract_type == 1
        })
        this.data.contracts2['matter'] = this.data.caseoverview.matter
        this.data.contracts2['customer'] = this.data.caseoverview.customer
        this.data.contracts2.forEach((item: any) => {
          item.contract_type =
            item.contract_type == 0
              ? '法律服务合同'
              : item.contract_type == 1
              ? '委托律师代理合同'
              : '律师解约合同'
          item.contract_sign_method =
            item.contract_sign_method == 0 ? '线上签署' : '线下签署'
          item.sign_status =
            item.sign_status == 0
              ? '待签署'
              : item.sign_status == -1
              ? '合同准备中'
              : '已签署'
        })
      })
    }
  }
  //获取案件进程
  getCaseProcess() {
    this.getCaseCourt()
    this.getCaseMatter()
  }
  //获取财务情况
  getFinance() {
    Api.getFinance(this.data.debtor_number).then((res: any) => {
      if (!res.state) {
        this.$message.warning(res.msg)
      } else {
        this.data.finance = res.data
      }
    })
  }
  //获取案件法院信息
  getCaseCourt() {
    let self: any = this
    Api.getCaseCourtInfo(self.data.debtor_number).then((res: any) => {
      self.data.caseProgress.court = res.data
    })
  }
  //获取案件进展
  getCaseMatter() {
    let self: any = this
    Api.getCaseMatter(self.data.debtor_number).then((res: any) => {
      res.data.matters.forEach((item: any, index: number) => {
        // eslint-disable-next-line no-console
        console.log(index, res.data.matters.length)

        item['up'] = false
        item['down'] = false
        item['delect'] = false
        if (index == 0) {
          item['up'] = true
          if (item.unexecuted_tasks_count != item.tasks_total) {
            item['down'] = true
            item['delect'] = true
          }
        } else if (index == res.data.matters.length - 1) {
          item['down'] = true
          if (item.unexecuted_tasks_count != item.tasks_total) {
            item['up'] = true
            item['delect'] = true
          }
        } else {
          if (item.unexecuted_tasks_count != item.tasks_total) {
            item['up'] = true
            item['down'] = true
            item['delect'] = true
          }
          if (
            res.data.matters[index - 1].unexecuted_tasks_count !=
            res.data.matters[index - 1].tasks_total
          ) {
            item['up'] = true
          }
          if (
            res.data.matters[index + 1].unexecuted_tasks_count !=
            res.data.matters[index + 1].tasks_total
          ) {
            item['down'] = true
          }
        }
      })
      self.data.caseProgress.matters = res.data
    })
  }
  //根据案件类型和债权人类别来区分评估表单
  caseTypeEdit(data: any) {
    if (data.collection_scene != '企业应收账款') {
      this.data.assessmentData.case_winrate = [
        {
          factor: '借款合同、借条、借据、欠条、还款承诺书',
          weight: '5',
          score: '0',
          prop: 'evidence_borrowing'
        },
        { factor: '发票', weight: '1', score: '0', prop: 'invoice' },
        {
          factor: '转账记录',
          weight: '5',
          score: '0',
          prop: 'transfer_records'
        },
        {
          factor: '还款记录、催款通知记录',
          weight: '2',
          score: '0',
          prop: 'repayment_notice_record'
        },
        {
          factor: '电子证据（邮件、微信、录音录像等）',
          weight: '3',
          score: '0',
          prop: 'electronic_evidence'
        },
        {
          factor: '欠款是否有争议',
          weight: '是-2/否0',
          score: '0',
          prop: 'is_debt_dispute'
        },
        {
          factor: '是否过诉讼时效',
          weight: '是-5/否0',
          score: '0',
          prop: 'is_limitation_action'
        },
        {
          factor: '其他证据',
          weight: '人工评估调整',
          score: '0',
          prop: 'other_evidence'
        }
      ]
    }
    if (data.creditor_type_name == '个人') {
      this.data.assessmentData.case_collectionrate = [
        {
          factor: '债务人状态',
          weight: '10',
          value: '',
          score: 0,
          prop: 'missing_dead',
          prop2: 'debtor_status'
        },
        {
          factor: '司法案件（被告）≥3起',
          weight: '10',
          value: '',
          score: 0,
          prop: 'dishonesty_executed_person',
          prop2: 'justizsache_quantity'
        },
        {
          factor: '被执行人',
          weight: '10',
          value: '',
          score: 0,
          prop: 'height_limit',
          prop2: 'executed_person_quantity'
        },
        {
          factor: '终本案件',
          weight: '10',
          value: '',
          score: 0,
          prop: 'final_case',
          prop2: 'final_case_quantity'
        },
        {
          factor: '限制高消费',
          weight: 2,
          value: '',
          score: '0',
          prop: 'judicial_cases',
          prop2: 'limit_high_consumption_quantity'
        },
        {
          factor: '失信被执行人',
          weight: '3',
          value: '',
          score: 0,
          prop: 'executed_person',
          prop2: 'dishonesty_executed_person_quantity'
        },
        {
          factor: '账龄',
          weight:
            '账龄＜180天 0<br/>账龄180-365天 1<br/>账龄366-730天 2<br/>账龄＞730天 3',
          value: '100',
          score: 0,
          prop: 'account_age'
        },
        {
          factor: '可供保全/执行的车辆/机器/设备/货物',
          weight: '人工评估调整',
          value: '-',
          score: 0,
          prop: 'bq_fixed_assets'
        },
        {
          factor: '可供保全/执行的应收账款',
          weight: '人工评估调整',
          value: '-',
          score: 0,
          prop: 'bq_accounts_receivable'
        },
        {
          factor: '可供保全/执行的其他财产',
          weight: '人工评估调整',
          value: '-',
          score: 0,
          prop: 'bq_other_property'
        }
      ]
    }
  }
  //发送评估用户确认
  sendAssessment() {
    let parmas: any = {
      debtor_number: this.data.debtor_number,
      case_status: 2
    }
    let self: any = this
    self
      .$confirm('是否确认发送报价至用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        Api.updataCaseStatus(parmas).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.init()
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消发送'
        })
      })
  }
  //返回
  goBack() {
    this.$router.go(-1)
  }
  //跳转用户详情
  toInfo() {
    const self: any = this
    const mType: string = self.data.m_type
    const member_id: any = self.data.member_id
    if (mType === '律师') {
      self.$router.push({
        path: `/ordinary/lawterAdmin/${member_id}`
      })
    } else if (mType === '普通用户') {
      self.$router.push({
        path: `/ordinary/ordinaryAdmin/${member_id}`
      })
    } else {
      self.$router.push({
        path: `/ordinary/VipAdmin/${member_id}`
      })
    }
  }
}
