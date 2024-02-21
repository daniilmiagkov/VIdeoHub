<template>
  <div class="today-list">
    <h1 class="today-list__title">Today</h1>
    <div class="today-list__list" >
<!--      <ToDoListTask-->
<!--          v-for="item in list"-->
<!--          v-model:path="item.path"-->
<!--      />-->
    </div>
  </div>
</template>

<script setup lang="ta">

import {ref} from "vue";

let list = ref([]);


</script>

<style scoped lang="scss">
@import "../css/colors.scss";

.today-list {
  padding: 10px 10px 20px;
  width: 100%;
  background-color: $color-primary-light-1;
  /*height: 600px;*/
  border-radius: 10px;
}


</style>
