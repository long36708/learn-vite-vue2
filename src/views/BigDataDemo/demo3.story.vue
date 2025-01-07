<!--
 * @Author: longmo
 * @Date: 2025-01-05 10:37:06
 * @LastEditTime: 2025-01-07 09:33:08
 * @FilePath: src/views/BigDataDemo/demo3.story.vue
 * @Description:
 -->
<script setup lang="ts">
import bigDataDemo from "./demo3.vue";
import { onMounted, ref } from "vue";

onMounted(() => {});
</script>

<template>
  <Story title="大数据量demo3">
    <Variant title="demo3">
      <bigDataDemo ref="demoRef"></bigDataDemo>
    </Variant>
  </Story>
</template>

<style scoped></style>
