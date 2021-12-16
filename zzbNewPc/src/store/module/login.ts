import routes from "@/router/index";
import { LoginState, DataOptions } from "@/types/views/login.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import * as LoginApi from "@/api/login";
import { getToken, removeToken, getCookie } from "@/utils/common";

const state: LoginState = {
  author: "zz",
  token: getToken(),
  userName: getCookie("userName"),
  headImg: getCookie("headImg")
};

// 强制使用getter获取state
const getters: GetterTree<LoginState, any> = {
  author: (state: LoginState) => state.author
};

// 更改state
const mutations: MutationTree<LoginState> = {
  // 更新state都用该方法
  UPDATE_LOGIN_STATE(state: any, data: any) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        return;
      }
      state[key] = data[key];
    }
  }
};

const actions: ActionTree<LoginState, any> = {
  //登录
  LOGIN_DATA({ commit, state: LoginState }, data: DataOptions) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-console
      LoginApi.login(data.userName, data.passWord)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  //登出
  LOGIN_OUT({ commit, state: LoginState }, data: LoginState) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    sessionStorage.removeItem("tags");
    var cval = getCookie("token");
    document.cookie =
      "token" +
      "=" +
      cval +
      ";expires=" +
      exp.toUTCString() +
      ";domain=.debteehelper.com; path=/";
    removeToken("userName");
    removeToken("headImg");
    var cval2 = getCookie("is_super");
    document.cookie =
      "is_super" +
      "=" +
      cval2 +
      ";expires=" +
      exp.toUTCString() +
      ";domain=.debteehelper.com; path=/";
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
