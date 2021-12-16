const caseData: any = [
  {
    lable: '债务人企业名称',
    value: '',
    width: 1,
    type: 'Creditor_states_0',
    prop: 'debtor_name',
    required: true
  },
  {
    lable: '债务人姓名',
    value: '',
    width: 1,
    type: 'Creditor_states_1',
    prop: 'debtor_name',
    required: true
  },
  {
    lable: '欠款币种',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'currency_id',
    required: true
  },
  {
    lable: '债务人企业负责人姓名',
    value: '',
    width: 1,
    type: 'Creditor_states_0',
    prop: 'contact_person'
  },
  {
    lable: '债务人手机号码',
    value: '',
    width: 1,
    type: 'Creditor_states_1',
    prop: 'phone_number'
  },
  {
    lable: '欠款本金',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'arrears_principal',
    required: true
  },

  {
    lable: '债务人企业负责人手机号码',
    value: '',
    width: 1,
    type: 'Creditor_states_0',
    prop: 'phone_number'
  },
  {
    lable: '债务人身份证号码',
    value: '',
    width: 1,
    type: 'Creditor_states_1',
    prop: 'id_card_no',
    required: true
  },
  {
    lable: '违约金/利息/滞纳金',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'arrears_interest'
  },
  {
    lable: '债务人实际经营地址',
    value: '',
    width: 3,
    type: 'Creditor_states_0',
    prop: 'address_txt'
  },
  {
    lable: '债务人有效联系地址',
    value: '',
    width: 3,
    type: 'Creditor_states_1',
    prop: 'address_txt'
  },
  {
    lable: '约定付款日期',
    value: '',
    width: 1,
    type: 'Creditor_states',
    prop: 'agreed_payment_date'
  },
  {
    lable: '担保类型',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'guarantee_type',
    required: true
  },
  {
    lable: '债务人状态',
    value: '',
    width: 1,
    type: 'Creditor_states',
    prop: 'debtor_status',
    required: true
  },
  {
    lable: '最后一次催款日期（有证据证明）',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'confirmation_date'
  },
  {
    lable: '债务人财产线索',
    value: '',
    width: 3,
    type: 'Creditor_states',
    prop: 'property_clues',
    required: true
  },
  {
    lable: '债务人财产线索补充',
    value: '',
    width: 3,
    type: 'Creditor_states',
    prop: 'property_clues_bc'
  },
  {
    lable: '现有证据',
    value: '',
    width: 3,
    type: 'Creditor_states',
    prop: 'available_evidence',
    required: true
  },
  {
    lable: '其他证据',
    value: '',
    width: 3,
    type: 'Creditor_states',
    prop: 'other_evidence'
  },
  {
    lable: '欠款是否存在争议',
    value: '',
    width: 1,
    type: 'Creditor_states',
    prop: 'is_dispute',
    required: true
  },
  {
    lable: '案件管辖地区一',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'jurisdiction_01_txt'
  },
  {
    lable: '案件管辖地区二',
    value: '',
    width: 1,
    type: 'Creditor_states',
    prop: 'jurisdiction_02_txt'
  },
  {
    lable: '其它管辖地区',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'jurisdiction_03_txt'
  },
  {
    lable: '委托事项',
    value: '',
    width: 1,
    type: 'Creditor_states',
    prop: 'entrusted_matters',
    required: true
  },
  {
    lable: '其他委托',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'other_entrustment'
  },
  {
    lable: '债权人联系人姓名',
    value: '',
    width: 1,
    type: 'Creditor_states',
    prop: 'creditor_name',
    required: true
  },
  {
    lable: '债权人联系人电话',
    value: '',
    width: 2,
    type: 'Creditor_states',
    prop: 'creditor_telphone',
    required: true
  },
  {
    lable: '债权人联系人邮箱',
    value: '',
    width: 3,
    type: 'Creditor_states',
    prop: 'creditor_email',
    required: true
  },
  {
    lable: '备注',
    value: '',
    width: 3,
    type: 'Creditor_states',
    prop: 'f_remarks'
  }
]

const guarantee_types: any = {
  case0: [
    { currency_name: '保证', id: '保证' },
    { currency_name: '银行履约保函', id: '银行履约保函' },
    { currency_name: '抵押', id: '抵押' },
    { currency_name: '质押留置', id: '质押留置' },
    { currency_name: '无', id: '无' }
  ],
  case1: [
    { currency_name: '有', id: '有' },
    { currency_name: '无', id: '无' }
  ]
}

const debtor_statuss: any = {
  case0: [
    {
      currency_name: '存续（在营、开业、在册）',
      id: '存续（在营、开业、在册）'
    },
    { currency_name: '注销', id: '注销' }
  ],
  case1: [
    { currency_name: '正常', id: '正常' },
    { currency_name: '失联', id: '失联' }
  ]
}
const property_cluess: any = [
  { currency_name: '房产', id: '房产' },
  { currency_name: '车辆', id: '车辆' },
  { currency_name: '设备', id: '设备' },
  { currency_name: '货物', id: '货物' },
  { currency_name: '债务人的应收账款', id: '债务人的应收账款' },
  { currency_name: '其他资产', id: '其他资产' },
  { currency_name: '不详', id: '不详' }
]

const available_evidences: any = {
  case0: [
    { currency_name: '合同/协议/订单', id: '合同/协议/订单' },
    { currency_name: '发票', id: '发票' },
    {
      currency_name: '发货及物流凭证（运单等）、收货凭证',
      id: '发货及物流凭证（运单等）、收货凭证'
    },
    {
      currency_name: '对账凭证、付款计划书、付款承诺书',
      id: '对账凭证、付款计划书、付款承诺书'
    },
    { currency_name: '付款记录、催款通知记录', id: '付款记录、催款通知记录' },
    {
      currency_name: '电子证据（邮件、微信、录音录像等）',
      id: '电子证据（邮件、微信、录音录像等）'
    },
    {
      currency_name: '判决、仲裁、公证等司法文书',
      id: '判决、仲裁、公证等司法文书'
    }
  ],
  case1: [
    {
      currency_name: '合同、借条、借据、欠条、还款承诺书',
      id: '合同、借条、借据、欠条、还款承诺书'
    },
    { currency_name: '转账记录', id: '转账记录' },
    { currency_name: '催款记录', id: '催款记录' },
    {
      currency_name: '电子证据（邮件、微信、录音录像等）',
      id: '电子证据（邮件、微信、录音录像等）'
    }
  ]
}

const entrusted_matterss: any = [
  { currency_name: '全案委托', id: '全案委托' },
  { currency_name: '非诉催收', id: '非诉催收' },
  { currency_name: '财产保全', id: '财产保全' },
  { currency_name: '仲裁', id: '仲裁' },
  { currency_name: '一审', id: '一审' },
  { currency_name: '二审', id: '二审' },
  { currency_name: '强制执行', id: '强制执行' },
  { currency_name: '破产清算/重组', id: '破产清算/重组' },
  { currency_name: '再审', id: '再审' }
]
export {
  caseData,
  guarantee_types,
  debtor_statuss,
  property_cluess,
  available_evidences,
  entrusted_matterss
}
