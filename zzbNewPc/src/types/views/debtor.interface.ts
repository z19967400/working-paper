// creditorGetPaging 参数类型
export interface debtorData {
  getData?: {
    page: number;
    limit: number;
    // 债务人名称
    debtor_name: string;
    // vip账户名称
    account_name: string;
    // vip管理员名称
    admin_name: string;
  };
}
