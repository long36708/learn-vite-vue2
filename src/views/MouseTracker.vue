<script setup>
import { useMouse } from "@/composables/useMouse";

const { x, y } = useMouse();
</script>

<template>
  <div>Mouse position is at: {{ x }}, {{ y }}</div>
</template>
