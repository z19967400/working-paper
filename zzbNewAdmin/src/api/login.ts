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
