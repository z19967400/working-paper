
const baseUrl = "https://wechat.debteehelper.com"
const requstUrl = {
  login: baseUrl + "/api/WechatFans/FansAuthorizedLogin", //登录授权
  getlawInfo: baseUrl + "/api/Llawyer/GetMemberLawyersByLogin", //获取律师认证信息
  saveLawData: baseUrl + "/api/Llawyer/SaveLawyersData", //律师认证信息保存
  getRegs: baseUrl + '/api/Region/GetRegionByTypeParentid', //获取地区
  upLoadFile: baseUrl + "/api/Upload/UploadFile", //文件上传
  getType: baseUrl + "/api/Dictionary/GetDictionaryByCategory", //获取后台字典
  getCaseList: baseUrl + "/api/LawyerCase/GetLawyerCase",//获取案件列表
  getCaseInfo: baseUrl + "/api/CaseProcess/GetCaseDetails", //获取案件详情
  receCase: baseUrl + "/api/LawyerCase/LawyerReceivesCase", //立即接案
  getCaseMatters: baseUrl + "/api/CaseProcess/GetCaseMatters", //获取案件进程
  getCaseCourt: baseUrl + "/api/CaseProcess/GetCaseCourt", //获取案件法官信息
  updataCourt: baseUrl + "/api/CaseProcess/UpdateCaseCourt", //更新法官信息
  getCaseFromDetails: baseUrl + "/api/CaseProcess/GetCaseMattersFromDetails", //获取案件事项
  lawyerSaveMatterForm: baseUrl + "/api/LawyerCase/SaveMattersfrom", //律师提交案件进程
  getCaseType: baseUrl + "/api/LawyerCase/GetLawyerCaseStatus", //获取案件接案状态
  getUserInfo: baseUrl + "/api/WechatFans/GetMemberInfo", //获取用户信息
  GetAllCurrency: baseUrl + "/api/Currency/GetAllCurrency", //获取所有币种
  ContractNotice: baseUrl + '/api/CaseProcess/ContractNotice', //发送合同通知短信
  getPhoneCode: baseUrl + "/api/SendSMS/SendSMSCode", //获取短信验证码
  saveUserPhone: baseUrl + "/api/WechatFans/SavePhoneNumber", //保会员手机号码
  getDocument: baseUrl + "/api/tools/GetDocumentById", //获取文档内容
  GetCaseQuotedPrice: baseUrl + "/api/CaseProcess/GetCaseQuotedPrice", //获取案件报价
  GetFinancialRecords: baseUrl + "/api/Finance/GetFinancialRecords", //获取案件请款记录
  AddCaseFinance: baseUrl + "/api/Finance/AddCaseFinance", //添加请款记录
  GetInvoiceAndTicketAddress: baseUrl + "/api/Finance/GetInvoiceAndTicketAddress", //获取用户发票和收票信息
  AddInvoiceAndTicketAddress: baseUrl + "/api/Finance/AddInvoiceAndTicketAddress", //新增编辑用户发票收票信息
  AddCollectionInfo: baseUrl + '/api/Finance/AddCollectionInfo' //新增编辑用户收票信息
}
export {
  requstUrl
}