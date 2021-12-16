// creditorGetPaging 参数类型
export interface creditorData {
  getData?: {
    page: number;
    limit: number;
    // 债权人名称
    creditor_name: string;
    // vip账户名称
    account_name: string;
    // vip管理员名称
    admin_name: string;
  };
  //修改
  getcreditordata?: {};
}
