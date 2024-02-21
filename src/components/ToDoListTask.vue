<template>
  <button class="to-do-list__task button">
    <span class="to-do-list__number to-do-list__item">{{lab.FileName}}</span>
    <span class="to-do-list__date to-do-list__item">{{lab.Date}}</span>
  </button>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import {Lab} from "../../backend/types/Subject";

const lab = ref(new Lab());

const props = defineProps({
  path: String
})

function getSubjectFromPath() {
  fetch(
      `http://localhost:3000/database/${props.path}` )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else {
          console.log(response)
        }
      })
      .then((data) => {
        lab.value = data;
        console.log(data)
      })
      .catch((error) => console.log(error))
}
getSubjectFromPath();
</script>

<style scoped lang="scss">
.to-do-list__task {
  background-color: #ffffff;
  width: 90%;
  height: 34px;
  font-weight: bold;
  margin: 0 auto 8px;
  padding: 4px 10px;
  display: flex;
  border-radius: 10px;
  //border: 1px black solid;
  justify-content: space-between;
  align-items: center;
}

.button:hover {
  background-color: #e8e7e8;
}
.to-do-list__item {
  min-width: 30px;
  flex-shrink: 1;
}
.to-do-list__date {
  flex-shrink: 0;
}
</style>
