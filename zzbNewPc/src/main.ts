import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import AFTableColumn from "af-table-column";
Vue.use(AFTableColumn);
// import "tcj-lib-flexible";
import "@/assets/scss/element-variables.scss";
Vue.config.productionTip = false;

Vue.use(ElementUI);
import "@/assets/scss/common.scss";

const QRCode = require("qrcodejs2");
Vue.prototype.QRCode = QRCode;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// (function() {
//   var rem = document.createElement("script");
//   rem.src = "./rem.js";
//   document.body.appendChild(rem);
// })();
