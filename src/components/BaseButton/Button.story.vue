<script lang="ts" setup>
import { reactive } from "vue";
import BaseButton from "./BaseButton.vue";

const state = reactive({
  disabled: false,
  color: undefined,
  size: undefined,
});
</script>

<template>
  <Story
    title="BaseButton 基础按钮"
    :layout="{
      type: 'grid',
      width: 200,
    }"
  >
    <Variant title="游乐场">
      <template #default>
        <BaseButton
          :disabled="state.disabled"
          :color="state.color"
          :size="state.size"
        >
          Click me
        </BaseButton>
      </template>

      <template #controls>
        <HstCheckbox v-model="state.disabled" title="禁用" />
        <HstSelect
          v-model="state.color"
          title="颜色"
          :options="[
            { value: undefined, label: 'Default' },
            { value: 'green', label: 'Green' },
            { value: 'red', label: 'Red' },
          ]"
        />
        <HstSelect
          v-model="state.size"
          title="大小"
          :options="[
            { value: undefined, label: 'Default' },
            { value: 'small', label: 'Small' },
            { value: 'big', label: 'Big' },
          ]"
        />
      </template>
    </Variant>

    <Variant title="大尺寸绿色按钮" icon="el:resize-full">
      <BaseButton color="green" size="big"> Click me</BaseButton>
    </Variant>

    <Variant title="小尺寸红色按钮" icon-color="#F43F5E">
      <BaseButton color="red" size="small"> Click me!</BaseButton>
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
