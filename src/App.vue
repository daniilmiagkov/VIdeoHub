<!--
<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
router.push('/auth'); // Перенаправляем пользователя на домашнюю страницу

</script>


-->
// App.vue
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>