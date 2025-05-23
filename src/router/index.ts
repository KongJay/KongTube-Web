import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/layout/Layout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/Layout.vue'),
    },

  ],
})

export default router
