import Api from '@/utils/request'
import { SettingsOptions } from '@/types'

//获取角色列表
export const getRoles = () => {
  return Api.getRoles({}, 'GET')
}
//获取菜单设置列表
export const getMenu = () => {
  return Api.getMenu({}, 'GET')
}
//角色权限修改
export const RoleEdit = (params: SettingsOptions['roleEdit']) => {
  return Api.RoleEdit(params, 'POST')
}
//角色删除
export const RoleDelet = (id: number) => {
  return Api.RoleDelet({ id }, 'GET')
}
//获取角色权限详情
export const getRoleInfo = (id: number) => {
  return Api.getRoleInfo({ role_id: id }, 'GET')
}
//获取办案流程列表getCaseList
export const getCaseList = (params: SettingsOptions['getCase']) => {
  return Api.getCaseList(params, 'GET')
}
//案件删除
export const caseDelete = (id: number) => {
  return Api.caseDelete({ id }, 'GET')
}
//案件流程修改
export const caseEdit = (params: SettingsOptions['processEdit']) => {
  return Api.caseEdit(params, 'POST')
}
//获取案件流程详情
export const getCaseInfo = (id: number) => {
  return Api.getCaseInfo({ id }, 'GET')
}
//获取地区列表
export const getRegion = (params: SettingsOptions['getRegion']) => {
  return Api.getRegion(params, 'GET')
}
//地区删除
export const regionDelete = (id: number) => {
  return Api.regionDelete({ id }, 'GET')
}
//地区修改
export const regionEdit = (params: SettingsOptions['regEdit']) => {
  return Api.regionEdit(params, 'POST')
}
//获取币种列表
export const getCurrency = (params: SettingsOptions['getCurrency']) => {
  return Api.getCurrency(params, 'GET')
}
//币种删除
export const currencyDelete = (id: number) => {
  return Api.currencyDelete({ id }, 'GET')
}
//币种修改
export const currencyEdit = (params: SettingsOptions['currencyDelet']) => {
  return Api.currencyEdit(params, 'POST')
}
//获取所有动态表单
export const getFrom = (params: SettingsOptions['getFrom']) => {
  return Api.getFrom(params, 'GET')
}
//表单设置获取所有动态表单(无参版)
export const getSelectFrom = () => {
  return Api.getSelectFrom({}, 'GET')
}
//动态表单删除
export const fromDelet = (id: number) => {
  return Api.fromDelet({ id }, 'GET')
}
//表单新增修改
export const fromEdit = (params: SettingsOptions['fromEdit']) => {
  return Api.fromEdit(params, 'GET')
}
//获取动态表单详情
export const getFromInfo = (params: any) => {
  return Api.getFromInfo(params, 'GET')
}
//表单详情删除
export const fromInfoDelete = (id: number) => {
  return Api.fromInfoDelete({ id }, 'GET')
}
//表单详情修改
export const fromInfoEdit = (params: SettingsOptions['fromInfoEdit']) => {
  return Api.fromInfoEdit(params, 'POST')
}
//获取提示列表
export const getTips = (params: SettingsOptions['getTips']) => {
  return Api.getTips(params, 'GET')
}
//提示删除
export const tipsDelet = (id: number) => {
  return Api.tipsDelet({ id }, 'GET')
}
//提示删除
export const tipsEdit = (params: SettingsOptions['tipsEdit']) => {
  return Api.tipsEdit(params, 'POST')
}
//获取所有字典类别
export const getAllDictionary = (params: any) => {
  return Api.getAllDictionary(params, 'GET')
}
//字典类别修改
export const dictionaryInsert = (params: SettingsOptions['dictionaryEdit']) => {
  return Api.dictionaryInsert(params, 'POST')
}
//字典类别删除
export const dictionaryDelete = (id: number) => {
  return Api.dictionaryDelete({ id }, 'GET')
}
//字典内容删除
export const dicInfoDelete = (id: number) => {
  return Api.dicInfoDelete({ id }, 'GET')
}
//获取字典详情
export const getDicInfoList = (params: SettingsOptions['getInfo']) => {
  return Api.getDicInfoList(params, 'GET')
}
//字典详情修改
export const dicInfoEdit = (params: SettingsOptions['dictionaryEdit']) => {
  return Api.dicInfoEdit(params, 'POST')
}
//字典详情启用
export const dicInfoDetails = (params: any) => {
  return Api.dicInfoDetails(params, 'GET')
}
//获取新闻
export const getNews = (params: SettingsOptions['getNews']) => {
  return Api.getNews(params, 'GET')
}
//新闻删除
export const newDelete = (id: number) => {
  return Api.newDelete({ id }, 'GET')
}
//新闻修改
export const newEdit = (params: SettingsOptions['newEdit']) => {
  return Api.newEdit(params, 'POST')
}
//获取常见问题
export const getProblem = (params: SettingsOptions['getNews']) => {
  return Api.getProblem(params, 'GET')
}
//问题删除
export const problemDelete = (id: number) => {
  return Api.problemDelete({ id }, 'GET')
}
//问题修改
export const problemEdit = (params: SettingsOptions['newEdit']) => {
  return Api.problemEdit(params, 'POST')
}
