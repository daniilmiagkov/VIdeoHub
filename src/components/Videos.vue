<template>

  <div class="videos">
<!--
    <h1 class="videos__title">Список видео</h1>
-->

    <Video
        :src="src"
        class="video_pinned"
    >
    </Video>
    <div class="video__table-container">
      <table id="videos" class="video__table">
        <thead>
        <tr>
          <th>Имя файла</th>
          <th>Ширина</th>
          <th>Высота</th>
          <th>Размер (байт)</th>
          <th>Длительность (сек)</th>
          <!-- Добавьте другие заголовки, если необходимо -->
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="video in videos"
            :key="video.format.filename"
            @click="src = video.name"
        >
          <td>{{ video.name }}</td>
          <td>{{ video.streams[0].width }}</td> <!-- Исправлено здесь -->
          <td>{{ video.streams[0].height }}</td> <!-- Исправлено здесь -->
          <td>{{ (video.format.size  / (1024 * 1024)).toFixed(2) }}</td> <!-- Добавлено здесь -->
          <td>{{ (+video.format.duration).toFixed(2) }}</td> <!-- Добавлено здесь -->
          <!-- Добавьте другие ячейки таблицы, если необходимо -->
        </tr>
        </tbody>
      </table>
    </div>
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
const src = ref()

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
    for (let video of response.data) {
      await axios.get(`http://localhost:3000/videos/${video}/metadata`)
          .then(response => {
            const data = response.data;
            // Добавляем метаданные видео в массив videos
            videos.value.push({
              format: data.format,
              streams: data.streams,
              name: video,
            });
          })
          .catch(error => {
            console.error('Ошибка при получении метаданных:', error);
          });
    }
  } catch (error) {
    console.error('Failed to fetch videos:', error.message);
    // Здесь вы можете обработать ошибку, например, показать сообщение пользователю
  }
});
</script>

<style scoped lang="scss">
/*
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
*/

.video__table {
  width: 100%;
  //border-collapse: collapse;
  resize: horizontal; /* Разрешить изменение размера горизонтально */
  overflow: auto; /* Показывать скрытые области при изменении размера */
  height: 100%;

}

.video__table th,
.video__table td {
  border: 1px solid gray;
  padding: 8px;
  text-align: left;
  border-radius: 10px;
}

td {
  //border: 1px solid gray;
  //border-radius: 10px;
}

th {
  background-color: white;
  cursor: pointer;
  resize: horizontal; /* Разрешить изменение размера горизонтально */
  overflow: auto; /* Показывать скрытые области при изменении размера */

}

thead {
  position: sticky;  background-color: white;
  //top: -1px;
  top: 0;
  z-index: 1; /* Убеждаемся, что заголовок находится выше содержимого таблицы */
}
tbody {
  //top: 36px;
}


@media (min-width: 1200px) {
  .videos {
    display: grid;
    grid-template-columns: minmax(300px, 600px) auto;
    //grid-template-rows: minmax(300px, 600px) ; /* Устанавливаем размеры строк грида */
    gap: 20px;
    z-index: 0;
    overflow: auto;
  }
}

@media (max-width: 1199px) {
  .videos {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: minmax(300px, 600px) auto; /* Устанавливаем размеры строк грида */
    gap: 20px;
    z-index: 0;
    overflow: auto;
  }
}
.video_pinned {
  position: sticky;
  top: 0; /* Зафиксировать видео в верхней части контейнера */
  z-index: 0; /* Убедитесь, что видео находится выше содержимого таблицы */
  //padding: 20px;

}

.video__table-container {
  overflow-y: auto; /* Разрешить вертикальную прокрутку в случае необходимости */

}
</style>
