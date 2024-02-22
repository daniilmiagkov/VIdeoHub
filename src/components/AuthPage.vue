<template>
  <div class="auth-page">
    <form class="form" @submit.prevent="submitForm">
      <input class="input" type="text" v-model="username" placeholder="Username">
      <input  class="input" type="password" v-model="password" placeholder="Password">
      <button class="button button-visible">Продолжить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import {inject} from "vue";

const router = useRouter();
const isAuthenticated = inject('isAuthenticated')

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    console.log('Logged in successfully');
    isAuthenticated.value = true;
    router.push('/'); // Перенаправление на защищенную страницу после успешной аутентификации
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
};

let username = '';
let password = '';
</script>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.input {
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
  outline: none;
}


</style>
