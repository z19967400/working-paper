/**
 * 线上环境
 */
export const ONLINEHOST: string = "https://api2.debteehelper.com"; //普通端口

export const PAYHOST: string = "https://pay.debteehelper.com"; //支付端口

/**
 * 测试环境
 */
export const QAHOST: string = "http://192.168.1.108";

/**
 * 线上mock
 */
export const MOCKHOST: string = "http://xxx.com";

/**
 * 是否mock
 */
export const ISMOCK: boolean = true;

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST: string = ONLINEHOST;

/**
 * 请求的公共参数
 */
export const conmomPrams: any = {};

/**
 * @description token在Cookie中存储的天数，默认1天
 */
export const cookieExpires: number = 30;
