import Api from '@/utils/request'
import { finance } from '@/types/index'

// 收支列表页
export const getinandout = (params: finance['getinandout']) => {
  return Api.getinandout(params, 'GET')
}

//收支详情
export const getdetails = (id: any) => {
  return Api.getdetails({ pay_id: id }, 'GET')
}

//账单列表页
export const getpagingbill = (params: finance['getpagingbill']) => {
  return Api.getpagingbill(params, 'GET')
}

//账单详情列表页
export const getpagingbilldetails = (id: number) => {
  return Api.getpagingbilldetails({ id }, 'GET')
}

//发票列表页
export const getpaginginvoice = (params: finance['getpaginginvoice']) => {
  return Api.getpaginginvoice(params, 'GET')
}

//收票地址列表页
export const getpaginggitinvoice = (params: finance['getpaginggitinvoice']) => {
  return Api.getpaginggitinvoice(params, 'GET')
}

//会员收票地址删除
export const getpagingdeleteinvoice = (id: number) => {
  return Api.getpagingdeleteinvoice({ id }, 'GET')
}

// getpagingbilltable
// 生成ai律师函账单
export const getpagingbilltable = (params: finance['getpagingbilltable']) => {
  return Api.getpagingbilltable(params, 'GET')
}

// getbilladmin
// 账单详情
export const getbilladmin = (id: any) => {
  return Api.getbilladmin({ id }, 'GET')
}

//生成账单
// getbillinsertlist
export const getbillinsertlist = (params: finance['getbillinsertlist']) => {
  return Api.getbillinsertlist(params, 'POST')
}

//收票地址获取编辑
export const gitinvaedit = (id: any) => {
  return Api.gitinvaedit({ id }, 'GET')
}

// 收票地址新增||修改
// editinvaeditaddress
export const posteditinvoice = (params: any) => {
  return Api.posteditinvoice(params, 'POST')
}

// 收票地址删除
// deleteinvaeditaddress
export const deleteinvaeditaddress = (id: any) => {
  return Api.deleteinvaeditaddress({ id }, 'GET')
}

// 发票删除
// deleteinvaice
export const deleteinvaice = (id: any) => {
  return Api.deleteinvaice({ id }, 'GET')
}

//获取债权人的管理员列表
export const getCreditorAdmin = (id: number) => {
  return Api.getCreditorAdmin({ id }, 'GET')
}

//获取债权人的会员列表
export const getCreditorUser = (params: any) => {
  return Api.getCreditorUser(params, 'GET')
}

// 发票获取编辑
// geteditinvaicebyid
export const geteditinvaicebyid = (id: any) => {
  return Api.geteditinvaicebyid({ id }, 'GET')
}

//收票地址修改提交
// editinvaeditaddresss
export const editinvaeditaddress = (params: any) => {
  return Api.editinvaeditaddress(params, 'POST')
}

//收支修改
export const editOrder = (params: any) => {
  return Api.editOrder(params, 'POST')
}

//修改收支备注
export const editBillReamak = (params: any) => {
  return Api.editBillReamak(params, 'POST')
}

//收支修改
export const deletBill = (id: number) => {
  return Api.deletBill({ id }, 'GET')
}

//获取子账号下拉
export const getSubAccountSelect = (id: number) => {
  return Api.getSubAccountSelect({ parent_account_id: id }, 'GET')
}

//分配管理员
export const allocation = (id: number, account_executive: number) => {
  return Api.allocation({ id, account_executive }, 'GET')
}

//获取发票下拉
export const getInvoice = (id: number) => {
  return Api.getInvoice({ member_id: id }, 'GET')
}

//获取收票地址下拉
export const getInvoiceAddress = (id: number) => {
  return Api.getInvoiceAddress({ member_id: id }, 'GET')
}

//获取字典类别
export const GetType = (dic_category_code: string) => {
  return Api.GetType({ dic_category_code }, 'GET')
}

