/**
 * @Author: longmo
 * @Date: 2025-01-04 16:17:25
 * @LastEditTime: 2025-01-12 21:25:21
 * @FilePath: histoire/histoire-setup.ts
 * @Description:
 */
import { defineSetupVue2 } from "@histoire/plugin-vue2"; // import { store } from "../src/stores";
import Vue, { provide } from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./histoire.css";
import { createPinia, PiniaVuePlugin } from "pinia";
import { Icon } from "@iconify/vue2";

console.log("Theme loaded!");
export const setupVue2 = defineSetupVue2(({ story, variant }) => {
  // Vue plugin
  Vue.use(ElementUI);
  Vue.use(PiniaVuePlugin);
  // Global component
  // Vue.component("GlobalComponent", MyGlobalComponent);
  Vue.component("Icon", Icon);
  console.log("注册全局组件");
  provide("demo", "meow");
  // App options
  return {
    // store, // Vuex Store
    // router, // Vue Router
    pinia: createPinia(),
    provide: {
      demo: "meow",
    },
    // provide() {
    //   return {
    //     demo: "meow",
    //   };
    // },
    mounted() {
      console.log("defineSetupVue2", this);
    },
  };
});
