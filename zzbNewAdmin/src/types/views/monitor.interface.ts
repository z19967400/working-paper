// settings.Data 参数类型
export interface monitorData {
  data?: {
    loading: boolean
    dataType: Array<object>
    list: Array<object>
    totalize: number
    options: Array<any>
    select: object
  }
}

// VUEX settings.State 参数类型
export interface monitorState {
  data?: any
}

// GET_DATA_ASYN 接口参数类型
export interface monitorOptions {
  getSever?: {
    page: number
    limit: number
    task_code: string
    task_name: string
  }
  severEdit?: {
    id: number
    task_name: string
    task_code: string
  }
  getUserLogs?: {
    page: number
    limit: number
    member_type: string
    name: string
    url_name: string
    start_time: string
    end_time: string
  }
  getStaffLog?: {
    page: number
    limit: number
    url_type: string
    real_name: string
    url_name: string
    start_time: string
    end_time: string
  }
  queueEdit?: {
    id: number
    task_name: string
    task_code: string
    task_group: string
    task_describe: string
  }
  getLogs: {
    page: number
    limit: number
    name: string
    business_type: string | number
    relation_number: string
    send_number: string
    execution_status: number
    start_time: string
    end_time: string
  }
}
