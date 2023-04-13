import Api from '@/utils/request'
import { ApiOptions } from '@/types/index'
//获取开发平台接口文档列表
export const getApi = (params: ApiOptions['params']) => {
  return Api.getApi(params, 'GET')
}
//开发平台新增接口文档
export const addApi = (params: ApiOptions['params']) => {
  return Api.addApi(params, 'POST')
}
//开发平台接口文档删除
export const apiDelete = (id: number) => {
  return Api.apiDelete({ id }, 'GET')
}
//开发平台获取接口文档详情
export const apiGetByid = (id: number) => {
  return Api.apiGetByid({ id }, 'GET')
}
//开发平台获取页面列表
export const getWebList = (params: ApiOptions['webParams']) => {
  return Api.getWebList(params, 'GET')
}
//开发平台页面删除
export const webDelete = (id: number) => {
  return Api.webDelete({ id }, 'GET')
}
//开发平台新增页面文档
export const addWeb = (params: ApiOptions['params']) => {
  return Api.addWeb(params, 'POST')
}
//开发平台获取页面文档详情
export const getWebInfo = (id: number) => {
  return Api.getWebInfo({ id }, 'GET')
}
//开发平台获取任务列表
export const getProgress = (params: ApiOptions['develManage']) => {
  return Api.getProgress(params, 'GET')
}
//开发平台新增开发任务
export const addProgress = (params: ApiOptions['develEdit']) => {
  return Api.addProgress(params, 'POST')
}
//开发平台获取开发任务详情
export const getProgressInfo = (id: number) => {
  return Api.getProgressInfo({ id }, 'GET')
}
//开发平台任务删除
export const deleteProgress = (id: number) => {
  return Api.deleteProgress({ id }, 'GET')
}
//获取页面内选择菜单
export const GetTwoandThree = () => {
  return Api.GetTwoandThree({}, 'GET')
}
//获取文档列表
export const getFileList = (params: any) => {
  return Api.getFileList(params, 'GET')
}
//文档列表删除
export const fileDelete = (id: number) => {
  return Api.fileDelete({ id }, 'GET')
}
//文档修改
export const fileEdit = (params: any) => {
  return Api.fileEdit(params, 'POST')
}
//
export const GetByid = (id: number) => {
  return Api.GetByid({ id }, 'GET')
}
//菜单设置添加||修改
export const insert = (params: any) => {
  return Api.insert(params, 'POST')
}
//获取编辑菜单信息
export const GetMenuInfoByid = (id: any) => {
  return Api.GetMenuInfoByid({ id }, 'GET')
}
//获取菜单列表
export const GetAllMenuList = () => {
  return Api.GetAllMenuList({}, 'GET')
}
//删除菜单
export const Delete = (id: any) => {
  return Api.Delete({ id }, 'GET')
}
