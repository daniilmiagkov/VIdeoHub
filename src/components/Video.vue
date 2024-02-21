<template>
  <div>
    <h3>{{ props.src }}</h3>
    <video ref="videoElement" class="video" controls loading="lazy" volume="0.5">
      <source :src="`http://localhost:3000/videos/${props.src}`" type="video/mp4">
    </video>
    <canvas ref="canvasElement" class="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";

const props = defineProps({
  src: String,
});

onMounted(() => {
  const video = document.querySelector(".video") as HTMLVideoElement;
  const canvas = document.querySelector(".canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  video.addEventListener("play", function() {
    const self = this;
    (function loop() {
      if (!self.paused && !self.ended && ctx) {
        ctx.drawImage(self, 0, 0, canvas.width, canvas.height);
        setTimeout(loop, 1000 / 30); // кадры в секунду
      }
    })();
  });
});
</script>

<style scoped lang="scss">
.video {
  width: 100%;
  object-fit: contain;
  box-shadow: none; /* Убираем внутреннюю тень */
}

.canvas {
  display: none; /* Скрываем canvas */
}
</style>
