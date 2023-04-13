import Api from '@/utils/request'
//获取后台统计数据 数字部分
export const GetStatisticsAdminData = () => {
  return Api.GetStatisticsAdminData({}, 'GET')
}
//获取待办工作
export const GetPendingWork = () => {
  return Api.GetPendingWork({}, 'GET')
}
//获取管理员需要审核的报价
export const GetCaseQuotedPriceByAdmin = () => {
  return Api.GetCaseQuotedPriceByAdmin({}, 'GET')
}
//获取后台统计 图表部分
export const GetStatisticsAdminChartsData = () => {
  return Api.GetStatisticsAdminChartsData({}, 'GET')
}
//获取待办列表
export const GetToDoList = () => {
  return Api.GetToDoList({}, 'GET')
}
//获取当前管理员角色
export const GetMyAdminRole = () => {
  return Api.GetMyAdminRole({}, 'GET')
}
//获取债权人信息
export const getCreditorInfoByid = (id: number) => {
  return Api.getCreditorInfoByid({ id }, 'GET')
}
//获取授权书更换记录
export const GetAllAuthorizationFileRecord = (id: number) => {
  return Api.GetAllAuthorizationFileRecord({ creditor_admin_id: id }, 'GET')
}
//债权人管理员审核
export const CreditorAdminAudit = (params: any) => {
  return Api.CreditorAdminAudit(params, 'POST')
}