//新增结算记录
export const addSettingRecord = (parmas: any) => {
  return Api.addSettingRecord(parmas, 'POST')
}

//删除结算记录
export const deleteSettingRecord = (id: number) => {
  return Api.deleteSettingRecord({ id }, 'GET')
}

//账单修改
export const billEdit = (parmas: any) => {
  return Api.billEdit(parmas, 'POST')
}

//账单备注
export const billRemarks = (id: number, back_remarks: string) => {
  return Api.billRemarks({ id, back_remarks }, 'POST')
}

//开票编辑
export const openInvoice = (parmas: finance['openInvoice']) => {
  return Api.openInvoice(parmas, 'POST')
}

//添加编辑请款记录
export const AddCaseFinance = (parmas: any) => {
  return Api.AddCaseFinance(parmas, 'POST')
}

//删除案件财务数据
export const DeleteCaseFinanceById = (id: any) => {
  return Api.DeleteCaseFinanceById({ id }, 'GET')
}

//设置最后付款时间
export const SetLastPaymentTime = (parmas: any) => {
  return Api.SetLastPaymentTime(parmas, 'GET')
}

//设置客服
export const SetCustomerService = (parmas: any) => {
  return Api.SetCustomerService(parmas, 'GET')
}

//获取所有客服
export const getKefu = () => {
  return Api.getKefu({}, 'GET')
}

//根据id或名称获取用户数据
export const GetMemberListByIdOrName = (parmas: any) => {
  return Api.GetMemberListByIdOrName(parmas, 'GET')
}

//获取币种下拉
export const getCurrency = () => {
  return Api.getCurrency({}, 'GET')
}

//获取账单信息
export const getBillInfo = (parmas: any) => {
  return Api.getBillInfo(parmas, 'GET')
}

//生成账单
export const CreateBill = (parmas: any) => {
  return Api.CreateBill(parmas, 'POST')
}

//获取律师数据
export const GetLawyerListByIdOrName = (parmas: any) => {
  return Api.GetLawyerListByIdOrName(parmas, 'GET')
}

//获取订单详情
export const GetBillDetails = (bill_number: any) => {
  return Api.GetBillDetails({ bill_number }, 'GET')
}

//设置账单客服
export const SetBillCustomerService = (parmas: any) => {
  return Api.SetBillCustomerService(parmas, 'GET')
}

//更新结算状态
export const UpdateBillSettlementStatus = (parmas: any) => {
  return Api.UpdateBillSettlementStatus(parmas, 'POST')
}

//更新账单备注
export const UpdateBillRemarks = (parmas: any) => {
  return Api.UpdateBillRemarks(parmas, 'POST')
}

// 根据用户id获取管理员
export const GetMemberVipAdminsByMmeberId = (member_id: any) => {
  return Api.GetMemberVipAdminsByMmeberId({ member_id }, 'GET')
}

//获取用户所有发票
export const GetMemberInvoicesByMemberId = (member_id: any) => {
  return Api.GetMemberInvoicesByMemberId({ member_id }, 'GET')
}

//新增或编辑发票信息
export const AddInvoice = (parmas: any) => {
  return Api.AddInvoice(parmas, 'POST')
}

//选择发票信息
export const SelectInvoice = (parmas: any) => {
  return Api.SelectInvoice(parmas, 'GET')
}

//获取所有收票信息
export const getAllTick = (member_id: any) => {
  return Api.getAllTick({ member_id }, 'GET')
}

//新增收票信息
export const AddTicketAddress = (parmas: any) => {
  return Api.AddTicketAddress(parmas, 'POST')
}

//选择收票信息
export const SelectTicketAddress = (parmas: any) => {
  return Api.SelectTicketAddress(parmas, 'GET')
}

//新增开票操作
export const AddOpenInvoices = (parmas: any) => {
  return Api.AddOpenInvoices(parmas, 'POST')
}

//获取未结算列表
export const GetUnsettledServices = (bill_id: any) => {
  return Api.GetUnsettledServices({ bill_id }, 'GET')
}

