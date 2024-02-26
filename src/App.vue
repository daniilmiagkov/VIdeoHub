<template>
  <div class="app">
    <header class="header">
      <button class="button button-visible menu header__button"
              @mouseover="toggleMenu(true)"
              @mouseout="toggleMenu(false)">
        Меню
        <nav class="sidebar" :class="{ 'sidebar--open': isMenuOpen }" ref="sidebar"  @mouseover="toggleMenu(true)"
             @mouseout="toggleMenu(false)">
          <ul class="sidebar__menu">
            <li><router-link to="/">Главная</router-link></li>
            <li v-if="isAuthenticated"><router-link to="/user">Пользователь</router-link></li>
            <li v-if="isAuthenticated"><router-link to="/admin">Админ</router-link></li>
            <li v-if="isAuthenticated"><router-link to="/videos">Камеры</router-link></li>
            <li v-if="!isAuthenticated"><router-link to="/auth">Войти</router-link></li>
          </ul>
        </nav>
      </button>
      <h1 class="header__title"></h1>
      <button v-if="!isAuthenticated" class="button button-visible header__button" @click="router.push('/auth')">Вход</button>
      <button v-if="isAuthenticated" class="button button-visible header__button" @click="logout">Выход</button> <!-- Кнопка для выхода -->

    </header>
    <router-view class="main"/>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import {provide, ref} from 'vue';

const router = useRouter();

const isAuthenticated = ref(!!localStorage.getItem('token'))
provide('isAuthenticated', isAuthenticated);


const isMenuOpen = ref(false);

const toggleMenu = (value) => {
  isMenuOpen.value = value
};

const logout = () => {
  isAuthenticated.value = !isAuthenticated.value;
  localStorage.removeItem('token');
  router.push('/');
};
</script>

<style scoped lang="scss">
.app {
  text-align: center;
  height: 100vh;
  //height: 100%;
  display: flex;
  flex-direction: column;
  //min-width: 800px;
  background-color: white;
}
a {
  color: black;
}
.sidebar {
  font-size: 14px;
  color: black;
  background-color: white;
  position: absolute;
  margin-left: -20px;
  margin-top:  10px;
  width: 120px;
  text-align: center;
  transform: translateX(-200%);
  transition: transform 0.3s ease-in-out;
  border-radius: 10px;
  z-index: 3;
}

.sidebar--open {
  transform: translateX(0);
}

.sidebar__menu {
  list-style: none;
  padding: 0;
}

.sidebar__menu li {
  margin-top: 10px;
}

.sidebar__menu a:hover {
  background-color: rgba(194, 194, 194, 0.44);
}

.sidebar__menu a{
  text-decoration: none;
  height: 40px;
  padding: 8px;
  width: 100%;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

}
.header__button {
  width: 120px;
}

.header {
  height: 70px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  flex-shrink: 0;
}

.header__title {
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
}
.main {
  //height: 100%;
  margin: 0 20px;
  flex-grow: 1;
}
</style>