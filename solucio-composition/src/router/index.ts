import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/ex01', component: () => import('../views/Ex01TarjetaView.vue') },
    { path: '/ex02', component: () => import('../views/Ex02LlumView.vue') },
    { path: '/ex03', component: () => import('../views/Ex03TemperaturaView.vue') },
    { path: '/ex04', component: () => import('../views/Ex04LlistaCompraView.vue') },
    { path: '/ex05', component: () => import('../views/Ex05ValidacioView.vue') },
    { path: '/ex06', component: () => import('../views/Ex06SemaforView.vue') },
    { path: '/ex07', component: () => import('../views/Ex07MultiplicarView.vue') },
    { path: '/ex08', component: () => import('../views/Ex08FiltreView.vue') },
    { path: '/ex09', component: () => import('../views/Ex09AcordioView.vue') },
    { path: '/ex10', component: () => import('../views/Ex10NotesView.vue') },
    { path: '/ex11', component: () => import('../views/Ex11AvatarView.vue') },
    { path: '/ex12', component: () => import('../views/Ex12BotoView.vue') },
    { path: '/ex13', component: () => import('../views/Ex13ComptadorView.vue') },
    { path: '/ex14', component: () => import('../views/Ex14InputValidatView.vue') },
    { path: '/ex15', component: () => import('../views/Ex15SlotsView.vue') },
    { path: '/ex16', component: () => import('../views/Ex16HistorialView.vue') },
    { path: '/ex17', component: () => import('../views/Ex17DesamentView.vue') },
    { path: '/ex18', component: () => import('../views/Ex18CistellaView.vue') },
    { path: '/ex19', component: () => import('../views/Ex19RellotgeView.vue') },
    { path: '/ex20', component: () => import('../views/Ex20TemaView.vue') },
    { path: '/ex21', component: () => import('../views/Ex21LlistaUsuarisView.vue') },
    { path: '/ex21/:id', component: () => import('../views/Ex21DetallView.vue') },
    { path: '/ex22', component: () => import('../views/Ex22WizardView.vue') },
    { path: '/ex23', component: () => import('../views/Ex23TodoView.vue') },
    { path: '/ex24', component: () => import('../views/Ex24MemoriaView.vue') },
    { path: '/ex25', component: () => import('../views/Ex25DashboardView.vue') },
    { path: '/ex26', component: () => import('../views/Ex26ComponentsDinamicsView.vue') },
  ],
})

export default router
