
/**
 *  is_wechat: 是否为微信 0：否 1：是, 
 * creditor_id: 债权人Id, 
 * debt_type: 债务类别 企业应收 ：Debt_type_4  民间借贷： Debt_type_0, 
 * debtor_name: 债务人名称, 
 * debtor_type: 债务人类别 企业： Creditor_states_0  个人：Creditor_states_1, 
 * contact_person: 负责人姓名 债务人为公司时填写
 * phone_number: 手机号码, 
 * email: 电子邮箱, 
 * country: 国家, 
 * province:省, 
 * city: 市, 
 * county: 区, 
 * detailed_address: 详细地址, 
 * arrearage_type: 欠费类型, 
 * currency_id: 币种, 
 * arrears_principal: 欠款本金, 
 * arrears_interest: 欠款利息
 * creditor_name：债权人名称
 * creditor_telphone：债权人电话
 * creditor_email:债权人邮件
 */
export default interface CreateParmas{
  is_wechat:number
  creditor_id:number
  debt_type:string
  debtor_name:string
  debtor_type:string
  contact_person:string
  phone_number:string
  address:string
  email:string
  country:number
  province:number
  city:number
  county:number
  detailed_address:string
  arrearage_type:string
  currency_id:number
  arrears_principal:any
  arrears_interest:any
  creditor_name:string
  creditor_telphone:string
  creditor_email:string
}