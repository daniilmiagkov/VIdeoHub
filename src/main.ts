/*
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './components/HomePage.vue';
import AuthPage from './components/AuthPage.vue';
import Videos from './components/Videos.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App }, // App.vue будет отображаться на корневом пути
        { path: '/auth', component: AuthPage }, // App.vue будет отображаться на корневом пути
        { path: '/home/cameras', component: Videos }, // App.vue будет отображаться на корневом пути
        { path: '/home', component: HomePage }, // HomePage.vue будет отображаться после успешной аутентификации
    ]
});

createApp(App).use(router).mount('#app');
*/
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');