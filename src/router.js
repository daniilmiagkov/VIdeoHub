// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import UserPage from './components/UserPage.vue';
import AdminPage from './components/AdminPage.vue';
import Protected from './components/Protected.vue';
import { jwtDecode } from 'jwt-decode';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage,
    meta: { requiresAuth: true, role: 'user' }
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/protected',
    name: 'Protected',
    component: Protected
    // Маршрут '/protected' не требует авторизации, так как доступен для всех зарегистрированных пользователей
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({
        path: '/'
      });
    } else {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      if (to.matched.some(record => record.meta.role === userRole)) {
        next();
      } else {
        next({ name: 'Protected' }); // Или любой другой маршрут, на который вы хотите перенаправить пользователя
      }
    }
  } else {
    next();
  }
});

export default router;
