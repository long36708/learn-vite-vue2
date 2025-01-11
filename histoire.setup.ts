/**
 * @Author: longmo
 * @Date: 2025-01-04 16:17:25
 * @LastEditTime: 2025-01-11 15:22:31
 * @FilePath: histoire.setup.ts
 * @Description:
 */
import { defineSetupVue2 } from "@histoire/plugin-vue2";
import Vue from "vue";
// import { store } from "../src/stores";
// import router from "../src/router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { addCollection } from "@iconify/vue";
import carbon from "@iconify/json/json/carbon.json";
export const setupVue2 = defineSetupVue2(({ story, variant }) => {
  // Vue plugin

  // Global component
  // Vue.component("GlobalComponent", MyGlobalComponent);
  Vue.use(ElementUI);
  addCollection(carbon);
  // App options
  // return {
  //   // store, // Vuex Store
  //   // router, // Vue Router
  //   provide: {
  //     key: "meow",
  //   },
  // };
});
