import Vue from "vue";
import Router from "vue-router";
import { routes } from "./router";
import { getToken } from "@/utils/common";
import store from "@/store";
import { getAsyncRoute } from "@/router/pommies";
Vue.use(Router);
const router = new Router({
  routes
  // mode: "history"
});

// 登陆页面路由 name
const LOGIN_PAGE_NAME = "login";
const DEBTOR_FEEDBACK = "debtFeedback";

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location: any) {
  let call: any = routerPush.call(this, location);
  return call.catch((error: any) => error);
};

// 跳转之前
router.beforeEach((to, from, next) => {
  if (IEVersion() != -1) {
    Vue.prototype.$alert(
      "您的浏览器版本过低,为保证您的操作体验请升级浏览器版本,点击确定下载谷歌浏览器",
      "提醒",
      {
        confirmButtonText: "确定",
        callback: (action: any) => {
          if (action == "confirm") {
            window.open("https://file.debteehelper.com/ChromeSetup.exe");
          } else {
            Vue.prototype.$message({
              type: "info",
              message: `继续在IE环境中浏览可能遇到未知的错误,请自行更换至谷歌浏览器`
            });
          }
        }
      }
    );
    return false;
  }
  const token = getToken();
  if (!token && to.name !== LOGIN_PAGE_NAME && to.name !== DEBTOR_FEEDBACK) {
    // 未登录且要跳转的页面不是登录页也不是反馈页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next(); // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: "index" // 跳转到 index 页
    });
  } else {
    // eslint-disable-next-line no-console
    if (token) {
      const state: any = store.state;
      const url: string = window.location.href;
      const head: string = url.split(":")[0];
      // if (head === "http") {
      //   window.location.href = url.replace("http", "https");
      // }
      if (state.layout.rouls.length === 0) {
        //页面刷新
        let parmas = {
          rouls: ["platform", "user", "business"]
        };
        store.dispatch("UPDATE_LAYOUY_STATE", parmas);
        getAsyncRoute();
        next(to.path);
      } else {
        next(); // 跳转
      }
    } else {
      if (to.name === DEBTOR_FEEDBACK) {
        next(); // 跳转
      } else {
        next({
          name: LOGIN_PAGE_NAME
        });
      }
    }
  }
});

// 跳转之后
router.afterEach(to => {});

//判断是否是IE浏览器
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return "edge"; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
}

export default router;
