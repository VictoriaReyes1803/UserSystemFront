import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue'; 
import Register from '../components/Register.vue'; 
import Home from '../views/Dashboard.vue';

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
        // meta: {
        //     requiresAuth: true
        // }
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Verifica si el usuario está autenticado
      if (!store.state.isAuthenticated) {
        // Si no está autenticado, redirige al login
        next('/login');
      } else {
        next(); // Continúa navegando a la ruta protegida
      }
    } else {
      next(); // Continúa navegando a rutas públicas
    }
  });
export default router;
