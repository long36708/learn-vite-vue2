<template>
  <div>
    <button @click="hanleClick">
      Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! (My parent is "body")
          <button @click="modalOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Teleport from "vue2-teleport";

export default defineComponent({
  components: {
    Teleport,
  },
  setup() {
    const modalOpen = ref(false);
    const hanleClick = () => {
      console.log("clicked!");
      modalOpen.value = !modalOpen.value;
    };
    return {
      modalOpen,
      hanleClick,
    };
  },
});
</script>
