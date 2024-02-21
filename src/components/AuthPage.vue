<template>
  <div class="auth-page">
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';

const username = ref("");
const password = ref("");
const user = {
  username: "1",
  password: "1",
}
const router = useRouter();

const login = () => {
  // Здесь вы можете реализовать логику аутентификации, например, отправку запроса на сервер
  // для проверки учетных данных
  console.log("Logging in with:", username.value, password.value);
  if (username.value === user.username && password.value === user.password) {
    console.log("Successful login!");
    router.push('/home'); // Перенаправляем пользователя на домашнюю страницу
  } else {
    console.log("Failed login!");
    // Возможно, здесь вы захотите отобразить сообщение об ошибке
  }
};
</script>
<style scoped lang="scss">
.auth-page {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: cornflowerblue;
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: royalblue;
}
</style>