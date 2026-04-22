import { createRouter, createWebHistory } from 'vue-router'
import ContadorBasicView from '../views/ContadorBasicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contador-basic',
      component: ContadorBasicView,
    },
    {
      path: '/contador-reset',
      name: 'contador-reset',
      component: () => import('../views/ContadorResetView.vue'),
    },
  ],
})

export default router
