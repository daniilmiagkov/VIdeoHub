<template>
  <div>
    <h1>Список видео</h1>
    <div class="toggle-switch" @click="toggleSwitchVideos">
      <div class="switch" :class="{ 'switch-on': showVideos }"></div>
    </div>
    <div class="toggle-switch" @click="toggleSwitchPresentation">
      <div class="switch" :class="{ 'switch-on': typePresentation==='grid' }"></div>
    </div>
    <table id="videos">

    </table>
    <Video
        v-for="video of videos"
        :src="video"
        :typePresentation="typePresentation"
        :showVideo="showVideos">

    </Video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Video from "./Video.vue";
const showVideos = ref(true)
const typePresentation = ref('table')
const videos = ref([]);
function toggleSwitchVideos() {
  showVideos.value = !showVideos.value;
}
function toggleSwitchPresentation() {
  if (typePresentation.value === 'table') {
    typePresentation.value = 'grid';
  }
  else {
    typePresentation.value = 'table';
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/videos');
    videos.value = response.data;
  } catch (error) {
    console.error('Failed to fetch videos:', error.message);
    // Здесь вы можете обработать ошибку, например, показать сообщение пользователю
  }
});
</script>

<style scoped lang="scss">
.videos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  column-gap: 20px;
  row-gap: 40px;
}
.toggle-switch {
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
}

.switch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  transition: all 0.3s ease;
}

.switch-on {
  transform: translateX(30px);
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  column-gap: 20px;
  row-gap: 40px;
}

.video-table {
  display: table;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  column-gap: 20px;
  row-gap: 40px;
}

</style>
