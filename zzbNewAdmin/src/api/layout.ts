import Api from '@/utils/request'

export const getData = () => {
  return Api.getData()
}

export const textAjax = (parmas: any) => {
  return Api.textAjax(parmas, 'POST')
}
