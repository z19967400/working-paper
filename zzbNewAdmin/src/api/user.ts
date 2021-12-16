import Api from '@/utils/request'
import { UserOptions } from '@/types'
//获取普通会员列表
export const getOrdinary = (params: UserOptions['getOrdinary']) => {
  return Api.getOrdinary(params, 'GET')
}
//普通会员删除
export const ordinaryDelete = (id: number) => {
  return Api.ordinaryDelete({ id }, 'GET')
}
//普通会员删除
export const getDinaryInfo = (id: number) => {
  return Api.getDinaryInfo({ id }, 'GET')
}
//普通会员启用禁用
export const dinaryUpState = (params: UserOptions['ordinaryUpState']) => {
  return Api.dinaryUpState(params, 'GET')
}
//普通会员新增修改
export const dinaryEdit = (params: UserOptions['ordinaryEdit']) => {
  return Api.dinaryEdit(params, 'POST')
}
//普通会员基础信息修改
export const dinaryBaseicInfoEdit = (params: any) => {
  return Api.dinaryBaseicInfoEdit(params, 'POST')
}
//获取地址列表
export const getAddress = (parent_id: number) => {
  return Api.getAddress({ parent_id }, 'GET')
}
//获取地址列表
export const getUserAdmin = (id: number) => {
  return Api.getUserAdmin({ id }, 'GET')
}
//获取VIP会员申请列表
export const getVipUser = (params: any) => {
  return Api.getVipUser(params, 'GET')
}
//获取VIP会员删除
export const vipUserDelet = (id: number) => {
  return Api.vipUserDelet({ id }, 'GET')
}
//添加VIP会员
export const editVip = (params: any) => {
  return Api.editVip(params, 'POST')
}
//获取类别
export const GetType = (dic_category_code: string) => {
  return Api.GetType({ dic_category_code }, 'GET')
}
//会员保存备注
export const userSaveNotes = (params: any) => {
  return Api.userSaveNotes(params, 'POST')
}
//获取vip会员申请详情
export const getVipMemberInfo = (id: number) => {
  return Api.getVipMemberInfo({ member_vip_id: id }, 'GET')
}
//vip会员修改债务类别
export const vipEditDebt_type = (params: UserOptions['vipEditDebt_type']) => {
  return Api.vipEditDebt_type(params, 'POST')
}
//vip会员支付管理编辑
export const vipEditPaySet = (params: UserOptions['vipEditPaySet']) => {
  return Api.vipEditPaySet(params, 'POST')
}
//vip会员保存备注
export const vipSaveNotes = (params: any) => {
  return Api.vipSaveNotes(params, 'POST')
}
//vip会员审核
export const examineVIp = (params: any) => {
  return Api.examineVIp(params, 'POST')
}
//vip会员管理审核
export const examineVipAdmin = (params: any) => {
  return Api.examineVipAdmin(params, 'POST')
}
//vip会员债权人审核
export const examineVipCreditor = (params: any) => {
  return Api.examineVipCreditor(params, 'POST')
}
//vip会员删除
export const vipDelete = (id: any) => {
  return Api.vipDelete({ id }, 'GET')
}
//添加债权人(新)
export const addCreditorNew = (params: any) => {
  return Api.addCreditorNew(params, 'POST')
}
//获取债权人信息(新)
export const getCreditorInfoByid = (id: any) => {
  return Api.getCreditorInfoByid({ id }, 'GET')
}
//会员删除
export const userDelete = (id: any) => {
  return Api.userDelete({ id }, 'GET')
}
//vip添加/编辑管理员
export const vipAddAdmin = (params: any) => {
  return Api.vipAddAdmin(params, 'POST')
}
//发送管理员密码
export const sandAdminPassword = (params: any) => {
  return Api.sandAdminPassword(params, 'GET')
}
//vip会员审核提交
export const vipUserExamine = (params: any) => {
  return Api.vipUserExamine(params, 'POST')
}
//获取管理员邮箱
export const getAdminEmail = () => {
  return Api.getAdminEmail({}, 'GET')
}
//大客户发送/重置密码
export const sendPassword = (params: any) => {
  return Api.sendPassword(params, 'POST')
}
//vip获取账户关系
export const getVipRelationship = (
  params: UserOptions['getVipRelationship']
) => {
  return Api.getVipRelationship(params, 'GET')
}
//获取vip子账号管理员
export const getVipRelatAdmin = (params: UserOptions['getVipRelationship']) => {
  return Api.getVipRelatAdmin(params, 'GET')
}
//获取所有总账户
export const getAllAccounts = () => {
  return Api.getAllAccounts({}, 'GET')
}
//新增子账户
export const addSubAccount = (params: any) => {
  return Api.addSubAccount(params, 'POST')
}
//子账户删除
export const subAccountDelet = (id: number) => {
  return Api.subAccountDelet({ id }, 'GET')
}
//vip子账户管理员新增/修改
export const vipSubAccountEdit = (params: UserOptions['vipSubAccountEdit']) => {
  return Api.vipSubAccountEdit(params, 'POST')
}
//获取vip子账户管理详情
export const getVipSubAccountInfo = (id: number) => {
  return Api.getVipSubAccountInfo({ id }, 'GET')
}
//子账号管理获取下拉
export const getSubAccountSelect = (parent_account_id: number) => {
  return Api.getSubAccountSelect({ parent_account_id }, 'GET')
}
//子账户管理员删除
export const subAccountAdminDelet = (id: number) => {
  return Api.subAccountAdminDelet({ id }, 'GET')
}
//获取未分配债权人
export const getUserCreditor = (
  member_id: number,
  member_vip_admin_id: number
) => {
  return Api.getUserCreditor({ member_id, member_vip_admin_id }, 'GET')
}
//获取子账号债权人
export const getSubAccountCreditor = (account_id: number) => {
  return Api.getSubAccountCreditor({ account_id }, 'GET')
}
//债权人分配
export const fenpeiCreditor = (params: any) => {
  return Api.fenpeiCreditor(params, 'GET')
}
//vip会员管理获取会员选择列表
export const getUserSelectList = (params: any) => {
  return Api.getUserSelectList(params, 'GET')
}
//vip管理选择会员
export const userSelect = (params: any) => {
  return Api.userSelect(params, 'GET')
}
//vip管理页面获取债权人列表
export const vipGetCreditor = (id: any) => {
  return Api.vipGetCreditor({ member_vip_id: id }, 'GET')
}
//获取子账号债权人管理
export const getAccountCreditor = (params: any) => {
  return Api.getAccountCreditor(params, 'GET')
}
//子账号债权人删除
export const creditorDelet = (id: number) => {
  return Api.creditorDelet({ id }, 'GET')
}
//子账号新增/修改债权人
export const addCreDitor = (params: UserOptions['creditorEdit']) => {
  return Api.addCreDitor(params, 'POST')
}
//获取子账号债权人详情
export const getCreditorInfo = (id: number) => {
  return Api.getCreditorInfo({ id }, 'GET')
}
//获取粉丝列表
export const getFansList = (params: any) => {
  return Api.getFansList(params, 'GET')
}
//获取律师列表
export const getLayerList = (params: any) => {
  return Api.getLayerList(params, 'GET')
}
//律师删除
export const lawyerDelete = (id: number) => {
  return Api.lawyerDelete({ id }, 'GET')
}
//获取律师信息详情
export const getLawInfo = (id: number) => {
  return Api.getLawInfo({ id }, 'GET')
}
//更新律师认证信息
export const saveLawInfo = (params: any) => {
  return Api.saveLawInfo(params, 'POST')
}
//获取普通会员基础信息
export const getDinaryBasicInfo = (id: any) => {
  return Api.getDinaryBasicInfo({ member_id: id }, 'GET')
}
//获取普通会员基础信息
export const getDinarycreditor = (id: any) => {
  return Api.getDinarycreditor({ member_id: id }, 'GET')
}
//获取普通会员的VIP列表
export const getDinaryVipList = (id: any) => {
  return Api.getDinaryVipList({ member_id: id }, 'GET')
}
//新增或者修改Vip账户
export const updateAccount = (params: any) => {
  return Api.updateAccount(params, 'GET')
}
//获取债权人的管理员(新)
export const getCreditorAdminNew = (id: number) => {
  return Api.getCreditorAdminNew({ creditor_id: id }, 'GET')
}
//设置债权人管理员(新)
export const setCreditorAdmin = (parmas: any) => {
  return Api.setCreditorAdmin(parmas, 'POST')
}
//取消债权人管理员(新)
export const deletCreditorAdmin = (id: number) => {
  return Api.deletCreditorAdmin({ creditor_admin_id: id }, 'GET')
}
//账户删除
export const accmentDelect = (id: number) => {
  return Api.accmentDelect({ id: id }, 'GET')
}
//大客户管理员删除
export const adminDelect = (id: number) => {
  return Api.adminDelect({ id: id }, 'GET')
}
//证照识别
export const Recognition = (img_type: string | number, img_path: string) => {
  return Api.Recognition({ img_type, img_path }, 'POST')
}
//管理员审核（新）
export const ExaminingCreditorAdmin = (parmas: any) => {
  return Api.ExaminingCreditorAdmin(parmas, 'POST')
}
//删除债权人
export const delectCreditor = (creditor_id: any) => {
  return Api.delectCreditor({ creditor_id }, 'GET')
}
//获取债权人管理员
export const GetCreditorAdminByVipId = (vip_id: any) => {
  return Api.GetCreditorAdminByVipId({ vip_id }, 'GET')
}
//编辑债权人
export const UpdateCreditor = (parmas: any) => {
  return Api.UpdateCreditor(parmas, 'POST')
}
//债权人审核
export const CreditorAudit = (parmas: any) => {
  return Api.CreditorAudit(parmas, 'POST')
}
//债权人删除
export const DeleteCreditor = (id: any) => {
  return Api.DeleteCreditor({ creditor_id: id }, 'GET')
}
//更新支付设置
export const UpdatePaySet = (parmas: any) => {
  return Api.UpdatePaySet(parmas, 'POST')
}
//删除VIP管理员
export const DeleteVipAdmin = (id: any) => {
  return Api.DeleteVipAdmin({ admin_id: id }, 'GET')
}
//授权管理员审核
export const CreditorAdminAudit = (parmas: any) => {
  return Api.CreditorAdminAudit(parmas, 'POST')
}
//律师认证审核
export const LawyerAudit = (parmas: any) => {
  return Api.LawyerAudit(parmas, 'POST')
}
