import Api from "@/utils/request";
import { getPagingParms } from "@/types/index";

export const getPaging = (params: getPagingParms) => {
  return Api.getPaging(params, "GET");
};
//获取字典状态
export const getStates = (category_code: string) => {
  let params: any = {
    page: 1,
    limit: 50,
    category_code: category_code,
    dic_content: ""
  };
  return Api.getDictionary(params, "GET");
};
