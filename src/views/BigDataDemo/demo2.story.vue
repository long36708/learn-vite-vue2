<!--
 * @Author: longmo
 * @Date: 2025-01-05 10:37:06
 * @LastEditTime: 2025-01-05 10:45:16
 * @FilePath: src/views/BigDataDemo/demo1.story.vue
 * @Description:
 -->
<script setup lang="ts">
import bigDataDemo2 from "./demo2.vue";
import {ref} from "vue";
import { mockBigData } from "./mockData.js";
const demoRef = ref()

const handleSetData=()=> {
  demoRef.value.setData(mockBigData())
}

const handleLog=()=> {
  console.log(demoRef.value.getCheckedData())
}
// 加上ref就会报错 Uncaught (in promise) TypeError: Converting circular structure to JSON
</script>

<template>
  <Story title="大数据量demo2">
    <Variant title="demo2">
      <button @click="handleSetData">点击初始赋值</button>
      <button @click="handleLog">当前选中项</button>
      <bigDataDemo2 ref="demoRef"></bigDataDemo2>
    </Variant>
  </Story>
</template>

<style scoped></style>
