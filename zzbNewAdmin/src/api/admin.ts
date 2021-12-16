import Api from '@/utils/request'
import { AdminOptions } from '@/types/index.ts'

//获取员工列表
export const getAdmin = (params: AdminOptions['AdminList']) => {
  return Api.getAdmin(params, 'GET')
}
//员工删除
export const adminDelet = (id: number) => {
  return Api.adminDelet({ id }, 'GET')
}
//获取员工详情
export const getAdminInfo = (id: number) => {
  return Api.getAdminInfo({ id }, 'GET')
}
//员工修改
export const adminEdit = (params: AdminOptions['adminEdit']) => {
  return Api.adminEdit(params, 'POST')
}
//获取角色列表
export const getRoles = () => {
  return Api.getRoles({}, 'GET')
}
