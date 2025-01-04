<script lang="ts" setup>
import { reactive, ref } from "vue";

const state = reactive({
  count: 0,
  text: "Meow",
});

const synced = ref("hello");
</script>

<template>
  <Story>
    <Variant title="default">
      <h1>状态</h1>
      <div>
        <pre>{{ state }}</pre>
        <div>{{ { synced } }}</div>
        <input v-model.number="state.count" type="number" />
        <input v-model="state.text" />
        <input v-model="synced" />
      </div>

      <template #controls>
        <div class="controls">
          <button @click="state.count--">-1</button>
          <button @click="state.count++">+1</button>
          <span>{{ state.count }}</span>
        </div>

        <HstText v-model="state.text" title="Text" />

        <HstText v-model="synced" title="synced" />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
.controls {
  margin: 12px;
  display: flex;
  align-items: center;
}

.controls > :not(:first-child) {
  margin-left: 12px;
}

button {
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
<docs lang="md">
# StateSetup

### 代码功能解释

这段 Vue 代码展示了一个简单的状态管理示例，使用了 Vue 的`reactive`和`ref`来创建响应式数据。页面包含一个标题、两个输入框和一些按钮，用于修改和显示状态。具体功能如下：

1. **显示状态**：通过`
<pre>`标签展示`state`对象的内容。
2. **输入框绑定**：三个输入框分别绑定到`state.count`、`state.text`和`synced`，实现双向数据绑定。
3. **按钮操作**：两个按钮分别用于增加和减少`state.count`的值。
4. **控制面板**：提供了额外的文本输入控件，用于修改`state.text`和`synced`。

### 控制流图（CFG）

```mermaid
flowchart TD
    A[初始化状态] --> B[渲染页面]
    B --> C{用户交互}
    C -->|修改count| D[更新state.count]
    C -->|修改text| E[更新state.text]
    C -->|修改synced| F[更新synced]
    D --> G[重新渲染页面]
    E --> G
    F --> G
    G --> H[显示最新状态]
```

### 解释

- **初始化状态**：在组件加载时，初始化`state`和`synced`。
- **渲染页面**：根据初始状态渲染页面内容。
- **用户交互**：用户可以通过输入框或按钮进行交互。
- **修改 count**：点击按钮增加或减少`state.count`的值。
- **修改 text**：通过输入框修改`state.text`的值。
- **修改 synced**：通过输入框修改`synced`的值。
- **重新渲染页面**：每次状态更新后，页面会重新渲染以显示最新的状态。
- **显示最新状态**：最终页面展示最新的状态信息。

这个流程图简洁地展示了用户与页面交互的过程以及状态更新的逻辑。
</docs>
