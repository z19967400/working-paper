import Api from '@/utils/request'
import { monitorOptions } from '@/types'
//获取服务列表
export const getSeverList = (params: monitorOptions['getSever']) => {
  return Api.getSeverList(params, 'GET')
}
//服务删除
export const severDelete = (id: number) => {
  return Api.severDelete({ id }, 'GET')
}
//获取服务详情
export const getSeverInfo = (id: number) => {
  return Api.getSeverInfo({ id }, 'GET')
}
//服务修改
export const severEdit = (params: monitorOptions['severEdit']) => {
  return Api.severEdit(params, 'POST')
}
//获取队列列表
export const getQueueList = (params: monitorOptions['getSever']) => {
  return Api.getQueueList(params, 'GET')
}
//队列删除
export const QueueDelete = (id: number) => {
  return Api.QueueDelete({ id }, 'GET')
}
//获取队列详情
export const getQueueInfo = (id: number) => {
  return Api.getQueueInfo({ id }, 'GET')
}
//队列修改
export const QueueEdit = (params: monitorOptions['queueEdit']) => {
  return Api.QueueEdit(params, 'POST')
}
//获取用户日志
export const getUserLogs = (params: monitorOptions['getUserLogs']) => {
  return Api.getUserLogs(params, 'GET')
}
//获取员工日志
export const getStaffLogs = (params: monitorOptions['getStaffLog']) => {
  return Api.getStaffLogs(params, 'GET')
}
//获取邮件日志
export const getEmailLogs = (params: monitorOptions['getLogs']) => {
  return Api.getEmailLogs(params, 'GET')
}
//获取短信日志
export const getSmsLogs = (params: monitorOptions['getLogs']) => {
  return Api.getSmsLogs(params, 'GET')
}
//获取电话日志
export const getPhoneLogs = (params: monitorOptions['getLogs']) => {
  return Api.getPhoneLogs(params, 'GET')
}
//获取pdf生成日志
export const getPdfLogs = (params: monitorOptions['getLogs']) => {
  return Api.getPdfLogs(params, 'GET')
}
