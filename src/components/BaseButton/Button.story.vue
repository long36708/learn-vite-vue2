<script lang="ts" setup>
import { reactive } from "vue";
import BaseButton from "./BaseButton.vue";
// 这个方法需要使用 Pinia
import { logEvent } from "histoire/client";

const state = reactive({
  disabled: false,
  color: undefined,
  size: undefined,
});
</script>

<template>
  <Story
    :layout="{
      type: 'grid',
      width: 200,
    }"
    title="BaseButton 基础按钮"
  >
    <Variant title="游乐场">
      <template #default>
        <BaseButton
          :color="state.color"
          :disabled="state.disabled"
          :size="state.size"
        >
          Click me
        </BaseButton>
      </template>

      <template #controls>
        <HstCheckbox v-model="state.disabled" title="禁用" />
        <HstSelect
          v-model="state.color"
          :options="[
            { value: undefined, label: 'Default' },
            { value: 'green', label: 'Green' },
            { value: 'red', label: 'Red' },
          ]"
          title="颜色"
        />
        <HstSelect
          v-model="state.size"
          :options="[
            { value: undefined, label: 'Default' },
            { value: 'small', label: 'Small' },
            { value: 'big', label: 'Big' },
          ]"
          title="大小"
        />
      </template>
    </Variant>

    <Variant icon="el:resize-full" title="大尺寸绿色按钮">
      <BaseButton color="green" size="big"> Click me</BaseButton>
    </Variant>

    <Variant icon-color="#F43F5E" title="小尺寸红色按钮">
      <BaseButton color="red" size="small" @click="logEvent('click', $event)">
        Click me!
      </BaseButton>
    </Variant>
    <!-- <Variant
      title="button inside div"
      icon-color="#F43F5E"
    >
      <div>
        <BaseButton>
          Click me!
        </BaseButton>
      </div>
    </Variant> -->
  </Story>
</template>

<docs lang="md">
# Title

## Subtitle

> Hello

:cat2:

[Learn more](https://histoire.dev)

```vue
<script lang="ts" setup>
defineProps<{
  foo: string;
}>();
</script>

<template>
  <div>Hello {{ world }}</div>
</template>
```

- Meow 猫叫声
- Waf
- Purr 咕噜咕噜叫

1. Meow
2. Waf
3. Purr

[Go home](/)
</docs>
