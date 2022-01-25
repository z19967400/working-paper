import Api from "@/utils/request";
import { Options } from "@/types/index";
export const getData = () => {
  return Api.getData();
};
//获取账单管理列表
export const getBill = (params: Options["GetPaging"]) => {
  return Api.getBill(params, "GET");
};
//获取账单详情
export const getBillInfo = (id: number) => {
  return Api.getBillInfo({ id }, "GET");
};
//获取收支列表
export const getDetails = (params: Options["GetPaging"]) => {
  return Api.getDetails(params, "GET");
};
//获取开票信息列表
export const getInformation = (params: Options["GetPaging"]) => {
  return Api.getInformation(params, "GET");
};
//获取收票信息列表
export const ticketCollection = (params: Options["GetPaging"]) => {
  return Api.ticketCollection(params, "GET");
};
//收款通道列表
export const getCollection = (params: Options["GetPaging"]) => {
  return Api.getCollection(params, "GET");
};
//收款通道列表删除
export const collectionDelete = (id: number) => {
  return Api.collectionDelete({ id }, "GET");
};
//收款通道编辑/新增
export const addCollection = (params: Options["editCollection"]) => {
  return Api.addCollection(params, "POST");
};
//申请开票
export const addBill = (params: any) => {
  return Api.addBill(params, "GET");
};
//添加收票地址
export const addTicket = (params: Options["addTicket"]) => {
  return Api.addTicket(params, "POST");
};
//发票添加/修改
export const invoiceEdit = (params: Options["invoiceEdit"]) => {
  return Api.invoiceEdit(params, "POST");
};
//获取发票详情
export const getInvoiceInfo = (id: number) => {
  return Api.getInvoiceInfo({ id }, "GET");
};
//发票删除
export const invoiceDelete = (id: number) => {
  return Api.invoiceDelete({ id }, "GET");
};
//获取收票地址详情
export const getTicketInfo = (id: number) => {
  return Api.getTicketInfo({ id }, "GET");
};
//收票地址删除
export const ticketDelete = (id: number) => {
  return Api.ticketDelete({ id }, "GET");
};
//获取收款通道详情
export const getCollectionInfo = (id: number) => {
  return Api.getCollectionInfo({ collect_money_id: id }, "GET");
};
//获取收支明细详情
export const getDetailedInfo = (id: number) => {
  return Api.getDetailedInfo({ id }, "GET");
};
//获取收票下拉
export const getTicketDown = (parmas: any) => {
  return Api.getTicketDown(parmas, "GET");
};
//获取发票下拉
export const getInvoiceDown = (invoice_name: string) => {
  return Api.getInvoiceDown({ invoice_name }, "GET");
};
//获取账单分页列表
export const GetBillPagingData = (parmas: any) => {
  return Api.GetBillPagingData(parmas, "GET");
};
//获取账单详情
export const GetBillDetailsByBillNumber = (id: string) => {
  return Api.GetBillDetailsByBillNumber({ bill_number: id }, "GET");
};
//获取AI律师函服务明细
export const GetAIPayRecordsPagingData = (parmas: any) => {
  return Api.GetAIPayRecordsPagingData(parmas, "GET");
};
//获取法律服务明细
export const GetCasePayRecordsPagingData = (parmas: any) => {
  return Api.GetCasePayRecordsPagingData(parmas, "GET");
};
//新增编辑发票信息
export const UpdateInvoice = (parmas: any) => {
  return Api.UpdateInvoice(parmas, "POST");
};
//选择账单发票
export const SelectBillInvoice = (parmas: any) => {
  return Api.SelectBillInvoice(parmas, "GET");
};
//选择收票地址信息
export const SelectBillTicketAddress = (parmas: any) => {
  return Api.SelectBillTicketAddress(parmas, "GET");
};
//新增编辑收票地址
export const UpdateTicketAddress = (parmas: any) => {
  return Api.UpdateTicketAddress(parmas, "POST");
};
//账单申请开票
export const ApplyInvoicing = (bill_number: string) => {
  return Api.ApplyInvoicing({ bill_number }, "GET");
};
//发票删除
export const DeleteInvoice = (id: number) => {
  return Api.DeleteInvoice({ id }, "GET");
};
//收票删除
export const DeleteTicketAddress = (id: number) => {
  return Api.DeleteTicketAddress({ id }, "GET");
};
