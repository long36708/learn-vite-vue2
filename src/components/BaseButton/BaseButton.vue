<script lang="ts" setup>
// vue2貌似无法使用
// 报错 vue.runtime.esm.js:3065 Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
import { logEvent } from "histoire/client";

defineProps({
  color: {
    type: String,
    default: null,
  },

  size: {
    type: String,
    default: null,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :disabled="disabled"
    class="btn"
    @click="logEvent('click', $event)"
    :class="{
      [`btn-color-${color}`]: color,
      [`btn-size-${size}`]: size,
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border-radius: 4px;
  padding: 4px 8px;
  background: #e4e4e4;
  cursor: pointer;
}

.btn:hover {
  background: #f1f1f1;
}

.btn[disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.btn-color-green {
  background: #94ffc9;
}

.btn-color-green:hover {
  background: #acffd6;
}

.btn-color-red {
  background: #ff9494;
}

.btn-color-red:hover {
  background: #ffa8a8;
}

.btn-size-big {
  font-size: 16px;
  padding: 8px 16px;
}

.btn-size-small {
  font-size: 12px;
  padding: 2px 4px;
}
</style>
