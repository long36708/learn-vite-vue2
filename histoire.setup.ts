/**
 * @Author: longmo
 * @Date: 2025-01-04 16:17:25
 * @LastEditTime: 2025-01-12 21:37:28
 * @FilePath: histoire.setup.ts
 * @Description:
 */
import { defineSetupVue2 } from "@histoire/plugin-vue2";
import Vue from "vue";
// import { store } from "../src/stores";
// import router from "../src/router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { Icon, addCollection } from "@iconify/vue2";
import carbon from "@iconify/json/json/carbon.json";
import simple from "@iconify/json/json/simple-line-icons.json";
import design from "@iconify/json/json/ant-design.json";
export const setupVue2 = defineSetupVue2(({ story, variant }) => {
  // Vue plugin

  // Global component
  // Vue.component("GlobalComponent", MyGlobalComponent);
  Vue.use(ElementUI);
  Vue.component("Icon", Icon);
  addCollection(carbon);
  addCollection(simple);
  addCollection(design);
  // App options
  // return {
  //   // store, // Vuex Store
  //   // router, // Vue Router
  //   provide: {
  //     key: "meow",
  //   },
  // };
});
