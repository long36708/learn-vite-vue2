<!--
 @Description: 文件作用描述
 @Date: 2025-01-08 14:31
 @Version: V1.0.0
-->
<template>
  <div class="custom-label">
    {{ item.label }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ItemDemo",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("item", this.item);
  },
});
</script>

<style scoped></style>
