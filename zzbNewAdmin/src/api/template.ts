import Api from '@/utils/request'
import { TemplateOptions } from '@/types'

//获取微信模板列表
export const getWechatModel = (parmas: TemplateOptions['getWechat']) => {
  return Api.getWechatModel(parmas, 'GET')
}
//删除微信模板
export const WechatModelDelet = (id: number) => {
  return Api.WechatModelDelet({ id }, 'GET')
}
//修改，增加微信模板
export const WechatModelEdit = (parmas: TemplateOptions['wechatEdit']) => {
  return Api.WechatModelEdit(parmas, 'POST')
}
//获取电话模板列表
export const getphoneModel = (parmas: TemplateOptions['getWechat']) => {
  return Api.getphoneModel(parmas, 'GET')
}
//删除电话模板
export const phoneModelDelet = (id: number) => {
  return Api.phoneModelDelet({ id }, 'GET')
}
//修改，增加电话模板
export const phoneModelEdit = (parmas: TemplateOptions['wechatEdit']) => {
  return Api.phoneModelEdit(parmas, 'POST')
}
//获取sms模板列表
export const getsmsModel = (parmas: TemplateOptions['getWechat']) => {
  return Api.getsmsModel(parmas, 'GET')
}
//删除sms模板
export const smsModelDelet = (id: number) => {
  return Api.smsModelDelet({ id }, 'GET')
}
//修改，增加sms模板
export const smsModelEdit = (parmas: TemplateOptions['wechatEdit']) => {
  return Api.smsModelEdit(parmas, 'POST')
}
//获取Pdf模板列表
export const getPdfModel = (parmas: TemplateOptions['getWechat']) => {
  return Api.getPdfModel(parmas, 'GET')
}
//删除Pdf模板
export const PdfModelDelet = (id: number) => {
  return Api.PdfModelDelet({ id }, 'GET')
}
//修改，增加Pdf模板
export const PdfModelEdit = (parmas: TemplateOptions['wechatEdit']) => {
  return Api.PdfModelEdit(parmas, 'POST')
}
//获取email模板列表
export const getemailModel = (parmas: TemplateOptions['getWechat']) => {
  return Api.getemailModel(parmas, 'GET')
}
//删除email模板
export const emailModelDelet = (id: number) => {
  return Api.emailModelDelet({ id }, 'GET')
}
//修改，增加email模板
export const emailModelEdit = (parmas: TemplateOptions['wechatEdit']) => {
  return Api.emailModelEdit(parmas, 'POST')
}
//获取Excell模板列表
export const getExcellModel = (parmas: TemplateOptions['getWechat']) => {
  return Api.getExcellModel(parmas, 'GET')
}
//删除Excell模板
export const ExcellModelDelet = (id: number) => {
  return Api.ExcellModelDelet({ id }, 'GET')
}
//修改，增加Excell模板
export const ExcellModelEdit = (parmas: TemplateOptions['wechatEdit']) => {
  return Api.ExcellModelEdit(parmas, 'POST')
}
//获取excel模板详情
export const getExcellInfo = (id: number) => {
  return Api.getExcellInfo({ id }, 'GET')
}
//测试短信模板
export const testSms = (parmas: TemplateOptions['testOne']) => {
  return Api.testSms(parmas, 'POST')
}
//测试电话模板
export const testPhone = (parmas: TemplateOptions['testOne']) => {
  return Api.testPhone(parmas, 'POST')
}
//测试邮件模板
export const testEmail = (parmas: TemplateOptions['testOne']) => {
  return Api.testEmail(parmas, 'POST')
}
//获取短信测试所需参数
export const getSmsCode = () => {
  return Api.getSmsCode({}, 'GET')
}
//获取电话模板测试所需参数
export const getPhoneCode = () => {
  return Api.getPhoneCode({}, 'GET')
}
//获取邮件模板测试所需参数
export const getEmailCode = () => {
  return Api.getEmailCode({}, 'GET')
}
//获取excel模板测试所需参数
export const getExcel = () => {
  return Api.getExcel({}, 'GET')
}
//excell模板验证
export const verificationExcel = (id: number) => {
  return Api.verificationExcel({ id }, 'GET')
}
//字典查询
export const getDicInfoList = (category_code: string) => {
  return Api.getDicInfoList(
    {
      page: 1,
      limit: 50,
      category_code,
      dic_content: ''
    },
    'GET'
  )
}
