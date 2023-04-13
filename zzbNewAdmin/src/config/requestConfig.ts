export default {
  getData: '/mock/5c09ca373601b6783189502a/example/mock', // 随机数据 来自 easy mock
  login: '/api/hd/Login/CodeLogin', //登录
  getCode: '/api/hd/Login/SendSMSCode', //获取手机验证码
  getApi: '/api/hd/docapi/GetPaging', //获取接口列表
  addApi: '/api/hd/docapi/insert', //添加修改接口
  apiDelete: '/api/hd/docapi/Delete', //删除接口
  apiGetByid: '/api/hd/docapi/GetByid', //获取接口详情
  getWebList: '/api/hd/docview/GetPaging', //获取页面列表
  webDelete: '/api/hd/docview/Delete', //页面删除
  addWeb: '/api/hd/docview/Insert', //页面新增
  getWebInfo: '/api/hd/docview/GetByid', //页面详情
  getProgress: '/api/hd/docprogress/GetAll', //获取任务列表
  addProgress: '/api/hd/docprogress/Insert', //新增开发任务
  deleteProgress: '/api/hd/docprogress/Delete', //任务删除
  getProgressInfo: '/api/hd/docprogress/GetByid', //获取开发任务详情
  getAdmin: '/api/hd/admin/getpaging', //获取员工列表
  adminEdit: '/api/hd/admin/insert', //员工添加、修改
  adminDelet: '/api/hd/admin/delete', //员工删除
  getAdminInfo: '/api/hd/admin/getbyid', //获取员工详情
  getRoles: '/api/hd/adminrole/GetAll', //获取角色列表
  GetTwoandThree: '/api/hd/adminmenu/GetTwoandThree', //获取页面内菜单
  getMenu: '/api/hd/adminmenu/GetAll', //获取菜单设置列表
  RoleEdit: '/api/hd/adminrole/insert', //角色权限修改
  RoleDelet: '/api/hd/adminrole/delete', //角色删除
  getRoleInfo: '/api/hd/adminrole/GetmenuByrole_id', //获取角色权限详情
  getSeverList: '/api/hd/Taskqueue/GetPaging', //获取服务列表
  severDelete: '/api/hd/Taskqueue/delete', //服务删除
  getSeverInfo: '/api/hd/Taskqueue/getbyid', //获取服务详情
  severEdit: '/api/hd/Taskqueue/insert', //服务修改
  getCaseList: '/api/hd/dynamicsflowhandlecase/GetPaging', //获取办案流程
  caseDelete: '/api/hd/dynamicsflowhandlecase/delete', //流程删除
  getCaseInfo: '/api/hd/dynamicsflowhandlecase/getbyid', //获取办案详情
  caseEdit: '/api/hd/dynamicsflowhandlecase/insert', //案件流程修改
  getRegion: '/api/hd/Areamanagement/getpaging', //获取地区
  regionDelete: '/api/hd/Areamanagement/delete', //地区删除
  regionEdit: '/api/hd/Areamanagement/insert', //地区修改
  getCurrency: '/api/hd/Currency/CurrencyPullDown', //获取币种列表
  currencyDelete: '/api/hd/currency/delete', //币种删除
  currencyEdit: '/api/hd/currency/insert', //币种修改
  getDictionaries: '/api/hd/dictionary/dictionary/GetType', //获取所有字典
  getFrom: '/api/hd/dynamicsform/getpaging', //获取所有动态表单
  getSelectFrom: '/api/hd/dynamicsform/getall', //表单设置获取所有表单(无参)
  fromDelet: '/api/hd/Dynamicsform/delete', //表单删除
  getFromInfo: '/api/hd/Dynamicsform/GetdetailsPaging', //获取动态表单详情
  fromEdit: '/api/hd/Dynamicsform/insert', //表单新增修改
  fromInfoDelete: '/api/hd/Dynamicsform/Deletedetails', //表单详情删除
  fromInfoEdit: '/api/hd/Dynamicsform/insert', //动态表单详情修改
  getTips: '/api/hd/PlatformTips/GetPaging', //获取提示列表
  tipsDelet: '/api/hd/PlatformTips/Delete', //提示删除
  tipsEdit: '/api/hd/PlatformTips/Insert', //提示增，改
  getAllDictionary: '/api/hd/dictionary/GetPaging_category', //获取所有字典类别
  dictionaryInsert: '/api/hd/dictionary/insert', //字典类别修改
  dictionaryDelete: '/api/hd/dictionary/delete', //字典类别删除
  getDicInfoList: '/api/hd/dictionary/GetPaging', //获取字典内容分页
  dicInfoEdit: '/api/hd/dictionary/Insert_details', //字典内容添加修改
  dicInfoDetails: '/api/hd/dictionary/Update_details', //字典内容启用
  dicInfoDelete: '/api/hd/dictionary/Delete_deteils', //字典内容删除
  getUserLogs: '/api/hd/Logmember/getpaging', //获取用户操作日志
  getStaffLogs: '/api/hd/Logadmin/getpaging', //获取员工操作日志
  getQueueList: '/api/hd/TaskTiming/GetPaging', //获取队列列表
  QueueEdit: '/api/hd/TaskTiming/insert', //队列修改
  QueueDelete: '/api/hd/TaskTiming/delete', //队列删除
  getQueueInfo: '/api/hd/TaskTiming/getbyid', //获取队列详情
  getWechatModel: '/api/hd/TemplateWechatMessage/Getpaging', //获取微信模版
  WechatModelDelet: '/api/hd/TemplateWechatMessage/delete', //微信模版删除
  WechatModelEdit: '/api/hd/TemplateWechatMessage/insert', //微信模版修改
  getphoneModel: '/api/hd/TemplateTelephone/Getpaging', //获取电话模版
  phoneModelDelet: '/api/hd/TemplateTelephone/delete', //电话模版删除
  phoneModelEdit: '/api/hd/TemplateTelephone/insert', //电话模版修改
  getsmsModel: '/api/hd/Templatesms/Getpaging', //获取sms模版
  smsModelDelet: '/api/hd/Templatesms/delete', //sms模版删除
  smsModelEdit: '/api/hd/TemplateSms/insert', //sms模版修改
  getPdfModel: '/api/hd/Templatepdf/Getpaging', //获取pdf模版
  PdfModelDelet: '/api/hd/TemplatePdf/delete', //pdf模版删除
  PdfModelEdit: '/api/hd/TemplatePdf/insert', //pdf模版修改
  getemailModel: '/api/hd/TemplateEmail/Getpaging', //获取email模版
  emailModelDelet: '/api/hd/TemplateEmail/delete', //email模版删除
  emailModelEdit: '/api/hd/TemplateEmail/insert', //email模版修改
  getExcellModel: '/api/hd/TemplateExcel/GetPaging', //获取Excel模版
  getExcellInfo: '/api/hd/TemplateExcel/GetByid', //Excel模版修改
  ExcellModelDelet: '/api/hd/TemplateExcel/delete', //Excel模版删除
  ExcellModelEdit: '/api/hd/TemplateExcel/insert', //Excel模版修改
  verificationExcel: '/api/hd/TemplateExcel/Test', //Excel模板验证
  getEmailLogs: '/api/hd/logs/GetPagingemail', //获取email日志
  getSmsLogs: '/api/hd/logs/GetPagingsms', //获取sms日志
  getPhoneLogs: '/api/hd/logs/GetPagingphone', //获取phone日志
  getPdfLogs: '/api/hd/logs/GetPagingpdf', //获取pdf生成日志
  getNews: '/api/hd/PlatformNotice/GetALL', //获取通知
  newDelete: '/api/hd/PlatformNotice/DeleteNoticeById', //通知删除
  newEdit: '/api/hd/SiteNews/Insert', //新闻编辑修改
  getProblem: '/api/hd/SiteFAQ/Getpaging', //获取常见问题
  problemDelete: '/api/hd/SiteFAQ/Delete', //常见问题删除
  problemEdit: '/api/hd/SiteFAQ/Insert', //常见问题编辑修改
  testSms: '/api/hd/logsinsert/Insert_Sms', //测试短信模板
  testPhone: '/api/hdlogsinsert/Insert_Phone', //测试电话模板
  testEmail: '/api/hd/logsinsert/Insert_Email', //测试邮件模板
  getSmsCode: '/api/hd/Template/GetSms', //获取短信测试所需参数
  getPhoneCode: '/api/hd/Template/GetPhone', //获取电话模板测试所需参数
  getEmailCode: '/api/hd/Template/GetEmail', //获取邮件模板测试所需参数
  getExcel: '/api/hd/Template/GetExcel', //获取excel模板
  getFileList: '/api/hd/docrecord/GetPaging', //获取文档列表
  fileEdit: '/api/hd/docrecord/Insert', //文档编辑修改
  fileDelete: '/api/hd/docrecord/Delete', //文档删除
  getOrdinary: '/api/hd/MemberV2/GetMemberPagingData', //获取注册用户列表
  ordinaryDelete: '/api/hd/MemberV2/DeleteMember', //删除注册用户
  getDinaryInfo: '/api/hd/member/GetByid', //获取普通会员详情
  getDinarycreditor: '/api/hd/Creditor/GetCreditorByMemberId', //获取普通会员债权人数据
  getDinaryBasicInfo: '/api/hd/MemberV2/GetMemberDetails', //获取用户详情
  dinaryBaseicInfoEdit: '/api/hd/MemberV2/UpdateMemberBasicInfo', //用户基础信息修改
  getDinaryVipList: '/api/hd/MemberVip/GetVipByMemberId', //获取普通会员的VIP列表
  dinaryUpState: '/api/hd/member/UpState', //普通会员启用或禁用
  dinaryEdit: '/api/hd/Member/UpdateMember', //普通会员新增修改
  getAddress: '/api/hd/AreaManagement/GetAllByid', //获取地址列表
  getUserAdmin: '/api/hd/member/Getadmin', //获取会员管理信息
  getVipUser: '/api/hd/MemberV2/GetMemberVipApplyPagingData', //获取试用申请分页数据
  vipUserDelet: '/api/hd/MemberV2/DeleteMemberVip', //删除试用申请
  editVip: '/api/hd/MemberV2/UpdateMemberVipRemarks', //编辑使用申请备注
  GetType: '/api/hd/dictionary/GetType', //获取类别
  userSaveNotes: '/api/hd/MemberV2/UpdateMemberRemarks', //更新用户后台备注
  // getVipAdmin: "/membervip/Getadmin", //获取vip用户管理信息
  getVipMemberInfo: '/api/hd/MemberVip/GetVipMemberInfoById', //获取vip会员申请信息
  vipEditDebt_type: '/api/hd/membervip/Insertscenes', //vip会员修改债务类别
  vipEditPaySet: '/api/hd/MemberVip/VipPaySet', //vip会员支付管理编辑
  vipSaveNotes: '/api/hd/MemberVip/UpdateBackRemarks', //vip会员保存备注
  vipUserExamine: '/api/hd/membervip/Audit', //vip会员审核
  getAdminEmail: '/api/hd/admin/GetAdmin_EmailDto', //获取管理员邮箱
  sendPassword: '/api/hd/membervip/Insert_Email', //大客户发送/重置密码
  getVipRelationship: '/api/hd/MemberVip/GetAccountPaging', //获取vip账户关系
  getVipRelatAdmin: '/api/hd/membervip/Getvip_adminPaging', //获取vip账户管理员
  getAllAccounts: '/api/hd/membervip/GetParent', //获取所有总账户
  addSubAccount: '/api/hd/MemberVip/Insertaccount', //新增子账户
  subAccountDelet: '/api/hd/membervip/Deletemember_vip_account', //子账户删除
  vipSubAccountEdit: '/api/hd/membervip/Insertadmin', //vip子账户管理员新增/修改
  getVipSubAccountInfo: '/api/hd/membervip/Getvip_adminByid', //获取vip子账户管理详情
  getSubAccountSelect: '/api/hd/membervip/GetSon', //子账号管理获取下拉
  subAccountAdminDelet: '/api/hd/membervip/Deletevip_admin', //子账户管理员删除
  addCreditorNew: '/api/hd/Creditor/UpdateCreditor', //新增债权人(新)
  getUserCreditor: '/api/hd/creditor/Getcreditors', //获取未分配债权人
  getSubAccountCreditor: '/api/hd/creditor/GetcreditorsByaccount_id', //获取子账号债权人
  fenpeiCreditor: '/api/hd/creditor/allocation', //分配债权人
  getUserSelectList: '/api/hd/Member/GetMemberPagingData', //vip会员管理获取会员选择列表
  userSelect: '/api/hd/MemberVip/BindingMembers', //vip管理选择会员
  vipGetCreditor: '/api/hd/Creditor/GetCreditorByMemberVipId', //vip会员页面获取债权人列表
  getAccountCreditor: '/api/hd/creditor/GetPaging', //获取子账号债权人管理
  creditorDelet: '/api/hd/creditor/Delete', //子账号债权人删除
  addCreDitor: '/api/hd/creditor/Insert', //子账号新增/修改债权人
  getCreditorInfo: '/api/hd/creditor/GetByid', //获取子账号债权人详情
  getCreditorList: '/api/hd/Creditor/GetCreditorPagingData', //获取债权人管理列表
  creditorListDelet: '/api/hd/creditor/Delete', //债权人列表删除
  examineVIp: '/api/hd/MemberVip/ExaminingMemberVip', //vip会员审核
  examineVipAdmin: '/api/hd/MemberVip/ExaminingVipAccountAdmin', //vip会员管理审核
  examineVipCreditor: '/api/hd/Creditor/ExaminingCreditor', //vip会员债权人审核
  vipDelete: '/api/hd/MemberVip/DeleteMemberVipById', //删除vip会员
  userDelete: '/api/hd/Member/DeleteMemberById', //删除会员
  vipAddAdmin: '/api/hd/MemberV2/UpdateVipAdmin', //vip会员添加修改管理员
  sandAdminPassword: '/api/hd/MemberV2/SendVipAdminPassword', //发送管理员密码
  getCreditorListInfo: '/api/hd/Creditor/GetCreditorInfoById', //获取债权人详情
  getCreditorInfoByid: '/api/hd/CreditorV2/GetCreditorInfoById', //获取债权人信息
  creditorEdit: '/api/hd/Creditor/UpdateCreditor', //债权人编辑修改
  getEntrusted: '/api/hd/AILawyerLetter/GetAILawyerLetterPagingData', //获取ai律师函委托列表
  entrustRevoke: '/api/hd/AILawyerLetter/Revoke', //ai律师函委托撤销
  entrustDelete: '/api/hd/AILawyerLetter/Delete', //ai律师函委托撤销
  getCreditorUser: '/api/hd/member/GetMember', //获取债权人的会员列表
  getCreditorAdmin: '/api/hd/member/GetAdminList', //获取债权人的管理员列表
  confirmExamine: '/api/hd/Creditor/ExaminingCreditor', //债权人确认审核
  getDebtorList: '/api/hd/DebtorV2/GetDebtorPagingData', // 获取债务人列表
  getAiLawyerAdmin: '/api/hd/AILawyerLetter/GetAILawyerDetails', //获取律师函管理详情
  AILawyAdminShenhe: '/api/hd/AILawyerLetter/Audit', //ai律师函管理界面审核
  getFeedbackList: '/api/hd/Feedback/GetPaging', //获取债务人反馈列表
  feedbackDelet: '/api/hd/Feedback/Delete', //债务人反馈删除
  addFeedback: '/api/hd/Feedback/Insert', //债务人反馈新增修改
  getFeedbackInfo: '/api/hd/Feedback/GetByid', //获取债务人反馈详情
  obligorRetrieval: '/api/hd/Debtor/GetDebtor', //债务人检索
  getKefu: '/api/hd/admin/GetAll', //获取客服
  getlawyerAdminList:
    '/api/hd/LawyerLetterExpress/GetLawyerLetterExpressPagingData', //获取ai律师函管理列表
  getLawyerAdminInfo: '/api/hd/LawyerLetterExpress/GetLogisticsDetails', //获取ai律师函管理列表详情
  joinExpress: '/api/hd/AILawyerLetter/UpdateLogistics', //快递信息更新
  addExpress: '/api/hd/AILawyerLetter/InsertLogisticsDetails', //新增快递信息
  delectExpress: '/api/hd/AILawyerLetter/DeleteLogisticsDetails', //快递信息删除
  MemberCollectMoneyEdit: '/api/hd/MemberCollectMoney/Insert', //会员收款通道新增/修改
  getMemberCollectList: '/api/hd/MemberCollectMoney/GetPaging', //获取会员收款信息列表
  memberCollectDelet: '/api/hd/MemberCollectMoney/Delete', //会员收款信息删除
  getMemberCollectInfo: '/api/hd/MemberCollectMoney/GetByid', //获取会员收款信息详情
  toolsDownload: '/api/hd/tools/Download', //债务人反馈下载
  getSendEmail: '/api/hd/tools/GetAdmin_EmailDto', //获取发送邮箱
  sendEmail: '/api/hd/Creditor/SendEmail', //发送审核结果
  getinandout: '/api/hd/PaymentRecord/GetPayPagingData', //收支明细列表页
  getpagingbill: '/api/hd/bill/getpaging', //账单列表
  getpagingbilldetails: '/api/hd/bill/getadmin', //账单详情
  getpaginginvoice: '/api/hd/Bill/GetMemberInvoicePagingData', //获取发票信息
  getpaginggitinvoice: '/api/hd/Bill/GetMemberTicketAddressPagingData', //收票地址管理
  getpagingdeleteinvoice: '/api/hd/Invoice/Delete_address', //会员收票地址删除
  getdetails: '/api/hd/PaymentRecord/GetPayDetailsById', //根据id查收支详情
  getpagingbilltable: '/api/hd/pay/getpagingeall', //生成ai律师函账单
  getbilladmin: '/api/hd/bill/getadmin', //账单详情
  getbillinsertlist: '/api/hd/bill/insert', //生成账单
  gitinvaedit: '/api/hd/Invoice/GetByid_address', //收票地址获取编辑
  editinvaeditaddress: '/api/hd/Invoice/Insert_address', //收票地址新增||修改
  deleteinvaeditaddress: '/api/hd/Bill/DeleteMemberTicketAddressById', //收票地址删除
  deleteinvaice: '/api/hd/Bill/DeleteMemberInvoiceById', //发票删除
  geteditinvaicebyid: '/api/hd/Invoice/GetByid', //发票获取编辑
  posteditinvoice: '/api/hd/Invoice/Insert', //发票新增||修改
  getPhoneInfo: '/api/hd/AILawyerLetter/GetAILawyerTaskContent', //查看短信/电话详情
  getEmail: '/api/hd/LogsSel/GetSel_email', //查看邮件详情
  getLawyerInfo: '/api/hd/LogsSel/GetSel_lawyer_letter', //获取律师函详情
  editOrder: '/api/hd/PaymentRecord/UpdatePayInfo', //修改收支记录
  editBillReamak: '/api/hd/PaymentRecord/UpdatePayRemarks', //更新收支记录的备注
  deletBill: '/api/hd/Bill/DeleteBill', //取消账单
  debtorEdit: '/api/hd/Debtor/Update', //债务人编辑
  getDebtorInfo: '/api/hd/Debtor/GetByid', //获取债务人详情
  debtorAddressEdit: '/api/hd/AILawyerLetter/UpdateDebtorAddressSelection', //债务人地址修改
  allocation: '/api/hd/bill/allocation', //分配管理员
  getInvoice: '/api/hd/Invoice/GetBymember_id', //获取发票下拉
  getInvoiceAddress: '/api/hd/Invoice/GetAddressByid', //获取收票地址下拉
  addSettingRecord: '/api/hd/bill/insertsettlement', //新增，修改结算记录
  deleteSettingRecord: '/api/hd/bill/deletesettlement', //删除结算记录
  billEdit: '/api/hd/bill/updatebill', //账单信息修改
  billRemarks: '/api/hd/bill/remarks', //账单备注
  openInvoice: '/api/hd/bill/insertinvoice', //开票，编辑
  breakSave: '/api/hd/AILawyerLetter/UpdateBackRemarks', //委托备注
  getOfflineCaseList: '/api/hd/Cases/GetCasePagingData', //获取线下律师办案案件列表
  getOfflineCaseInfo: '/api/hd/Cases/GetCaseDetails', //获取线下律师办案详情
  getLayerList: '/api/hd/Lawyer/GetLawyerPagingData', //获取律师列表
  getFansList: '/api/hd/WechatAppletFans/GetPaging', //获取粉丝列表
  lawyerDelete: '/api/hd/Lawyer/DeleteLawyer', //律师删除
  getLawInfo: '/api/hd/Lawyer/GetMemberLawyersById', // 获取律师信息详情
  saveLawInfo: '/api/hd/Lawyer/UpdateLawyer', //更新律师认证信息
  getCaseAssment: '/api/hd/Cases/GetCaseAssess', //获取案件评估
  upDataDebtorCredit: '/api/hd/Cases/UpdateDebtorCredit', //案件评估更新债务人信用信息
  upDataWinrate: '/api/hd/Cases/UpdateCaseAssessWinrates', //案件评估胜诉率更新
  calculationWinrates: '/api/hd/Cases/CalculationWinrates', //计算案件胜诉率
  upDataCollectionRate: '/api/hd/Cases/UpdateCaseAssessCollectionratesV2', //案件评估回款率更新
  calculationCollectionRate: '/api/hd/Cases/CalculationCollectionrates', //计算回款率
  costEdit: '/api/hd/Cases/UpdateEstimatedCost', //预估费用更新
  upDataOffer: '/api/hd/Cases/UpdateQuotedPrice', //更新报价信息
  calcilationOffer: '/api/hd/Cases/CalculationQuotedPrice', //计算报价
  caseRelease: '/api/hd/Cases/CaseRelease', //案件发布
  selectOffer: '/api/hd/Cases/UpdateServiceFeeMode', //选择服务费模式
  editJurisdiction: '/api/hd/Cases/UpdateCaseJurisdiction', //修改辖区
  getCaseLawyer: '/api/hd/Cases/GetCaseLawyerPagingData', //获取案件律师
  distributionCase: '/api/hd/Cases/CaseAllocationLawyer', //分配案件
  getContracts: '/api/hd/CaseContract/GetCaseContractBydDebtorNumber', //获取合同列表
  getContractSigner: '/api/hd/CaseContract/GetCaseContractSigner', //获取合同签署人信息
  createContract: '/api/hd/CaseContract/CreateContract', //创建合同
  getContractInfo: '/api/hd/CaseContract/GetContractById', //获取合同详情
  getCaseCourtInfo: '/api/hd/CaseProcess/GetCaseCourt', //获取案件法院信息
  getCaseMatter: '/api/hd/CaseProcess/GetCaseMatters', //获取案件事项
  getAllCaseMatter: '/api/hd/CaseProcess/GetAllCaseMatters', //获取所有案件事项
  getCaseFormInfo: '/api/hd/CaseProcess/GetCaseMattersFromDetails', //获取案件进程表单详情
  GetAllCaseMattersFrom: '/api/hd/CaseProcess/GetAllCaseMattersFrom', //获取所有案件事项流程表单
  updataCaseStatus: '/api/hd/Cases/UpdateCaseStatus', //案件结案无律师状态更新
  getAllMatters: '/api/hd/Cases/GetAllCaseMatters', //获取所有办案事项
  getAllAdmin: '/api/hd/admin/GetAdmin_EmailDto', //获取所有管理员
  editMatters: '/api/hd/Cases/UpdateCaseMatters', //修改办案事项 新增id传空 修改传值
  settingCustomer: '/api/hd/Cases/SetCustomerService', //设置案件客服
  settingZhuCustomer: '/api/hd/Cases/SetMainCustomerService', //设置案件主客服
  revokeDistribution: '/api/hd/Cases/CancelCaseLawyer', //撤销分配
  updataCaseRemarks: '/api/hd/Cases/UpdateBackRemarks', //更新案件后台备注
  ContractNotice: '/api/hd/CaseContract/ContractNotice', //线上合同催签
  ContractSee: '/api/hd/CaseContract/ContractSee', //线上合同查看
  ContractDelect: '/api/hd/CaseContract/DeleteContract', //合同删除
  sandReport: '/api/hd/NoticeSend/SendAppraisalReport', //发送评估报告邮件
  lawCaseDelete: '/api/hd/Cases/DeleteCaseById', //删除案件
  updateAccount: '/api/hd/MemberVip/UpdateAccount', //新增或者修改Vip账户
  getCreditorAdminNew: '/api/hd/MemberVip/GetCreditorAdmin', //获取债权人的管理员(新)
  setCreditorAdmin: '/api/hd/CreditorV2/SetCreditorAdmin', //设置债权人管理员
  deletCreditorAdmin: '/api/hd/CreditorV2/DeleteCreditorAdmin', //删除债权人管理员
  accmentDelect: '/api/hd/MemberVip//DeleteMemberVipAccountById', //账户删除
  adminDelect: '/api/hd/MemberVip/DeleteMemberVipAdminById', //大客户管理员删除
  examiningAILawyer: '/api/hd/AILawyerLetter/ExaminingAILawyerLetter', //ai律师函审核
  taskStop: '/api/hd/AILawyerLetter/Stop', //AI律师函停止
  getCollection: '/api/hd/AILawyerLetter/GetCollectionLawyersLetterContent', //获取律师函催收函
  UpdateDebtor: '/api/hd/AILawyerLetter/UpdateDebtor', //更新债务人
  UpdateCollectionLetterContent:
    '/api/hd/AILawyerLetter/UpdateCollectionLetterContent', //更新催收函
  UpdateLawyersLetterContent:
    '/api/hd/AILawyerLetter/UpdateLawyersLetterContent', //更新律师函
  CasesUpdateDebtor: '/api/hd/Cases/UpdateDebtor', //律师办案更新债务人信息
  UpdataReport: '/api/hd/Cases/UpdateThirdAssessmentReport', //更新债务人第三方评估报告
  debtDetailsEdit: '/api/hd/AILawyerLetter/UpdateDebtorDetails', //债务明细编辑
  Recognition: '/api/hd/Tools/Recognition', //证照识别
  AILawyerLetterDownLoad: '/api/hd/AILawyerLetter/DownLoadEMS', //ai律师函快递信息下载
  lawHandleCaseDelete: '/api/hd/Cases/DeleteCaseById', //律师办案管理删除
  smsTongzhi: '/api/hd/AILawyerLetter/SendQuerySMS', //短信通知
  lawyerUpdateSigned: '/api/hd/AILawyerLetter/UpdateSigned', //律师签名更新
  UpdateFeedback: '/api/hd/DebtorFeedback/UpdateFeedback', //新增更改债务反馈
  DeleteDebtorFeedbackById: '/api/hd/DebtorFeedback/DeleteDebtorFeedbackById', //删除债务人反馈
  ExaminingCreditorAdmin: '/api/hd/MemberVip/ExaminingCreditorAdmin', //管理员审核（新）
  textAjax: '/api/hd/Register/PCRegister', //测试跨域
  delectCreditor: '/api/hd/Creditor/DeleteCreditorById', //删除债权人
  GetCreditorAdminByVipId: '/api/hd/MemberVip/GetCreditorAdminByVipId', //获取债权人管理员
  UpdateCreditor: '/api/hd/CreditorV2/UpdateCreditor', //编辑债权人
  CreditorAudit: '/api/hd/CreditorV2/CreditorAudit', //债权人审核
  DeleteCreditor: '/api/hd/CreditorV2/DeleteCreditor', //删除债权人
  UpdatePaySet: '/api/hd/MemberV2/UpdatePaySet', //更新支付设置
  DeleteVipAdmin: '/api/hd/MemberV2/DeleteVipAdmin', //删除VIp管理员
  CreditorAdminAudit: '/api/hd/CreditorV2/CreditorAdminAudit', //债权人授权管理员审核
  LawyerAudit: '/api/hd/MemberV2/LawyerAudit', //律师审核
  DeleteService: '/api/hd/ValueAddedServices/DeleteService', //删除增值服务
  GetQueryQrchivesPagingData:
    '/api/hd/ValueAddedServices/GetQueryQrchivesPagingData', //律师查档分页数据
  GetServiceDetails: '/api/hd/ValueAddedServices/GetServiceDetails', //获取委托服务详情
  UpdateExecutingStates: '/api/hd/ValueAddedServices/UpdateExecutingStates', //增值服务执行进度更新
  UpdateQuotedprice: '/api/hd/ValueAddedServices/UpdateQuotedprice', //增值服务委托报价更新
  UpdateBackRemarks: '/api/hd/ValueAddedServices/UpdateBackRemarks', //增值服务后台备注更新
  GetLitigationFundingPagingData:
    '/api/hd/ValueAddedServices/GetLitigationFundingPagingData', //诉讼助资分页数据
  GetPreservationInsurancePagingData:
    '/api/hd/ValueAddedServices/GetPreservationInsurancePagingData', //保全保险分页
  UpdateQueryArchives: '/api/hd/ValueAddedServices/UpdateQueryArchives', //更新律师查档委托
  UpdatePreservationInsurance:
    '/api/hd/ValueAddedServices/UpdatePreservationInsurance', //更新保全保险
  UpdateLitigationFunding: '/api/hd/ValueAddedServices/UpdateLitigationFunding', //更新诉讼助资委托
  UpdateCourierReceiptStatus:
    '/api/hd/LawyerLetterExpress/UpdateCourierReceiptStatus', //底单状态更新
  DownLoadEMS: '/api/hd/LawyerLetterExpress/DownLoadEMS', //快递信息下载
  SaveCourierNumber: '/api/hd/LawyerLetterExpress/SaveCourierNumber', //快递单号批量保存
  UpdateTaskExecutionTime: '/api/hd/AILawyerLetter/UpdateTaskExecutionTime', //AI律师函修改任务执行时间
  GetCaseJurisdiction: '/api/hd/Cases/GetCaseJurisdiction', //获取案件管辖地及点击次数
  GetRegisterLawyerPagingData:
    '/api/hd/MemberLawyer/GetRegisterLawyerPagingData', //平台注册律师分页数据
  GetOtherLawyerPagingData: '/api/hd/MemberLawyer/GetOtherLawyerPagingData', //第三方律师分页数据
  ReceivingCaseNotice: '/api/hd/Cases/ReceivingCaseNotice', //案件接单通知
  DownLoadReport: '/api/hd/Cases/DownLoadReport', //下载案件分析报告
  UploadReport: '/api/hd/Cases/UploadReport', //上传评估报告
  GetEvidencePagingData: '/api/hd/Evidence/GetEvidencePagingData', //存证分页数据
  getFinance: '/api/hd/CaseFinance/GetCaseFinance', //获取律师办案财务信息
  AddCaseFinance: '/api/hd/CaseFinance/AddCaseFinance', //添加编辑请款记录
  DeleteCaseFinanceById: '/api/hd/CaseFinance/DeleteCaseFinanceById', //删除案件财务数据
  CreateBill: '/api/hd/Bill/CreateBill', //生成账单
  SetLastPaymentTime: '/api/hd/MemberV2/SetLastPaymentTime', //设置最后付款时间
  SetCustomerService: '/api/hd/MemberV2/SetCustomerService', //设置客服
  SetBillCustomerService: '/api/hd/Bill/SetBillCustomerService', //设置账单客服
  GetMemberListByIdOrName: '/api/hd/MemberV2/GetMemberListByIdOrName', //根据id或名称获取用户数据
  getBillInfo: '/api/hd/Bill/GetGenerateBillInfo', //获取账单信息
  GetLawyerListByIdOrName: '/api/hd/MemberV2/GetLawyerListByIdOrName', //根据id或名称获取律师数据
  GetBillDetails: '/api/hd/Bill/GetBillDetails', //获取账单详情
  UpdateBillSettlementStatus: '/api/hd/Bill/UpdateBillSettlementStatus', //更新账单结算状态
  UpdateBillRemarks: '/api/hd/Bill/UpdateBackRemarks', //更新账单备注
  GetMemberVipAdminsByMmeberId: '/api/hd/MemberV2/GetMemberVipAdminsByMmeberId', //根据用户ID获取管理员
  GetMemberVipAdminsByMmeberIdV2:
    '/api/hd/MemberV2/GetMemberVipAdminsByMmeberIdV2', ///根据用户ID获取管理员(发票专用)
  GetMemberInvoicesByMemberId: '/api/hd/Bill/GetMemberInvoicesByMemberId', //获取用户所有发票
  AddInvoice: '/api/hd/Bill/AddInvoice', //新增或编辑发票信息
  SelectInvoice: '/api/hd/Bill/SelectInvoice', //选择发票信息
  getAllTick: '/api/hd/Bill/GetMemberTicketAddressByMemberId', //获取所有收票信息
  AddTicketAddress: '/api/hd/Bill/AddTicketAddress', //新增收票信息
  SelectTicketAddress: '/api/hd/Bill/SelectTicketAddress', //选择收票地址信息
  AddOpenInvoices: '/api/hd/Bill/AddOpenInvoices', //新增或编辑账单开票操作
  GetUnsettledServices: '/api/hd/Bill/GetUnsettledServices', //获取未结算列表
  AddSettlementRecord: '/api/hd/Bill/AddSettlementRecord', //新增结算记录
  AddRefundRecord: '/api/hd/Bill/AddRefundRecord', //新增退款记录
  GetUnsettledRefundRecord: '/api/hd/Bill/GetUnsettledRefundRecord', //获取未退款记录列表
  DeleteRefundRecord: '/api/hd/Bill/DeleteRefundRecord', //删除退款记录
  DeleteSettlementRecord: '/api/hd/Bill/DeleteSettlementRecord', //删除结算记录
  DeleteBillPushObject: '/api/hd/Bill/DeleteBillPushObject', //删除账单推送对象
  DeletePaymentRecord: '/api/hd/Bill/DeletePaymentRecord', //删除账单服务详情
  GetSettlementRecordDetails: '/api/hd/Bill/GetSettlementRecordDetails', //查看结算记录详情
  GetRefundRecordDetails: '/api/hd/Bill/GetRefundRecordDetails', //查看退款记录详情
  GetBillPagingData: '/api/hd/Bill/GetBillPagingData', //获取账单分页列表
  AddCollectionInfo: '/api/hd/Bill/AddCollectionInfo', //新增编辑用户收款信息
  RelationBill: '/api/hd/CaseFinance/RelationBill', //关联账单
  UpdateRequestObject: '/api/hd/CaseFinance/UpdateRequestObject', //更新请款对象
  DeleteBill: '/api/hd/Bill/DeleteBill', //删除账单
  GenerateBillPdf: '/api/hd/Bill/GenerateBillPdf', //生成pdf文件
  AddBillPushObject: '/api/hd/Bill/AddBillPushObject', //新增推送对象
  CloseCase: '/api/hd/Cases/CloseCase', //申请结案
  UpdateCloseCaseRemarks: '/api/hd/Cases/UpdateCloseCaseRemarks', //更新结案备注
  SetSettlementPeriod: '/api/hd/Bill/SetSettlementPeriod', //设置结算周期
  SetBillDate: '/api/hd/Bill/SetBillDate', //设置请款日期或最后付款日期
  UpdateQuotedPrice_03: '/api/hd/Cases/UpdateQuotedPrice_03', //更新案件报价 律师报价
  UpdateQuotedPrice_02: '/api/hd/Cases/UpdateQuotedPrice_02', //更新案件报价  诚收报价
  UpdateQuotedPrice_01: '/api/hd/Cases/UpdateQuotedPrice_01', //更新案件报价 用户报价
  CalculationQuotedPrice_v1: '/api/hd/Cases/CalculationQuotedPrice_v1', //计算案件报价 用户报价
  CalculationQuotedPrice_v2: '/api/hd/Cases/CalculationQuotedPrice_v2', //计算案件报价 诚收报价
  CalculationQuotedPrice_v3: '/api/hd/Cases/CalculationQuotedPrice_v3', //计算案件报价 律师报价
  GetDebtorPagingData: '/api/hd/AILawyerLetter/GetDebtorPagingData', //AI律师函债务人分页数据
  GetDebtorDetailsPagingData:
    '/api/hd/AILawyerLetter/GetDebtorDetailsPagingData', //AI律师函债务明细分页数据
  GetDebtorFeedbackPagingData:
    '/api/hd/AILawyerLetter/GetDebtorFeedbackPagingData', //AI律师函债务反馈分页数据
  GetCaseQuotedPrice: '/api/hd/Cases/GetCaseQuotedPrice', //获取案件报价
  CalculationServiceQuotedPrice: '/api/hd/Cases/CalculationServiceQuotedPrice', //案件评估 计算服务费报价
  SaveCustomerQuotedPrice: '/api/hd/Cases/SaveCustomerQuotedPrice', //保存服务费模式与报价
  AddCheckAdmin: '/api/hd/Cases/AddCheckAdmin', //新增审核管理员
  CheckQuotedPriceNotice: '/api/hd/Cases/CheckQuotedPriceNotice', //发送报价审核通知
  CheckQuotedPrice: '/api/hd/Cases/CheckQuotedPrice', //审核报价
  DeleteCheckAdmin: '/api/hd/Cases/DeleteCheckAdmin', //删除审核管理员
  CalculationLawyerFeeQuotedPrice:
    '/api/hd/Cases/CalculationLawyerFeeQuotedPrice', //计算律师费报价
  SavelawyerQuotedPrice: '/api/hd/Cases/SavelawyerQuotedPrice', //保存律师费报价设置
  SendQuotedPrice: '/api/hd/Cases/SendQuotedPrice', //服务费报价发送至客户确认
  CustomerSelectQuotedPrice: '/api/hd/Cases/CustomerSelectQuotedPrice', //客服选择服务费模式
  GetByid: '/api/hd/docrecord/GetByid', //获取文档编辑内容
  GetVIPAdminPagingData: '/api/hd/MemberV2/GetVIPAdminPagingData', //获取管理员分页数据
  GetMemberCollectionPagingData: '/api/hd/Bill/GetMemberCollectionPagingData', //律所收款信息分页数据
  AddCollectionInfoV2: '/api/hd/Bill/AddCollectionInfoV2', //新增或编辑用户收款信息
  DeleteMemberCollectionById: '/api/hd/Bill/DeleteMemberCollectionById', //删除律所收款信息
  SendFeedbackNotice: '/api/hd/DebtorFeedback/SendFeedbackNotice', //发送债务反馈通知至客户
  SendBillNotice: '/api/hd/Bill/SendBillNotice', //发送账单通知
  GetCreditorByAdminId: '/api/hd/MemberV2/GetCreditorByAdminId', //根据管理员id获取债权人
  GetCreditorPagingData: '/api/hd/CreditorV2/GetCreditorPagingData', //债权人管理分页数据
  GetCreditorAdminByCreditorId: '/api/hd/MemberV2/GetCreditorAdminByCreditorId', //根据债权人ID获取管理员列表
  GetStatisticsAdminData: '/api/hd/StatisticsAdmin/GetStatisticsAdminData', //获取后台统计数据 数字部分
  GetPendingWork: '/api/hd/StatisticsAdmin/GetPendingWork', //获取待办工作
  GetCaseQuotedPriceByAdmin: '/api/hd/Cases/GetCaseQuotedPriceByAdmin', //获取管理员需要审核的报价
  GetStatisticsAdminChartsData:
    '/api/hd/StatisticsAdmin/GetStatisticsAdminChartsData', //获取统计数据 图标部分
  UpdatePresent: '/api/hd/MemberV2/UpdatePresent', //更新赠送数据
  UpdateEMSStatus: '/LawyerLetterExpress/UpdateEMSStatus', //快递状态更新
  AllStop: '/api/hd/AILawyerLetter/AllStop', //AI律师函全部终止
  UpdateBillTitle: '/api/hd/Bill/UpdateBillTitle', //更新账单标题名称
  UpdateContractNumber: '/api/hd/CaseContract/UpdateContractNumber', //更新合同编号
  StopSingleTask: '/api/hd/AILawyerLetter/StopSingleTask', //终止单个任务
  StopAllTask: '/api/hd/AILawyerLetter/StopAllTask', //终止单个委托所有任务
  StopBatchTask: '/api/hd/AILawyerLetter/StopBatchTask', //终止或撤销 批次任务
  GetBillFileByBillNumber: '/api/hd/Bill/GetBillFileByBillNumber', //获取账单pdf文件
  AddCaseMattersFrom: '/api/hd/CaseProcess/AddCaseMattersFrom', //新增案件事项流程
  DeleteCaseMattersById: '/api/hd/CaseProcess/DeleteCaseMattersById', //删除办案事项
  AddCaseMatters: '/api/hd/CaseProcess/AddCaseMatters', //新增案件事项
  DeleteCaseMattersFromById: '/api/hd/CaseProcess/DeleteCaseMattersFromById', //删除办案事项流程
  CaseMattersSort: '/api/hd/CaseProcess/CaseMattersSort', //事项排序
  GetAILawyerLetterExportData:
    '/api/hd/AILawyerLetter/GetAILawyerLetterExportData', //获取AI律师函导出数据
  GetAllAuthorizationFileRecord:
    '/api/hd/CreditorV2/GetAllAuthorizationFileRecord', //获取所有授权书记录
  AddRemarks: '/api/hd/CustomerServiceRemarks/AddRemarks', //新增备注(改：2022/8/8)
  GetRemarksByTypeAndNumber:
    '/api/hd/CustomerServiceRemarks/GetRemarksByTypeAndNumber', //获取备注(改：2022/8/8)
  DeleteRemarksFileByID: '/api/hd/CustomerServiceRemarks/DeleteRemarksFileByID', //根据ID删除备注文件(改：2022/8/8)
  UpdateRemarksContent: '/api/hd/CustomerServiceRemarks/UpdateRemarksContent', //更新备注内容(改：2022/8/8)
  AddRemarksFile: '/api/hd/CustomerServiceRemarks/AddRemarksFile', //新增备注文件(改：2022/8/8)
  DeleteRemarksByID: '/api/hd/CustomerServiceRemarks/DeleteRemarksByID', //根据ID删除备注
  insert: '/api/hd/adminmenu/insert', //菜单设置添加||修改
  GetMenuInfoByid: '/api/hd/adminmenu/GetMenuInfoByid', //获取编辑菜单信息
  GetAllMenuList: '/api/hd/adminmenu/GetAllMenuList', //获取菜单列表
  GetMyMenu: '/api/hd/adminmenu/GetMyMenuV2', //获取当前登录人所有菜单
  Delete: '/api/hd/adminmenu/Delete', //删除菜单
  GetMyAdminRole: '/api/hd/Admin/GetMyAdminRole', //获取当前管理员角色
  GetToDoList: '/api/hd/ToDoList/GetToDoList', //获取待办列表
  AddNotice: '/api/hd/PlatformNotice/AddNotice', //新增通知

  //部分后台使用钱前台接口
  SendLawyersLetter: '/api/pt/Dictionary/Lawyerletter', // 发律师函
  getTableData: '/api/pt/Creditor/GetCreditorList', // 选择债权人弹框列表
  getTableData2: '/api/pt/CreditorV2/GetAllCreditorV3List', //获取所有债权人及对应授权状态
  creditorInsert: '/api/pt/Creditor/UpdateCreditor', //债权人修改
  afterTest: '/api/pt/tools/test', // 上传表格校验-返回
  getTemplateType: '/api/pt/tools/GetExcelPath', // 根据债务人类别获取下载模板所需的路径
  AILawyerLetterInsert: '/api/pt/AILawyerLetter/SaveAILawyer', //ai律师函修改
  sendTextVal: '/api/pt/Tools/Verify', // 发送后台验证
  getCreditorStates: '/api/pt/tools/GetType', // 获取债权人列表
  creditorGetPaging: '/api/pt/Creditor/GetCreditorList', //债权人列表
  getcreditor: '/api/pt/Creditor/GetCreditorInfoByIdV2', //获取债权人详情
  addBill: '/api/pt/Bill/ApplyBill', //申请开票
  addTicket: '/api/pt/Finance/Insert_address', //添加收票地址
  invoiceEdit: '/api/pt/Finance/Insert', //发票添加/修改
  debtorGetPaging: '/api/pt/Debtor/GetPaging', //债务人
  getAILawyerPaging: '/api/pt/AILawyerLetter/AILawyerPagingData', //委托管理
  getInvoiceInfo: '/api/pt/Finance/GetByid', //获取发票详情
  invoiceDelete: '/api/pt/Finance/Delete', //发票删除
  getTicketInfo: '/api/pt/Finance/GetByid_address', //获取收票地址详情
  ticketDelete: '/api/pt/Finance/Delete_address', //收票地址删除
  getCollectionInfo: '/api/pt/CollectMoney/GetCollectMoneyById', //获取收款通道详情
  deletecreditor: '/api/pt/Creditor/DeleteCreditorByid', //债权人删除
  PostRecognition: '/api/pt/Tools/Recognition', //债权人证照识别
  serviceFeeSelection: '/api/pt/Cases/ServiceFeeSelection', //案件确认服务费模式
  getAccountList: '/api/pt/VipMember/GetAccountList', //获取账户列表
  getAccountAdmins: '/api/pt/VipMember/GetAccountAdmin', //获取账户下所有管理员
  UpdatAdmin: '/api/pt/VipMember/UpdateAdmin', //更新管理员
  getAccountCreditors: '/api/pt/Creditor/GetAllCreditorByVipId', //获取账户下所有债权人
  getAdminCreaditors: '/api/pt/Creditor/GetCreditorByAdminId', // 获取管理员设置的债权人
  deleteCreditorAdmin: '/api/pt/Creditor/DeleteCreditorAdmin', //删除管理员的债权人
  deleteAccountAmind: '/api/pt/VipMember/DeleteAdmin', //删除账户下的管理员
  addAccount: '/api/pt/VipMember/UpdateAccount', //添加大客户账户
  deleteAccoundt: '/api/pt/VipMember/DeleteAccount', //删除账户
  GetAILawyerLetterReport: '/api/pt/AILawyerLetter/GetAILawyerLetterReport', //获取AI律师函催收报告
  GenerateReport: '/api/pt/AILawyerLetter/GenerateReport', //生成催收报告
  AddCreditor: '/api/pt/CreditorV2/AddCreditor', //新增债权人
  GetAdminList: '/api/pt/VipMember/GetAdminList', //获取管理员列表
  CreditorAdminSet: '/api/pt/Creditor/CreditorAdminSet', //设置管理员
  GetCreditorListV2: '/api/pt/Creditor/GetCreditorListV2', //获取管理员管理的债权人列表
  AddAdmin: '/api/pt/VipMember/AddAdmin', //新增管理员
  AddService: '/api/pt/Service/AddService', //查档诉讼保险等提交
  GetCreditorAdmin: '/api/pt/CreditorV2/GetCreditorAdmin', //获取所有债权人及对应管理员
  DeleteCreditorAdminById: '/api/pt/CreditorV2/DeleteCreditorAdminById', //删除授权管理员
  DeleteCreditorById: '/api/pt/CreditorV2/DeleteCreditorById', //删除债权人
  GetAllAdmin: '/api/pt/CreditorV2/GetAllAdmin', //获取管理员列表
  AddCreditorAdmin: '/api/pt/CreditorV2/AddCreditorAdmin', //新增授权管理员
  UpdateAdmin: '/api/pt/CreditorV2/UpdateAdmin', //编辑管理员信息
  CreateQueryQrchives: '/api/pt/ValueAddedServices/CreateQueryQrchives', //创建律师查档委托
  CreateLitigationFunding: '/api/pt/ValueAddedServices/CreateLitigationFunding', //创建诉讼助资委托
  AddAuthorization: '/api/pt/CreditorV2/AddAuthorization', //通过新增授权书新增授权管理员
  VerifyAccountName: '/api/pt/VipMember/VerifyAccountName', //验证登录名是否重复
  VerifyPhoneNumber: '/api/pt/VipMember/VerifyPhoneNumber', //验证手机号是否重复
  CreditCode: '/api/pt/CreditorV2/GetCreditorBySocialCreditCode', //通过统一信用代码获取债权人
  VerifyAdminInfo: '/api/pt/VipMember/VerifyAdminInfo', //验证管理员信息是否重复
  GetAdminByNotCreditorId: '/api/pt/CreditorV2/GetAdminByNotCreditorId', //获取未授权指定债权人的管理员
  GetAllCreditorListReverseOrder:
    '/api/pt/CreditorV2/GetAllCreditorListReverseOrder', //获取所有债权人及对应授权状态
  GetAuthorizationTimes: '/api/pt/CreditorV2/GetAuthorizationTimes', //获取管理员授权次数
  UpdateCreditorAdmin: '/api/pt/CreditorV2/UpdateCreditorAdmin', //更新债权人管理员信息
  VerifyAdminInfoForUpdate: '/api/pt/CreditorV2/VerifyAdminInfoForUpdate', //更新管理员时验证手机号或登录名
  establishCase: '/api/pt/Cases/CreateCases', //线下律师催创建案件
  getTableData3: '/api/pt/CreditorV2/GetAllCreditorV2List', //获取所有债权人及对应授权状态
  getshoukuanTableData: '/api/pt/VipMember/GetCollectionAccountListV2', //获取收款信息列表
  addgetmaney: '/api/pt/VipMember/UpdateCollectionAccount', //新增收款信息
  AfterPay: '/api/zf/AfterPay/FirstRushAfterPay' //先催后付
}
