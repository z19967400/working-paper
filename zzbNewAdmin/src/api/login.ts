import Api from '@/utils/request'

export const login = (userName: string, password: string) => {
  let params = {
    phoneNumber: userName,
    user_code: password
  }
  return Api.login(params, 'GET')
}

export const getCode = (phoneNumber: string) => {
  return Api.getCode({ phoneNumber }, 'GET')
}

export const GetMyMenu = () => {
  return Api.GetMyMenu({}, 'GET')
}

//获取当前管理员角色
export const GetMyAdminRole = () => {
  return Api.GetMyAdminRole({}, 'GET')
}
