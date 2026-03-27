import { createRouter, createWebHistory } from 'vue-router'
import OpenData from '@/views/OpenData.vue'
import WaterListData from '@/views/WaterListData.vue'
import DataGraph from '@/views/DataGraph.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OpenData,
    },
    {
      path: '/wtrdata/:year',
      name: 'wtr',
      component: WaterListData,
    },
    {
      path: '/datagraph',
      name: 'datagraph',
      component: DataGraph,
    },
  ],
})

export default router
