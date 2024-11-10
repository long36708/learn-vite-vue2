<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
export default {
  beforeRouteEnter(to, from, next) {
    console.log("About Page beforeRouteEnter", to, from);
    if (from.name === "xxx") {
      next();
    } else {
      window.scrollTo(0, 0);
      next((e) => {
        console.log("e", e);
      });
    }
  },
};
</script>
<script setup lang="ts">
import {
  useRoute,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router/composables";
import { onMounted, onActivated, onDeactivated, onBeforeUpdate } from "vue";

onMounted(() => {
  const route = useRoute();
  console.info("route.path", route.path);
});

onActivated(() => {
  console.info("onActivated");
  const route = useRoute();
  console.info("route.path", route.path);
});
onDeactivated(() => {
  console.info("onDeactivated");
});

onBeforeUpdate(() => {
  console.info("onBeforeUpdate");
});

onBeforeRouteUpdate(() => {
  console.info("onBeforeRouteUpdate");
});

onBeforeRouteLeave((to, from, next) => {
  console.info("onBeforeRouteLeave");
  // 在导航离开渲染该组件的对应路由时调用
  const answer = window.confirm("你真的想离开吗？您有未保存的更改!");
  // 取消导航并停留在同一页面上
  if (!answer) return false; // 阻止导航
  // 注意一定要调用 next()
  next();
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
