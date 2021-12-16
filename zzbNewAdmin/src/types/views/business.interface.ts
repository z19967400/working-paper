// User.Data 参数类型
export interface businessData {}

// VUEX User.State 参数类型
export interface businessState {}
// GET_DATA_ASYN 接口参数类型
export interface businessOptions {
  getCreditor?: {
    page: number
    limit: number
    creditor_name: string
    phone_number: string
    agent_name: string
  }
  getEntrusted?: {
    page: number
    limit: number
    batch_no: string
    member_name: string
    member_vip_admin_name: string
    creditor_name: string
    collection_scene: string
    send_type: string
    audit_status: number | string
    execution_progress: string
    debtor_name: string
  }
  creditorEdit?: {
    id: number
    member_id: number
    member_vip_admin_id: number
    creditor_name: string
    creditor_type: string
    phone_number: string
    email: string
    country: string
    province: string
    city: string
    county: string
    detailed_address: string
    license_no: string
    license_img_url: string
    audit_status: string | number
    audit_feedback: string
    back_remarks: string
  }
  getDebtor?: {
    page: number
    limit: number
    entrust_type: number | string
    debtor_no: string | number
    batch_no: string
    member_name: string
    debtor_name: string
    debtor_type: string
    contact_person: string
    phone_number: string
    email: string
    address_txt: string
    currency_id: number
    creditor_name: string
    creditor_telphone: string
    creditor_email: string
  }
  getFeedback?: {
    page: number
    limit: number
    debtor_name: string
    feedback_source: string
    real_name: string
    member_ip: string
    member_phone: string
  }
  addFeedback?: {
    id: number
    debtor_id: number
    feedback_source: string
    customer_service_admin_id: number
    member_remarks: string
    member_ip: string
    member_phone: string
    back_remarks: string
    data: any
  }
  MemberCollectMoneyEdit?: {
    id: number | string
    idmember_id: number | string
    idmember_vip_account_id: number | string
    idmember_vip_admin_id: number | string
    payment_channel_name: string
    contacts_name: string
    contacts_phone: string
    contacts_email: string
    alipay_account: string
    payee_name: string
    bank_name: string
    bank_account: string
  }
  getMemberCollectMoney?: {
    page: number
    limit: number
    name: string
    m_type: string
    account_name: string
    admin_name: string
    payment_channel_name: string
    contacts_name: string
    contacts_phone: string
    contacts_email: string
    alipay_account: string
    payee_name: string
    bank_name: string
    bank_account: string
  }
}
