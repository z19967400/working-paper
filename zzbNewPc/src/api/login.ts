import Api from "@/utils/request";

export const login = (userName: string, password: string) => {
  let params = {
    admin_account: userName,
    password: password
  };
  return Api.login(params, "POST");
};

export const getCode = (phoneNumber: string) => {
  return Api.getCode({ phoneNumber }, "GET");
};
