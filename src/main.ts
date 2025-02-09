import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

// import App from "./App.vue";
import App from "./views/CountDemo.vue";
// import App from "./views/BigDataDemo/demo5.vue";
// import App from "./components/BigDataCheckboxGroup/method2.vue";
import router from "@/router";
import "@/plugins";
import "./assets/main.css";
// import SvgIcon from "~virtual/svg-component";

// Vue.component(SvgIcon.name, SvgIcon);
Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
