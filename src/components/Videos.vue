<template>

  <div class="videos">
    <Video
        :src="src"
        :type="'video/mp4'"
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
        <transition-group name="main-grid">
          <tr
              v-for="(video,index) in videos"
              :key="video.format.filename"
              @click="src = `http://localhost:3000/videos/${video.name}`"
              :style="{ 'transition': `transform ${index * 0.05}s` }"
              class='list__title-element'

          >
            <td>{{ video.name }}</td>
            <td>{{ video.streams[0].width }}</td> <!-- Исправлено здесь -->
            <td>{{ video.streams[0].height }}</td> <!-- Исправлено здесь -->
            <td>{{ (video.format.size  / (1024 * 1024)).toFixed(2) }}</td> <!-- Добавлено здесь -->
            <td>{{ (+video.format.duration).toFixed(2) }}</td> <!-- Добавлено здесь -->
            <!-- Добавьте другие ячейки таблицы, если необходимо -->
          </tr>
        </transition-group>
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
.video__table-container {
  flex-grow: 10;
  flex-shrink: 0;
  height: 100%; /* Установите высоту контейнера таблицы */
  position: sticky;
  top: 0;
  overflow: scroll; /* Показывать скрытые области при прокрутке */
}
.main-grid-enter-active,
.main-grid-leave-active {
  transition: 0.5s ease;
  transition-property: opacity, transform;
}
.main-grid-enter-from,
.main-grid-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.video__table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  //overflow: hidden;
  //table-layout: fixed; /* Фиксированная ширина столбцов для предотвращения изменения ширины при прокрутке */
}

.video__table th,
.video__table td {
  padding: 8px; /* Измените отступы ячеек по вашему усмотрению */
  text-align: left;
}

thead {
  position: sticky;
  top: 0; /* Закрепите заголовок таблицы наверху */
  z-index: 1;
  background-color: #fff; /* Добавьте фон для заголовка таблицы */
  border-bottom: 10px solid gray; /* Добавьте нижние границы для ячеек */
}

tbody {
  max-height: calc(100vh - 150px); /* Установите максимальную высоту для tbody, чтобы она не расширялась за пределы экрана */
}

tr {
  cursor: pointer;
  border-radius: 20px;
  //outline: 1px solid gray;
  background-color: white;
}

tr:hover {
  background-color: lightgray;
}
th {
  cursor: pointer;
  background: white;
  //outline: 5px solid white;
}

td {

}

td, th {
  border-right: 1px solid gray;
  border-bottom: 1px solid gray; /* Добавьте нижние границы для ячеек */

}

td:last-child, th:last-child {
  border-right: none; /* Уберите правую границу для последней ячейки */
}

@media (min-width: 1500px) {
  .videos {
    display: flex;
    flex-direction: row;
    overflow: auto;


  }
}

@media (max-width: 1499px) {
  .videos {
    display: flex;
flex-direction: column;
    overflow: hidden;

  }
}
.video_pinned {
  position: sticky;
  top: 0px;
  z-index: 1;
  //padding: 20px;
  max-height: 50%;
  flex-grow: 0;
  flex-shrink: 10;
  margin-right: 20px;
}


</style>
