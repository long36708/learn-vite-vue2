<script setup lang="ts"></script>
<script lang="ts">
import { defineComponent } from "vue";
import BinUI from "../../lib/bin-ui.js";

console.log("BinUI", BinUI);

export default defineComponent({
  name: "BinUIDemo",
  components: {
    BButton: BinUI.Button,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div>
    Bin UI Demo

    <BButton>按钮</BButton>
  </div>
</template>

<style scoped>
@import "../../lib/styles/index.css";
</style>
