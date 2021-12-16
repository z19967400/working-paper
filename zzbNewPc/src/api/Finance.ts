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
export const getTicketDown = () => {
  return Api.getTicketDown({}, "GET");
};
//获取发票下拉
export const getInvoiceDown = () => {
  return Api.getInvoiceDown({}, "GET");
};
