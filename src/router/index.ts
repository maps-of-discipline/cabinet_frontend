import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/grades',
      name: 'grades',
      component: () => import('../views/GradesView.vue'),
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: () => import('../views/LessonsView.vue'),
    },
  ],
})

export default router
