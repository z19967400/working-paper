import Api from "@/utils/request";

export const getData = () => {
  return Api.getData();
};
//获取债务人反馈详情
export const getDebtFeadback = (id: number) => {
  return Api.getDebtFeadback({ id }, "GET");
};
//新增债务人反馈
export const addFeadBack = (parmas: any) => {
  return Api.addFeadBack(parmas, "POST");
};
//修改账户信息
export const UpdateAccountInfo = (parmas: any) => {
  return Api.UpdateAccountInfo(parmas, "POST");
};
//验证登录名是否重复
export const VerifyAccountName = (account_name: string) => {
  return Api.VerifyAccountName({ account_name }, "GET");
};
//验证手机号是否重复
export const VerifyPhoneNumber = (phone_number: string) => {
  return Api.VerifyPhoneNumber({ phone_number }, "GET");
};
//获取当前登录管理员信息
export const getAdminInfo = () => {
  return Api.getAdminInfo({ admin_id: 0 }, "GET");
};
