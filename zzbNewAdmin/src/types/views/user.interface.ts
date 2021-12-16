// index.Data 参数类型
export interface UserData {}

// VUEX index.State 参数类型
export interface UserState {
  author?: string
}

// GET_DATA_ASYN 接口参数类型
export interface UserOptions {
  getOrdinary?: {
    page: number
    limit: number
    name: string
    phone_number: string
  }
  ordinaryUpState?: {
    id: number
    up_state: number
  }
  ordinaryEdit?: {}
  getVIP?: {
    page: number
    limit: number
    corporate_name: string //公司名称
    contacts_name: string //联系人名称
    phone_number: string //手机号
  }
  addVip?: {
    id: number
    member_id: number
    corporate_name: string
    contacts_name: string
    phone_number: string
    email: string
    debt_type: string
    demand_quantity: string
    back_remarks: string
  }
  vipEditDebt_type?: {
    member_vip_id: number
    scenes: any
  }
  vipEditPaySet?: {
    id: number
    member_vip_id: number
    is_postpaid: number
    standard_ai_price: number | string
    electron_ai_price: number | string
  }
  getVipRelationship?: {
    page: number
    limit: number
    account_name: string
  }
  vipSubAccountEdit?: {
    id: number
    member_vip_account_id: string
    head_img: string
    authorization_img: string
    admin_phone_number: string
    admin_email: string
    admin_account: string
    id_number: string
    is_super: string
    is_account_admin: string
    audit_status: string
    audit_feedback: string
  }
  creditorEdit?: {
    member_id: number
    member_vip_admin_id: number
    creditor_name: string
    creditor_type: string | number
    phone_number: string
    email: string
    country: number
    province: number
    city: number
    county: number
    detailed_address: string
    license_no: string
    license_img_url: string
    audit_status: string | number
    audit_feedback: string
    back_remarks: string
  }
}
