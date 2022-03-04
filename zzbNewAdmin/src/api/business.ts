import Api from '@/utils/request'
import { businessOptions } from '@/types/index'

//获取债权人列表
export const getCreditorList = (params: businessOptions['getCreditor']) => {
  return Api.getCreditorList(params, 'GET')
}
//获取债权人列表详情
export const getCreditorListInfo = (id: number) => {
  return Api.getCreditorListInfo({ id }, 'GET')
}
//债权人列表删除
export const creditorListDelet = (id: number) => {
  return Api.creditorListDelet({ id }, 'GET')
}
//获取ai律师函委托列表
export const getEntrusted = (params: businessOptions['getEntrusted']) => {
  return Api.getEntrusted(params, 'GET')
}
//ai律师函删除
export const entrustDelete = (id: number) => {
  return Api.entrustDelete({ batch_no: id }, 'GET')
}
//ai律师函委托撤销
export const entrustRevoke = (id: number) => {
  return Api.entrustRevoke({ batch_no: id }, 'GET')
}
//获取字典类别
export const GetType = (dic_category_code: string) => {
  return Api.GetType({ dic_category_code }, 'GET')
}
//债权人编辑修改
export const creditorEdit = (params: businessOptions['creditorEdit']) => {
  return Api.creditorEdit(params, 'POST')
}
//获取债权人的会员列表
export const getCreditorUser = (params: any) => {
  return Api.getCreditorUser(params, 'GET')
}
//获取债权人的管理员列表
export const getCreditorAdmin = (id: number) => {
  return Api.getCreditorAdmin({ id }, 'GET')
}
//获取债务人列表
export const getDebtorList = (params: businessOptions['getDebtor']) => {
  return Api.getDebtorList(params, 'GET')
}
//获取律师函管理
export const getAiLawyerAdmin = (id: number) => {
  return Api.getAiLawyerAdmin({ batch_no: id }, 'GET')
}
//ai律师函管理界面审核
export const AILawyAdminShenhe = (parmas: any) => {
  return Api.AILawyAdminShenhe(parmas, 'POST')
}
//获取债务人反馈列表
export const getFeedbackList = (parmas: businessOptions['getFeedback']) => {
  return Api.getFeedbackList(parmas, 'GET')
}
//债务人反馈删除
export const feedbackDelet = (id: number) => {
  return Api.feedbackDelet({ id }, 'GET')
}
//债务人反馈新增修改
export const addFeedback = (parmas: businessOptions['addFeedback']) => {
  return Api.addFeedback(parmas, 'POST')
}
//获取债务人反馈详情
export const getFeedbackInfo = (id: number) => {
  return Api.getFeedbackInfo({ id }, 'GET')
}
//债务人检索
export const obligorRetrieval = (debtor_number: string) => {
  return Api.obligorRetrieval({ debtor_number }, 'GET')
}
//获取客服列表
export const getKefu = () => {
  return Api.getKefu({}, 'GET')
}
//获取律师函管理列表
export const getlawyerAdminList = (parmas: any) => {
  return Api.getlawyerAdminList(parmas, 'GET')
}
//获取ai律师函管理列表详情
export const getLawyerAdminInfo = (id: number) => {
  return Api.getLawyerAdminInfo({ logistics_id: id }, 'GET')
}
//快递信息更新
export const joinExpress = (parmas: any) => {
  return Api.joinExpress(parmas, 'POST')
}
//新增快递信息
export const addExpress = (parmas: any) => {
  return Api.addExpress(parmas, 'POST')
}
//快递信息删除
export const delectExpress = (id: any) => {
  return Api.delectExpress({ id }, 'GET')
}
//新增快递信息
export const MemberCollectMoneyEdit = (
  parmas: businessOptions['MemberCollectMoneyEdit']
) => {
  return Api.MemberCollectMoneyEdit(parmas, 'POST')
}
//获取会员收款信息列表
export const getMemberCollectList = (
  parmas: businessOptions['getMemberCollectMoney']
) => {
  return Api.getMemberCollectList(parmas, 'GET')
}
//会员收款信息删除
export const memberCollectDelet = (id: number) => {
  return Api.memberCollectDelet({ id }, 'GET')
}
//获取会员收款信息详情
export const getMemberCollectInfo = (id: number) => {
  return Api.getMemberCollectInfo({ id }, 'GET')
}
//债务人反馈下载
export const toolsDownload = (parmas: any) => {
  return Api.toolsDownload(parmas, 'GET')
}
//获取发送邮箱
export const getSendEmail = (parmas: any) => {
  return Api.getSendEmail(parmas, 'GET')
}
//发送审核结果
export const sendEmail = (parmas: any) => {
  return Api.sendEmail(parmas, 'GET')
}
//查看短信发送详情
export const getSmsInfo = (id: number) => {
  return Api.getSmsInfo({ id }, 'GET')
}
//获取短信/电话详情
export const getPhoneInfo = (Parmas: any) => {
  return Api.getPhoneInfo(Parmas, 'GET')
}
//查看邮件详情
export const getEmail = (id: number) => {
  return Api.getEmail({ id }, 'GET')
}
//获取律师函详情
export const getLawyerInfo = (id: number, logistics_id: number) => {
  return Api.getLawyerInfo({ id, logistics_id }, 'GET')
}
//债务人编辑
export const debtorEdit = (parmas: any) => {
  return Api.debtorEdit(parmas, 'POST')
}
//获取债务人详情
export const getDebtorInfo = (id: number) => {
  return Api.getDebtorInfo({ id }, 'GET')
}
//债务人地址修改
export const debtorAddressEdit = (parmas: any) => {
  return Api.debtorAddressEdit(parmas, 'POST')
}
//委托备注
export const breakSave = (id: number, back_remarks: string) => {
  return Api.breakSave({ batch_no: id, back_remarks }, 'POST')
}
//获取线下律师办案案件列表
export const getOfflineCaseList = (params: any) => {
  return Api.getOfflineCaseList(params, 'GET')
}
//获取线下律师办案详情
export const getOfflineCaseInfo = (debtor_number: string) => {
  return Api.getOfflineCaseInfo({ debtor_number }, 'GET')
}
//获取案件评估数据
export const getCaseAssment = (debtor_number: string) => {
  return Api.getCaseAssment({ debtor_number }, 'GET')
}
//案件评估更新债务人信用信息
export const upDataDebtorCredit = (parmas: any) => {
  return Api.upDataDebtorCredit(parmas, 'POST')
}
//案件评估胜诉率更新
export const upDataWinrate = (parmas: any) => {
  return Api.upDataWinrate(parmas, 'POST')
}
//案件胜诉率计算
export const calculationWinrates = (debtor_number: string) => {
  return Api.calculationWinrates({ debtor_number }, 'GET')
}
//案件回款率更新
export const upDataCollectionRate = (parmas: any) => {
  return Api.upDataCollectionRate(parmas, 'POST')
}
//计算回款率
export const calculationCollectionRate = (debtor_number: any) => {
  return Api.calculationCollectionRate({ debtor_number }, 'GET')
}
//费用预估
export const costEdit = (parmas: any) => {
  return Api.costEdit(parmas, 'GET')
}
//报价更新
export const upDataOffer = (parmas: any) => {
  return Api.upDataOffer(parmas, 'POST')
}
//计算案件报价
export const calcilationOffer = (debtor_number: any) => {
  return Api.calcilationOffer({ debtor_number }, 'GET')
}
//案件发布
export const caseRelease = (debtor_number: any) => {
  return Api.caseRelease({ debtor_number }, 'GET')
}
//选择评估服务费模式
export const selectOffer = (parmas: any) => {
  return Api.selectOffer(parmas, 'GET')
}
//选择评估服务费模式
export const editJurisdiction = (parmas: any) => {
  return Api.editJurisdiction(parmas, 'POST')
}
//获取案件可分配律师
export const getCaseLawyer = (parmas: any) => {
  return Api.getCaseLawyer(parmas, 'GET')
}
//分配案件
export const distributionCase = (parmas: any) => {
  return Api.distributionCase(parmas, 'GET')
}
//获取合同列表
export const getContracts = (debtor_number: string) => {
  return Api.getContracts({ debtor_number }, 'GET')
}
//获取合同签署人信息
export const getContractSigner = (parmas: any) => {
  return Api.getContractSigner(parmas, 'GET')
}
//创建合同
export const createContract = (parmas: any) => {
  return Api.createContract(parmas, 'POST')
}
//获取合同详情
export const getContractInfo = (contract_id: number) => {
  return Api.getContractInfo({ contract_id }, 'GET')
}
//获取案件法院信息
export const getCaseCourtInfo = (debtor_number: string) => {
  return Api.getCaseCourtInfo({ debtor_number }, 'GET')
}
//获取案件事项
export const getCaseMatter = (debtor_number: string) => {
  return Api.getCaseMatter({ debtor_number }, 'GET')
}
//无律师接案
export const updataCaseStatus = (parmas: any) => {
  return Api.updataCaseStatus(parmas, 'GET')
}
//获取所以办案事项
export const getAllMatters = () => {
  return Api.getAllMatters({}, 'GET')
}
//获取管理员下拉
export const getAllAdmin = () => {
  return Api.getAllAdmin({}, 'GET')
}
//获取币种下拉
export const getCurrency = () => {
  return Api.getCurrency({}, 'GET')
}
//修改办案事项
export const editMatters = (parmas: any) => {
  return Api.editMatters(parmas, 'GET')
}
//设置案件客服
export const settingCustomer = (parmas: any) => {
  return Api.settingCustomer(parmas, 'GET')
}
//设置案件主客服
export const settingZhuCustomer = (parmas: any) => {
  return Api.settingZhuCustomer(parmas, 'GET')
}
//撤销分配律师
export const revokeDistribution = (id: any) => {
  return Api.revokeDistribution({ id }, 'GET')
}
//更新案件后台备注
export const updataCaseRemarks = (parmas: any) => {
  return Api.updataCaseRemarks(parmas, 'POST')
}
//线上合同催签
export const ContractNotice = (contract_id: number) => {
  return Api.ContractNotice({ contract_id }, 'GET')
}
//线上合同查看
export const ContractSee = (contract_id: number) => {
  return Api.ContractSee({ contract_id }, 'GET')
}
//合同删除
export const ContractDelect = (contract_id: number) => {
  return Api.ContractDelect({ contract_id }, 'GET')
}
//发送邮件
export const sandReport = (parmas: any) => {
  return Api.sandReport(parmas, 'GET')
}
//获取案件进程详情
export const getCaseFormInfo = (id: any) => {
  return Api.getCaseFormInfo({ matters_from_id: id }, 'GET')
}
//删除案件
export const deleteCaseById = (id: any) => {
  return Api.lawCaseDelete({ case_id: id }, 'GET')
}
//债权人审核确认
export const confirmExamine = (parmas: any) => {
  return Api.confirmExamine(parmas, 'POST')
}
//ai律师函审核
export const examiningAILawyer = (parmas: any) => {
  return Api.examiningAILawyer(parmas, 'POST')
}
//AI律师函停止
export const taskStop = (debtor_number: string) => {
  return Api.taskStop({ debtor_number }, 'GET')
}
//获取律师函催收函详情
export const getCollection = (debtor_number: string) => {
  return Api.getCollection({ debtor_number }, 'GET')
}
//更新债务人
export const UpdateDebtor = (parmas: any) => {
  return Api.UpdateDebtor(parmas, 'POST')
}
//更新催款函
export const UpdateCollectionLetterContent = (parmas: any) => {
  return Api.UpdateCollectionLetterContent(parmas, 'POST')
}
//更新律师函
export const UpdateLawyersLetterContent = (parmas: any) => {
  return Api.UpdateLawyersLetterContent(parmas, 'POST')
}
//律师办案更新债务人信息
export const CasesUpdateDebtor = (parmas: any) => {
  return Api.CasesUpdateDebtor(parmas, 'POST')
}
//更新第三方评估报告
export const UpdataReport = (parmas: any) => {
  return Api.UpdataReport(parmas, 'GET')
}
//债务明细编辑
export const debtDetailsEdit = (parmas: any) => {
  return Api.debtDetailsEdit(parmas, 'POST')
}
//ai律师函快递信息下载
export const AILawyerLetterDownLoad = (batch_no: string) => {
  return Api.AILawyerLetterDownLoad({ batch_no: batch_no }, 'GET')
}
//律师办案案件删除
export const lawHandleCaseDelete = (case_id: string) => {
  return Api.lawHandleCaseDelete({ case_id }, 'GET')
}
//律师办案案件删除
export const smsTongzhi = (parmas: any) => {
  return Api.smsTongzhi(parmas, 'GET')
}
//律师签名更新
export const lawyerUpdateSigned = (parmas: any) => {
  return Api.lawyerUpdateSigned(parmas, 'POST')
}
//新增更改债务反馈
export const UpdateFeedback = (parmas: any) => {
  return Api.UpdateFeedback(parmas, 'POST')
}
//新增更改债务反馈
export const DeleteDebtorFeedbackById = (id: any) => {
  return Api.DeleteDebtorFeedbackById({ id }, 'GET')
}
//底单状态更新
export const UpdateCourierReceiptStatus = (parmas: any) => {
  return Api.UpdateCourierReceiptStatus(parmas, 'POST')
}
//快递信息下载
export const DownLoadEMS = (parmas: any) => {
  return Api.DownLoadEMS(parmas, 'GET')
}
//快递单号批量保存
export const SaveCourierNumber = (parmas: any) => {
  return Api.SaveCourierNumber(parmas, 'POST')
}
//AI律师函修改任务执行时间
export const UpdateTaskExecutionTime = (parmas: any) => {
  return Api.UpdateTaskExecutionTime(parmas, 'POST')
}
//获取案件管辖地及点击次数
export const GetCaseJurisdiction = (number: string) => {
  return Api.GetCaseJurisdiction({ debtor_number: number }, 'GET')
}
//平台注册律师分页数据
export const GetRegisterLawyerPagingData = (parmas: any) => {
  return Api.GetRegisterLawyerPagingData(parmas, 'GET')
}
//第三方律师分页数据
export const GetOtherLawyerPagingData = (parmas: any) => {
  return Api.GetOtherLawyerPagingData(parmas, 'GET')
}
//案件接单通知
export const ReceivingCaseNotice = (parmas: any) => {
  return Api.ReceivingCaseNotice(parmas, 'POST')
}
//下载案件分析报告
export const DownLoadReport = (parmas: any) => {
  return Api.DownLoadReport(parmas, 'GET')
}
//上传评估报告
export const UploadReport = (parmas: any) => {
  return Api.UploadReport(parmas, 'POST')
}
//存证分页数据
export const GetEvidencePagingData = (parmas: any) => {
  return Api.GetEvidencePagingData(parmas, 'GET')
}
//获取律师办案财务信息
export const getFinance = (debtor_number: any) => {
  return Api.getFinance({ debtor_number }, 'GET')
}
//结案申请
export const CloseCase = (parmas: any) => {
  return Api.CloseCase(parmas, 'POST')
}
//更新结案备注
export const UpdateCloseCaseRemarks = (parmas: any) => {
  return Api.UpdateCloseCaseRemarks(parmas, 'POST')
}
//更新案件报价 用户报价
export const UpdateQuotedPrice_01 = (parmas: any) => {
  return Api.UpdateQuotedPrice_01(parmas, 'POST')
}
//更新案件报价 用户报价
export const UpdateQuotedPrice_02 = (parmas: any) => {
  return Api.UpdateQuotedPrice_02(parmas, 'POST')
}
//更新案件报价 用户报价
export const UpdateQuotedPrice_03 = (parmas: any) => {
  return Api.UpdateQuotedPrice_03(parmas, 'POST')
}
//计算案件报价 用户报价
export const CalculationQuotedPrice_v1 = (debtor_number: string) => {
  return Api.CalculationQuotedPrice_v1({ debtor_number }, 'GET')
}
//计算案件报价 诚收报价
export const CalculationQuotedPrice_v2 = (debtor_number: string) => {
  return Api.CalculationQuotedPrice_v2({ debtor_number }, 'GET')
}
//计算案件报价 律师报价
export const CalculationQuotedPrice_v3 = (debtor_number: string) => {
  return Api.CalculationQuotedPrice_v3({ debtor_number }, 'GET')
}
//AI律师函债务人分页数据
export const GetDebtorPagingData = (parmas: string) => {
  return Api.GetDebtorPagingData(parmas, 'GET')
}
//AI律师函债务明细分页数据
export const GetDebtorDetailsPagingData = (parmas: string) => {
  return Api.GetDebtorDetailsPagingData(parmas, 'GET')
}
//AI律师函债务反馈分页数据
export const GetDebtorFeedbackPagingData = (parmas: string) => {
  return Api.GetDebtorFeedbackPagingData(parmas, 'GET')
}
//获取案件报价
export const GetCaseQuotedPrice = (debtor_number: string) => {
  return Api.GetCaseQuotedPrice({ debtor_number }, 'GET')
}
//计算服务费报价
export const CalculationServiceQuotedPrice = (debtor_number: string) => {
  return Api.CalculationServiceQuotedPrice({ debtor_number }, 'GET')
}
//保存服务费模式与报价
export const SaveCustomerQuotedPrice = (parmas: any) => {
  return Api.SaveCustomerQuotedPrice(parmas, 'POST')
}
//新增审核管理员
export const AddCheckAdmin = (parmas: any) => {
  return Api.AddCheckAdmin(parmas, 'POST')
}
//发送报价审核通知
export const CheckQuotedPriceNotice = (parmas: any) => {
  return Api.CheckQuotedPriceNotice(parmas, 'GET')
}
//审核报价
export const CheckQuotedPrice = (parmas: any) => {
  return Api.CheckQuotedPrice(parmas, 'POST')
}
//删除审核管理员
export const DeleteCheckAdmin = (id: Number) => {
  return Api.DeleteCheckAdmin({ id }, 'GET')
}
//计算律师费报价
export const CalculationLawyerFeeQuotedPrice = (debtor_number: string) => {
  return Api.CalculationLawyerFeeQuotedPrice({ debtor_number }, 'GET')
}
//保存律师费报价
export const SavelawyerQuotedPrice = (parmas: any) => {
  return Api.SavelawyerQuotedPrice(parmas, 'POST')
}
//发送服务费报价至客户
export const SendQuotedPrice = (parmas: any) => {
  return Api.SendQuotedPrice(parmas, 'GET')
}
//客服选择服务费模式
export const CustomerSelectQuotedPrice = (parmas: any) => {
  return Api.CustomerSelectQuotedPrice(parmas, 'GET')
}
//发送债务反馈通知至客户
export const SendFeedbackNotice = (id: any) => {
  return Api.SendFeedbackNotice({ id }, 'GET')
}
