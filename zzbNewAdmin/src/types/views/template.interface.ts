// index.Data 参数类型
export interface TemplateData {
  data?: {
    loading: boolean
    dataType: Array<object>
    list: Array<object>
    totalize: number
    options: Array<any>
    select: object
  }
}

// VUEX index.State 参数类型
export interface TemplateState {
  author?: string
}

// GET_DATA_ASYN 接口参数类型
export interface TemplateOptions {
  getWechat?: {
    page: number
    limit: number
    use_code: string
    name?: string
    title?: string
  }
  wechatEdit?: {
    id: number
    name?: string
    title?: string
    use_code?: string
    template_content?: string
    display_content?: string
    parameter?: string
    pdf_type?: string
    template_pdf_path?: string
  }
  excellEdit?: {
    id: number
    name: string
    creditor_states: number | string
    debt_type: string
    use_code: string
    template_path: string
    sheet: Array<any>
  }
  testOne?: {
    parameter_name: string | number
    parameter_value: string | number
    send_number: string | number
    template_use_code: string
  }
}
