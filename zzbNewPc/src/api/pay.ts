import Api from "@/utils/request";
//支付宝支付
export const Alipay = (pay_number: string) => {
  return Api.Alipay({ pay_number }, "GET");
};
//微信支付
export const WeChat = (pay_number: string) => {
  return Api.WeChat({ pay_number }, "GET");
};
//支付宝支付查询结果
export const AlipayQuery = (out_trade_no: string) => {
  return Api.AlipayQuery({ out_trade_no }, "GET");
};
//微信支付查询结果
export const WeChatQuery = (out_trade_no: string) => {
  return Api.WeChatQuery({ out_trade_no }, "GET");
};
//先催后付
export const AfterPay = (out_trade_no: string) => {
  return Api.AfterPay({ out_trade_no }, "GET");
};
//对公转账
export const UnionPay = (out_trade_no: string, pay_email_number: string) => {
  return Api.UnionPay({ out_trade_no, pay_email_number }, "GET");
};
//对公转账支付通知
export const SendTransfer = (toAddress: string, pay_number: string) => {
  return Api.SendTransfer({ toAddress, pay_number }, "GET");
};
//赠送支付
export const PresentPay = (pay_number: string) => {
  return Api.PresentPay({ out_trade_no: pay_number }, "GET");
};
