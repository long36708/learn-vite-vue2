<script lang="ts" setup>
import { useAssetsImageURL } from "@/composables/url-composable";
import { defineProps, withDefaults } from "vue-demi";

/**
 * 接收assets/images中的名称
 */
type PropsType = {
  name: string;
  extension?: ".jpg" | ".png" | ".svg";
};
const props = withDefaults(defineProps<PropsType>(), {
  extension: ".png",
});

const imgSrc = useAssetsImageURL(props.name, { extension: props.extension });

// console.log(imgSrc);
</script>

<template>
  <img class="a-image" :src="imgSrc" />
</template>
