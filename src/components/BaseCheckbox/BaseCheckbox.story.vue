<!--
 * @Author: longmo
 * @Date: 2025-01-04 18:32:02
 * @LastEditTime: 2025-01-10 22:51:42
 * @FilePath: src/components/BaseCheckbox/BaseCheckbox.story.vue
 * @Description:
 -->
<script lang="ts" setup>
import { reactive } from "vue";
import BaseCheckbox from "./index.vue";

const initState = {
  isCheckedAll: false,
  isIndeterminate: false,
};

const stateGlobal = reactive(initState);

function initStateFn() {
  return () => initState;
}
</script>

<template>
  <Story
    :layout="{
      type: 'grid',
    }"
    title="BaseCheckbox 组件"
  >
    <Variant icon="el:resize-full" title="全选半选">
      <BaseCheckbox
        v-model="stateGlobal.isCheckedAll"
        :indeterminate="stateGlobal.isIndeterminate"
      />
      <template #controls>
        <HstCheckbox v-model="stateGlobal.isCheckedAll" title="全选" />
        <HstCheckbox v-model="stateGlobal.isIndeterminate" title="半选 " />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md" src="./test.md">

</docs>
