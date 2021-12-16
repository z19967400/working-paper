import { debtorData } from "./../types/views/debtor.interface";
import Api from "@/utils/request";
// 获取管理页数据
export const debtorGetPaging = (params: debtorData["getData"]) => {
  return Api.debtorGetPaging(params, "GET");
};
