/**
 * 线上环境
 */
 export const ONLINEHOST: string = "https://wechat.debteehelper.com/api";

 /**
  * 测试环境
  */
 export const QAHOST: string = "http://localhost:3456/api";
 
 /**
  * 线上mock
  */
 export const MOCKHOST: string = "http://xxx.com";

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
 export const MAINHOST: string = ONLINEHOST;

/**
 * @description token在Cookie中存储的天数，默认1天
 */
 export const cookieExpires: number = 30; 