const url = {
  getUserInfo: "/H5Member/GetLoginMemberDetails", //获取用户信息
  UserEdit:"/H5Member/UpdateMemberDetails", //编辑用户信息
  uploadFil:"/Upload/UploadFile", //上传文件
  GetMyCreditor:'/Creditor/GetMyCreditor', //获取当前会员的债权人信息
  getAllRegion:"/Region/GetAllRegion", //获取全部地区
  getAllCurrency:'/Currency/GetAllCurrency', //获取所有币种
  saveCCreditor:"/Creditor/SaveCreditor", //保存债权人信息
  Recognitiion:"/Image/Recognition", //证照识别
  CreateAILawyerLetter:"/AILawyerLetter/CreateAILawyerLetter", //创建AI律师函
  GetWeChatConfig:"/WechatTools/GetWeChatConfig", //获取微信配置
  GetOrderDetails:"/AILawyerLetter/GetOrderDetails", //获取订单详情
  getOpenId:'/WechatTools/GetOpenidByCode', //获取微信openid
  WeChatPay:"/WeChatPay/Pay", //微信支付
  getOrderList:'/AILawyerLetter/GetMyAILawyerLetter', //获取用户的AI律师函委托列表
  getOrderInfo: "/AILawyerLetter/GetAILawyerLetterDetails", //获取AI律师函委托详情
  OrderQuery: "/WeChatOrderQuery/OrderQuery", //查询订单支付状态
  StopOrder:"/AILawyerLetter/Stop", //撤销AI律师函
  updateCreditor: "/Creditor/UpdateCreditor", //更新债权人信息
  CreateCase:"/MemberCase/CreateCase",  //创建律师办案
  getLawyerCases:"/MemberCase/MyCaseList", //获取用户律师办案列表
  getLawyerCaseMatters:"/CaseProcess/GetCaseMatters", //获取律师办案案件事项
  GetLawyerCaseStatus:"/MemberCase/GetCaseLawyer", //律师端获取接案状态
  GetCaseCourt:"/CaseProcess/GetCaseCourt", //获取案件法院信息
  GetCaseMattersFromDetails:"/CaseProcess/GetCaseMattersFromDetails", //获取表单详情
  ContractNotice:"/CaseProcess/ContractNotice", //线上合同签署
  ContractSee:"/CaseProcess/ContractSee", //线上合同查看
  GetCaseDetails:"/CaseProcess/GetCaseDetails", //获取案件详情
  ServiceFeeSelection:"/MemberCase/ServiceFeeSelection", //案件服务费选择
  CreateQueryQrchives:"/ValueAddedServices/CreateQueryQrchives", //创建律师查档委托
  CreateLitigationFunding:"/ValueAddedServices/CreateLitigationFunding", //创建诉讼助资委托
  CreatePreservationInsurance:"/ValueAddedServices/CreatePreservationInsurance", //创建保全保险委托
  GetServicesPagingData:"/ValueAddedServices/GetServicesPagingData", //获取增值服务分页数据
  GetServiceDetails:"/ValueAddedServices/GetServiceDetails", //获取委托服务详情
  GetAddressDetails:"/Region/GetAddressDetails", //根据id 获取地区信息
  UrlClicksCount:"/LawyerCase/UrlClicksCount", //页面点击数增加
  GetLogisticsByDebtorNumber:'/AILawyerLetter/GetLogisticsByDebtorNumber', //根据委托编号获取物流信息
  GetTaskContentById:'/AILawyerLetter/GetTaskContentById', //获取AI律师函任务详情
  GenerateReport:'/AILawyerLetter/GenerateReport', //生成催收报告
  GetAILawyerLetterReport:'/AILawyerLetter/GetAILawyerLetterReport', //获取AI律师函催收报告
  GetQuotedPriceByDebtorNumber:'/MemberCase/GetQuotedPriceByDebtorNumber', //获取案件报价
  CustomerSelectQuotedPrice:'/MemberCase/CustomerSelectQuotedPrice',//用户选择服务费模式
  GetByid:'/tools/GetDocumentById' //获取文档内容
}

export default url
