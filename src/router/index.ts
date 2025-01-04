import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { setupLayouts } from "virtual:meta-layouts";

Vue.use(VueRouter);
import { routes as autoRoutes } from "vue-router/auto-routes";

console.log("autoRoutes", autoRoutes);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
    meta: {
      layout: "other-layout", // 通过元信息来管理布局
    },
  },
  {
    path: "/mouse",
    name: "mouse",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/MouseTracker"),
  },
  {
    path: "/count",
    name: "count",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/CountDemo"),
  },
  {
    path: "/fetch",
    name: "fetch",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/FetchDemo"),
  },
  {
    path: "/tele",
    name: "TeleportDemo",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/TeleportDemo"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: import.meta.env.BASE_URL,
  // routes,
  routes: setupLayouts(routes),
});

// export default createGetRoutes(router);
export default router;
