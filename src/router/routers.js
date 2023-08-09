// 此文件 记录定义所有路由

const routes = [
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/register',
        component: () => import('@/views/Register.vue')
    },
    {
        path: '/student',
        component: () => import('@/views/student/Student.vue'),
        children: [
            {
                path: 'shops',
                component: () => import('@/views/student/shops/Shops.vue'),
                children: [
                    /* 未完成 */
                ]
            },
            {
                path: 'run',
                component: () => import('@/views/student/run/Run.vue')
            }
        ]
    },
    {
        path: '/shops',
        component: () => import('@/views/shop/Shop.vue')
    }
]
export default routes
