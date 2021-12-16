// settings.Data 参数类型
export interface SettingsData {
  pageName?: string
  roleList?: {
    loading: boolean
    dataType: Array<object>
    list: Array<object>
    totalize: number
  }
  processList?: {
    loading: boolean
    dataType: Array<object>
    list: Array<object>
    totalize: number
    options: Array<any>
    select: object
  }
  processEdit?: {
    fromIdList: Array<any>
  }
  fromList?: {
    loading: boolean
    dataType: Array<object>
    list: Array<object>
    totalize: number
    options: Array<any>
    select: object
    tabInfo?: boolean
  }
  menu?: {
    list: Array<any>
  }
}

// VUEX settings.State 参数类型
export interface SettingsState {
  data?: any
}

// GET_DATA_ASYN 接口参数类型
export interface SettingsOptions {
  roleOption?: {
    page: number
    limit: number
    real_name: string
    phone_no: string
    job_number: string
  }
  roleEdit?: {
    id: number
    role_name: string
    menu_ids: Array<number>
  }
  processList?: {}
  getCase?: {
    page: number
    limit: number
    flow_name: string
  }
  getRegion?: {
    page: number
    limit: number
    name: string
    a_type: number | null
    parent_id: number | null
  }
  regEdit?: {
    id: number
    name: string
    a_type: string | number
    parent_id: number | string
  }
  getCurrency?: {
    page: number
    limit: number
    currency_name: string
    currency_unit: string
  }
  currencyDelet?: {
    id: number
    currency_name: string
    currency_unit: string
  }
  processEdit?: {
    id: number
    flow_name: string
    flow_sort: string
    is_default: boolean
    data: Array<any>
  }
  getFrom?: {
    page: number
    limit: number
    form_name: string
  }
  fromEdit?: {
    id: number
    form_name: string
  }
  fromInfoEdit?: {
    name: string
    id: number
    form_id: number
    control_type: number | string
    tips_content: string
    option_content: string
    default_value: string
    is_required: number
  }
  getTips?: {
    page: number
    limit: number
    tips_name: string
    tips_code: string
  }
  tipsEdit?: {
    id: number
    tips_code: string
    tips_name: string
    tips_content: string
  }
  dictionaryEdit?: {
    id: number
    category_code: string
    category_name: string
  }
  getInfo?: {
    page: number
    limit: number
    category_code: string
    dic_content: string
  }
  getNews?: {
    page: number
    limit: number
    title: string
  }
  newEdit?: {
    id: number
    title: string
    img_url: string
    introduction: any
    news_url: string
  }
  getProble?: {
    page: number
    limit: number
    title: string
  }
  ProbleEdit?: {
    id: number
    title: string
    n_content: any
  }
}
