<script lang="ts">
import {defineComponent} from 'vue'
import bigDataDemo1 from "@/components/BigDataCheckboxGroup/index.vue";
import {INIT_COUNT, mockBigData} from "@/components/Perf/mockBigData";

export default defineComponent({
  name: "Array",
  components: {bigDataDemo1},
  data() {
    return {
      listLength: INIT_COUNT,
      maxLength: 100,
      dataSource: [],
      ids: [],
      keySet: new Set()
    }
  },
  methods: {
    handleSetData() {
      console.time('setData')
      this.dataSource = mockBigData(this.listLength)
      console.timeEnd('setData')
    },
    handleTestFori() {
      console.time('handleTestFori')
      const list = this.dataSource;
      // 检查 dataSource 是否存在且不为空
      if (!list || !Array.isArray(list)) {
        this.ids = [];
        return;
      }
      const ids = []
      for (let i = 0; i < list.length; i++) {
        ids.push(list[i].key)
      }
      this.ids = ids
      console.timeEnd('handleTestFori')
    },
    handleTestMap() {
      console.time('handleTestMap')
      const list = this.dataSource;

      // 检查 dataSource 是否存在且不为空
      if (!list || !Array.isArray(list)) {
        this.ids = [];
        return;
      }

      // 使用 map 方法简化代码
      this.ids = list.map(item => item.key);
      console.timeEnd('handleTestMap')
    },
    handleTestInclude() {
      console.time('handleTestInclude')
      if (!Array.isArray(this.ids) || this.ids.length === 0) {
        console.warn('ids is not an array or is empty');
        return;
      }
      const list = this.ids;
      const isIn = list.includes(INIT_COUNT - 1)
      console.log(isIn)

      console.timeEnd('handleTestInclude')
    },
    /**
     * 发现 has 方法比 includes 方法要快很多，但是中间转为set的时候很消耗性能
     */
    handleTestInitSethas() {
      // 确保 INIT_COUNT 已正确定义
      console.time('handleTestSethas');
      if (!Array.isArray(this.ids) || this.ids.length === 0) {
        console.warn('ids is not an array or is empty');
        return;
      }
      console.time('转化为set')
      this.keySet = new Set(this.ids);
      console.timeEnd('转化为set')

      console.time('使用转化后的set has方法查找')
      const containsInitCount = this.keySet.has(INIT_COUNT - 1);
      console.log(containsInitCount)
      console.timeEnd('使用转化后的set has方法查找')

      console.timeEnd('handleTestSethas');
    },
    /**
     * 使用转化后的set has方法查找 比include 方法要快很多
     */
    handleTestSethas() {
      console.time('使用转化后的set has方法查找')
      const containsInitCount = this.keySet.has(INIT_COUNT - 1);
      console.log(containsInitCount)
      console.timeEnd('使用转化后的set has方法查找')
    },
    /**
     * 转化为set 170ms 耗时比数组（100ms）慢
     */
    handleTestInitSet(){
      console.time('转化为set')
      const list = this.dataSource;
      const ids = new Set();
      for (let i = 0; i < list.length; i++) {
        ids.add(list[i].key)
      }
      this.keySet = ids
      console.timeEnd('转化为set')
    },

    /**
     *  100ms
     */
    testSet2arr(){
      console.time('testSet2arr')
      const list = this.keySet;
      const arr = [...list];
      console.log(arr)
      console.timeEnd('testSet2arr')
    }

  },
})
</script>

<template>
  <Story :layout="{ type: 'single' }" title="Vue中常用方法性能分析/数组方法">
    <Variant title="demo1">
      <div class="opt-area">
        <input v-model="listLength" type="number">
        <button @click="handleSetData">设置值</button>
        <button @click="handleTestFori">handleTestFori</button>
        <button @click="handleTestMap">handleTestMap</button>
        <button @click="handleTestInclude">handleTestInclude</button>
        <button @click="handleTestInitSethas">handleTestInitSethas</button>
        <button @click="handleTestSethas">handleTestSethas</button>
        <button @click="handleTestInitSet">handleTestInitSet</button>
        <button @click="testSet2arr">testSet2arr</button>
        <span>dataSource 长度: {{ dataSource.length }}</span>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>

</style>