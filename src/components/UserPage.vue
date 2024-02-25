<template>
  <div class="user-profile">
    <h1 class="user-profile__title">Личный кабинет пользователя</h1>
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
    <table v-if="user" class="profile-info__works profile-info__table">
      <tr>
        <th>Место работы</th>
        <th>Должность</th>
        <th>Город</th>
        <th>Начало работы</th>
        <th>Конец работы</th>
      </tr>
      <tr v-for="index in 10" :key="index">
        <td>Компания {{ index }}</td>
        <td>Должность {{ index }}</td>
        <td>Город {{ index }}</td>
        <td>01-01-20{{ index + 10 }}</td>
        <td>01-01-20{{ index + 11 }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from "axios";
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

}

td {
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
</style>