//新增结算记录
export const AddSettlementRecord = (parmas: any) => {
  return Api.AddSettlementRecord(parmas, 'POST')
}

//新增退款记录
export const AddRefundRecord = (parmas: any) => {
  return Api.AddRefundRecord(parmas, 'POST')
}

//获取未退款记录列表
export const GetUnsettledRefundRecord = (bill_number: any) => {
  return Api.GetUnsettledRefundRecord({ bill_number }, 'GET')
}

//删除退款记录
export const DeleteRefundRecord = (id: any) => {
  return Api.DeleteRefundRecord({ id }, 'GET')
}

//删除结算记录
export const DeleteSettlementRecord = (id: any) => {
  return Api.DeleteSettlementRecord({ id }, 'GET')
}

//删除账单推送对象
export const DeleteBillPushObject = (id: any) => {
  return Api.DeleteBillPushObject({ id }, 'GET')
}

//删除账单服务数据
export const DeletePaymentRecord = (parmas: any) => {
  return Api.DeletePaymentRecord(parmas, 'GET')
}

//查看结算记录详情
export const GetSettlementRecordDetails = (id: any) => {
  return Api.GetSettlementRecordDetails({ id }, 'GET')
}

//退款记录详情查看
export const GetRefundRecordDetails = (id: any) => {
  return Api.GetRefundRecordDetails({ id }, 'GET')
}

//获取账单分页列表
export const GetBillPagingData = (parmas: any) => {
  return Api.GetBillPagingData(parmas, 'GET')
}

//新增编辑用户收款信息
export const AddCollectionInfo = (parmas: any) => {
  return Api.AddCollectionInfo(parmas, 'POST')
}

//关联账单
export const RelationBill = (parmas: any) => {
  return Api.RelationBill(parmas, 'GET')
}

//更新请款对象
export const UpdateRequestObject = (parmas: any) => {
  return Api.UpdateRequestObject(parmas, 'GET')
}

//删除账单
export const DeleteBill = (id: any) => {
  return Api.DeleteBill({ id }, 'GET')
}

//生成账单pdf
export const GenerateBillPdf = (parmas: any) => {
  return Api.GenerateBillPdf(parmas, 'GET')
}

//新增推送对象
export const AddBillPushObject = (parmas: any) => {
  return Api.AddBillPushObject(parmas, 'POST')
}

//设置结算周期
export const SetSettlementPeriod = (parmas: any) => {
  return Api.SetSettlementPeriod(parmas, 'POST')
}

//设置请款日期或最后付款日期
export const SetBillDate = (parmas: any) => {
  return Api.SetBillDate(parmas, 'POST')
}

//获取用户管理员列表
export const GetMemberVipAdminsByMmeberIdV2 = (member_id: any) => {
  return Api.GetMemberVipAdminsByMmeberIdV2({ member_id }, 'GET')
}

//获取律所收款信息分页数据
export const GetMemberCollectionPagingData = (parmas: any) => {
  return Api.GetMemberCollectionPagingData(parmas, 'GET')
}

//新增或编辑用户收款信息
export const AddCollectionInfoV2 = (parmas: any) => {
  return Api.AddCollectionInfoV2(parmas, 'POST')
}

//删除律所收款信息
export const DeleteMemberCollectionById = (id: any) => {
  return Api.DeleteMemberCollectionById({ id }, 'GET')
}

//删除律所收款信息
export const SendBillNotice = (parmas: any) => {
  return Api.SendBillNotice(parmas, 'GET')
}

//更新赠送数据
export const UpdatePresent = (parmas: any) => {
  return Api.UpdatePresent(parmas, 'GET')
}

//更新账单标题名称
export const UpdateBillTitle = (parmas: any) => {
  return Api.UpdateBillTitle(parmas, 'POST')
}

//查询账单生成状态
export const GetBillFileByBillNumber = (parmas: any) => {
  return Api.GetBillFileByBillNumber(parmas, 'GET')
}
