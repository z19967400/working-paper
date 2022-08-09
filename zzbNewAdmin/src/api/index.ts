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
