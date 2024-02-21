<template>
  <div class="all-to-do-list" id="all-to-do-list">
    <ToDoList
        v-for="(item, index) in listSubjects"  :key="index"
        :path="item"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import ToDoList from "./ToDoList.vue";
let listSubjects = ref([]);

  function getListSubjects() {
  fetch('http://localhost:3000/database/names')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Проверяем, что данные не пусты, прежде чем с ними работать
        if (data && Object.keys(data).length > 0) {
          listSubjects.value = data
          // console.log(listSubjects);
          // Теперь можешь обрабатывать данные
        } else {
          console.error('Получены пустые данные');
        }
      })
      .catch((error: Error) => console.log(error));
}
getListSubjects()
</script>

<style scoped lang="scss">
@import "../css/colors.scss";
.all-to-do-list {
  transition: filter 1s ease;

  width: 100%;
  //justify-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  align-items: start;
}

</style>
