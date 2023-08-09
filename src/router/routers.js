// 此文件 记录定义所有路由

const routes = [
    {
        path: '/login',
        component: () => import('@/views/LoginPage.vue')
    },
    {
        path: '/register',
        component: () => import('@/views/RegisterPage.vue')
    },
    {
        path: '/student',
        component: () => import('@/views/student/StudentPage.vue'),
        children: [
            {
                path: 'shops',
                component: () => import('@/views/student/shops/ShopsPage.vue'),
                children: [
                    /* 未完成 */
                ]
            },
            {
                path: 'run',
                component: () => import('@/views/student/run/RunPage.vue')
            }
        ]
    },
    {
        path: '/shop',
        component: () => import('@/views/shop/ShopPage.vue')
    }
]
export default routes
