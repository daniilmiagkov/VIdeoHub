<template>
  <div v-show="props.typePresentation==='grid'" class="video">
    <h3>{{ props.src }}</h3>
    <div class="video__container">
      <video
          class="video__video"
          v-show="props.showVideo" :id="'video_' + props.src" controls loading="lazy" volume="0.5">
        <source :src="`http://localhost:3000/videos/${props.src}`" type="video/mp4">
      </video>

      <canvas
          v-show="!props.showVideo"
          :id="'canvas_' + props.src"
          class="video__canvas"
          @click="changePlay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref} from "vue";
const play = ref();
let video;
let ratio_w;
let ratio_h;
let canvas = document.createElement('canvas');
const props = defineProps({
  src: String,
  showVideo: Boolean,
  typePresentation: String
});
function changePlay() {
  if (play.value) {
    video.pause();
    play.value = false;
  }
  else {
    video.play();
    play.value = true;
  }
}

onMounted(() => {
  video = document.getElementById("video_" + props.src) as HTMLVideoElement;
  video.addEventListener("loadedmetadata", () => {
    canvas = document.getElementById('canvas_' + props.src) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ratio_w = video.videoWidth/video.videoHeight
    ratio_h = video.videoHeight/video.videoWidth
    canvas.width = 400*(ratio_w);
    canvas.height = canvas.width *(ratio_h);
    const drawFrame = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
    window.addEventListener('resize', ()=> {
      const w = document.getElementById('videos').clientWidth;
      let a;
      let i;
      for (i = 1; i <= 6; i++) {
        if ((i - 1) * 20 + 400 * (i) <= w) {
          try {
            canvas.width = (w - (i - 1) * 20) / i
            canvas.height = ratio_h * ((w - (i - 1) * 20) / i)
            console.log(canvas.width, canvas.height,)
          }
          catch (e) {
          }
        }
        else {
          return;
        }
      }
    })
  });

/*  const video = document.createElement("video");
  if (!video.canPlayType) {
    console.log("Ваш браузер не поддерживает частичную загрузку видео. Пожалуйста, используйте другой браузер.");
  }
  else {
    console.log("Поддерживает")
  }*/
});

</script>

<style scoped lang="scss">
.video {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  flex-direction: column;
  border-radius: 20px;
}

.video__video {
  width: 100%;
  height: 100%;
  border-radius: 18px;
}

.video__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.video__canvas {

}
</style>
