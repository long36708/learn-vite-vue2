<template>
  <div>
    <button @click="increment">Count is: {{ count }}</button>
    <img :src="logoSvg" />
    <DocumentationIcon />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// 引入SVG作为图片示例
import logoSvg from "@/assets/logo.svg";

// 将SVG作为图标组件使用
import DocumentationIcon from "@/components/icons/IconDocumentation.vue";

// 响应式状态
const count = ref(0);

// 用来修改状态、触发更新的函数
function increment() {
  count.value++;
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
  document.title = import.meta.env.VITE_APP_TITLE;
});
</script>
