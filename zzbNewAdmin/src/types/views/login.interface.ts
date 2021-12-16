// login.Data 参数类型
export interface LoginData {
  name: string
  ruleForm: {
    userName: string
    passWord: string
  }
  rules: {
    userName: [{ validator: object; trigger: string }]
    passWord: [{ validator: object; trigger: string }]
  }
  login: boolean
}

// VUEX login.State 参数类型
export interface LoginState {
  author: string
  token: boolean | string
  userName: string | false
  headImg: string | false
}

// GET_DATA_ASYN 接口参数类型
export interface DataOptions {
  userName: string
  passWord: string
}
