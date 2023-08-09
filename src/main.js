import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 清除默认样式
import '@/style/reset.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
