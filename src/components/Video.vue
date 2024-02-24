<template>
  <div class="video">
    <video
        class="video__video"
        v-show="true" id="video" controls loading="lazy" volume="0.5" :key="_src">
      <source :src="_src" type="video/mp4">

    </video>
    <h3 class="video__title">{{ props.src }}</h3>

  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref, watch} from "vue";
const play = ref();
const _src = ref()
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
watch(() => props.src, () => {
  console.log(props.src)
  video = document.getElementById("video") as HTMLVideoElement;

  /*
    video.pause();
  */
  _src.value = `http://localhost:3000/videos/${props.src}`
})
onMounted(() => {
  // video = document.getElementById("video") as HTMLVideoElement;
/*
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

  });
*/
  /*window.addEventListener('resize', ()=> {
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
      })*/
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

  //border-radius: 20px;
}

.video__title {
  font-weight: normal;
  font-size: 14px;
  margin: 10px auto;
}

@media (min-width:1200px) {
  .video__video {
    //width: 100%;
    max-width: 100%;
    //height: 96%;
    border-radius: 10px;
  }
}


@media (max-width: 1199px) {
  .video__video {
    //width: 100%;
    max-width: 100%;
    height: 96%;
    border-radius: 10px;
  }
}

.video__canvas {

}
</style>
