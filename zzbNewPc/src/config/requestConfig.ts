export default {
  getData: "/mock/5c09ca373601b6783189502a/example/mock", // 随机数据 来自 easy mock
  login: "/api/pt/login/Admin_Login", //登录
  SendLawyersLetter: "/api/pt/Dictionary/Lawyerletter", // 发律师函
  getTableData: "/api/pt/Creditor/GetCreditorList", // 选择债权人弹框列表
  getTableData2: "/api/pt/CreditorV2/GetAllCreditorV2List", //获取所有债权人及对应授权状态
  creditorInsert: "/api/pt/Creditor/UpdateCreditor", //债权人修改
  afterTest: "/api/pt/tools/test", // 上传表格校验-返回
  getTemplateType: "/api/pt/tools/GetExcelPath", // 根据债务人类别获取下载模板所需的路径
  AILawyerLetterInsert: "/api/pt/AILawyerLetter/SaveAILawyer", //ai律师函修改
  sendTextVal: "/api/pt/Tools/Verify", // 发送后台验证
  getCreditorStates: "/api/pt/tools/GetType", // 获取债权人列表
  creditorGetPaging: "/api/pt/Creditor/GetCreditorList", //债权人列表
  getBill: "/api/pt/Bill/GetPaging", //获取账单列表
  getBillInfo: "/api/pt/Bill/GetAdmin", //获取账单详情
  getDetails: "/api/pt/pay/GetPaging", //获取收支列表
  getInformation: "/api/pt/Finance/GetPaging", //获取发票信息列表
  ticketCollection: "/api/pt/Finance/GetPaging_address", //获取收票信息列表
  getCollection: "/api/pt/CollectMoney/GetAllCollectMoney", //收款通道列表
  collectionDelete: "/api/pt//VipMember/DeleteCollectionAccountById", //收款信息删除
  addCollection: "/api/pt/CollectMoney/UpdateCollectMoney", //收款通道编辑/新增
  getCollectInfo: "/api/pt/MemberCollectMoney/GetByid", //获取收款通道详情
  getshoukuanTableData: "/api/pt/VipMember/GetCollectionAccountList", //获取收款信息列表
  getpaygetDetails: "/api/pt/pay/GetDetails", //收支详情
  getAddress: "/api/pt/Tools/GetAddress", //地区练级选择器
  getcreditor: "/api/pt/Creditor/GetCreditorInfoByIdV2", //获取债权人详情
  addBill: "/api/pt/Bill/ApplyBill", //申请开票
  addTicket: "/api/pt/Finance/Insert_address", //添加收票地址
  invoiceEdit: "/api/pt/Finance/Insert", //发票添加/修改
  debtorGetPaging: "/api/pt/Debtor/GetPaging", //债务人
  getAILawyerPaging: "/api/pt/AILawyerLetter/AILawyerPagingData", //委托管理
  getAdmin: "/api/pt/AILawyerLetter/GetAILawyerDetails", //委托详情
  getInvoiceInfo: "/api/pt/Finance/GetByid", //获取发票详情
  invoiceDelete: "/api/pt/Finance/Delete", //发票删除
  getTicketInfo: "/api/pt/Finance/GetByid_address", //获取收票地址详情
  ticketDelete: "/api/pt/Finance/Delete_address", //收票地址删除
  getCollectionInfo: "/api/pt/CollectMoney/GetCollectMoneyById", //获取收款通道详情
  deletecreditor: "/api/pt/Creditor/DeleteCreditorByid", //债权人删除
  addgetmaney: "/api/pt/VipMember/UpdateCollectionAccount", //新增收款信息
  getDetailedInfo: "/api/pt/pay/GetDetails", //获取收支明细详情
  getTicketDown: "/api/pt/Finance/GetTicketAddressList", //获取收票地址下拉
  getInvoiceDown: "/api/pt/Finance/GetInvoiceList", //获取发票下拉
  getSmsInfo: "/api/pt/AILawyerLetter/GetAILawyerTaskContent", //查看短信发送详情
  // getPhoneInfo: "/api/pt/LogsSel/GetSel_phone", //查看电话详情
  getEmail: "/api/pt/AILawyerLetter/GetAILawyerLogistics", //获取ems物流信息
  getLawyerInfo: "/api/pt/LogsSel/GetSel_lawyer_letter", //获取律师函详情
  Alipay: "/api/zf/AliNativePay/NativePay", //支付宝支付
  WeChat: "/api/zf/WeChatNativePay/NativePay", //微信支付
  WeChatQuery: "/api/zf/WeChatOrderQuery/OrderQuery", //微信支付查询结果
  AlipayQuery: "/api/zf/AliOrderQuery/OrderQuery", //支付宝支付查询结果
  AfterPay: "/api/zf/AfterPay/FirstRushAfterPay", //先催后付
  UnionPay: "/api/zf/AfterPay/BankTransfer", //对公转账
  getDebtFeadback: "/api/pt/Feedback/Getdetails", //获取债务人反馈详情
  addFeadBack: "/api/pt/Feedback/Insert", //新增债务人反馈
  establishCase: "/api/pt/Cases/CreateCases", //线下律师催创建案件
  getCaseList: "/api/pt/Cases/GetCasePagingData", //获取线下案件列表
  getCaseInfo: "/api/pt/Cases/GetCaseDetails", //获取线下律师办案案件详情
  getCasePross: "/api/pt/CaseProcess/GetCaseProcess", //获取案件办案进度
  getPaySet: "/api/pt/VipMember/GetPaySet", //获取支付价格设置
  getPaysList: "/api/pt/AILawyerLetter/GetUnpaidAILawyer", //获取待支付列表
  GetHomeData: "/api/pt/Home/GetHomeData", //获取首页数据
  SignNotice: "/api/pt/CaseProcess/ContractNotice", //获取签署合同通知短信
  getNoticeInfo: "/api/pt/CaseProcess/ContractSee", //获取线上签署合同详情
  getProcessInfo: "/api/pt/CaseProcess/GetCaseMattersFromDetails", //获取进程详情
  PostRecognition: "/api/pt/Tools/Recognition", //债权人证照识别
  getCurrency: "/api/pt/Tools/GetAllCurrency", //获取所有币种
  serviceFeeSelection: "/api/pt/Cases/ServiceFeeSelection", //案件确认服务费模式
  stopAiLetter: "/api/pt/AILawyerLetter/Stop", //ai律师函停止
  SendTransfer: "/api/pt/NoticeSend/SendTransferPaymentInformation", //对公转账支付通知
  AIlawLetterDelete: "/api/pt/AILawyerLetter/DeleteAILawyerLetter", //AI律师函待支付订单删除
  getAccountList: "/api/pt/VipMember/GetAccountList", //获取账户列表
  getAccountAdmins: "/api/pt/VipMember/GetAccountAdmin", //获取账户下所有管理员
  UpdatAdmin: "/api/pt/VipMember/UpdateAdmin", //更新管理员
  getAccountCreditors: "/api/pt/Creditor/GetAllCreditorByVipId", //获取账户下所有债权人
  getAdminCreaditors: "/api/pt/Creditor/GetCreditorByAdminId", // 获取管理员设置的债权人
  setCreditorAdmin: "/api/pt/Creditor/SetCreditorAdmin", //设置管理员的债权人
  deleteCreditorAdmin: "/api/pt/Creditor/DeleteCreditorAdmin", //删除管理员的债权人
  deleteAccountAmind: "/api/pt/VipMember/DeleteAdmin", //删除账户下的管理员
  addAccount: "/api/pt/VipMember/UpdateAccount", //添加大客户账户
  deleteAccoundt: "/api/pt/VipMember/DeleteAccount", //删除账户
  GetAILawyerLetterReport: "/api/pt/AILawyerLetter/GetAILawyerLetterReport", //获取AI律师函催收报告
  GenerateReport: "/api/pt/AILawyerLetter/GenerateReport", //生成催收报告
  AddCreditor: "/api/pt/CreditorV2/AddCreditor", //新增债权人
  GetAdminList: "/api/pt/VipMember/GetAdminList", //获取管理员列表
  CreditorAdminSet: "/api/pt/Creditor/CreditorAdminSet", //设置管理员
  GetCreditorListV2: "/api/pt/Creditor/GetCreditorListV2", //获取管理员管理的债权人列表
  AddAdmin: "/api/pt/VipMember/AddAdmin", //新增管理员
  getAdminInfo: "/api/pt/VipMember/GetAdminDetails", //获取管理员信息
  AddService: "/api/pt/Service/AddService", //查档诉讼保险等提交
  GetCreditorAdmin: "/api/pt/CreditorV2/GetCreditorAdmin", //获取所有债权人及对应管理员
  DeleteCreditorAdminById: "/api/pt/CreditorV2/DeleteCreditorAdminById", //删除授权管理员
  DeleteCreditorById: "/api/pt/CreditorV2/DeleteCreditorById", //删除债权人
  GetAllAdmin: "/api/pt/CreditorV2/GetAllAdmin", //获取管理员列表
  AddCreditorAdmin: "/api/pt/CreditorV2/AddCreditorAdmin", //新增授权管理员
  UpdateAdmin: "/api/pt/CreditorV2/UpdateAdmin", //编辑管理员信息
  CreateQueryQrchives: "/api/pt/ValueAddedServices/CreateQueryQrchives", //创建律师查档委托
  CreateLitigationFunding: "/api/pt/ValueAddedServices/CreateLitigationFunding", //创建诉讼助资委托
  CreatePreservationInsurance:
    "/api/pt/ValueAddedServices/CreatePreservationInsurance", //创建保全保险委托
  GetQueryQrchivesPagingData:
    "/api/pt/ValueAddedServices/GetQueryQrchivesPagingData", //律师查档分页数据
  GetPreservationInsurancePagingData:
    "/api/pt/ValueAddedServices/GetPreservationInsurancePagingData", //保全保险分页数据
  GetLitigationFundingPagingData:
    "/api/pt/ValueAddedServices/GetLitigationFundingPagingData", //诉讼助资分页数据
  GetAddressDetails: "/api/pt/Tools/GetAddressDetails", //根据id 获取地区信息
  DeleteService: "/api/pt/ValueAddedServices/DeleteService", //删除增值服务委托
  GetServiceDetails: "/api/pt/ValueAddedServices/GetServiceDetails", //获取委托服务详情
  AddAuthorization: "/api/pt/CreditorV2/AddAuthorization", //通过新增授权书新增授权管理员
  GetQuotedPriceByDebtorNumber: "/api/pt/Cases/GetQuotedPriceByDebtorNumber", //获取案件报价
  CustomerSelectQuotedPrice: "/api/pt/Cases/CustomerSelectQuotedPrice", //用户选择服务费模式
  VerifyAccountName: "/api/pt/VipMember/VerifyAccountName", //验证登录名是否重复
  VerifyPhoneNumber: "/api/pt/VipMember/VerifyPhoneNumber", //验证手机号是否重复
  UpdateAccountInfo: "/api/pt/VipMember/UpdateAccountInfo", //修改账户信息
  CreditCode: "/api/pt/CreditorV2/GetCreditorBySocialCreditCode", //通过统一信用代码获取债权人
  VerifyAdminInfo: "/api/pt/VipMember/VerifyAdminInfo", //验证管理员信息是否重复
  GetAdminByNotCreditorId: "/api/pt/CreditorV2/GetAdminByNotCreditorId", //获取未授权指定债权人的管理员
  GetAllCreditorListReverseOrder:
    "/api/pt/CreditorV2/GetAllCreditorListReverseOrder", //获取所有债权人及对应授权状态
  GetBillPagingData: "/api/pt/Finance/GetBillPagingData", //获取账单分页信息
  GetBillDetailsByBillNumber: "/api/pt/Finance/GetBillDetailsByBillNumber", //根据账单编号获取账单信息
  GetCasePayRecordsPagingData: "/api/pt/Finance/GetCasePayRecordsPagingData", //获取律师办案法律服务明细
  GetAIPayRecordsPagingData: "/api/pt/Finance/GetAIPayRecordsPagingData", //获取AI律师函服务明细
  UpdateInvoice: "/api/pt/Finance/UpdateInvoice", //新增编辑发票信息
  SelectBillInvoice: "/api/pt/Finance/SelectBillInvoice", //选择账单发票
  SelectBillTicketAddress: "/api/pt/Finance/SelectBillTicketAddress", //选择收票地址信息
  UpdateTicketAddress: "/api/pt/Finance/UpdateTicketAddress", //新增更新收票信息
  ApplyInvoicing: "api/pt/Finance/ApplyInvoicing", //账单申请开票
  DeleteInvoice: "api/pt/Finance/DeleteInvoice", //删除发票
  DeleteTicketAddress: "api/pt/Finance/DeleteTicketAddress", //删除收票
  CreateCasesByAI: "api/pt/Cases/CreateCasesByAI", //AI律师函转律师办案
  ExportExcel: "/api/pt/Cases/ExportExcel", //导出案件数据
  PresentPay: "/api/zf/AfterPay/PresentPay", //赠送支付
  GetAuthorizationTimes: "/api/pt/CreditorV2/GetAuthorizationTimes", //获取管理员授权次数
  UpdateCreditorAdmin: "/api/pt/CreditorV2/UpdateCreditorAdmin", //更新债权人管理员信息
  VerifyAdminInfoForUpdate: "/api/pt/CreditorV2/VerifyAdminInfoForUpdate", //更新管理员时验证手机号或登录名
  UpdateCreditor: "/api/pt/CreditorV2/UpdateCreditor", //更新债权人信息
  GetPlatformNotice: "/api/pt/VipMember/GetPlatformNotice", //获取通知
  UpdateDebtorInfo: "/api/pt/AILawyerLetter/UpdateDebtorInfo", //更新债务人信息
  UpdateCollectionAccount: "/api/pt/AILawyerLetter/UpdateCollectionAccount", //更新收款信息
  UpdateDebtordetails: "/api/pt/AILawyerLetter/UpdateDebtordetails", //更新债务明细信息
  SendAuditNotice: "/api/pt/AILawyerLetter/SendAuditNotice" //发送再次审核通知
};
