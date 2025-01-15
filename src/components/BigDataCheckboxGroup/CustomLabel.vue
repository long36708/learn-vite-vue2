<template>
  <component
    :is="itemComponent"
    v-if="itemComponent"
    v-bind="attrs"
    :item="item"
    class="aiop-custom-label__component"
  >
    <slot />
  </component>
  <div v-else class="aiop-custom-label__default" :title="item?.label">
    {{ item?.label ?? "默认标签" }}
  </div>
</template>
<script setup>
import { computed, useAttrs, useSlots } from "vue"; // 定义组件的 props

// 定义组件的 props
const props = defineProps({
  itemComponent: {
    type: Object,
    default: null,
  },
  item: {
    type: Object,
    default: () => ({ label: "默认标签" }),
  },
});

// 获取插槽内容
const slots = useSlots();

// 计算属性来处理 attrs 和 inheritAttrs
const attrs = computed(() => ({
  ...(props.itemComponent ? {} : { ...props }),
  ...(!props.itemComponent && !Object.keys(props).includes("inheritAttrs")
    ? { inheritAttrs: false }
    : {}),
  ...useAttrs(), // 如果你想要使用 $attrs，可以通过 useAttrs 钩子获取
}));

// 注意：如果你确实需要禁用 inheritAttrs，可以直接在 script setup 中设置它。
// 不过根据上下文，这里的逻辑已经通过计算属性处理了。

// 如果你需要访问默认插槽的内容，你可以这样做：
// const defaultSlotContent = slots.default?.();
</script>

<style scoped>
.aiop-custom-label__default {
  display: inline-block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
