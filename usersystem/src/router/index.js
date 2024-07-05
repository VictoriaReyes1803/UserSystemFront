import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue'; 
import Register from '../components/Register.vue'; 
import Home from '../views/Dashboard.vue';
import  isAuthenticated  from '../auth/auth';
import auth from '../auth/auth';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => {
            const isAuthenticate = auth.isAuthenticated();
          if (isAuthenticate) {
            next();
          }
          else {
            next('/');
          }}
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  beforeEach: (to, from, next) => {
  },
  afterEach: (to, from) => {
  }

});

  
export default router;
