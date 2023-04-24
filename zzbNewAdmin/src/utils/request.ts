import axios, { AxiosResponse, AxiosRequestConfig, ResponseType } from 'axios'
import {
  MAINHOST,
  ISMOCK,
  conmomPrams,
  QIANTAIHOST,
  ONLINEHOST,
  PAYHOST
} from '@/config'
import requestConfig from '@/config/requestConfig'
import { getToken, removeToken } from '@/utils/common'
import router from '@/router'
import ElementUI from 'element-ui'

declare type Methods =
  | 'GET'
  | 'OPTIONS'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
declare interface Datas {
  method?: Methods
  [key: string]: any
}
// @process.env.NODE_ENV = "production|development" 生产|研发
export const baseURL =
  process.env.NODE_ENV === 'production' ? MAINHOST : location.origin
export const pp = process.env.NODE_ENV
// const baseURL = process.env.NODE_ENV === location.origin;
const token = getToken()

class HttpRequest {
  public queue: any // 请求的url集合
  public constructor() {
    this.queue = {}
  }
  destroy(url: string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // hide loading
    }
  }
  interceptors(instance: any, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // show loading
        }
        if (url) {
          this.queue[url] = true
        }
        if (url !== '/Login/SendSMSCode') {
          config.headers.admintokey = getToken()
        }
        return config
      },
      (error: any) => {
        // console.error(error);
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (url) {
          this.destroy(url)
        }
        const { data, status } = res
        if (status === 200 && data.status === 401) {
          return requestFail(res)
        }
        if (status === 200 && ISMOCK) {
          return data
        } // 如果是mock数据，直接返回
        if (status === 200 && data && data.code === 0) {
          return data
        } // 请求成功
        return requestFail(res) // 失败回调
      },
      (error: any) => {
        if (url) {
          this.destroy(url)
        }
        // console.error(error);
      }
    )
  }
  async request(options: AxiosRequestConfig) {
    const instance = axios.create()
    await this.interceptors(instance, options.url)
    return instance(options)
  }
}

// 请求失败
const requestFail = (res: AxiosResponse) => {
  let errStr = '网络繁忙！'
  // token失效重新登陆
  if (res.data.status === 401) {
    removeToken('token')
    ElementUI.Message.warning(res.data.msg)
    return router.replace({ name: 'login' })
  } else {
    ElementUI.Message.warning(res.data.msg)
  }
  return {
    // eslint-disable-next-line no-console
    err: console.error({
      code: res.data.errcode || res.data.code,
      msg: res.data.errmsg || errStr
    })
  }
}

// 合并axios参数
const conbineOptions = (
  _opts: any,
  data: Datas,
  method: Methods,
  responseType?: ResponseType
): AxiosRequestConfig => {
  let opts = _opts
  if (typeof opts === 'string') {
    opts = { url: opts }
  }
  let Bur = baseURL
  if (process.env.NODE_ENV === 'production') {
    Bur =
      opts.url.indexOf('pt/') != -1
        ? QIANTAIHOST
        : opts.url.indexOf('zf/') != -1
        ? PAYHOST
        : ONLINEHOST
    //去除接口前缀
    opts.url = opts.url.replace('pt/', '')
    opts.url = opts.url.replace('api/hd/', '')
    opts.url = opts.url.replace('zf/', '')
  }
  const _data = { ...conmomPrams, ...opts.data, ...data }
  const options = {
    method: opts.method || data.method || method || 'GET',
    url: opts.url,
    header: { admintokey: getToken() },
    baseURL: Bur,
    responseType
  }
  return options.method !== 'GET'
    ? Object.assign(options, { data: _data })
    : Object.assign(options, { params: _data })
}

const HTTP = new HttpRequest()

/**
 * 抛出整个项目的api方法
 */
const Api = (() => {
  const apiObj: any = {}
  const requestList: any = requestConfig
  const fun = (opts: AxiosRequestConfig | string) => {
    return async (
      data = {},
      method: Methods = 'GET',
      responseType?: ResponseType
    ) => {
      // if (!token) {
      // eslint-disable-next-line no-console
      // console.error("No Token");
      // return router.replace({ name: "login" });
      // }
      const newOpts = conbineOptions(opts, data, method, responseType)
      // eslint-disable-next-line no-console
      const res = await HTTP.request(newOpts)
      return res
    }
  }
  Object.keys(requestConfig).forEach(key => {
    apiObj[key] = fun(requestList[key])
  })

  return apiObj
})()

export default Api as any
