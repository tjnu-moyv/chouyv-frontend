// 此文件 记录定义所有路由

const routes = [
    {
        // 重定向到登录页面
        path: '/',
        redirect: '/login'
    },
    {
        // 登录页面路由
        path: '/',
        component: () => import('@/views/LoginPage.vue')
    },
    {
        // 登录页面路由
        path: '/login',
        component: () => import('@/views/LoginPage.vue')
    },
    {
        // 注册页面路由
        path: '/register',
        component: () => import('@/views/RegisterPage.vue')
    },
    {
        // 学生页面路由
        path: '/student',
        component: () => import('@/views/student/StudentPage.vue'),
        children: [
            {
                // 学生点餐
                path: 'shops',
                component: () => import('@/views/student/shops/ShopsPage.vue'),
                children: [
                    {
                        // 选择菜品页面
                        path: 'orderFood',
                        component: () => import('@/views/student/shops/food/OrderFoodPage.vue'),
                    },
                    {
                        // 订单详情页面
                        path: 'orderDetailsPage',
                        component: () => import('@/views/student/shops/food/OrderDetailsPage.vue'),
                    },
                    {
                        // 支付之后的订单页面页面
                        path: 'PaymentConfirmationPage',
                        component: () => import('@/views/student/shops/food/PaymentConfirmationPage.vue'),
                    },
                ]
            },
            {
                // 学生配送员
                path: 'run',
                component: () => import('@/views/student/run/RunPage.vue'),
                children: [
                    {
                        // 第一次配送页面
                        path: 'firstRun',
                        component: () => import('@/views/student/run/FirstRunPage.vue'),
                    },
                    {
                        // 订单信息页面
                        path: 'orderInformation',
                        component: () => import('@/views/student/run/OrderInformationPage.vue'),
                    },
                ]
            },
            {
                // 学生个人信息页面
                path: 'profile',
                component: () => import('@/views/student/profile/ProfilePage.vue'),
                children: [
                    {
                        // 设置界面
                        path: 'settings',
                        component: () => import('@/views/student/profile/settings/SettingsPage.vue')
                    }
                ]
            }
        ]
    },
    {
        // 商家页面路由
        path: '/shop',
        component: () => import('@/views/shop/ShopPage.vue'),
        children: [
            {
                // 今日配餐页面
                path: 'dailymeal',
                component: () => import('@/views/shop/manage/DailyMealPage.vue'),
            },
            {
                // 添加和删除菜品页面
                path: 'foodManagement',
                component: () => import('@/views/shop/manage/FoodManagementPage.vue'),
            },
            {
                // 添加和删除菜品页面
                path: 'orderManagementPage',
                component: () => import('@/views/shop/manage/OrderManagementPage.vue'),
            }
        ]
    },
    {
        // 管理员页面路由
        path: '/admin',
        component: () => import('@/views/admin/AdminPage.vue'),
        children: [
            {
                // 商家管理页面
                path: '/restaurantInformation',
                component: () => import('@/views/admin/user/RestaurantInformationPage.vue'),
            },
            {
                // 学生管理页面
                path: '/studentInformation',
                component: () => import('@/views/admin/user/StudentInformationPage.vue'),
            }
        ]
    },
]
export default routes
