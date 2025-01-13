<!--
 * @Author: longmo
 * @Date: 2025-01-13 23:58:23
 * @LastEditTime: 2025-01-14 00:28:08
 * @FilePath: src/components/Perf/SearchOptions.story.vue
 * @Description:
 -->

<script>
import { INIT_COUNT, mockBigData } from "@/components/Perf/mockBigData";

export default {
  data() {
    return {
      listLength: INIT_COUNT,
      dataSource: [],
      filterText: "",
      filteredList: [],
    };
  },
  methods: {
    handleSetData() {
      console.time("setData");
      this.dataSource = Object.freeze(mockBigData(this.listLength));
      console.timeEnd("setData");
    },
    /**
     * IndexOf
     * 1812.757080078125 ms
     */
    testIndexOf() {
      console.time("indexOf");
      const arr = this.dataSource;
      this.filteredList = arr.filter(
        (item) => item && item.label.indexOf(this.filterText) > -1
      );
      console.timeEnd("indexOf");
    },
    /**
     * 使用 Object.freeze 优化后
     * 388.656005859375 ms
     */
    testIndexOfPerf() {
      console.time("indexOf");
      const arr = this.dataSource;
      this.filteredList = Object.freeze(
        arr.filter((item) => item && item.label.indexOf(this.filterText) > -1)
      );
      console.timeEnd("indexOf");
    },

    /**
     * match
     */
    testMatch() {
      console.time("match");
      this.filteredList = this.dataSource.filter(
        (item) => item && item.label.match(this.filterText)
      );
      console.timeEnd("match");
    },

    /**
     * 使用 Object.freeze 优化后
     * 848.883056640625 ms
     */
    testMatchPerf() {
      console.time("match");
      this.filteredList = Object.freeze(
        this.dataSource.filter(
          (item) => item && item.label.match(this.filterText)
        )
      );
      console.timeEnd("match");
    },

    /**
     * 2084.3681640625 ms
     */
    testSearch() {
      console.time("search");
      this.filteredList = this.dataSource.filter(
        (item) => item && item.label.search(this.filterText) > -1
      );
      console.timeEnd("search");
    },
    /**
     * 使用 Object.freeze 优化后
     * 800.044921875 ms
     */
    testSearchPerf() {
      console.time("search");
      this.filteredList = Object.freeze(
        this.dataSource.filter(
          (item) => item && item.label.search(this.filterText) > -1
        )
      );
      console.timeEnd("search");
    },

    testIncludes() {
      console.time("includes");
      this.filteredList = this.dataSource.filter(
        (item) => item && item.label.includes(this.filterText)
      );
      console.timeEnd("includes");
    },
    testIncludesPerf() {
      console.time("includes");
      this.filteredList = Object.freeze(
        this.dataSource.filter(
          (item) => item && item.label.includes(this.filterText)
        )
      );
      console.timeEnd("includes");
    },
  },
  mounted() {
    // 如果需要在组件挂载时执行某些操作，可以在这里调用方法
    // this.handleSetData();
  },
};
</script>

<template>
  <Story
    :layout="{ type: 'single', iframe: true }"
    title="Vue中常用方法性能分析/测试模糊查询label"
  >
    <Variant title="indexOf">
      <div class="opt-area">
        <input v-model="listLength" type="number" />
        <button @click="handleSetData">设置值</button>

        <input v-model="filterText" type="text" />
        <button @click="handleSetData">设置值</button>

        <button @click="testIndexOf">indexOf 搜索</button>
        <button @click="testIndexOfPerf">indexOf 搜索(优化后)</button>

        <button @click="testMatch">match 搜索</button>
        <button @click="testMatchPerf">match 搜索(优化后)</button>

        <button @click="testSearch">search 搜索</button>
        <button @click="testSearchPerf">search 搜索(优化后)</button>

        <button @click="testIncludes">includes 搜索</button>
        <button @click="testIncludesPerf">includes 搜索(优化后)</button>
      </div>
      <div>搜索前的数据量：{{ dataSource.length }}</div>
      <div>搜索后的数据量：{{ filteredList.length }}</div>
    </Variant>
  </Story>
</template>

<style scoped></style>
