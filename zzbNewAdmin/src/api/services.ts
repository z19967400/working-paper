import Api from '@/utils/request'

//增值服务分页数据
export const GetQueryQrchivesPagingData = (params: any) => {
  return Api.GetQueryQrchivesPagingData(params, 'GET')
}
//删除增值服务委托
export const DeleteService = (params: any) => {
  return Api.DeleteService(params, 'GET')
}
//获取委托服务详情
export const GetServiceDetails = (params: any) => {
  return Api.GetServiceDetails(params, 'GET')
}
//增值服务执行进度更新
export const UpdateExecutingStates = (params: any) => {
  return Api.UpdateExecutingStates(params, 'POST')
}
//增值服务委托报价更新
export const UpdateQuotedprice = (params: any) => {
  return Api.UpdateQuotedprice(params, 'POST')
}
//增值服务后台备注更新
export const UpdateBackRemarks = (params: any) => {
  return Api.UpdateBackRemarks(params, 'POST')
}
//诉讼助资分页数据
export const GetLitigationFundingPagingData = (params: any) => {
  return Api.GetLitigationFundingPagingData(params, 'GET')
}
//保全保险分页
export const GetPreservationInsurancePagingData = (params: any) => {
  return Api.GetPreservationInsurancePagingData(params, 'GET')
}

//律师查档更新数据
export const UpdateQueryArchives = (params: any) => {
  return Api.UpdateQueryArchives(params, 'POST')
}
//更新保全保险
export const UpdatePreservationInsurance = (params: any) => {
  return Api.UpdatePreservationInsurance(params, 'POST')
}
//更新诉讼助资委托
export const UpdateLitigationFunding = (params: any) => {
  return Api.UpdateLitigationFunding(params, 'POST')
}
