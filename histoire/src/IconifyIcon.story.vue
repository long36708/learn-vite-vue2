<!--
 * @Author: longmo
 * @Date: 2025-01-12 10:50:56
 * @LastEditTime: 2025-01-12 11:54:45
 * @FilePath: histoire/src/IconifyIcon.story.vue
 * @Description:
 -->
<!--<script lang="ts">-->
<!--import { Icon, addCollection } from "@iconify/vue";-->
<!--import simple from "@iconify/json/json/simple-line-icons.json";-->
<!--import design from "@iconify/json/json/ant-design.json";-->
<!--export default {-->
<!--  components: { Icon },-->
<!--  mounted() {-->
<!--    addCollection(simple);-->
<!--    addCollection(design);-->
<!--  },-->
<!--};-->
<!--</script>-->

<script setup lang="ts">
import { addCollection, Icon } from "@iconify/vue";
import simple from "@iconify/json/json/simple-line-icons.json";
import design from "@iconify/json/json/ant-design.json";

function mySetupApp({ story, variant }) {
  // App options
  return {
    components: { LIcon: Icon },
    mounted() {
      console.log("mySetupApp");
      addCollection(simple);
      addCollection(design);
    },
  };
}
</script>
<template>
  <Story title="iconify Icon" :layout="{ type: 'single', iframe: false }">
    <Variant title="Global setup" :setup-app="mySetupApp">
      <!-- 使用 carbon Icons 图标 -->
      <Icon icon="carbon:search" />

      Loading...
      <!-- 使用 ri 图标 -->
      <Icon icon="ri:subtract-line" />

      <!-- 使用 fluent 图标 -->
      <Icon icon="fluent:text-paragraph-direction-right-16-regular" />

      <Icon icon="mdi:drag-vertical-variant" />

      <!-- 使用 Simple Line Icons 图标 -->
      <Icon icon="simple-line:home" />
      <!-- 使用 Ant Design 图标 -->
      <Icon icon="ant-design:search" />
    </Variant>
  </Story>
</template>

<style scoped></style>
