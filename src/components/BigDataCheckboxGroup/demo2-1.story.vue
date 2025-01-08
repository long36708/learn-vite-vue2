<template>
  <Story :layout="{ type: 'single' }" title="BigDataCheckboxGroup/指定最大可选范围">
    <Variant title="demo1">
      <div class="opt-area">
        <button @click="handleSetData">设置值</button>
        <button @click="handleGetData">获取选中项</button>
      </div>
      <bigDataDemo1
          ref="demo1Ref"
          :dataSource="dataSource"
          :item-component="ItemDemo"
          :max-length="maxLength"
          itemKey="key"
      >
        <template #empty>空数据</template>
      </bigDataDemo1>
      <template #controls>
        <HstNumber v-model="maxLength" title="最大勾选数限制"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import bigDataDemo1 from "./index.vue";
import {mockBigData} from "./mockBigData.js";
import ItemDemo from "./ItemDemo.vue";

export default defineComponent({
  name: "demo1.story",
  components: {
    bigDataDemo1,
  },
  data() {
    return {
      demo1Ref: "",
      dataSource: [],
      ItemDemo,
      // maxLength: 50,
      maxLength: 100,
      // maxLength: 150,
      // maxLength: 1000,
    };
  },
  methods: {
    handleSetData() {
      const list = mockBigData();
      // this.$refs.demo1Ref?.setData(list);
      this.dataSource = list;
    },
    handleGetData() {
      const list = this.$refs.demo1Ref?.getAllCheckedKeys();
      console.log("全部勾选的数据", list);
      console.log("半选状态", this.$refs.demo1Ref?.isIndeterminate);
    },
  },
});
</script>

<style scoped>
.opt-area {
  margin-bottom: 10px;
}
</style>