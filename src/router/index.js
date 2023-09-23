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
  },
  {
    path: '/punto-de-venta',
    name: 'PointOfSale',
    component: () => import('@/views/PointOfSale.vue'),
  },
  {
    path: '/clientes',
    name: 'Client',
    component: () => import('@/views/ClientView.vue'),
  },
  {
    path: '/calculadora',
    name: 'Calculator',
    component: () => import('@/views/CalculatorView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
