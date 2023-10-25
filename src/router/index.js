// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/punto-de-venta',
    name: 'PointOfSale',
    component: () => import('@/views/PointOfSale.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/clientes',
    name: 'Client',
    component: () => import('@/views/ClientView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/calculadora',
    name: 'Calculator',
    component: () => import('@/views/CalculatorView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'Calculator',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Verifica si la ruta actual requiere autenticación (tiene la meta propiedad requiresAuth).
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Verifica si el usuario NO está autenticado. Debes redirigir si NO hay un token.
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated != null) {
      // Si el usuario está autenticado, permite la navegación a la ruta actual.
      next();
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
      next({ name: 'Login' });
    }
  } else {
    // Rutas públicas, permite la navegación sin restricciones.
    next();
  }
});


export default router
