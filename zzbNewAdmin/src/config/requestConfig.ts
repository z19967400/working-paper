export default {
  getData: '/mock/5c09ca373601b6783189502a/example/mock', // 随机数据 来自 easy mock
  login: '/Login/CodeLogin', //登录
  getCode: '/Login/SendSMSCode', //获取手机验证码
  getApi: '/docapi/GetPaging', //获取接口列表
  addApi: '/docapi/insert', //添加修改接口
  apiDelete: '/docapi/Delete', //删除接口
  apiGetByid: '/docapi/GetByid', //获取接口详情
  getWebList: '/docview/GetPaging', //获取页面列表
  webDelete: '/docview/Delete', //页面删除
  addWeb: '/docview/Insert', //页面新增
  getWebInfo: '/docview/GetByid', //页面详情
  getProgress: '/docprogress/GetAll', //获取任务列表
  addProgress: '/docprogress/Insert', //新增开发任务
  deleteProgress: '/docprogress/Delete', //任务删除
  getProgressInfo: '/docprogress/GetByid', //获取开发任务详情
  getAdmin: '/admin/getpaging', //获取员工列表
  adminEdit: '/admin/insert', //员工添加、修改
  adminDelet: '/admin/delete', //员工删除
  getAdminInfo: '/admin/getbyid', //获取员工详情
  getRoles: '/adminrole/GetAll', //获取角色列表
  GetTwoandThree: '/adminmenu/GetTwoandThree', //获取页面内菜单
  getMenu: '/adminmenu/GetAll', //获取菜单设置列表
  RoleEdit: '/adminrole/insert', //角色权限修改
  RoleDelet: '/adminrole/delete', //角色删除
  getRoleInfo: '/adminrole/GetmenuByrole_id', //获取角色权限详情
  getSeverList: '/Taskqueue/GetPaging', //获取服务列表
  severDelete: '/Taskqueue/delete', //服务删除
  getSeverInfo: '/Taskqueue/getbyid', //获取服务详情
  severEdit: '/Taskqueue/insert', //服务修改
  getCaseList: '/dynamicsflowhandlecase/GetPaging', //获取办案流程
  caseDelete: '/dynamicsflowhandlecase/delete', //流程删除
  getCaseInfo: '/dynamicsflowhandlecase/getbyid', //获取办案详情
  caseEdit: '/dynamicsflowhandlecase/insert', //案件流程修改
  getRegion: '/Areamanagement/getpaging', //获取地区
  regionDelete: '/Areamanagement/delete', //地区删除
  regionEdit: '/Areamanagement/insert', //地区修改
  getCurrency: '/Currency/CurrencyPullDown', //获取币种列表
  currencyDelete: '/currency/delete', //币种删除
  currencyEdit: '/currency/insert', //币种修改
  getDictionaries: '/dictionary/dictionary/GetType', //获取所有字典
  getFrom: '/dynamicsform/getpaging', //获取所有动态表单
  getSelectFrom: '/dynamicsform/getall', //表单设置获取所有表单(无参)
  fromDelet: '/Dynamicsform/delete', //表单删除
  getFromInfo: '/Dynamicsform/GetdetailsPaging', //获取动态表单详情
  fromEdit: '/Dynamicsform/insert', //表单新增修改
  fromInfoDelete: '/Dynamicsform/Deletedetails', //表单详情删除
  fromInfoEdit: '/Dynamicsform/insert', //动态表单详情修改
  getTips: '/PlatformTips/GetPaging', //获取提示列表
  tipsDelet: '/PlatformTips/Delete', //提示删除
  tipsEdit: '/PlatformTips/Insert', //提示增，改
  getAllDictionary: '/dictionary/GetPaging_category', //获取所有字典类别
  dictionaryInsert: '/dictionary/insert', //字典类别修改
  dictionaryDelete: '/dictionary/delete', //字典类别删除
  getDicInfoList: '/dictionary/GetPaging', //获取字典内容分页
  dicInfoEdit: '/dictionary/Insert_details', //字典内容添加修改
  dicInfoDetails: '/dictionary/Update_details', //字典内容启用
  dicInfoDelete: '/dictionary/Delete_deteils', //字典内容删除
  getUserLogs: '/Logmember/getpaging', //获取用户操作日志
  getStaffLogs: '/Logadmin/getpaging', //获取员工操作日志
  getQueueList: '/TaskTiming/GetPaging', //获取队列列表
  QueueEdit: '/TaskTiming/insert', //队列修改
  QueueDelete: '/TaskTiming/delete', //队列删除
  getQueueInfo: '/TaskTiming/getbyid', //获取队列详情
  getWechatModel: '/TemplateWechatMessage/Getpaging', //获取微信模版
  WechatModelDelet: '/TemplateWechatMessage/delete', //微信模版删除
  WechatModelEdit: '/TemplateWechatMessage/insert', //微信模版修改
  getphoneModel: '/TemplateTelephone/Getpaging', //获取电话模版
  phoneModelDelet: '/TemplateTelephone/delete', //电话模版删除
  phoneModelEdit: '/TemplateTelephone/insert', //电话模版修改
  getsmsModel: '/Templatesms/Getpaging', //获取sms模版
  smsModelDelet: '/Templatesms/delete', //sms模版删除
  smsModelEdit: '/TemplateSms/insert', //sms模版修改
  getPdfModel: '/Templatepdf/Getpaging', //获取pdf模版
  PdfModelDelet: '/TemplatePdf/delete', //pdf模版删除
  PdfModelEdit: '/TemplatePdf/insert', //pdf模版修改
  getemailModel: '/TemplateEmail/Getpaging', //获取email模版
  emailModelDelet: '/TemplateEmail/delete', //email模版删除
  emailModelEdit: '/TemplateEmail/insert', //email模版修改
  getExcellModel: '/TemplateExcel/GetPaging', //获取Excel模版
  getExcellInfo: '/TemplateExcel/GetByid', //Excel模版修改
  ExcellModelDelet: '/TemplateExcel/delete', //Excel模版删除
  ExcellModelEdit: '/TemplateExcel/insert', //Excel模版修改
  verificationExcel: '/TemplateExcel/Test', //Excel模板验证
  getEmailLogs: '/logs/GetPagingemail', //获取email日志
  getSmsLogs: '/logs/GetPagingsms', //获取sms日志
  getPhoneLogs: '/logs/GetPagingphone', //获取phone日志
  getPdfLogs: '/logs/GetPagingpdf', //获取pdf生成日志
  getNews: '/SiteNews/getpaging', //获取新闻
  newDelete: '/SiteNews/delete', //新闻删除
  newEdit: '/SiteNews/Insert', //新闻编辑修改
  getProblem: '/SiteFAQ/Getpaging', //获取常见问题
  problemDelete: '/SiteFAQ/Delete', //常见问题删除
  problemEdit: '/SiteFAQ/Insert', //常见问题编辑修改
  testSms: '/logsinsert/Insert_Sms', //测试短信模板
  testPhone: '/logsinsert/Insert_Phone', //测试电话模板
  testEmail: '/logsinsert/Insert_Email', //测试邮件模板
  getSmsCode: '/Template/GetSms', //获取短信测试所需参数
  getPhoneCode: '/Template/GetPhone', //获取电话模板测试所需参数
  getEmailCode: '/Template/GetEmail', //获取邮件模板测试所需参数
  getExcel: '/Template/GetExcel', //获取excel模板
  getFileList: '/docrecord/GetPaging', //获取文档列表
  fileEdit: '/docrecord/Insert', //文档编辑修改
  fileDelete: '/docrecord/Delete', //文档删除
  getOrdinary: '/MemberV2/GetMemberPagingData', //获取注册用户列表
  ordinaryDelete: '/MemberV2/DeleteMember', //删除注册用户
  getDinaryInfo: '/member/GetByid', //获取普通会员详情
  getDinarycreditor: '/Creditor/GetCreditorByMemberId', //获取普通会员债权人数据
  getDinaryBasicInfo: '/MemberV2/GetMemberDetails', //获取用户详情
  dinaryBaseicInfoEdit: '/MemberV2/UpdateMemberBasicInfo', //用户基础信息修改
  getDinaryVipList: '/MemberVip/GetVipByMemberId', //获取普通会员的VIP列表
  dinaryUpState: '/member/UpState', //普通会员启用或禁用
  dinaryEdit: '/Member/UpdateMember', //普通会员新增修改
  getAddress: '/AreaManagement/GetAllByid', //获取地址列表
  getUserAdmin: '/member/Getadmin', //获取会员管理信息
  getVipUser: '/MemberV2/GetMemberVipApplyPagingData', //获取试用申请分页数据
  vipUserDelet: '/MemberV2/DeleteMemberVip', //删除试用申请
  editVip: '/MemberV2/UpdateMemberVipRemarks', //编辑使用申请备注
  GetType: '/dictionary/GetType', //获取类别
  userSaveNotes: '/MemberV2/UpdateMemberRemarks', //更新用户后台备注
  // getVipAdmin: "/membervip/Getadmin", //获取vip用户管理信息
  getVipMemberInfo: '/MemberVip/GetVipMemberInfoById', //获取vip会员申请信息
  vipEditDebt_type: '/membervip/Insertscenes', //vip会员修改债务类别
  vipEditPaySet: '/MemberVip/VipPaySet', //vip会员支付管理编辑
  vipSaveNotes: '/MemberVip/UpdateBackRemarks', //vip会员保存备注
  vipUserExamine: '/membervip/Audit', //vip会员审核
  getAdminEmail: '/admin/GetAdmin_EmailDto', //获取管理员邮箱
  sendPassword: '/membervip/Insert_Email', //大客户发送/重置密码
  getVipRelationship: '/MemberVip/GetAccountPaging', //获取vip账户关系
  getVipRelatAdmin: '/membervip/Getvip_adminPaging', //获取vip账户管理员
  getAllAccounts: '/membervip/GetParent', //获取所有总账户
  addSubAccount: '/MemberVip/Insertaccount', //新增子账户
  subAccountDelet: '/membervip/Deletemember_vip_account', //子账户删除
  vipSubAccountEdit: '/membervip/Insertadmin', //vip子账户管理员新增/修改
  getVipSubAccountInfo: '/membervip/Getvip_adminByid', //获取vip子账户管理详情
  getSubAccountSelect: '/membervip/GetSon', //子账号管理获取下拉
  subAccountAdminDelet: '/membervip/Deletevip_admin', //子账户管理员删除
  addCreditorNew: '/Creditor/UpdateCreditor', //新增债权人(新)
  getUserCreditor: '/creditor/Getcreditors', //获取未分配债权人
  getSubAccountCreditor: '/creditor/GetcreditorsByaccount_id', //获取子账号债权人
  fenpeiCreditor: '/creditor/allocation', //分配债权人
  getUserSelectList: '/Member/GetMemberPagingData', //vip会员管理获取会员选择列表
  userSelect: '/MemberVip/BindingMembers', //vip管理选择会员
  vipGetCreditor: '/Creditor/GetCreditorByMemberVipId', //vip会员页面获取债权人列表
  getAccountCreditor: '/creditor/GetPaging', //获取子账号债权人管理
  creditorDelet: '/creditor/Delete', //子账号债权人删除
  addCreDitor: '/creditor/Insert', //子账号新增/修改债权人
  getCreditorInfo: '/creditor/GetByid', //获取子账号债权人详情
  getCreditorList: '/Creditor/GetCreditorPagingData', //获取债权人管理列表
  creditorListDelet: '/creditor/Delete', //债权人列表删除
  examineVIp: '/MemberVip/ExaminingMemberVip', //vip会员审核
  examineVipAdmin: '/MemberVip/ExaminingVipAccountAdmin', //vip会员管理审核
  examineVipCreditor: '/Creditor/ExaminingCreditor', //vip会员债权人审核
  vipDelete: '/MemberVip/DeleteMemberVipById', //删除vip会员
  userDelete: '/Member/DeleteMemberById', //删除会员
  vipAddAdmin: '/MemberV2/UpdateVipAdmin', //vip会员添加修改管理员
  sandAdminPassword: '/MemberV2/SendVipAdminPassword', //发送管理员密码
  getCreditorListInfo: '/Creditor/GetCreditorInfoById', //获取债权人详情
  getCreditorInfoByid: '/CreditorV2/GetCreditorInfoById', //获取债权人信息
  creditorEdit: '/Creditor/UpdateCreditor', //债权人编辑修改
  getEntrusted: '/AILawyerLetter/GetAILawyerLetterPagingData', //获取ai律师函委托列表
  entrustRevoke: '/AILawyerLetter/Revoke', //ai律师函委托撤销
  entrustDelete: '/AILawyerLetter/Delete', //ai律师函委托撤销
  getCreditorUser: '/member/GetMember', //获取债权人的会员列表
  getCreditorAdmin: '/member/GetAdminList', //获取债权人的管理员列表
  confirmExamine: '/Creditor/ExaminingCreditor', //债权人确认审核
  getDebtorList: '/DebtorV2/GetDebtorPagingData', // 获取债务人列表
  getAiLawyerAdmin: '/AILawyerLetter/GetAILawyerDetails', //获取律师函管理详情
  AILawyAdminShenhe: '/AILawyerLetter/Audit', //ai律师函管理界面审核
  getFeedbackList: '/Feedback/GetPaging', //获取债务人反馈列表
  feedbackDelet: '/Feedback/Delete', //债务人反馈删除
  addFeedback: '/Feedback/Insert', //债务人反馈新增修改
  getFeedbackInfo: '/Feedback/GetByid', //获取债务人反馈详情
  obligorRetrieval: '/Debtor/GetDebtor', //债务人检索
  getKefu: '/admin/GetAll', //获取客服
  getlawyerAdminList: '/LawyerLetterExpress/GetLawyerLetterExpressPagingData', //获取ai律师函管理列表
  getLawyerAdminInfo: '/LawyerLetterExpress/GetLogisticsDetails', //获取ai律师函管理列表详情
  joinExpress: '/AILawyerLetter/UpdateLogistics', //快递信息更新
  addExpress: '/AILawyerLetter/InsertLogisticsDetails', //新增快递信息
  delectExpress: '/AILawyerLetter/DeleteLogisticsDetails', //快递信息删除
  MemberCollectMoneyEdit: '/MemberCollectMoney/Insert', //会员收款通道新增/修改
  getMemberCollectList: '/MemberCollectMoney/GetPaging', //获取会员收款信息列表
  memberCollectDelet: '/MemberCollectMoney/Delete', //会员收款信息删除
  getMemberCollectInfo: '/MemberCollectMoney/GetByid', //获取会员收款信息详情
  toolsDownload: '/tools/Download', //债务人反馈下载
  getSendEmail: '/tools/GetAdmin_EmailDto', //获取发送邮箱
  sendEmail: '/Creditor/SendEmail', //发送审核结果
  getinandout: '/PaymentRecord/GetPayPagingData', //收支明细列表页
  getpagingbill: '/bill/getpaging', //账单列表
  getpagingbilldetails: 'bill/getadmin', //账单详情
  getpaginginvoice: '/Bill/GetMemberInvoicePagingData', //获取发票信息
  getpaginggitinvoice: '/Bill/GetMemberTicketAddressPagingData', //收票地址管理
  getpagingdeleteinvoice: '/Invoice/Delete_address', //会员收票地址删除
  getdetails: '/PaymentRecord/GetPayDetailsById', //根据id查收支详情
  getpagingbilltable: '/pay/getpagingeall', //生成ai律师函账单
  getbilladmin: 'bill/getadmin', //账单详情
  getbillinsertlist: '/bill/insert', //生成账单
  gitinvaedit: '/Invoice/GetByid_address', //收票地址获取编辑
  editinvaeditaddress: '/Invoice/Insert_address', //收票地址新增||修改
  deleteinvaeditaddress: '/Bill/DeleteMemberTicketAddressById', //收票地址删除
  deleteinvaice: '/Bill/DeleteMemberInvoiceById', //发票删除
  geteditinvaicebyid: '/Invoice/GetByid', //发票获取编辑
  posteditinvoice: '/Invoice/Insert', //发票新增||修改
  getPhoneInfo: '/AILawyerLetter/GetAILawyerTaskContent', //查看短信/电话详情
  getEmail: '/LogsSel/GetSel_email', //查看邮件详情
  getLawyerInfo: '/LogsSel/GetSel_lawyer_letter', //获取律师函详情
  editOrder: '/PaymentRecord/UpdatePayInfo', //修改收支记录
  editBillReamak: '/PaymentRecord/UpdatePayRemarks', //更新收支记录的备注
  deletBill: '/Bill/DeleteBill', //取消账单
  debtorEdit: '/Debtor/Update', //债务人编辑
  getDebtorInfo: '/Debtor/GetByid', //获取债务人详情
  debtorAddressEdit: '/AILawyerLetter/UpdateDebtorAddressSelection', //债务人地址修改
  allocation: '/bill/allocation', //分配管理员
  getInvoice: '/Invoice/GetBymember_id', //获取发票下拉
  getInvoiceAddress: '/Invoice/GetAddressByid', //获取收票地址下拉
  addSettingRecord: '/bill/insertsettlement', //新增，修改结算记录
  deleteSettingRecord: '/bill/deletesettlement', //删除结算记录
  billEdit: '/bill/updatebill', //账单信息修改
  billRemarks: '/bill/remarks', //账单备注
  openInvoice: '/bill/insertinvoice', //开票，编辑
  breakSave: '/AILawyerLetter/UpdateBackRemarks', //委托备注
  getOfflineCaseList: '/Cases/GetCasePagingData', //获取线下律师办案案件列表
  getOfflineCaseInfo: '/Cases/GetCaseDetails', //获取线下律师办案详情
  getLayerList: '/Lawyer/GetLawyerPagingData', //获取律师列表
  getFansList: '/WechatAppletFans/GetPaging', //获取粉丝列表
  lawyerDelete: '/Lawyer/DeleteLawyer', //律师删除
  getLawInfo: '/Lawyer/GetMemberLawyersById', // 获取律师信息详情
  saveLawInfo: '/Lawyer/UpdateLawyer', //更新律师认证信息
  getCaseAssment: '/Cases/GetCaseAssess', //获取案件评估
  upDataDebtorCredit: '/Cases/UpdateDebtorCredit', //案件评估更新债务人信用信息
  upDataWinrate: '/Cases/UpdateCaseAssessWinrates', //案件评估胜诉率更新
  calculationWinrates: '/Cases/CalculationWinrates', //计算案件胜诉率
  upDataCollectionRate: '/Cases/UpdateCaseAssessCollectionratesV2', //案件评估回款率更新
  calculationCollectionRate: '/Cases/CalculationCollectionrates', //计算回款率
  costEdit: '/Cases/UpdateEstimatedCost', //预估费用更新
  upDataOffer: '/Cases/UpdateQuotedPrice', //更新报价信息
  calcilationOffer: '/Cases/CalculationQuotedPrice', //计算报价
  caseRelease: '/Cases/CaseRelease', //案件发布
  selectOffer: '/Cases/UpdateServiceFeeMode', //选择服务费模式
  editJurisdiction: '/Cases/UpdateCaseJurisdiction', //修改辖区
  getCaseLawyer: '/Cases/GetCaseLawyerPagingData', //获取案件律师
  distributionCase: '/Cases/CaseAllocationLawyer', //分配案件
  getContracts: '/CaseContract/GetCaseContractBydDebtorNumber', //获取合同列表
  getContractSigner: '/CaseContract/GetCaseContractSigner', //获取合同签署人信息
  createContract: '/CaseContract/CreateContract', //创建合同
  getContractInfo: '/CaseContract/GetContractById', //获取合同详情
  getCaseCourtInfo: '/CaseProcess/GetCaseCourt', //获取案件法院信息
  getCaseMatter: '/CaseProcess/GetCaseMatters', //获取案件事项
  getAllCaseMatter: '/CaseProcess/GetAllCaseMatters', //获取所有案件事项
  getCaseFormInfo: '/CaseProcess/GetCaseMattersFromDetails', //获取案件进程表单详情
  GetAllCaseMattersFrom: '/CaseProcess/GetAllCaseMattersFrom', //获取所有案件事项流程表单
  updataCaseStatus: '/Cases/UpdateCaseStatus', //案件结案无律师状态更新
  getAllMatters: '/Cases/GetAllCaseMatters', //获取所有办案事项
  getAllAdmin: '/admin/GetAdmin_EmailDto', //获取所有管理员
  editMatters: '/Cases/UpdateCaseMatters', //修改办案事项 新增id传空 修改传值
  settingCustomer: '/Cases/SetCustomerService', //设置案件客服
  settingZhuCustomer: '/Cases/SetMainCustomerService', //设置案件主客服
  revokeDistribution: '/Cases/CancelCaseLawyer', //撤销分配
  updataCaseRemarks: '/Cases/UpdateBackRemarks', //更新案件后台备注
  ContractNotice: '/CaseContract/ContractNotice', //线上合同催签
  ContractSee: '/CaseContract/ContractSee', //线上合同查看
  ContractDelect: '/CaseContract/DeleteContract', //合同删除
  sandReport: '/NoticeSend/SendAppraisalReport', //发送评估报告邮件
  lawCaseDelete: '/Cases/DeleteCaseById', //删除案件
  updateAccount: '/MemberVip/UpdateAccount', //新增或者修改Vip账户
  getCreditorAdminNew: '/MemberVip/GetCreditorAdmin', //获取债权人的管理员(新)
  setCreditorAdmin: '/CreditorV2/SetCreditorAdmin', //设置债权人管理员
  deletCreditorAdmin: '/CreditorV2/DeleteCreditorAdmin', //删除债权人管理员
  accmentDelect: '/MemberVip//DeleteMemberVipAccountById', //账户删除
  adminDelect: '/MemberVip/DeleteMemberVipAdminById', //大客户管理员删除
  examiningAILawyer: 'AILawyerLetter/ExaminingAILawyerLetter', //ai律师函审核
  taskStop: '/AILawyerLetter/Stop', //AI律师函停止
  getCollection: '/AILawyerLetter/GetCollectionLawyersLetterContent', //获取律师函催收函
  UpdateDebtor: '/AILawyerLetter/UpdateDebtor', //更新债务人
  UpdateCollectionLetterContent:
    '/AILawyerLetter/UpdateCollectionLetterContent', //更新催收函
  UpdateLawyersLetterContent: '/AILawyerLetter/UpdateLawyersLetterContent', //更新律师函
  CasesUpdateDebtor: '/Cases/UpdateDebtor', //律师办案更新债务人信息
  UpdataReport: '/Cases/UpdateThirdAssessmentReport', //更新债务人第三方评估报告
  debtDetailsEdit: '/AILawyerLetter/UpdateDebtorDetails', //债务明细编辑
  Recognition: '/Tools/Recognition', //证照识别
  AILawyerLetterDownLoad: '/AILawyerLetter/DownLoadEMS', //ai律师函快递信息下载
  lawHandleCaseDelete: '/Cases/DeleteCaseById', //律师办案管理删除
  smsTongzhi: '/AILawyerLetter/SendQuerySMS', //短信通知
  lawyerUpdateSigned: '/AILawyerLetter/UpdateSigned', //律师签名更新
  UpdateFeedback: '/DebtorFeedback/UpdateFeedback', //新增更改债务反馈
  DeleteDebtorFeedbackById: '/DebtorFeedback/DeleteDebtorFeedbackById', //删除债务人反馈
  ExaminingCreditorAdmin: '/MemberVip/ExaminingCreditorAdmin', //管理员审核（新）
  textAjax: '/Register/PCRegister', //测试跨域
  delectCreditor: '/Creditor/DeleteCreditorById', //删除债权人
  GetCreditorAdminByVipId: '/MemberVip/GetCreditorAdminByVipId', //获取债权人管理员
  UpdateCreditor: '/CreditorV2/UpdateCreditor', //编辑债权人
  CreditorAudit: '/CreditorV2/CreditorAudit', //债权人审核
  DeleteCreditor: '/CreditorV2/DeleteCreditor', //删除债权人
  UpdatePaySet: '/MemberV2/UpdatePaySet', //更新支付设置
  DeleteVipAdmin: '/MemberV2/DeleteVipAdmin', //删除VIp管理员
  CreditorAdminAudit: '/CreditorV2/CreditorAdminAudit', //债权人授权管理员审核
  LawyerAudit: '/MemberV2/LawyerAudit', //律师审核
  DeleteService: '/ValueAddedServices/DeleteService', //删除增值服务
  GetQueryQrchivesPagingData: '/ValueAddedServices/GetQueryQrchivesPagingData', //律师查档分页数据
  GetServiceDetails: '/ValueAddedServices/GetServiceDetails', //获取委托服务详情
  UpdateExecutingStates: '/ValueAddedServices/UpdateExecutingStates', //增值服务执行进度更新
  UpdateQuotedprice: '/ValueAddedServices/UpdateQuotedprice', //增值服务委托报价更新
  UpdateBackRemarks: '/ValueAddedServices/UpdateBackRemarks', //增值服务后台备注更新
  GetLitigationFundingPagingData:
    '/ValueAddedServices/GetLitigationFundingPagingData', //诉讼助资分页数据
  GetPreservationInsurancePagingData:
    '/ValueAddedServices/GetPreservationInsurancePagingData', //保全保险分页
  UpdateQueryArchives: '/ValueAddedServices/UpdateQueryArchives', //更新律师查档委托
  UpdatePreservationInsurance:
    '/ValueAddedServices/UpdatePreservationInsurance', //更新保全保险
  UpdateLitigationFunding: '/ValueAddedServices/UpdateLitigationFunding', //更新诉讼助资委托
  UpdateCourierReceiptStatus: '/LawyerLetterExpress/UpdateCourierReceiptStatus', //底单状态更新
  DownLoadEMS: '/LawyerLetterExpress/DownLoadEMS', //快递信息下载
  SaveCourierNumber: '/LawyerLetterExpress/SaveCourierNumber', //快递单号批量保存
  UpdateTaskExecutionTime: '/AILawyerLetter/UpdateTaskExecutionTime', //AI律师函修改任务执行时间
  GetCaseJurisdiction: '/Cases/GetCaseJurisdiction', //获取案件管辖地及点击次数
  GetRegisterLawyerPagingData: '/MemberLawyer/GetRegisterLawyerPagingData', //平台注册律师分页数据
  GetOtherLawyerPagingData: '/MemberLawyer/GetOtherLawyerPagingData', //第三方律师分页数据
  ReceivingCaseNotice: '/Cases/ReceivingCaseNotice', //案件接单通知
  DownLoadReport: '/Cases/DownLoadReport', //下载案件分析报告
  UploadReport: '/Cases/UploadReport', //上传评估报告
  GetEvidencePagingData: '/Evidence/GetEvidencePagingData', //存证分页数据
  getFinance: '/CaseFinance/GetCaseFinance', //获取律师办案财务信息
  AddCaseFinance: '/CaseFinance/AddCaseFinance', //添加编辑请款记录
  DeleteCaseFinanceById: '/CaseFinance/DeleteCaseFinanceById', //删除案件财务数据
  CreateBill: '/Bill/CreateBill', //生成账单
  SetLastPaymentTime: '/MemberV2/SetLastPaymentTime', //设置最后付款时间
  SetCustomerService: '/MemberV2/SetCustomerService', //设置客服
  SetBillCustomerService: '/Bill/SetBillCustomerService', //设置账单客服
  GetMemberListByIdOrName: '/MemberV2/GetMemberListByIdOrName', //根据id或名称获取用户数据
  getBillInfo: '/Bill/GetGenerateBillInfo', //获取账单信息
  GetLawyerListByIdOrName: '/MemberV2/GetLawyerListByIdOrName', //根据id或名称获取律师数据
  GetBillDetails: '/Bill/GetBillDetails', //获取账单详情
  UpdateBillSettlementStatus: '/Bill/UpdateBillSettlementStatus', //更新账单结算状态
  UpdateBillRemarks: '/Bill/UpdateBackRemarks', //更新账单备注
  GetMemberVipAdminsByMmeberId: '/MemberV2/GetMemberVipAdminsByMmeberId', //根据用户ID获取管理员
  GetMemberVipAdminsByMmeberIdV2: '/MemberV2/GetMemberVipAdminsByMmeberIdV2', ///根据用户ID获取管理员(发票专用)
  GetMemberInvoicesByMemberId: '/Bill/GetMemberInvoicesByMemberId', //获取用户所有发票
  AddInvoice: '/Bill/AddInvoice', //新增或编辑发票信息
  SelectInvoice: '/Bill/SelectInvoice', //选择发票信息
  getAllTick: '/Bill/GetMemberTicketAddressByMemberId', //获取所有收票信息
  AddTicketAddress: '/Bill/AddTicketAddress', //新增收票信息
  SelectTicketAddress: '/Bill/SelectTicketAddress', //选择收票地址信息
  AddOpenInvoices: '/Bill/AddOpenInvoices', //新增或编辑账单开票操作
  GetUnsettledServices: '/Bill/GetUnsettledServices', //获取未结算列表
  AddSettlementRecord: '/Bill/AddSettlementRecord', //新增结算记录
  AddRefundRecord: '/Bill/AddRefundRecord', //新增退款记录
  GetUnsettledRefundRecord: '/Bill/GetUnsettledRefundRecord', //获取未退款记录列表
  DeleteRefundRecord: '/Bill/DeleteRefundRecord', //删除退款记录
  DeleteSettlementRecord: '/Bill/DeleteSettlementRecord', //删除结算记录
  DeleteBillPushObject: '/Bill/DeleteBillPushObject', //删除账单推送对象
  DeletePaymentRecord: '/Bill/DeletePaymentRecord', //删除账单服务详情
  GetSettlementRecordDetails: '/Bill/GetSettlementRecordDetails', //查看结算记录详情
  GetRefundRecordDetails: '/Bill/GetRefundRecordDetails', //查看退款记录详情
  GetBillPagingData: '/Bill/GetBillPagingData', //获取账单分页列表
  AddCollectionInfo: '/Bill/AddCollectionInfo', //新增编辑用户收款信息
  RelationBill: '/CaseFinance/RelationBill', //关联账单
  UpdateRequestObject: '/CaseFinance/UpdateRequestObject', //更新请款对象
  DeleteBill: '/Bill/DeleteBill', //删除账单
  GenerateBillPdf: '/Bill/GenerateBillPdf', //生成pdf文件
  AddBillPushObject: '/Bill/AddBillPushObject', //新增推送对象
  CloseCase: '/Cases/CloseCase', //申请结案
  UpdateCloseCaseRemarks: '/Cases/UpdateCloseCaseRemarks', //更新结案备注
  SetSettlementPeriod: '/Bill/SetSettlementPeriod', //设置结算周期
  SetBillDate: '/Bill/SetBillDate', //设置请款日期或最后付款日期
  UpdateQuotedPrice_03: '/Cases/UpdateQuotedPrice_03', //更新案件报价 律师报价
  UpdateQuotedPrice_02: '/Cases/UpdateQuotedPrice_02', //更新案件报价  诚收报价
  UpdateQuotedPrice_01: '/Cases/UpdateQuotedPrice_01', //更新案件报价 用户报价
  CalculationQuotedPrice_v1: '/Cases/CalculationQuotedPrice_v1', //计算案件报价 用户报价
  CalculationQuotedPrice_v2: '/Cases/CalculationQuotedPrice_v2', //计算案件报价 诚收报价
  CalculationQuotedPrice_v3: '/Cases/CalculationQuotedPrice_v3', //计算案件报价 律师报价
  GetDebtorPagingData: '/AILawyerLetter/GetDebtorPagingData', //AI律师函债务人分页数据
  GetDebtorDetailsPagingData: '/AILawyerLetter/GetDebtorDetailsPagingData', //AI律师函债务明细分页数据
  GetDebtorFeedbackPagingData: '/AILawyerLetter/GetDebtorFeedbackPagingData', //AI律师函债务反馈分页数据
  GetCaseQuotedPrice: '/Cases/GetCaseQuotedPrice', //获取案件报价
  CalculationServiceQuotedPrice: '/Cases/CalculationServiceQuotedPrice', //案件评估 计算服务费报价
  SaveCustomerQuotedPrice: '/Cases/SaveCustomerQuotedPrice', //保存服务费模式与报价
  AddCheckAdmin: '/Cases/AddCheckAdmin', //新增审核管理员
  CheckQuotedPriceNotice: '/Cases/CheckQuotedPriceNotice', //发送报价审核通知
  CheckQuotedPrice: '/Cases/CheckQuotedPrice', //审核报价
  DeleteCheckAdmin: '/Cases/DeleteCheckAdmin', //删除审核管理员
  CalculationLawyerFeeQuotedPrice: '/Cases/CalculationLawyerFeeQuotedPrice', //计算律师费报价
  SavelawyerQuotedPrice: '/Cases/SavelawyerQuotedPrice', //保存律师费报价设置
  SendQuotedPrice: '/Cases/SendQuotedPrice', //服务费报价发送至客户确认
  CustomerSelectQuotedPrice: '/Cases/CustomerSelectQuotedPrice', //客服选择服务费模式
  GetByid: '/docrecord/GetByid', //获取文档编辑内容
  GetVIPAdminPagingData: '/MemberV2/GetVIPAdminPagingData', //获取管理员分页数据
  GetMemberCollectionPagingData: '/Bill/GetMemberCollectionPagingData', //律所收款信息分页数据
  AddCollectionInfoV2: '/Bill/AddCollectionInfoV2', //新增或编辑用户收款信息
  DeleteMemberCollectionById: '/Bill/DeleteMemberCollectionById', //删除律所收款信息
  SendFeedbackNotice: '/DebtorFeedback/SendFeedbackNotice', //发送债务反馈通知至客户
  SendBillNotice: '/Bill/SendBillNotice', //发送账单通知
  GetCreditorByAdminId: '/MemberV2/GetCreditorByAdminId', //根据管理员id获取债权人
  GetCreditorPagingData: '/CreditorV2/GetCreditorPagingData', //债权人管理分页数据
  GetCreditorAdminByCreditorId: '/MemberV2/GetCreditorAdminByCreditorId', //根据债权人ID获取管理员列表
  GetStatisticsAdminData: '/StatisticsAdmin/GetStatisticsAdminData', //获取后台统计数据 数字部分
  GetPendingWork: '/StatisticsAdmin/GetPendingWork', //获取待办工作
  GetCaseQuotedPriceByAdmin: '/Cases/GetCaseQuotedPriceByAdmin', //获取管理员需要审核的报价
  GetStatisticsAdminChartsData: '/StatisticsAdmin/GetStatisticsAdminChartsData', //获取统计数据 图标部分
  UpdatePresent: '/MemberV2/UpdatePresent', //更新赠送数据
  UpdateEMSStatus: '/LawyerLetterExpress/UpdateEMSStatus', //快递状态更新
  AllStop: '/AILawyerLetter/AllStop', //AI律师函全部终止
  UpdateBillTitle: '/Bill/UpdateBillTitle', //更新账单标题名称
  UpdateContractNumber: '/CaseContract/UpdateContractNumber', //更新合同编号
  StopSingleTask: '/AILawyerLetter/StopSingleTask', //终止单个任务
  StopAllTask: '/AILawyerLetter/StopAllTask', //终止单个委托所有任务
  StopBatchTask: '/AILawyerLetter/StopBatchTask', //终止或撤销 批次任务
  GetBillFileByBillNumber: '/Bill/GetBillFileByBillNumber', //获取账单pdf文件
  AddCaseMattersFrom: '/CaseProcess/AddCaseMattersFrom', //新增案件事项流程
  DeleteCaseMattersById: '/CaseProcess/DeleteCaseMattersById', //删除办案事项
  AddCaseMatters: '/CaseProcess/AddCaseMatters', //新增案件事项
  DeleteCaseMattersFromById: '/CaseProcess/DeleteCaseMattersFromById', //删除办案事项流程
  CaseMattersSort: '/CaseProcess/CaseMattersSort', //事项排序
  GetAILawyerLetterExportData: '/AILawyerLetter/GetAILawyerLetterExportData', //获取AI律师函导出数据
  GetAllAuthorizationFileRecord: '/CreditorV2/GetAllAuthorizationFileRecord', //获取所有授权书记录
  AddRemarks: '/CustomerServiceRemarks/AddRemarks', //新增备注(改：2022/8/8)
  GetRemarksByTypeAndNumber: '/CustomerServiceRemarks/GetRemarksByTypeAndNumber',//获取备注(改：2022/8/8)
  DeleteRemarksFileByID: '/CustomerServiceRemarks/DeleteRemarksFileByID', //根据ID删除备注文件(改：2022/8/8)
  UpdateRemarksContent: '/CustomerServiceRemarks/UpdateRemarksContent', //更新备注内容(改：2022/8/8)
  AddRemarksFile: '/CustomerServiceRemarks/AddRemarksFile', //新增备注文件(改：2022/8/8)
  DeleteRemarksByID: '/CustomerServiceRemarks/DeleteRemarksByID' //根据ID删除备注
}
