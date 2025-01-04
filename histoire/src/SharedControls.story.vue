<script lang="ts" setup>
import { reactive } from "vue";

const options = [
  { label: "古惑狼", value: "crash-bandicoot" },
  { label: "最后生还者", value: "the-last-of-us" },
  { label: "对马岛之魂", value: "ghost-of-tsushima" },
];

const state = reactive({
  text: "Hello",
  checkbox: false,
  number: 20,
  longText: "Longer text...",
  select: "crash-bandicoot",
  fn: () => {
    /* noop */
  },
});

defineExpose({
  state,
});
</script>

<template>
  <Story title="Shared Controls 共享控件">
    <template #controls>
      <HstText v-model="state.text" title="HstText" />
      <HstCheckbox v-model="state.checkbox" title="HstCheckbox" />
      <HstNumber v-model="state.number" title="HstNumber" />
      <HstTextarea v-model="state.longText" title="HstTextarea" />
      <HstSelect v-model="state.select" title="HstSelect" :options="options" />
    </template>

    <Variant title="变体 1">
      <h1>Variant 1</h1>
      <pre>{{ state }}</pre>
    </Variant>

    <Variant title="变体 2">
      <h1>Variant 2</h1>
      <pre>{{ state }}</pre>
    </Variant>
  </Story>
</template>

<docs lang="md">
[[toc]]

## 控件 :cat2:

观察不同控件的效果

### HstText 文本框

### HstCheckbox 复选框

### HstNumber 数字输入框

### HstTextarea 多行文本框

### HstSelect 下拉框

## 受控故事

这些模式允许您创建自定义控件来更新组件

### 单控

这将显示故事的控制面板。

```vue
<script lang="ts" setup>
import { reactive } from "vue";
import MyComponent from "./MyComponent.vue";

const state = reactive({
  text: "Hello world",
});
</script>

<template>
  <Story title="MyStory">
    <MyComponent :argument="state.text" />
    <template #controls>
      <HstText v-model="state.text" title="Content" />
    </template>
  </Story>
</template>
```

### 全局变体控制

这将显示所有变体的控制面板。

```vue
<script lang="ts" setup>
import { reactive } from "vue";
import MyComponent from "./MyComponent.vue";

const state = reactive({
  text: "Hello world",
});
</script>

<template>
  <Story title="MyStory">
    <Variant title="MyVariant Red">
      <MyComponent :argument="state.text" color="red" />
    </Variant>
    <Variant title="MyVariant Blue">
      <MyComponent :argument="state.text" color="blue" />
    </Variant>
    <template #controls>
      <HstText v-model="state.text" title="Content" />
    </template>
  </Story>
</template>
```

### 特定变体对照

这将仅显示一个变体的控制面板

```vue
<script lang="ts" setup>
import { reactive } from "vue";
import MyComponent from "./MyComponent.vue";

const state = reactive({
  text: "Hello world",
});
</script>

<template>
  <Story title="MyStory">
    <Variant title="MyVariant Red">
      <MyComponent :argument="state.text" color="red" />
      <template #controls>
        <HstText v-model="state.text" title="Content" />
      </template>
    </Variant>
    <Variant title="MyVariant Blue">
      <MyComponent argument="hello" color="blue" />
    </Variant>
  </Story>
</template>
```

### 隔离的变体控制

这将隔离每个变体，以便您一次只能控制一个变体

```vue
<script lang="ts" setup>
import MyComponent from "./MyComponent.vue";

function initState() {
  return {
    text: "Hello world",
  };
}
</script>

<template>
  <Story title="MyStory">
    <Variant title="MyVariant Red" :init-state="initState">
      <template #default="{ state }">
        <MyComponent :argument="state.text" color="red" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="Content" />
      </template>
    </Variant>
    <Variant title="MyVariant Blue" :init-state="initState">
      <template #default="{ state }">
        <MyComponent :argument="state.text" color="blue" />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.text" title="Content" />
      </template>
    </Variant>
  </Story>
</template>
```
</docs>
