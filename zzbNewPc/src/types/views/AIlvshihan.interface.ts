// AIlvshihan.Data 参数类型
export interface AIlvshihanData {}

// VUEX AIlvshihan.State 参数类型
export interface AIlvshihanState {}

// GET_DATA_ASYN 接口参数类型
export interface AIlvshihanOptions {
  SendLetterOption?: {
    debt_type: string;
    creditor_states: string;
    lawyer_letter_send: string;
    logo_type: string;
  };
  addParams?: {
    creditor_name: string;
    creditor_type: string;
    license_img_url: string;
    license_no: string;
    phone_number: string;
    email: string;
    country: string;
    province: string;
    city: string;
    county: string;
    detailed_address: any;
  };
  getPaging?: {
    page: number;
    limit: number;
    batch_no: string;
    debtor_no: string;
    creditor_name: string;
    debtor_name: string;
    address_txt: string;
    time: string;
    executing_states: string;
  };
}
