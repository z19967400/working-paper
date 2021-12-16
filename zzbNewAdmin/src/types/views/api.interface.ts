// Api.Data 参数类型
export interface ApiData {
  params: {
    page: number
    limit: number
    api_type: string
    api_name: string
    api_domain: string
    api_path: string
    request_way: string
  }
  select: object
  apiList: Array<object>
  options: Array<object>
  loading: boolean
  totalize: number
  dataType: Array<object>
  webData?: {
    webList: Array<object>
    tableType: Array<object>
    loading: boolean
    options: Array<object>
    totalize: number
    select: object
  }
  develManage?: {
    list: Array<any>
    loading: boolean
    options: Array<any>
    select: object
    totalize: string
  }
  develEdit?: {
    loading: boolean
  }
  //
}

// VUEX Api.State 参数类型
export interface ApiState {
  //
}

// Api 接口参数类型
export interface ApiOptions {
  params?: {
    page: number
    limit: number
    api_type: string
    api_name: string
    api_domain: string
    api_path: string
  }
  edit?: {
    api_type: string | null
    api_name: string
    api_domain: string
    api_path: string
    version_number: string
    api_info: any
    request_way: string
    id: number
  }
  editor?: any // 富文本编辑器对象
  content?: any // 富文本编辑器默认内容
  editorOption?: {
    //  富文本编辑器配置
    modules?: {
      toolbar: any
    }
    theme?: string
    placeholder?: string
  }
  class_three_id?: string
  menu?: Array<any>
  rules?: any
  webParams?: {
    page: number
    limit: number
    view_type: string
    view_name: string
    view_domain: string
    view_path: string
  }
  submitType?: boolean
  develManage?: {
    project_name: string
    module_name: string
    version_number: string
    priority: string
    total_progress: string
  }
  develEdit?: {
    id: number
    function_name: string
    priority: string
    project_name: string
    version_number: string
    module_name: string
    front_end: string
    back_end: string
    release_time: Date | null
    front_end_progress: string
    back_end_progress: string
    function_description: string
    total_progress: string
  }
}
