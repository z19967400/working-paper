import Cookies from 'js-cookie'
import { cookieExpires } from '@/config' // cookie保存的天数

/**
 * @msg: 存取token
 * @param {string} token
 */
export const TOKEN_KEY: string = 'Itoken'
export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}
//删除token
export const removeToken = (name: string) => {
  Cookies.remove(name, { path: '' })
}
//存储cookie
export const setCookie = (name: string, value: string) => {
  Cookies.set(name, value, { expires: cookieExpires || 1 })
}
//提取cookie
export const getCookie = (name: string) => {
  const val = Cookies.get(name)
  if (val) {
    return val
  } else {
    return false
  }
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj: any = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: any, key: string | number) => {
  if (key) {
    return key in obj
  } else {
    const keysArr = Object.keys(obj)
    return keysArr.length
  }
}

//邮箱验证
export const validateEmall = (rule: any, value: any, callback: any) => {
  let vtf: any = verifyEmall(value)
  if (!vtf.done) {
    callback(new Error(vtf.errMsg))
  } else {
    callback()
  }
}

/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
export const getDate = (fmt: any) => {
  let time = ''
  const date = new Date()
  const o: any = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    time = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      time = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return time
}

/**
 * @msg: 获取系统当前时间
 * @param {string} date 时间
 * @param {string} fmt 时间格式
 * @return: string
 */
export const formatDate = (date: any, fmt: string) => {
  let time = ''
  const o: any = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    time = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      time = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return time
}

// copy in the 'fx-fuli' utils
/**
 * 校验手机号是否正确
 * @param phone 手机号
 */

export const verifyPhone = (phone: string | number) => {
  const reg = /^1[345789][0-9]{9}$/
  const _phone = phone.toString().trim()
  let toastStr =
    _phone === '' ? '手机号不能为空~' : !reg.test(_phone) && '请输入正确手机号~'
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _phone
  }
}

export const verifyStr = (str: string | number, text: string) => {
  const _str = str.toString().trim()
  const toastStr = _str.length ? false : `请填写${text}～`
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _str
  }
}

//校验邮箱格式是否正确
/**
 * 校验邮箱格式
 * @param emall 邮箱
 */
export const verifyEmall = (emall: string) => {
  const reg = /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i
  const _emall = emall.toString().trim()
  let toastStr =
    _emall === '' ? '邮箱不能为空~' : !reg.test(_emall) && '请输入正确的邮箱~'
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _emall
  }
}

//校验身份证格式是否正确
/**
 * 校验身份证格式
 * @param idCard 身份证
 */
export const verifyIdCard = (idCard: string) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  const _idCard = idCard.toString().trim()
  let toastStr =
    _idCard === ''
      ? '身份证不能为空~'
      : !reg.test(_idCard) && '请输入正确的身份证号码~'
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _idCard
  }
}

// 截取字符串
export const sliceStr = (str: any, sliceLen: number) => {
  if (!str) {
    return ''
  }
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
    if (realLength > sliceLen) {
      return `${str.slice(0, i)}...`
    }
  }

  return str
}

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj: any) {
  let buf: any
  if (jsonObj instanceof Array) {
    buf = []
    let i = jsonObj.length
    while (i--) {
      buf[i] = objClone(jsonObj[i])
    }
    return buf
  } else if (jsonObj instanceof Object) {
    buf = {}
    for (let k in jsonObj) {
      buf[k] = objClone(jsonObj[k])
    }
    return buf
  } else {
    return jsonObj
  }
}
/**
 * 数字千位符保留小数点后两位
 * */
export function thousandBitSeparator(num: any): any {
  if (num === 0) {
    return '0.00'
  } else if (num) {
    let val: string = num.toString()
    //不含小数点
    if (val.indexOf('.') == -1) {
      return Number(num).toLocaleString() + '.00'
    } else {
      //含有小数点
      let ws: string = val.substring(val.lastIndexOf('.') + 1, val.length)
      let ss: number = Number(val.substring(0, val.lastIndexOf('.')))
      if (ws.length == 1) {
        //小数点后有一位
        return Number(num).toLocaleString() + '0'
      } else if (ws.length == 2) {
        //小数点后有两位
        return ss.toLocaleString() + '.' + ws
      } else {
        let val1: any = Number(num).toFixed(2)
        return thousandBitSeparator(val1)
      }
    }
  }
}
