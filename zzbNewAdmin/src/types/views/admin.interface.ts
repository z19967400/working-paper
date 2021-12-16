// User.Data 参数类型
export interface AdminData {
  AdminList?: {
    loading: boolean
    visible?: boolean
    dataType: Array<object>
    list: Array<object>
    select: object
    options: Array<object>
    totalize: number
  }
  rules?: any
}

// VUEX User.State 参数类型
export interface AdminState {
  author?: string
}
// GET_DATA_ASYN 接口参数类型
export interface AdminOptions {
  AdminList?: {
    page: number
    limit: number
    real_name: string
    phone_no: string
    job_number: string
  }
  adminEdit?: {
    id: number
    real_name: string
    phone_no: string
    job_number: string
    role_id: string | number
    head_img: string | null
    email: string
  }
}
