<template>
  <div>
    <h1>Protected Page</h1>
    <p>This page is protected. Only authenticated users can access it.</p>
    <button @click="logout">Logout</button>
    <router-link to="/admin">admin</router-link>
    <router-link to="/user">user</router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};
</script>
