<template>
  <div>
    <h1>Home Page</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button>Login</button>
    </form>
<Videos></Videos>
  </div>
</template>

<script>
import axios from 'axios';
import Videos from "./Videos.vue";
import Video from "./Video.vue";

export default {
  components: {Video, Videos},
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { username: this.username, password: this.password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log('Logged in successfully');
        this.$router.push('/protected'); // Перенаправление на защищенную страницу после успешной аутентификации
      } catch (error) {
        console.error('Login failed:', error.response.data.message);
      }
    }
  }
};
</script>