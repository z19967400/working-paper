//财务菜单接口
export interface finance {
  //收支列表页
  getinandout?: {
    page: number
    limit: number
  }
  // 账单列表
  getpagingbill?: {
    page: number
    limit: number
  }
  //发票管理列表页
  getpaginginvoice?: {
    page: number
    limit: number
  }
  //收票管理列表页
  getpaginggitinvoice?: {
    page: number
    limit: number
  }
  // 生成Ai律师函
  getpagingbilltable?: {
    page: number
    limit: number
    // 会员id
    member_id: any
    // 会员名称
    name: any
    // vip账户名称
    account_name: any
    // 管理员名称
    admin_name: any
    // 支付方式
    pay_method: any
  }
  //生成账单
  getbillinsertlist?: {
    type: number
    member_id: number
    member_vip_account_id: number
    invoice_title: any
    total_amount: any
    back_remarks: any
    pay_numbers: any
    paid_amount: any
  }
  //发票新增||修改
  posteditinvoice?: {
    id: number
    member_id: number
    member_vip_account_id: number
    member_vip_admin_id: number
    // 发票类型
    invoice_type: any
    // 发票抬头类型
    invoice_title_type: any
    // 发票抬头
    invoice_title: any
    // 纳税人识别号
    tax_number: any
    // 发票税率
    invoice_tax_rate: any
    // 开户银行
    bank_name: any
    // 银行账号
    bank_account: any
    // 银行电话
    bank_telephone: any
    // 国家
    country: any
    // 省份
    province: any
    // 城市
    city: any
    // 区/县
    county: any
    // 详细地址
    detailed_address: any
    // 后台备注
    back_remarks: any
  }
  //收票地址新增||修改
  editinvaeditaddress?: {
    id: number
    member_id: number
    //vip会员账户id
    member_vip_account_id: number
    //vip用户管理员id
    member_vip_admin_id: number
    //收票人姓名
    consignee_name: string | any
    // 收票人电话
    consignee_telephone: any
    // 收票人邮箱
    consignee_email: any
    // 国家
    country: any
    // 省份
    province: any
    // 城市
    city: any
    // 区/县
    county: any
    // 详细地址
    detailed_address?: any
    // 后台备注
    back_remarks?: any
  }
  //开票编辑
  openInvoice?: {
    id: number
    bill_number: string // 账单编号
    invoice_object: string // 开票对象
    invoice_id: number // 发票id
    invoice_type: string // 发票类型
    invoice_title_type: string // 发票抬头类型
    invoice_title: string // 发票抬头
    invoice_number: string //发票号码
    tax_number: string // 纳税人识别号
    bank_name: string // 开户银行
    bank_account: string // 银行账号
    bank_telephone: string // 银行电话
    bank_address: string // 详细地址
    open_invoice_type: string // 开票类型
    invoice_tax_rate: number // 发票税率
    invoice_address_id: number // 收票地址id
    consignee_name: string // 收票人姓名
    consignee_telephone: string // 收票人电话
    consignee_email: string // 收票人邮箱
    consignee_address: string // 详细地址
    is_cash_delivery: number // 是否到付 0：否 1：是
    collect_money_id: number // 收款信息id
    payee_name: string // 收款人姓名
    alipay_account: string // 支付宝账号
    tracking_number: string // 快递单号
    invoice_time: string // 开票日期
    back_remarks: string // 后台备注
    invoice_status: string //开票状态
    invoice_amount: number //发票金额
  }
}
