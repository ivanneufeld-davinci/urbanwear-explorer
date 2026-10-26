
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetalleView from '../views/DetalleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/producto/:id',
      name: 'detalle',
      component: DetalleView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'no-encontrado',
      redirect: '/',
    },
  ],
})

export default router
