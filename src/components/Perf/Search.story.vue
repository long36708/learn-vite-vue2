<!--
 * @Author: longmo
 * @Date: 2025-01-13 23:58:23
 * @LastEditTime: 2025-04-19 12:57:08
 * @FilePath: src/components/Perf/Search.story.vue
 * @Description: 这个文件 在 histoire 中使用会超出最大限制，有时间可以排查一下
 -->
<script setup lang="ts">
import { ref } from "vue";
import { INIT_COUNT, mockBigData } from "@/components/Perf/mockBigData";

const listLength = ref(INIT_COUNT);
const dataSource = ref([]);
function handleSetData() {
  console.time("setData");
  dataSource.value = Object.freeze(mockBigData(listLength.value)) as any;
  console.timeEnd("setData");
}

const filterText = ref("");
const filteredList = ref([]);
const testIndexOf = () => {
  console.time("indexOf");
  const arr = dataSource.value;
  filteredList.value = arr.filter(
    (item) => item?.label.indexOf(filterText.value) > -1
  );
  console.timeEnd("indexOf");
};
</script>

<template>
  <Story
    :layout="{ type: 'single', iframe: true }"
    title="Pref/测试模糊查询label"
  >
    <Variant title="indexOf">
      <div class="opt-area">
        <input v-model="listLength" type="number" />
        <button @click="handleSetData">设置值</button>

        <input v-model="filterText" type="text" />
        <button @click="testIndexOf">indexOf搜索</button>
      </div>
      <div>搜索前的数据量：{{ dataSource.length }}</div>
      <div>搜索后的数据量：{{ filteredList.length }}</div>
    </Variant>
  </Story>
</template>

<style scoped></style>
<docs lang="md" src="./README.md">

</docs>
