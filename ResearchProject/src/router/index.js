import { createRouter, createWebHistory } from 'vue-router'
import CanvasVue from '@/components/Canvas.vue'
import MainVue from '@/components/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: CanvasVue
    },
  ]
})

export default router
