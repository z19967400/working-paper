import { creditorData, AIlvshihanOptions } from "./../types/index";
import Api from "@/utils/request";
// 获取管理页数据
export const creditorGetPaging = (params: creditorData["getData"]) => {
  return Api.creditorGetPaging(params, "GET");
};
//获取债权人编辑
// getcreditor
export const getcreditor = (id: any) => {
  return Api.getcreditor({ creditor_id: id }, "GET");
};
//债权人提交
export const getcreditordata = (params: creditorData["getcreditordata"]) => {
  return Api.getcreditordata(params, "GET");
};
//债权人删除
export const deletecreditor = (id: any) => {
  return Api.deletecreditor({ creditor_id: id }, "GET");
};
//债权人新增||修改（已废弃）
export const creditorInsert = (params: AIlvshihanOptions["addParams"]) => {
  return Api.creditorInsert(params, "POST");
};
//债权人添加证照识别
export const PostRecognition = (params: any) => {
  return Api.PostRecognition(params, "POST");
};
//新增债权人
export const AddCreditor = (params: any) => {
  return Api.AddCreditor(params, "POST");
};
//获取管理员
export const GetAdminList = (params: any) => {
  return Api.GetAdminList(params, "GET");
};
//删除债权人的管理员
export const deleteCreditorAdmin = (admin_id: any, creditor_id: any) => {
  return Api.deleteCreditorAdmin({ admin_id, creditor_id }, "GET");
};
//设置管理员
export const CreditorAdminSet = (params: any) => {
  return Api.CreditorAdminSet(params, "POST");
};
//获取管理员信息
export const getAdminInfo = (admin_id: any) => {
  return Api.getAdminInfo({ admin_id }, "GET");
};
//获取所有债权人及其对应管理员
export const GetCreditorAdmin = () => {
  return Api.GetCreditorAdmin({}, "GET");
};
//删除授权管理员
export const DeleteCreditorAdminById = (id: number) => {
  return Api.DeleteCreditorAdminById({ creditor_admin_id: id }, "GET");
};
//删除授权管理员
export const DeleteCreditorById = (id: number) => {
  return Api.DeleteCreditorById({ creditor_id: id }, "GET");
};
//获取所有管理员
export const GetAllAdmin = () => {
  return Api.GetAllAdmin({}, "GET");
};
//新增授权管理员
export const AddCreditorAdmin = (parmas: any) => {
  return Api.AddCreditorAdmin(parmas, "POST");
};
//编辑管理员信息
export const UpdateAdmin = (parmas: any) => {
  return Api.UpdateAdmin(parmas, "POST");
};
//通过统一信用代码获取债权人
export const CreditCode = (code: string) => {
  return Api.CreditCode({ code }, "GET");
};
//验证管理员信息是否重复
export const VerifyAdminInfo = (parmas: any) => {
  return Api.VerifyAdminInfo(parmas, "GET");
};
//获取未授权指定债权人的管理员
export const GetAdminByNotCreditorId = (creditor_id: any) => {
  return Api.GetAdminByNotCreditorId({ creditor_id }, "GET");
};
//获取所有债权人及对应授权状态
export const GetAllCreditorListReverseOrder = () => {
  return Api.GetAllCreditorListReverseOrder({}, "GET");
};
