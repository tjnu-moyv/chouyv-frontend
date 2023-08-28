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
      component: () => import('@/view/student/StudentPage.vue'),
      children: [
        {
          // 用户资料
          path: 'profile/:id',
          component: () => import('@/view/student/TheStudent.vue'),
        },
        {
          // 商家-商品 页面
          path: 'shop/:id',
          component: () => import('@/view/student/TheShop.vue'),
        }
      ]
    },
    {
      path: '/shop',
      component: () => import('@/view/ShopPage.vue'),
    },
    {
      path: '/run',
      component: () => import('@/view/RunPage.vue'),
    },
  ]
})

export default router
