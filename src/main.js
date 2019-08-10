import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import iView from "iview";
import "iview/dist/styles/iview.css";
import "assets/css/my-theme.less";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(iView);
new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount("#app");
