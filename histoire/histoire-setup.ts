/**
 * @Author: longmo
 * @Date: 2025-01-04 16:17:25
 * @LastEditTime: 2025-01-04 16:38:17
 * @FilePath: histoire/histoire.setup.ts
 * @Description:
 */
import { defineSetupVue2 } from "@histoire/plugin-vue2";
import Vue from "vue";
// import { store } from "../src/stores";
// import router from "../src/router";

export const setupVue2 = defineSetupVue2(({ story, variant }) => {
  // Vue plugin

  // Global component
  // Vue.component("GlobalComponent", MyGlobalComponent);

  // App options
  return {
    // store, // Vuex Store
    // router, // Vue Router
    provide: {
      key: "meow",
    },
  };
});
