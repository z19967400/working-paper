import Api from "@/utils/request";

//获取账户列表
export const getAccountList = (account_name: string) => {
  return Api.getAccountList({ account_name }, "GET");
};
//获取账户下所有管理员
export const getAccountAdmins = (account_id: number, admin_name: string) => {
  return Api.getAccountAdmins({ account_id, admin_name }, "GET");
};
//更新管理员
export const UpdatAdmin = (parmas: any) => {
  return Api.UpdatAdmin(parmas, "POST");
};
//新增管理员
export const AddAdmin = (parmas: any) => {
  return Api.AddAdmin(parmas, "POST");
};
//获取账户下所有债权人
export const getAccountCreditors = () => {
  return Api.getAccountCreditors({}, "GET");
};
//获取管理员设置的债权人
export const getAdminCreaditors = (admin_id: number) => {
  return Api.getAdminCreaditors({ admin_id }, "GET");
};
//设置管理员债权人
export const setCreditorAdmin = (admin_id: number, creditor_id: number) => {
  return Api.setCreditorAdmin({ admin_id, creditor_id }, "GET");
};
//删除管理员的债权人
export const deleteCreditorAdmin = (admin_id: number, creditor_id: number) => {
  return Api.deleteCreditorAdmin({ admin_id, creditor_id }, "GET");
};
//删除账户下的管理员
export const deleteAccountAmind = (admin_id: number) => {
  return Api.deleteAccountAmind({ admin_id }, "GET");
};
//添加大客户账户
export const addAccount = (parmas: any) => {
  return Api.addAccount(parmas, "POST");
};
//删除账户
export const deleteAccoundt = (account_id: any) => {
  return Api.deleteAccoundt({ account_id }, "GET");
};
//获取管理员管理的债权人列表
export const GetCreditorListV2 = (admin_id: any) => {
  return Api.GetCreditorListV2({ admin_id }, "GET");
};
