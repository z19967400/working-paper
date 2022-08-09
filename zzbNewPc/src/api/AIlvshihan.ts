import Api from "@/utils/request";
import { AIlvshihanOptions } from "@/types/index";
export const getData = () => {
  return Api.getData();
};

//发律师函
export const SendLawyersLetter = (
  params: AIlvshihanOptions["SendLetterOption"]
) => {
  return Api.SendLawyersLetter(params, "GET");
};
// 选择债权人弹框列表
export const getTableData = () => {
  return Api.getTableData(
    { creditor_name: "", phone_number: "", agent_name: "" },
    "GET"
  );
};
// 选择债权人弹框列表
export const getTableData2 = () => {
  return Api.getTableData2({}, "GET");
};
//获取债权人列表
export const getCreditorStates = (dic_category_code: string) => {
  return Api.getCreditorStates({ dic_category_code }, "GET");
};
//债权人修改
export const creditorInsert = (params: AIlvshihanOptions["addParams"]) => {
  return Api.creditorInsert(params, "POST");
};
// 上传表格校验-返回
export const afterTest = (
  user_code: number,
  path: string,
  is_verify_column_name: boolean
) => {
  return Api.afterTest({ user_code, path, is_verify_column_name }, "GET");
};
// 根据债务人类别获取下载模板所需的路径
export const getTemplateType = (
  debt_type: string,
  creditor_states: string,
  entrust_type: string
) => {
  return Api.getTemplateType(
    { debt_type, creditor_states, entrust_type },
    "GET"
  );
};
//ai律师函修改
export const AILawyerLetterInsert = (params: any) => {
  return Api.AILawyerLetterInsert(params, "POST");
};
// 发送后台验证
export const sendTextVal = (content: any, verify_conditions: any) => {
  return Api.sendTextVal({ content, verify_conditions }, "GET");
};
//获取收款信息列表
export const getshoukuanTableData = () => {
  return Api.getshoukuanTableData({}, "GET");
};
// 委托管理
export const getPaging = (params: AIlvshihanOptions["getPaging"]) => {
  return Api.getAILawyerPaging(params, "GET");
};
// 获取委托详情数据
export const getAdmin = (id: string) => {
  return Api.getAdmin({ debtor_number: id }, "GET");
};
//收支详情
export const getpaygetDetails = (id: any) => {
  return Api.getpaygetDetails({ id }, "GET");
};
// 地区练级选择器
// getAddress
export const getAddress = (parent_id: any) => {
  return Api.getAddress({ parent_id }, "GET");
};
//删除收款信息
export const collectionDelete = (id: any) => {
  return Api.collectionDelete({ id }, "GET");
};
//新增收款信息
export const addgetmaney = (params: any) => {
  return Api.addgetmaney(params, "POST");
};
//查看短信发送详情
export const getSmsInfo = (ai_task_code: any, debtor_number: any) => {
  return Api.getSmsInfo({ ai_task_code, debtor_number }, "GET");
};
//查看电话详情
export const getPhoneInfo = (id: number) => {
  return Api.getPhoneInfo({ id }, "GET");
};
//查看邮件详情
export const getEmail = (id: number) => {
  return Api.getEmail({ task_id: id }, "GET");
};
//获取律师函详情
export const getLawyerInfo = (id: number, logistics_id: number) => {
  return Api.getLawyerInfo({ id, logistics_id }, "GET");
};
//线下律师催创建案件
export const establishCase = (parmas: any) => {
  return Api.establishCase(parmas, "POST");
};
//获取线下律师催案件列表
export const getCaseList = (parmas: any) => {
  return Api.getCaseList(parmas, "GET");
};
//获取线下律师案件详情
export const getCaseInfo = (debtor_number: string) => {
  return Api.getCaseInfo({ debtor_number }, "GET");
};
//获取案件办案进度
export const getCasePross = (debtor_number: string) => {
  return Api.getCasePross({ debtor_number, contract_type: 0 }, "GET");
};
//获取大客户支付价格设置
export const getPaySet = () => {
  return Api.getPaySet({}, "GET");
};
//获取待支付列表
export const getPaysList = () => {
  return Api.getPaysList({}, "GET");
};
//获取合同签署短信
export const SignNotice = (id: number) => {
  return Api.SignNotice({ contract_id: id }, "GET");
};
//获取线上签署合同详情
export const getNoticeInfo = (id: number) => {
  return Api.getNoticeInfo({ contract_id: id }, "GET");
};
//获取进程详情
export const getProcessInfo = (id: number) => {
  return Api.getProcessInfo({ matters_from_id: id }, "GET");
};
//获取所有币种列表
export const getCurrency = () => {
  return Api.getCurrency({}, "GET");
};
//获取所有币种列表
export const serviceFeeSelection = (parmas: any) => {
  return Api.serviceFeeSelection(parmas, "GET");
};
//获取所有币种列表
export const stopAiLetter = (debtor_number: string, type: number) => {
  return Api.stopAiLetter({ debtor_number, type }, "GET");
};
//ai律师函待支付列表删除
export const AIlawLetterDelete = (batch_no: string) => {
  return Api.AIlawLetterDelete({ batch_no }, "GET");
};
//获取AI律师函催收报告
export const GetAILawyerLetterReport = (debtor_number: string) => {
  return Api.GetAILawyerLetterReport({ debtor_number }, "GET");
};
//生成催收报告
export const GenerateReport = (id: any) => {
  return Api.GenerateReport({ id }, "GET");
};
//查档诉讼保险等提交
export const AddService = (params: any) => {
  return Api.AddService(params, "POST");
};
//通过新增授权书新增授权管理员
export const AddAuthorization = (params: any) => {
  return Api.AddAuthorization(params, "POST");
};
//获取案件报价
export const GetQuotedPriceByDebtorNumber = (debtor_number: string) => {
  return Api.GetQuotedPriceByDebtorNumber({ debtor_number }, "GET");
};
//用户选择服务费模式
export const CustomerSelectQuotedPrice = (params: any) => {
  return Api.CustomerSelectQuotedPrice(params, "GET");
};
//AI律师函转律师办案
export const CreateCasesByAI = (params: any) => {
  return Api.CreateCasesByAI(params, "POST");
};
//导出AI律师函数据
export const ExportExcel = (params: any) => {
  return Api.ExportExcel(params, "GET");
};
