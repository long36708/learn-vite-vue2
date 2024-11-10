<script setup>
import { useMouse } from "@/hooks/useMouse";

const { x, y } = useMouse();
</script>

<template>
  <div>Mouse position is at: {{ x }}, {{ y }}</div>
</template>
