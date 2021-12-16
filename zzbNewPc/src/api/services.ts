import Api from "@/utils/request";

//创建律师查档委托
export const CreateQueryQrchives = (params: any) => {
  return Api.CreateQueryQrchives(params, "POST");
};

//创建诉讼助资委托
export const CreateLitigationFunding = (params: any) => {
  return Api.CreateLitigationFunding(params, "POST");
};

//创建保全保险委托
export const CreatePreservationInsurance = (params: any) => {
  return Api.CreatePreservationInsurance(params, "POST");
};

//律师查档分页数据
export const GetQueryQrchivesPagingData = (params: any) => {
  return Api.GetQueryQrchivesPagingData(params, "GET");
};

//保全保险分页数据
export const GetPreservationInsurancePagingData = (params: any) => {
  return Api.GetPreservationInsurancePagingData(params, "GET");
};

//诉讼助资分页数据
export const GetLitigationFundingPagingData = (params: any) => {
  return Api.GetLitigationFundingPagingData(params, "GET");
};

//根据id 获取地区信息
export const GetAddressDetails = (params: any) => {
  return Api.GetAddressDetails(params, "POST");
};

//删除增值服务委托
export const DeleteService = (params: any) => {
  return Api.DeleteService(params, "GET");
};

//获取委托服务详情
export const GetServiceDetails = (params: any) => {
  return Api.GetServiceDetails(params, "GET");
};
