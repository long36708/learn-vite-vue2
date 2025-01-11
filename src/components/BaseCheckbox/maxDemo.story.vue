<!--
 * @Author: longmo
 * @Date: 2025-01-10 22:52:14
 * @LastEditTime: 2025-01-10 23:38:43
 * @FilePath: src/components/BaseCheckbox/maxDemo.story.vue
 * @Description: 超出最大勾选数量时禁止勾选
 -->
<script lang="ts">
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      max: 2,
    };
  },
};
</script>

<template>
  <Story
    :layout="{
      type: 'grid',
    }"
    title="BaseCheckbox 组件/maxDemo"
  >
    <Variant icon="el:resize-full" title="超出最大勾选数量时禁止勾选">
      <el-input-number v-model="max"> 可以动态改变最大勾选数量</el-input-number>
      <el-checkbox-group v-model="checkedCities" :max="undefined">
        <el-checkbox v-for="city in cities" :label="city" :key="city"
          >{{ city }}
        </el-checkbox>
      </el-checkbox-group>
    </Variant>
  </Story>
</template>

<style scoped></style>
