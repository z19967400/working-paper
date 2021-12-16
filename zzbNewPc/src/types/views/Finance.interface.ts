// index.Data 参数类型
export interface Data {
  pageName: string;
  chart: any;
}

// VUEX index.State 参数类型
export interface State {
  author?: string;
}

// GET_DATA_ASYN 接口参数类型
export interface Options {
  GetPaging?: {
    page: number;
    limit: number;
  };
  editCollection?: {
    id: number | string;
    payment_channel_name: string;
    contacts_name: string;
    contacts_phone: string;
    contacts_email: string;
    alipay_account: string;
    payee_name: string;
    bank_name: string;
    bank_account: string;
    pay_remarks: string;
  };
  editTicket?: {
    id: number;
    consignee_name: string;
    consignee_telephone: string;
    consignee_email: string;
    country: string;
    province: string;
    city: string;
    county: string;
    detailed_address: string;
    back_remarks: string;
  };
  addTicket?: {
    id: number;
    consignee_name: string; //收票人姓名
    consignee_telephone: string; // 收票人电话
    consignee_email: string; // 收票人邮箱
    country: string; // 国家
    province: string; // 省份
    city: string; // 城市
    county: string; // 区/县
    detailed_address: string; // 详细地址
    back_remarks: string; // 后台备注
  };
  invoiceEdit?: {
    id: number;
    invoice_type: string; // 发票类型
    invoice_title_type: string; // 发票抬头类型
    invoice_title: string; // 发票抬头
    tax_number: string; // 纳税人识别号
    invoice_tax_rate: string; // 发票税率
    bank_name: string; // 开户银行
    bank_account: string; // 银行账号
    bank_telephone: string; // 银行电话
    country: string; // 国家
    province: string; // 省份
    city: string; // 城市
    county: string; // 区/县
    detailed_address: string; // 详细地址
    back_remarks: string; // 后台备注
  };
}
