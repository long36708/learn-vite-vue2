<template>
  <Story
    :layout="{ type: 'single', iframe: true }"
    title="BigDataCheckboxGroup/方案5-全部在事件函数中处理(业务用)"
  >
    <Variant title="全选">
      <div class="opt-area">
        <input v-model="listLength" type="number" />
        <button @click="handleSetData">设置值</button>
        <button @click="handleGetData">获取选中项</button>
      </div>
      <BigDataCheckboxGroup
        ref="demo1Ref"
        :dataSource="dataSource"
        :item-component="ItemDemo"
        itemKey="key"
      >
        <template #empty>空数据</template>
      </BigDataCheckboxGroup>
    </Variant>

    <Variant title="指定最大可选范围">
      <div class="opt-area">
        <input v-model="listLength" type="number" />
        <button @click="handleSetData">设置值</button>
        <button @click="handleGetData">获取选中项</button>
      </div>
      <BigDataCheckboxGroup
        ref="demo1Ref"
        :dataSource="dataSource"
        :item-component="ItemDemo"
        :max-length="maxLength"
        itemKey="key"
        @emitUpMax="onUpMax"
      >
        <template #empty>空数据</template>
      </BigDataCheckboxGroup>
      <template #controls>
        <HstNumber v-model="maxLength" title="最大勾选数限制" />
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { INIT_COUNT, mockBigData } from "./mockBigData.js";
import ItemDemo from "./ItemDemo.vue";
import BigDataCheckboxGroup from "./index7.vue";

export default defineComponent({
  name: "demo5.story",
  components: {
    BigDataCheckboxGroup,
  },
  data() {
    return {
      demo1Ref: "",
      dataSource: [],
      ItemDemo,
      listLength: INIT_COUNT,
      // maxLength: 1,
      // maxLength: 50,
      maxLength: 100,
      // maxLength: 150,
      // maxLength: 1000,
      // maxLength: 100000,
    };
  },
  methods: {
    handleSetData() {
      const list = mockBigData(this.listLength);
      this.$refs.demo1Ref?.setData(list);
      // this.dataSource = list;
    },
    handleGetData() {
      const list = this.$refs.demo1Ref?.getAllCheckedKeys();
      console.log("全部勾选的数据", list);
      console.log("半选状态", this.$refs.demo1Ref?.isIndeterminate);
    },
    onUpMax() {
      alert(`勾选数量达到最大值${this.maxLength}，禁止继续添加`);
    },
  },
});
</script>

<style scoped>
.opt-area {
  margin-bottom: 10px;
}
</style>
<docs lang="md" src="./README.md">
</docs>
