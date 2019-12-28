import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Vue from 'vue'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
})

export default router