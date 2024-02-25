<template>
  <div class="user-profile">
    <h1 class="user-profile__title">Личный кабинет администратора</h1>
    <table v-if="user" class="profile-info__personal-data profile-info__table">
      <tr>
        <th>Имя</th>
        <td>{{ user.firstname }}</td>
      </tr>
      <tr>
        <th>Фамилия</th>
        <td>{{ user.lastname }}</td>
      </tr>
      <tr>
        <th>Возраст</th>
        <td>{{ user.age }}</td>
      </tr>
    </table>
    <div v-if="user" class="profile-info__works">
      <h2 class="user-profile__title">Стримы</h2>
      <video
          class="admin__video"
          v-show="true" id="video" controls volume="0.5" :key="src">
        <source :src="src" type="video/webm">

      </video>
      <input class="admin-profile__input" placeholder="http://localhost:3000/stream" v-model="name"/>
      <button class="button" @click="connectStream">Connect</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Video from "./Video.vue";
import axios from "axios";
const src = ref()
const name = ref('http://localhost:3000/stream')
const user = ref(null)
onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    const response = await axios.get(`http://localhost:3000/user/${token}`);
    console.log(response.data)
    user.value = response.data
  } catch (error) {
    console.error('Failed to fetch user data:', error.message);
    // Здесь вы можете обработать ошибку, например, показать сообщение пользователю
  }
})

function connectStream() {
  src.value = name.value;
}
</script>

<style scoped lang="scss">
.user-profile {
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 60px 1fr;
  display: grid;
  font-size: 14px;
}

.profile-info {
  padding-bottom: 20px;
  margin-bottom: 20px;

}

.profile-info__table {
  text-align: left;
  //display: block;
  border-spacing: 10px;
  width: 100%;
  height: 0px;
}

.profile-info__works {
  border-left: 1px solid lightgray;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px minmax(100px, 400px) 40px;
  align-items: center;
justify-items: center;
  gap: 20px;
}

td, .admin-profile__input {
  padding: 8px 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
}

th {
  padding: 8px 10px;
  border-radius: 10px;
}
.user-profile__title {
  font-size: 20px;
  grid-column: span 2;
  font-weight: normal;
  margin: 20px;
}
.admin-profile__input {
  outline: none;
  width: 90%;
  //margin-right: 20px;
}

.admin__video {
  //height: 500px;
  height: 100%;
  max-width: 100%;
  grid-column: span 2;
}
</style>
