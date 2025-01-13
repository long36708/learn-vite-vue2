<!--
 * @Author: longmo
 * @Date: 2025-01-04 18:32:02
 * @LastEditTime: 2025-01-12 22:15:49
 * @FilePath: src/components/AImage/AImage.story.vue
 * @Description:
 -->
<script setup lang="ts">
import AImage from "./index.vue";
import { reactive } from "vue";

const initState = {
  disabled: false,
  name: "liuyifei",
  extension: ".jpg",
};

const stateGlobal = reactive(initState);

function initStateFn() {
  return {
    disabled: false,
    name: "liuyifei",
    extension: ".jpg",
  };
}
</script>

<template>
  <Story
    title="AImage 图片组件"
    :layout="{
      type: 'grid',
      width: 200,
      height: 200,
    }"
  >
    <Variant title="刘亦菲图片" icon="el:resize-full">
      <AImage name="liuyifei" extension=".jpg" width="500" />
      <template #controls>
        <HstCheckbox v-model="stateGlobal.disabled" title="禁用" />
        <HstText v-model="stateGlobal.name" title="名称" />
        <HstSelect
          v-model="stateGlobal.extension"
          title="后缀"
          :options="[
            { value: undefined, label: 'Default' },
            { value: '.jpg', label: '.jpg' },
            { value: '.svg', label: '.svg' },
          ]"
        />
      </template>
    </Variant>
    <Variant title="刘亦菲图片自定义控制面板" icon="el:resize-full">
      <AImage :name="stateGlobal.name" :extension="stateGlobal.extension" />
      <template #controls>
        <HstCheckbox v-model="stateGlobal.disabled" title="禁用" />
        <HstText v-model="stateGlobal.name" title="名称" />
        <HstSelect
          v-model="stateGlobal.extension"
          title="后缀"
          :options="[
            { value: undefined, label: 'Default' },
            { value: '.jpg', label: '.jpg' },
            { value: '.svg', label: '.svg' },
          ]"
        />
      </template>
    </Variant>

    <Variant
      title="自定义控制面板 隔离state"
      icon="el:resize-full"
      :init-state="initStateFn"
    >
      <template #default="{ state }">
        <!--        {{ state }}-->
        <AImage :name="state.name" :extension="state.extension" />
      </template>

      <template #controls="{ state }">
        {{ state }}
        <HstCheckbox v-model="state.disabled" title="禁用" />
        <HstText v-model="state.name" title="名称" />
        <HstSelect
          v-model="state.extension"
          title="后缀"
          :options="[
            { value: undefined, label: 'Default' },
            { value: '.jpg', label: '.jpg' },
            { value: '.svg', label: '.svg' },
          ]"
        />
      </template>
    </Variant>
  </Story>
</template>

<style scoped></style>
