<template>
  <div>
    <button @click="increment">Count is: {{ count }}</button>
    <img :src="logoSvg" height="100"/>
    <SvgIcon name="colorfull/neon-cat" />
    <DocumentationIcon />
    <div>
      IconDownloadUrl 因为 这个svg图标里有style，无法转成vue组件，因此需要使用img标签展示
      <img :src="IconDownloadUrl" height="100"></img>
    </div>

    <div>
      MyIconDownload
      <MyIconDownload />
    </div>
    <div>
      MyOtherIconDownload
      <MyOtherIconDownload />
    </div>
    <div>
      CustomIconDownload
      <CustomIconDownload />
    </div>

    <div>
      DownloadIcon
      <DownloadIcon height="100"/>
    </div>
    <!--    <IconDownload2 />-->
    <IconDiscord />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// 引入SVG作为图片示例
import logoSvg from "@/assets/logo.svg";

// 将SVG作为图标组件使用
import DocumentationIcon from "@/components/icons/IconDocumentation.vue";

import DownloadIcon from "../components/icons/DownloadIcon.vue";

import CustomIconDownload from "~icons/custom/download";
import IconDiscord from "~icons/my-icons/discord";
import IconDownloadUrl from "@/assets/svgIcons/download.svg";
import MyIconDownload from "~icons/my-icons/download";
import MyOtherIconDownload from "~icons/my-yet-other-icons/download";
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
