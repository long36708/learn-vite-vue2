<template>
  <div>
    <div>
      <button @click="player.play()">play</button>
      <button @click="player.pause()">pause</button>
    </div>
    <div class="xg-video-container">
      <div id="mse" ref="mseRef"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import { onMounted, onUnmounted, ref } from "vue";

const mseRef = ref();
const player = ref();

onMounted(() => {
  player.value = new Player({
    el: mseRef.value,
    url: "http://www.w3school.com.cn/i/movie.mp4",
    // url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    // url: "https://sample-videos.com/video123/flv/720/big_buck_bunny_720p_1mb.flv",
    // url: "https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.mkv",
    // url: "http://demo-videos.qnsdk.com/VR-Panorama-Equirect-Angular-4500k.mp4",
    // url: "http://demo-videos.qnsdk.com/only-video-1080p-60fps.m4s",
    // url: "https://img.qunliao.info:443/4oEGX68t_9505974551.mp4",
    height: "100%",
    width: "100%",
    lang: "zh",
  });
});

onUnmounted(() => {
  player.value.destroy();
});
</script>
<style scoped>
.xg-video-container {
  width: 500px;
  height: 300px;
}
</style>
