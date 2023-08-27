import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/view/LoginPage.vue'),
    },
    {
      path: '/register',
      component: () => import('@/view/RegisterPage.vue'),
    },
    {
      path: '/student',
      component: () => import('@/view/student/index.vue'),
    },
    {
      path: '/shop',
      component: () => import('@/view/shop/index.vue'),
    },
    {
      path: '/run',
      component: () => import('@/view/run/index.vue'),
    },
  ]
})

export default router
