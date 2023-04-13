import Api from "@/utils/request";

export const getData = () => {
  return Api.getData();
};
//获取首页数据
export const GetHomeData = () => {
  return Api.GetHomeData();
};
//获取通知
export const GetPlatformNotice = () => {
  return Api.GetPlatformNotice();
};
