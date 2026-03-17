import { createRouter, createWebHistory } from 'vue-router'
import OpenData from '@/views/OpenData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OpenData,
    },
  ],
})

export default router
