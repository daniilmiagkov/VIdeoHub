<template>
  <div>
    <h1>Список видео</h1>
    <div class="videos">
      <Video v-for="video of videos"
             :src="video"
      >

      </Video>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Video from "./Video.vue";

const videos = ref([]);

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}
</style>
