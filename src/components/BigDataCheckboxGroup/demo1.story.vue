<template>
  <Story
    :layout="{ type: 'single' }"
    title="BigDataCheckboxGroup888/方案1-自定义item"
  >
    <Variant title="demo1">
      <template #default="{ state }">
        <div class="opt-area">
          <input v-model="listLength" type="number" />
          <button @click="handleSetData">设置值</button>
          <button @click="handleGetData">获取选中项</button>
        </div>
        <bigDataDemo1
          ref="demo1Ref"
          :dataSource="dataSource"
          :item-component="ItemDemo"
          itemKey="key"
        >
          <template #empty>空数据</template>
        </bigDataDemo1>
      </template>
    </Variant>
  </Story>
</template>

<script>
import { defineComponent } from "vue";
import bigDataDemo1 from "./index.vue";
import { INIT_COUNT, mockBigData } from "./mockBigData.js";
import ItemDemo from "./ItemDemo.vue";

export default {
  name: "testDemo",
  components: {
    bigDataDemo1,
  },
  data() {
    return {
      demo1Ref: "",
      dataSource: [],
      ItemDemo,
      listLength: INIT_COUNT,
    };
  },
  methods: {
    handleSetData() {
      const list = mockBigData(this.listLength);
      // this.$refs.demo1Ref?.setData(list);
      this.dataSource = list;
    },
    handleGetData() {
      const list = this.$refs.demo1Ref?.getAllCheckedKeys();
      console.log("全部勾选的数据", list);
      console.log("半选状态", this.$refs.demo1Ref?.isIndeterminate);
    },
  },
};
</script>

<style scoped>
.opt-area {
  margin-bottom: 10px;
}
</style>
